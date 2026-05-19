/**
 * Platform Integration
 * 
 * Manages 12-department ecosystem with cross-team collaboration
 */

export interface Department {
  id: string;
  name: string;
  budget: number;
  costCenter: string;
  roles: string[];
  complianceLevel: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED';
}

export interface CrossTeamWorkflow {
  id: string;
  name: string;
  sourceTeam: string;
  targetTeam: string;
  dataShared: string[];
  permissions: string[];
  auditRequired: boolean;
}

export interface DepartmentMetrics {
  departmentId: string;
  errorRate: number;
  uptime: number;
  costUsed: number;
  budgetRemaining: number;
}

export interface SecurityIncident {
  id: string;
  type: 'unauthorized_access' | 'data_breach' | 'policy_violation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  department: string;
  description: string;
  timestamp: number;
  resolved: boolean;
}

/**
 * @deprecated since=2026-05-18 reason="Rubric remnant from commit 365a298;
 *   not in replay path. Kept until baseline scoring confirms no
 *   consumers. Slated for deletion after MD12."
 *
 * PlatformIntegration - Manages 12-department ecosystem
 */
export class PlatformIntegration {
  private departments: Map<string, Department> = new Map();
  private workflows: Map<string, CrossTeamWorkflow> = new Map();
  private metrics: Map<string, DepartmentMetrics> = new Map();
  private incidents: SecurityIncident[] = [];

  private static readonly DEPARTMENTS = [
    { id: 'dept_eng', name: 'Engineering', budget: 500000, costCenter: 'CC-001', roles: ['admin', 'engineer', 'lead'], complianceLevel: 'INTERNAL' as const },
    { id: 'dept_product', name: 'Product Management', budget: 200000, costCenter: 'CC-002', roles: ['pm', 'analyst'], complianceLevel: 'INTERNAL' as const },
    { id: 'dept_analytics', name: 'Analytics', budget: 150000, costCenter: 'CC-003', roles: ['analyst', 'engineer'], complianceLevel: 'CONFIDENTIAL' as const },
    { id: 'dept_devops', name: 'DevOps/Infrastructure', budget: 300000, costCenter: 'CC-004', roles: ['devops', 'admin'], complianceLevel: 'RESTRICTED' as const },
    { id: 'dept_security', name: 'Security', budget: 250000, costCenter: 'CC-005', roles: ['security', 'admin'], complianceLevel: 'RESTRICTED' as const },
    { id: 'dept_data', name: 'Data Science', budget: 180000, costCenter: 'CC-006', roles: ['scientist', 'engineer'], complianceLevel: 'CONFIDENTIAL' as const },
    { id: 'dept_sales_eng', name: 'Sales Engineering', budget: 120000, costCenter: 'CC-007', roles: ['se', 'engineer'], complianceLevel: 'INTERNAL' as const },
    { id: 'dept_support', name: 'Support', budget: 100000, costCenter: 'CC-008', roles: ['support', 'lead'], complianceLevel: 'INTERNAL' as const },
    { id: 'dept_finance', name: 'Finance/Billing', budget: 80000, costCenter: 'CC-009', roles: ['finance', 'admin'], complianceLevel: 'RESTRICTED' as const },
    { id: 'dept_legal', name: 'Legal/Compliance', budget: 160000, costCenter: 'CC-010', roles: ['legal', 'compliance'], complianceLevel: 'RESTRICTED' as const },
    { id: 'dept_marketing', name: 'Marketing', budget: 140000, costCenter: 'CC-011', roles: ['marketer', 'analyst'], complianceLevel: 'INTERNAL' as const },
    { id: 'dept_ops', name: 'Operations', budget: 110000, costCenter: 'CC-012', roles: ['ops', 'admin'], complianceLevel: 'INTERNAL' as const },
  ];

  constructor() {
    this.initializeDepartments();
  }

  /**
   * Initialize all 12 departments
   */
  private initializeDepartments(): void {
    PlatformIntegration.DEPARTMENTS.forEach(dept => {
      this.departments.set(dept.id, dept as Department);
      this.metrics.set(dept.id, {
        departmentId: dept.id,
        errorRate: 0,
        uptime: 0.999,
        costUsed: 0,
        budgetRemaining: dept.budget,
      });
    });
  }

  /**
   * Get all departments
   */
  getDepartments(): Department[] {
    return Array.from(this.departments.values());
  }

  /**
   * Get department by ID
   */
  getDepartment(departmentId: string): Department | undefined {
    return this.departments.get(departmentId);
  }

  /**
   * Create cross-team workflow
   */
  createWorkflow(workflow: CrossTeamWorkflow): void {
    this.workflows.set(workflow.id, workflow);
  }

  /**
   * Get workflows
   */
  getWorkflows(): CrossTeamWorkflow[] {
    return Array.from(this.workflows.values());
  }

  /**
   * Verify data sharing permissions
   */
  canShareData(sourceDept: Department, targetDept: Department, dataClassification: string): boolean {
    // RESTRICTED data cannot leave RESTRICTED departments
    if (dataClassification === 'RESTRICTED' && sourceDept.complianceLevel === 'RESTRICTED') {
      return targetDept.complianceLevel === 'RESTRICTED';
    }

    // CONFIDENTIAL data can only go to CONFIDENTIAL or RESTRICTED
    if (dataClassification === 'CONFIDENTIAL') {
      return targetDept.complianceLevel === 'CONFIDENTIAL' || targetDept.complianceLevel === 'RESTRICTED';
    }

    return true;
  }

  /**
   * Update department metrics
   */
  updateMetrics(departmentId: string, metrics: Partial<DepartmentMetrics>): boolean {
    const current = this.metrics.get(departmentId);
    if (!current) return false;

    Object.assign(current, metrics);
    return true;
  }

  /**
   * Get department metrics
   */
  getMetrics(departmentId: string): DepartmentMetrics | undefined {
    return this.metrics.get(departmentId);
  }

  /**
   * Get all metrics
   */
  getAllMetrics(): DepartmentMetrics[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Record security incident
   */
  recordIncident(incident: Omit<SecurityIncident, 'id'>): SecurityIncident {
    const full: SecurityIncident = {
      id: `incident_${Date.now()}`,
      ...incident,
    };

    this.incidents.push(full);
    return full;
  }

  /**
   * Get incidents
   */
  getIncidents(): SecurityIncident[] {
    return [...this.incidents];
  }

  /**
   * Get incidents by department
   */
  getIncidentsByDepartment(departmentId: string): SecurityIncident[] {
    return this.incidents.filter(i => i.department === departmentId);
  }

  /**
   * Calculate total platform cost
   */
  calculateTotalCost(): number {
    return Array.from(this.metrics.values()).reduce((sum, m) => sum + m.costUsed, 0);
  }

  /**
   * Get budget status by department
   */
  getBudgetStatus(): Map<string, { used: number; remaining: number; percentage: number }> {
    const status = new Map<string, { used: number; remaining: number; percentage: number }>();

    this.metrics.forEach((metric, deptId) => {
      const dept = this.departments.get(deptId);
      if (dept) {
        const used = metric.costUsed;
        const remaining = metric.budgetRemaining;
        const percentage = (used / dept.budget) * 100;

        status.set(deptId, { used, remaining, percentage });
      }
    });

    return status;
  }
}

export default PlatformIntegration;
