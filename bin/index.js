#!/usr/bin/env node

import { Command } from 'commander';
import { input, select } from '@inquirer/prompts';
import chalk from 'chalk';
import http from 'http';
import { URL, fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

import { getConfig, saveConfig } from '../src/config.js';
import { listAgents, getAgent, saveAgent, saveRunLog, initStorage } from '../src/storage.js';
import BaseAgent from '../src/agents/BaseAgent.js';
import PreproductionAgent from '../src/agents/PreproductionAgent.js';
import AgentSwarm from '../src/agents/AgentSwarm.js';

// Initialize storage folders and default agent configurations
initStorage();

function getAsciiLogo() {
  const greenCube = chalk.hex('#1dd900');
  const cyanCube = chalk.hex('#06b6d4');
  const blueCube = chalk.hex('#4064d7');
  
  return [
    '',
    greenCube("             +---+ ") + cyanCube("     +---+ ") + blueCube("     +---+ "),
    greenCube("            /   /| ") + cyanCube("    /   /| ") + blueCube("    /   /| "),
    greenCube("           +---+ | ") + cyanCube("  +---+ | ") + blueCube("  +---+ | "),
    greenCube("           |   |/  ") + cyanCube("  |   |/  ") + blueCube("  |   |/  "),
    greenCube("           +---+   ") + cyanCube("  +---+   ") + blueCube("  +---+   "),
    blueCube("     +---+ ") + greenCube("     +---+ ") + blueCube("     +---+ "),
    blueCube("    /   /| ") + greenCube("    /   /| ") + blueCube("    /   /| "),
    blueCube("   +---+ | ") + greenCube("  +---+ | ") + blueCube("  +---+ | "),
    blueCube("   |   |/  ") + cyanCube("  |   |/  ") + blueCube("  |   |/  "),
    blueCube("   +---+   ") + greenCube("  +---+   ") + blueCube("  +---+   "),
    cyanCube("     +---+ ") + blueCube("     +---+ ") + greenCube("     +---+ "),
    cyanCube("    /   /| ") + blueCube("    /   /| ") + greenCube("    /   /| "),
    cyanCube("   +---+ | ") + blueCube("  +---+ | ") + greenCube("  +---+ | "),
    cyanCube("   |   |/  ") + blueCube("  |   |/  ") + greenCube("  |   |/  "),
    cyanCube("   +---+   ") + blueCube("  +---+   ") + blueCube("  +---+   "),
    '',
    chalk.bold.green('=== Agents Swarms for Predictive Asset Testing ==='),
    chalk.cyan('Predictive Creative Optimization Prior to Google Ads Launch'),
    chalk.gray('This AI Agent was created with the help of Google Antigravity CLI'),
    ''
  ].join('\n');
}

const program = new Command();

program
  .name('agent-swarms-predictive-asset-testing')
  .description('Standalone AI Agent Swarms for Predictive Asset Testing & Pre-production')
  .version('1.0.0');

program.addHelpText('before', getAsciiLogo());

// SETUP Command
program
  .command('setup')
  .description('Setup Gemini API Key and Default Campaign Settings')
  .action(async () => {
    console.log(chalk.bold.cyan('\n=== Agent Swarms Setup ===\n'));
    const current = getConfig();

    try {
      const geminiApiKey = await input({
        message: 'Gemini API Key (Optional, for live LLM Swarm Testing):',
        default: current.geminiApiKey || ''
      });

      const defaultTheme = await input({
        message: 'Default Campaign Theme:',
        default: current.defaultTheme || 'Immobilien & High-Price Lead Gen'
      });

      const defaultUrl = await input({
        message: 'Default Landing Page URL:',
        default: current.defaultUrl || 'https://www.slavawagner.de'
      });

      saveConfig({
        ...current,
        geminiApiKey,
        defaultTheme,
        defaultUrl
      });

      console.log(chalk.bold.green('\n✔ Setup completed successfully! Configurations saved to config.json.\n'));
    } catch (err) {
      console.error(chalk.red('✖ Setup failed:'), err.message);
    }
  });

// PREPRODUCE Command
program
  .command('preproduce')
  .alias('run')
  .description('Pre-produce 400 AI ad alternatives with Decision Matrix Scoring & 20-Agent Swarm Testing')
  .option('-t, --theme <topic>', 'Campaign focus theme / topic', 'Immobilien & High-Price Lead Gen')
  .option('-k, --track <type>', 'Campaign track (rsa or pmax)', 'rsa')
  .option('-c, --count <number>', 'Number of AI ad alternatives to generate', '400')
  .option('-u, --url <url>', 'Target landing page URL context', 'https://www.slavawagner.de')
  .option('-h, --headlines <items...>', 'Existing ad headlines to test against')
  .option('-d, --descriptions <items...>', 'Existing ad descriptions to test against')
  .option('--no-swarm', 'Skip 20-Agent Persona Swarm testing')
  .action(async (options) => {
    console.log(chalk.bold.cyan('\n=== Mass AI Ad Pre-production & 20-Agent Swarm Testing ===\n'));

    const count = parseInt(options.count, 10) || 400;
    const track = options.track.toUpperCase() === 'PMAX' ? 'PMAX' : 'RSA';
    const finalUrl = options.url || 'https://www.slavawagner.de';
    const theme = options.theme || 'Immobilien & High-Price Lead Gen';
    const runSwarm = options.swarm !== false;

    console.log(`Campaign Focus Theme:   ${chalk.bold.green(theme)}`);
    console.log(`Track:                  ${chalk.bold.green(track)}`);
    console.log(`Target Quantity:        ${chalk.bold.green(count)} AI Ad Alternatives`);
    console.log(`Landing Page URL:       ${chalk.bold.cyan(finalUrl)}`);
    console.log(`20-Agent Swarm Testing: ${runSwarm ? chalk.green('ENABLED') : chalk.gray('DISABLED')}\n`);

    if (options.headlines && options.headlines.length > 0) {
      console.log(chalk.yellow(`Baseline Input Headlines (${options.headlines.length}):`));
      options.headlines.forEach(h => console.log(chalk.gray(`  - "${h}"`)));
      console.log();
    }

    try {
      const agent = new PreproductionAgent();
      const report = await agent.preproduceAdAlternatives({
        targetAd: {
          headlines: options.headlines || [],
          descriptions: options.descriptions || []
        },
        finalUrl,
        track,
        count,
        runSwarmTest: runSwarm
      });

      console.log(chalk.bold.green('\n=== AI ASSET DECISION MATRIX SCORING SUMMARY ==='));
      console.log(`Grade A (PMF-Kandidaten / Skalieren):   ${chalk.bold.green(report.gradeCounts.A)}`);
      console.log(`Grade B (Testwürdig / Mehr Varianten):  ${chalk.bold.cyan(report.gradeCounts.B)}`);
      console.log(`Grade C (Grenzwertig / Low-Budget):     ${chalk.yellow(report.gradeCounts.C)}`);
      console.log(`Grade D (Noise / Kill):                ${chalk.red(report.gradeCounts.D)}`);
      console.log(`Top Candidate Ad ID:                    ${report.decisionMatrixSummary.topScoringAdId} (Score: ${report.decisionMatrixSummary.highestScore}/10)`);

      if (report.swarmPredictiveReport) {
        console.log(chalk.bold.magenta('\n=== 20-AGENT PERSONA SWARM STATEMENT & PREDICTIVE METRICS ==='));
        const swarm = report.swarmPredictiveReport;
        const winner = swarm.evaluatedCandidates[0];
        if (winner) {
          console.log(chalk.bold.green(`🏆 WINNER AD ALTERNATIVE TO LAUNCH: ${winner.candidateId}`));
          console.log(`   Matrix Grade & Score: Grade ${winner.matrixGrade} (${winner.matrixScore}/10)`);
          console.log(`   Swarm Approval Rate:  ${winner.swarmSummary.approvalRatePercent}% (${winner.swarmSummary.approvedAgentsCount}/20 Agents Approved)`);
          console.log(chalk.cyan(`   Proportionale Metriken-Prognose (Hochrechnung):`));
          console.log(`     - Ø CTR:  ${winner.swarmSummary.projectedMetrics.ctrPercent}%`);
          console.log(`     - Ø CPC:  €${winner.swarmSummary.projectedMetrics.cpcEuro}`);
          console.log(`     - Ø CPM:  €${winner.swarmSummary.projectedMetrics.cpmEuro}`);
          console.log(`     - Ø CPL:  €${winner.swarmSummary.projectedMetrics.costPerLeadEuro}`);

          console.log(chalk.bold.yellow('\n--- Outtake: Top Agent Statements (Sub-Audiences) ---'));
          winner.agentStatements.slice(0, 5).forEach(stmt => {
            console.log(chalk.bold.white(`• [${stmt.personaId}] ${stmt.personaName} (Score: ${stmt.score}/10):`));
            console.log(chalk.gray(`  ${stmt.statement}`));
            console.log(chalk.gray(`  [CTR: ${stmt.projectedCTR}% | CPC: €${stmt.projectedCPC} | CPM: €${stmt.projectedCPM} | CPL: €${stmt.projectedCPL}]`));
          });
        }
      }

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const projectRoot = path.resolve(__dirname, '..');
      const timestampStr = new Date().toISOString().replace(/[:.]/g, '-');
      const reportPath = path.resolve(projectRoot, `storage/runs/preproduction-report-${track.toLowerCase()}-${timestampStr}.json`);
      
      if (!fs.existsSync(path.dirname(reportPath))) {
        fs.mkdirSync(path.dirname(reportPath), { recursive: true });
      }

      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
      console.log(chalk.bold.green(`\n✔ Report & Asset Catalog saved persistently to:\n  ${reportPath}\n`));

    } catch (error) {
      console.error(chalk.bold.red('\n✖ Execution failed:'), error.message);
    }
  });

// SWARM-TEST Command
program
  .command('swarm-test')
  .description('Run 20-Agent Persona Swarm Predictive Testing on Ad Creatives')
  .option('-k, --track <type>', 'Campaign track (rsa or pmax)', 'rsa')
  .action(async (options) => {
    console.log(chalk.bold.cyan('\n=== 20-Agent Persona Swarm Predictive Testing ===\n'));
    const track = options.track.toUpperCase() === 'PMAX' ? 'PMAX' : 'RSA';

    try {
      const preprodAgent = new PreproductionAgent();
      console.log(chalk.yellow('Testing top candidate creatives with 20 sub-audience personas...'));
      await preprodAgent.preproduceAdAlternatives({
        track,
        count: 20,
        runSwarmTest: true
      });
      console.log(chalk.bold.green('\n✔ Swarm Testing completed successfully!\n'));
    } catch (error) {
      console.error(chalk.bold.red('\n✖ Swarm Test failed:'), error.message);
    }
  });

// DASHBOARD Command
program
  .command('dashboard')
  .description('Start Visual Web Dashboard Server')
  .option('-p, --port <number>', 'Port to run server on', '8080')
  .action((options) => {
    const port = parseInt(options.port, 10);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const projectRoot = path.resolve(__dirname, '..');

    const server = http.createServer((req, res) => {
      let safePath = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
      if (safePath === '/' || safePath === '\\') {
        safePath = '/index.html';
      }
      const filePath = path.join(projectRoot, safePath);

      const ext = path.extname(filePath).toLowerCase();
      let contentType = 'text/plain';
      if (ext === '.html') contentType = 'text/html; charset=utf-8';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.js') contentType = 'application/javascript';
      else if (ext === '.json') contentType = 'application/json';
      else if (ext === '.svg') contentType = 'image/svg+xml';

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 Not Found</h1>', 'utf-8');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    });

    server.listen(port, () => {
      console.log(chalk.bold.green(`\n✔ Dashboard server started on http://localhost:${port}`));
      console.log(chalk.gray('Press Ctrl+C to stop.\n'));
      const openCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
      exec(`${openCmd} http://localhost:${port}`, () => {});
    });
  });

// AGENT Command
const agentCmd = program.command('agent').description('Manage Persistent AI Agents');

agentCmd
  .command('list')
  .description('List all persistent AI agents')
  .action(() => {
    console.log(chalk.bold.cyan('\n=== Persistent AI Agents ===\n'));
    const agents = listAgents();
    agents.forEach(agent => {
      console.log(chalk.bold.green(`Name:   ${agent.name}`));
      console.log(`Role:   ${agent.role}`);
      console.log(`Prompt: ${agent.description}`);
      console.log(chalk.gray('---------------------------------------------'));
    });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log(getAsciiLogo());
  program.outputHelp();
}
