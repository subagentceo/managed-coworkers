/**
 * Cloud Environment Setup
 * 
 * Configure and manage cloud environments for agent execution
 */

export interface EnvironmentConfig {
  id: string;
  name: string;
  provider: 'docker' | 'kubernetes' | 'lambda' | 'cloud_run';
  region?: string;
  computeResources: ComputeResources;
  networkConfig: NetworkConfig;
  status: 'active' | 'inactive' | 'provisioning' | 'error';
}

export interface ComputeResources {
  cpu: string; // e.g., "1", "2", "2.5"
  memory: string; // e.g., "512Mi", "1Gi", "2Gi"
  disk: string; // e.g., "10Gi", "50Gi"
  gpuCount?: number;
  gpuType?: string; // e.g., "nvidia-tesla-t4"
}

export interface NetworkConfig {
  vpcId?: string;
  subnetId?: string;
  securityGroups?: string[];
  allowPublicAccess: boolean;
  ports: Map<string, number>;
}

export interface EnvironmentMetrics {
  environmentId: string;
  uptime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  lastUpdated: number;
}

/**
 * EnvironmentManager - Manages cloud environments for agent execution
 */
export class EnvironmentManager {
  private environments: Map<string, EnvironmentConfig> = new Map();
  private metrics: Map<string, EnvironmentMetrics> = new Map();

  /**
   * Create environment configuration
   */
  createEnvironment(config: Omit<EnvironmentConfig, 'id'>): EnvironmentConfig {
    const env: EnvironmentConfig = {
      id: `env_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      ...config,
    };

    this.environments.set(env.id, env);
    this.metrics.set(env.id, {
      environmentId: env.id,
      uptime: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      diskUsage: 0,
      lastUpdated: Date.now(),
    });

    return env;
  }

  /**
   * Get environment by ID
   */
  getEnvironment(environmentId: string): EnvironmentConfig | undefined {
    return this.environments.get(environmentId);
  }

  /**
   * List all environments
   */
  listEnvironments(): EnvironmentConfig[] {
    return Array.from(this.environments.values());
  }

  /**
   * Update environment status
   */
  updateStatus(environmentId: string, status: EnvironmentConfig['status']): boolean {
    const env = this.environments.get(environmentId);
    if (!env) return false;

    env.status = status;
    return true;
  }

  /**
   * Add port mapping
   */
  addPortMapping(environmentId: string, name: string, port: number): boolean {
    const env = this.environments.get(environmentId);
    if (!env) return false;

    env.networkConfig.ports.set(name, port);
    return true;
  }

  /**
   * Get metrics
   */
  getMetrics(environmentId: string): EnvironmentMetrics | undefined {
    return this.metrics.get(environmentId);
  }

  /**
   * Update metrics
   */
  updateMetrics(environmentId: string, updates: Partial<EnvironmentMetrics>): boolean {
    const metric = this.metrics.get(environmentId);
    if (!metric) return false;

    Object.assign(metric, updates, { lastUpdated: Date.now() });
    return true;
  }

  /**
   * Check environment health
   */
  checkHealth(environmentId: string): { healthy: boolean; issues: string[] } {
    const env = this.environments.get(environmentId);
    if (!env) return { healthy: false, issues: ['Environment not found'] };

    const issues: string[] = [];

    if (env.status === 'error') {
      issues.push('Environment in error state');
    }

    const metrics = this.metrics.get(environmentId);
    if (metrics) {
      if (metrics.cpuUsage > 90) {
        issues.push('High CPU usage');
      }
      if (metrics.memoryUsage > 90) {
        issues.push('High memory usage');
      }
      if (metrics.diskUsage > 85) {
        issues.push('Low disk space');
      }
    }

    return {
      healthy: issues.length === 0,
      issues,
    };
  }

  /**
   * Validate compute resources
   */
  validateResources(resources: ComputeResources): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate CPU
    const cpuValue = parseFloat(resources.cpu);
    if (isNaN(cpuValue) || cpuValue <= 0) {
      errors.push('Invalid CPU value');
    }

    // Validate memory
    const memoryPattern = /^(\d+)(Mi|Gi|Ti)?$/;
    if (!memoryPattern.test(resources.memory)) {
      errors.push('Invalid memory format (use e.g., 512Mi, 1Gi)');
    }

    // Validate disk
    if (!memoryPattern.test(resources.disk)) {
      errors.push('Invalid disk format (use e.g., 10Gi, 50Gi)');
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Delete environment
   */
  deleteEnvironment(environmentId: string): boolean {
    this.metrics.delete(environmentId);
    return this.environments.delete(environmentId);
  }
}

export default EnvironmentManager;
