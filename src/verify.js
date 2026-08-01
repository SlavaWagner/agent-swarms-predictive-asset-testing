import chalk from 'chalk';
import { getAgent, listAgents, initStorage } from './storage.js';
import DecisionMatrix from './scoring/DecisionMatrix.js';
import AgentSwarm from './agents/AgentSwarm.js';
import PreproductionAgent from './agents/PreproductionAgent.js';

initStorage();

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(chalk.green(`  ✔ PASSED: ${message}`));
    passedTests++;
  } else {
    console.log(chalk.red(`  ✖ FAILED: ${message}`));
    failedTests++;
  }
}

async function runTests() {
  console.log(chalk.bold.cyan('\n=== Run local verification tests ===\n'));

  // Test 1: Storage Initialization & Agent configs
  try {
    console.log(chalk.yellow('Test 1: Agent Loader and Config Storage...'));
    const agents = listAgents();
    assert(agents.length >= 2, `Expected at least 2 default agents, found ${agents.length}`);
    
    const preproduction = getAgent('preproduction');
    assert(preproduction !== null, 'Should be able to load preproduction agent config');
    assert(preproduction.name === 'preproduction', `Expected agent name "preproduction", got "${preproduction?.name}"`);

    const agentSwarm = getAgent('agent_swarm');
    assert(agentSwarm !== null, 'Should be able to load agent_swarm config');
    assert(agentSwarm.name === 'agent_swarm', `Expected agent name "agent_swarm", got "${agentSwarm?.name}"`);
  } catch (err) {
    assert(false, `Test 1 failed with error: ${err.message}`);
  }

  // Test 2: AI Asset Decision Matrix Scoring
  try {
    console.log(chalk.yellow('\nTest 2: AI Asset Decision Matrix Scoring...'));
    const matrix = new DecisionMatrix();
    const result = matrix.evaluateScores({
      conversion: 8.5,
      audience: 8.0,
      hook: 7.5,
      tension: 7.0,
      sentiment: 6.5
    });

    assert(result.weighted_score >= 7.5, `Expected weighted score >= 7.5, got ${result.weighted_score}`);
    assert(result.grade === 'A' || result.grade === 'B', `Expected Grade A or B, got Grade ${result.grade}`);
  } catch (err) {
    assert(false, `Test 2 failed with error: ${err.message}`);
  }

  // Test 3: 20-Agent Swarm Persona Setup
  try {
    console.log(chalk.yellow('\nTest 3: 20-Agent Swarm Setup...'));
    const swarm = new AgentSwarm();
    assert(swarm.personas.length === 20, `Expected 20 personas, found ${swarm.personas.length}`);
    assert(swarm.personas[0].id === 'SWARM-01', 'First persona should be SWARM-01');
    assert(swarm.personas[19].id === 'SWARM-20', 'Last persona should be SWARM-20');
  } catch (err) {
    assert(false, `Test 3 failed with error: ${err.message}`);
  }

  // Test 4: Preproduction Mass Asset Generator
  try {
    console.log(chalk.yellow('\nTest 4: Preproduction Mass Asset Generation...'));
    const preprod = new PreproductionAgent();
    const report = await preprod.preproduceAdAlternatives({
      count: 50,
      track: 'RSA',
      runSwarmTest: false
    });

    assert(report.totalGenerated === 50, `Expected 50 generated ads, got ${report.totalGenerated}`);
    assert(report.allAlternatives.length === 50, 'All alternatives array should contain 50 items');
    assert(report.allAlternatives[0].headlines.length === 15, 'RSA should have 15 headlines');
    assert(report.allAlternatives[0].descriptions.length === 4, 'RSA should have 4 descriptions');
  } catch (err) {
    assert(false, `Test 4 failed with error: ${err.message}`);
  }

  console.log(chalk.bold.cyan('\n=== Test Summary ==='));
  console.log(chalk.green(`Passed: ${passedTests}`));
  if (failedTests > 0) {
    console.log(chalk.red(`Failed: ${failedTests}`));
    process.exit(1);
  } else {
    console.log(chalk.bold.green('All tests passed successfully!\n'));
  }
}

runTests();
