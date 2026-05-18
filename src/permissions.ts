/**
 * Permission Policies
 * 
 * Define and enforce permission policies for agents
 */

export type Permission = 'read' | 'write' | 'execute' | 'delete' | 'admin';
export type Resource = 'files' | 'databases' | 'apis' | 'networks' | 'compute';

export interface PermissionPolicy {
  id: string;
  name: string;
  description: string;
  agentId: string;
  resource: Resource;
  permissions: Permission[];
  constraints?: PolicyConstraint[];
  isActive: boolean;
  createdAt: number;
  expiresAt?: number;
}

export interface PolicyConstraint {
  type: 'time_based' | 'rate_limited' | 'ip_restricted' | 'data_limited';
  value: string | number;
  metadata: Record<string, unknown>;
}

export interface AccessRequest {
  id: string;
  agentId: string;
  resource: Resource;
  permission: Permission;
  timestamp: number;
  approved: boolean;
  reason?: string;
}

/**
 * PermissionManager - Manages permission policies and access control
 */
export class PermissionManager {
  private policies: Map<string, PermissionPolicy> = new Map();
  private agentPolicies: Map<string, string[]> = new Map(); // agentId -> policyIds
  private accessRequests: Map<string, AccessRequest> = new Map();
  private accessLog: AccessRequest[] = [];

  /**
   * Create permission policy
   */
  createPolicy(policy: Omit<PermissionPolicy, 'id' | 'createdAt'>): PermissionPolicy {
    const policyWithId: PermissionPolicy = {
      id: `policy_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      ...policy,
      createdAt: Date.now(),
    };

    this.policies.set(policyWithId.id, policyWithId);

    if (!this.agentPolicies.has(policy.agentId)) {
      this.agentPolicies.set(policy.agentId, []);
    }

    this.agentPolicies.get(policy.agentId)!.push(policyWithId.id);
    return policyWithId;
  }

  /**
   * Check if agent has permission
   */
  hasPermission(agentId: string, resource: Resource, permission: Permission): boolean {
    const policyIds = this.agentPolicies.get(agentId) || [];

    for (const policyId of policyIds) {
      const policy = this.policies.get(policyId);
      if (!policy || !policy.isActive) continue;

      // Check if policy has expired
      if (policy.expiresAt && Date.now() > policy.expiresAt) continue;

      // Check resource and permission match
      if (policy.resource === resource && policy.permissions.includes(permission)) {
        // Check constraints
        if (this.checkConstraints(policy.constraints || [])) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Check policy constraints
   */
  private checkConstraints(constraints: PolicyConstraint[]): boolean {
    for (const constraint of constraints) {
      switch (constraint.type) {
        case 'time_based':
          // Check if current time is within allowed window
          const hours = constraint.value as number;
          const now = new Date();
          if (hours && (now.getHours() < 0 || now.getHours() >= hours)) {
            return false;
          }
          break;

        case 'rate_limited':
          // Rate limiting would be checked against actual usage
          break;

        case 'ip_restricted':
          // IP restriction would be checked against request source
          break;

        case 'data_limited':
          // Data limit would be checked against usage
          break;
      }
    }

    return true;
  }

  /**
   * Request access
   */
  requestAccess(agentId: string, resource: Resource, permission: Permission): AccessRequest {
    const request: AccessRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      agentId,
      resource,
      permission,
      timestamp: Date.now(),
      approved: this.hasPermission(agentId, resource, permission),
    };

    this.accessRequests.set(request.id, request);
    this.accessLog.push(request);

    return request;
  }

  /**
   * Grant access
   */
  grantAccess(agentId: string, resource: Resource, permission: Permission, expiresAt?: number): PermissionPolicy {
    return this.createPolicy({
      name: `${resource}_${permission}`,
      description: `Grant ${permission} access to ${resource}`,
      agentId,
      resource,
      permissions: [permission],
      isActive: true,
      expiresAt,
    });
  }

  /**
   * Revoke access
   */
  revokeAccess(policyId: string): boolean {
    const policy = this.policies.get(policyId);
    if (!policy) return false;

    policy.isActive = false;
    return true;
  }

  /**
   * Get agent policies
   */
  getAgentPolicies(agentId: string): PermissionPolicy[] {
    const policyIds = this.agentPolicies.get(agentId) || [];
    return policyIds
      .map(id => this.policies.get(id))
      .filter((p): p is PermissionPolicy => !!p);
  }

  /**
   * Get access log
   */
  getAccessLog(agentId?: string, limit?: number): AccessRequest[] {
    let logs = this.accessLog;

    if (agentId) {
      logs = logs.filter(l => l.agentId === agentId);
    }

    if (limit) {
      logs = logs.slice(-limit);
    }

    return logs;
  }

  /**
   * Get denied access attempts
   */
  getDeniedAccess(agentId?: string): AccessRequest[] {
    let denied = this.accessLog.filter(l => !l.approved);

    if (agentId) {
      denied = denied.filter(l => l.agentId === agentId);
    }

    return denied;
  }

  /**
   * Get policy
   */
  getPolicy(policyId: string): PermissionPolicy | undefined {
    return this.policies.get(policyId);
  }

  /**
   * Delete policy
   */
  deletePolicy(policyId: string): boolean {
    const policy = this.policies.get(policyId);
    if (!policy) return false;

    const agentPolicies = this.agentPolicies.get(policy.agentId);
    if (agentPolicies) {
      const index = agentPolicies.indexOf(policyId);
      if (index >= 0) agentPolicies.splice(index, 1);
    }

    return this.policies.delete(policyId);
  }
}

export default PermissionManager;
