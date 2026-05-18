/**
 * Webhooks
 * 
 * Subscribe to and manage webhook events
 */

export type WebhookEventType = 
  | 'session_created' 
  | 'session_ended' 
  | 'message_received' 
  | 'tool_executed' 
  | 'error_occurred' 
  | 'task_completed';

export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: WebhookEventType[];
  isActive: boolean;
  agentId?: string;
  secret?: string;
  retryPolicy: RetryPolicy;
  createdAt: number;
}

export interface RetryPolicy {
  maxRetries: number;
  backoffMs: number;
  timeoutMs: number;
}

export interface WebhookEvent {
  id: string;
  type: WebhookEventType;
  timestamp: number;
  data: Record<string, unknown>;
  webhookId: string;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  eventId: string;
  status: 'pending' | 'delivered' | 'failed' | 'retrying';
  attempt: number;
  responseCode?: number;
  responseBody?: string;
  error?: string;
  deliveredAt?: number;
}

/**
 * WebhookManager - Manages webhook subscriptions and event delivery
 */
export class WebhookManager {
  private webhooks: Map<string, Webhook> = new Map();
  private events: WebhookEvent[] = [];
  private deliveries: Map<string, WebhookDelivery> = new Map();
  private eventQueue: WebhookEvent[] = [];

  /**
   * Register webhook
   */
  registerWebhook(webhook: Omit<Webhook, 'id' | 'createdAt'>): Webhook {
    const webhookWithId: Webhook = {
      id: `webhook_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      ...webhook,
      createdAt: Date.now(),
    };

    this.webhooks.set(webhookWithId.id, webhookWithId);
    return webhookWithId;
  }

  /**
   * Emit event
   */
  emitEvent(type: WebhookEventType, data: Record<string, unknown>): WebhookEvent {
    const event: WebhookEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      type,
      timestamp: Date.now(),
      data,
      webhookId: '',
    };

    this.events.push(event);
    this.eventQueue.push(event);

    // Trigger webhook delivery
    this.dispatchEvent(event);

    return event;
  }

  /**
   * Dispatch event to webhooks
   */
  private dispatchEvent(event: WebhookEvent): void {
    this.webhooks.forEach((webhook, webhookId) => {
      if (!webhook.isActive) return;
      if (!webhook.events.includes(event.type)) return;
      if (webhook.agentId && webhook.agentId !== event.data.agentId) return;

      const delivery: WebhookDelivery = {
        id: `delivery_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        webhookId,
        eventId: event.id,
        status: 'pending',
        attempt: 0,
      };

      this.deliveries.set(delivery.id, delivery);
      this.attemptDelivery(delivery, webhook, event);
    });
  }

  /**
   * Attempt webhook delivery
   */
  private attemptDelivery(delivery: WebhookDelivery, webhook: Webhook, event: WebhookEvent): void {
    delivery.attempt++;

    // Simulate HTTP request
    const success = Math.random() > 0.1; // 90% success rate for simulation

    if (success) {
      delivery.status = 'delivered';
      delivery.responseCode = 200;
      delivery.deliveredAt = Date.now();
    } else {
      if (delivery.attempt < webhook.retryPolicy.maxRetries) {
        delivery.status = 'retrying';
        // In real implementation, would schedule retry
      } else {
        delivery.status = 'failed';
        delivery.error = 'Max retries exceeded';
      }
    }
  }

  /**
   * Get webhook
   */
  getWebhook(webhookId: string): Webhook | undefined {
    return this.webhooks.get(webhookId);
  }

  /**
   * List all webhooks
   */
  listWebhooks(): Webhook[] {
    return Array.from(this.webhooks.values());
  }

  /**
   * List webhooks for agent
   */
  getAgentWebhooks(agentId: string): Webhook[] {
    return Array.from(this.webhooks.values()).filter(w => w.agentId === agentId);
  }

  /**
   * Update webhook
   */
  updateWebhook(webhookId: string, updates: Partial<Webhook>): Webhook | undefined {
    const webhook = this.webhooks.get(webhookId);
    if (!webhook) return undefined;

    Object.assign(webhook, updates);
    return webhook;
  }

  /**
   * Enable webhook
   */
  enableWebhook(webhookId: string): boolean {
    const webhook = this.webhooks.get(webhookId);
    if (!webhook) return false;

    webhook.isActive = true;
    return true;
  }

  /**
   * Disable webhook
   */
  disableWebhook(webhookId: string): boolean {
    const webhook = this.webhooks.get(webhookId);
    if (!webhook) return false;

    webhook.isActive = false;
    return true;
  }

  /**
   * Delete webhook
   */
  deleteWebhook(webhookId: string): boolean {
    return this.webhooks.delete(webhookId);
  }

  /**
   * Get event history
   */
  getEventHistory(type?: WebhookEventType, limit?: number): WebhookEvent[] {
    let events = this.events;

    if (type) {
      events = events.filter(e => e.type === type);
    }

    if (limit) {
      events = events.slice(-limit);
    }

    return events;
  }

  /**
   * Get delivery status
   */
  getDeliveryStatus(webhookId: string): WebhookDelivery[] {
    return Array.from(this.deliveries.values()).filter(d => d.webhookId === webhookId);
  }

  /**
   * Get failed deliveries
   */
  getFailedDeliveries(): WebhookDelivery[] {
    return Array.from(this.deliveries.values()).filter(d => d.status === 'failed');
  }

  /**
   * Retry delivery
   */
  retryDelivery(deliveryId: string): boolean {
    const delivery = this.deliveries.get(deliveryId);
    if (!delivery) return false;

    if (delivery.status !== 'failed' && delivery.status !== 'retrying') return false;

    const webhook = this.webhooks.get(delivery.webhookId);
    if (!webhook) return false;

    // Find original event
    const event = this.events.find(e => e.id === delivery.eventId);
    if (!event) return false;

    delivery.attempt = 0;
    this.attemptDelivery(delivery, webhook, event);

    return true;
  }
}

export default WebhookManager;
