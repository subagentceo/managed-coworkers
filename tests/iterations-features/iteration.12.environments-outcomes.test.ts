/**
 * ITERATION 12: Cloud Environments & Outcomes
 * 
 * Tests for cloud environment setup and agent outcome tracking
 * 
 * References:
 * - https://platform.claude.com/docs/en/managed-agents/environments.md
 * - https://platform.claude.com/docs/en/managed-agents/cloud-containers.md
 * - https://platform.claude.com/docs/en/managed-agents/define-outcomes.md
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { EnvironmentManager } from '../src/environments';
import { OutcomeManager } from '../src/outcomes';

describe('Iteration 12: Cloud Environments & Outcomes', () => {
  let envManager: EnvironmentManager;
  let outcomeManager: OutcomeManager;
  const testResults: Map<string, number> = new Map();

  beforeAll(() => {
    envManager = new EnvironmentManager();
    outcomeManager = new OutcomeManager();
  });

  describe('12.1: Cloud Environments', () => {
    it('should create Docker environment', () => {
      const env = envManager.createEnvironment({
        name: 'Docker Dev',
        provider: 'docker',
        computeResources: {
          cpu: '2',
          memory: '2Gi',
          disk: '20Gi',
        },
        networkConfig: {
          allowPublicAccess: false,
          ports: new Map([['http', 8080], ['https', 8443]]),
        },
      });

      expect(env.provider).toBe('docker');
      expect(env.status).toBe('active');
      testResults.set('OTC-12-1.1', 1);
    });

    it('should create Kubernetes environment', () => {
      const env = envManager.createEnvironment({
        name: 'K8s Prod',
        provider: 'kubernetes',
        region: 'us-west-2',
        computeResources: {
          cpu: '4',
          memory: '8Gi',
          disk: '100Gi',
          gpuCount: 1,
          gpuType: 'nvidia-tesla-v100',
        },
        networkConfig: {
          vpcId: 'vpc-123',
          securityGroups: ['sg-prod'],
          allowPublicAccess: true,
          ports: new Map([['api', 443]]),
        },
      });

      expect(env.provider).toBe('kubernetes');
      expect(env.computeResources.gpuCount).toBe(1);
      testResults.set('OTC-12-1.2', 1);
    });

    it('should validate compute resources', () => {
      const resources = {
        cpu: '2',
        memory: '4Gi',
        disk: '50Gi',
      };

      const result = envManager.validateResources(resources);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);

      testResults.set('OTC-12-1.3', 1);
    });

    it('should update environment status', () => {
      const env = envManager.createEnvironment({
        name: 'Status Test',
        provider: 'docker',
        computeResources: { cpu: '1', memory: '1Gi', disk: '10Gi' },
        networkConfig: { allowPublicAccess: false, ports: new Map() },
      });

      const updated = envManager.updateStatus(env.id, 'provisioning');
      expect(updated).toBe(true);

      const retrieved = envManager.getEnvironment(env.id);
      expect(retrieved?.status).toBe('provisioning');

      testResults.set('OTC-12-1.4', 1);
    });

    it('should check environment health', () => {
      const env = envManager.createEnvironment({
        name: 'Health Check',
        provider: 'docker',
        computeResources: { cpu: '1', memory: '1Gi', disk: '10Gi' },
        networkConfig: { allowPublicAccess: false, ports: new Map() },
      });

      const health = envManager.checkHealth(env.id);
      expect(health.healthy).toBeDefined();
      expect(health.issues).toBeDefined();

      testResults.set('OTC-12-1.5', 1);
    });

    it('should track environment metrics', () => {
      const env = envManager.createEnvironment({
        name: 'Metrics Test',
        provider: 'docker',
        computeResources: { cpu: '1', memory: '1Gi', disk: '10Gi' },
        networkConfig: { allowPublicAccess: false, ports: new Map() },
      });

      envManager.updateMetrics(env.id, {
        cpuUsage: 45,
        memoryUsage: 60,
        diskUsage: 30,
        uptime: 3600,
      });

      const metrics = envManager.getMetrics(env.id);
      expect(metrics?.cpuUsage).toBe(45);

      testResults.set('OTC-12-1.6', 1);
    });
  });

  describe('12.2: Agent Outcomes', () => {
    it('should define outcome', () => {
      const outcome = outcomeManager.defineOutcome({
        name: 'Response Accuracy',
        description: 'Agent provides accurate responses',
        successCriteria: ['factual', 'complete', 'relevant'],
        weight: 0.5,
        measurable: true,
        evaluationType: 'score',
      });

      expect(outcome).toBeDefined();
      expect(outcome.weight).toBe(0.5);
      testResults.set('OTC-12-2.1', 1);
    });

    it('should assign outcome to agent', () => {
      const outcome = outcomeManager.defineOutcome({
        name: 'Test Outcome',
        description: 'Test',
        successCriteria: ['test'],
        weight: 1,
        measurable: true,
        evaluationType: 'binary',
      });

      const assigned = outcomeManager.assignOutcomeToAgent('agent_001', outcome.id);
      expect(assigned).toBe(true);

      const agentOutcomes = outcomeManager.getAgentOutcomes('agent_001');
      expect(agentOutcomes.length).toBeGreaterThan(0);

      testResults.set('OTC-12-2.2', 1);
    });

    it('should record outcome result', () => {
      const outcome = outcomeManager.defineOutcome({
        name: 'Result Test',
        description: 'Test',
        successCriteria: ['test'],
        weight: 1,
        measurable: true,
        evaluationType: 'score',
      });

      outcomeManager.assignOutcomeToAgent('agent_002', outcome.id);

      const result = outcomeManager.recordResult({
        outcomeId: outcome.id,
        agentId: 'agent_002',
        sessionId: 'sess_001',
        achieved: true,
        score: 0.95,
        evidence: { metric: 'accuracy', value: 95 },
        evaluatedBy: 'auto',
      });

      expect(result.score).toBe(0.95);
      expect(result.achieved).toBe(true);

      testResults.set('OTC-12-2.3', 1);
    });

    it('should calculate composite score', () => {
      const outcome1 = outcomeManager.defineOutcome({
        name: 'Speed',
        description: 'Response speed',
        successCriteria: ['fast'],
        weight: 0.3,
        measurable: true,
        evaluationType: 'score',
      });

      const outcome2 = outcomeManager.defineOutcome({
        name: 'Accuracy',
        description: 'Accuracy',
        successCriteria: ['accurate'],
        weight: 0.7,
        measurable: true,
        evaluationType: 'score',
      });

      outcomeManager.assignOutcomeToAgent('agent_003', outcome1.id);
      outcomeManager.assignOutcomeToAgent('agent_003', outcome2.id);

      outcomeManager.recordResult({
        outcomeId: outcome1.id,
        agentId: 'agent_003',
        sessionId: 'sess_002',
        achieved: true,
        score: 0.8,
        evidence: {},
        evaluatedBy: 'auto',
      });

      outcomeManager.recordResult({
        outcomeId: outcome2.id,
        agentId: 'agent_003',
        sessionId: 'sess_002',
        achieved: true,
        score: 0.9,
        evidence: {},
        evaluatedBy: 'auto',
      });

      const composite = outcomeManager.calculateCompositeScore('agent_003', 'sess_002');
      expect(composite.compositeScore).toBeCloseTo(0.87, 1);
      expect(composite.gradeLevel).toBe('B');

      testResults.set('OTC-12-2.4', 1);
    });

    it('should convert score to grade', () => {
      const outcome = outcomeManager.defineOutcome({
        name: 'Grade Test',
        description: 'Test',
        successCriteria: [],
        weight: 1,
        measurable: true,
        evaluationType: 'score',
      });

      outcomeManager.assignOutcomeToAgent('agent_004', outcome.id);

      outcomeManager.recordResult({
        outcomeId: outcome.id,
        agentId: 'agent_004',
        sessionId: 'sess_003',
        achieved: true,
        score: 0.98,
        evidence: {},
        evaluatedBy: 'auto',
      });

      const composite = outcomeManager.calculateCompositeScore('agent_004', 'sess_003');
      expect(composite.gradeLevel).toBe('A');

      testResults.set('OTC-12-2.5', 1);
    });

    it('should list outcome results', () => {
      const outcome = outcomeManager.defineOutcome({
        name: 'Results List Test',
        description: 'Test',
        successCriteria: [],
        weight: 1,
        measurable: true,
        evaluationType: 'score',
      });

      outcomeManager.recordResult({
        outcomeId: outcome.id,
        agentId: 'agent_005',
        sessionId: 'sess_004',
        achieved: true,
        score: 0.85,
        evidence: {},
        evaluatedBy: 'auto',
      });

      const results = outcomeManager.getOutcomeResults(outcome.id);
      expect(results.length).toBeGreaterThan(0);

      testResults.set('OTC-12-2.6', 1);
    });
  });

  afterAll(() => {
    console.log('\n=== ITERATION 12 RESULTS ===');
    let passed = 0;
    testResults.forEach((score, criterion) => {
      if (score > 0) {
        console.log(`✅ ${criterion}: PASS`);
        passed++;
      }
    });
    console.log(`Pass rate: ${passed}/${testResults.size} (${((passed / testResults.size) * 100).toFixed(1)}%)`);
  });
});
