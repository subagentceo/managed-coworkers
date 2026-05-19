/**
 * Agent Skills
 * 
 * Define and manage agent capabilities/skills
 */

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  enabled: boolean;
  requiredTools: string[];
  estimatedCost: number;
}

export interface SkillExecution {
  id: string;
  skillId: string;
  agentId: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  inputs: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  error?: string;
  startTime: number;
  endTime?: number;
}

export interface SkillCatalog {
  agentId: string;
  skills: Skill[];
  totalCost: number;
  lastUpdated: number;
}

/**
 * @deprecated since=2026-05-18 reason="Rubric remnant from commit 365a298;
 *   not in replay path. Kept until baseline scoring confirms no
 *   consumers. Slated for deletion after MD12."
 *
 * SkillManager - Manages agent skills and capabilities
 */
export class SkillManager {
  private skills: Map<string, Skill> = new Map();
  private agentSkills: Map<string, string[]> = new Map(); // agentId -> skillIds
  private skillExecutions: Map<string, SkillExecution> = new Map();

  /**
   * Create skill
   */
  createSkill(skill: Omit<Skill, 'id'>): Skill {
    const skillWithId: Skill = {
      id: `skill_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      ...skill,
    };

    this.skills.set(skillWithId.id, skillWithId);
    return skillWithId;
  }

  /**
   * Install skill on agent
   */
  installSkill(agentId: string, skillId: string): boolean {
    if (!this.skills.has(skillId)) return false;

    if (!this.agentSkills.has(agentId)) {
      this.agentSkills.set(agentId, []);
    }

    const agentSkillIds = this.agentSkills.get(agentId)!;
    if (!agentSkillIds.includes(skillId)) {
      agentSkillIds.push(skillId);
    }

    return true;
  }

  /**
   * Uninstall skill from agent
   */
  uninstallSkill(agentId: string, skillId: string): boolean {
    const agentSkillIds = this.agentSkills.get(agentId);
    if (!agentSkillIds) return false;

    const index = agentSkillIds.indexOf(skillId);
    if (index >= 0) {
      agentSkillIds.splice(index, 1);
      return true;
    }

    return false;
  }

  /**
   * Get agent skills
   */
  getAgentSkills(agentId: string): Skill[] {
    const skillIds = this.agentSkills.get(agentId) || [];
    return skillIds
      .map(id => this.skills.get(id))
      .filter((s): s is Skill => !!s && s.enabled);
  }

  /**
   * Execute skill
   */
  async executeSkill(agentId: string, skillId: string, inputs: Record<string, unknown>): Promise<SkillExecution> {
    const skill = this.skills.get(skillId);
    if (!skill) throw new Error(`Skill not found: ${skillId}`);

    const execution: SkillExecution = {
      id: `exec_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      skillId,
      agentId,
      status: 'executing',
      inputs,
      startTime: Date.now(),
    };

    this.skillExecutions.set(execution.id, execution);

    // Simulate skill execution
    try {
      execution.outputs = {
        result: `Executed skill ${skill.name}`,
        inputCount: Object.keys(inputs).length,
      };
      execution.status = 'completed';
    } catch (error) {
      execution.status = 'failed';
      execution.error = String(error);
    }

    execution.endTime = Date.now();
    return execution;
  }

  /**
   * Get skill by ID
   */
  getSkill(skillId: string): Skill | undefined {
    return this.skills.get(skillId);
  }

  /**
   * List all skills
   */
  listSkills(): Skill[] {
    return Array.from(this.skills.values());
  }

  /**
   * Get skills by category
   */
  getSkillsByCategory(category: string): Skill[] {
    return Array.from(this.skills.values()).filter(s => s.category === category);
  }

  /**
   * Enable skill
   */
  enableSkill(skillId: string): boolean {
    const skill = this.skills.get(skillId);
    if (!skill) return false;

    skill.enabled = true;
    return true;
  }

  /**
   * Disable skill
   */
  disableSkill(skillId: string): boolean {
    const skill = this.skills.get(skillId);
    if (!skill) return false;

    skill.enabled = false;
    return true;
  }

  /**
   * Get agent skill catalog
   */
  getAgentCatalog(agentId: string): SkillCatalog {
    const skills = this.getAgentSkills(agentId);
    const totalCost = skills.reduce((sum, s) => sum + s.estimatedCost, 0);

    return {
      agentId,
      skills,
      totalCost,
      lastUpdated: Date.now(),
    };
  }

  /**
   * Get skill execution
   */
  getExecution(executionId: string): SkillExecution | undefined {
    return this.skillExecutions.get(executionId);
  }

  /**
   * Get agent skill executions
   */
  getAgentExecutions(agentId: string): SkillExecution[] {
    return Array.from(this.skillExecutions.values()).filter(e => e.agentId === agentId);
  }
}

export default SkillManager;
