import BaseAgent from './BaseAgent.js';
import { generateText } from '../gemini.js';
import { getConfig } from '../config.js';

// 5 Core Persona Archetypes matching Make.com Agent Swarm Architecture
export const DEFAULT_ENGLISH_PERSONAS = [
  {
    id: 'SWARM-01',
    name: 'Walter (54, Skeptical Quality Auditor & Engineer)',
    role: 'Risk-Averse Quality Controller & Engineer',
    focus: 'Transparency, Exact Numbers, Proven Evidence & Anti-Hype',
    mindset: 'Allergic to typical AI marketing buzzwords ("simple", "instant", "the best solution"). Demands hard data, exact percentages, methods, and regulatory compliance. Drops tension curve on empty claims.'
  },
  {
    id: 'SWARM-02',
    name: 'Christian (48, Yield & ROI Investor)',
    role: 'Economic Decision Maker & Financial Strategist',
    focus: 'Cashflow, Net Margin, Scalability & Measurable ROI',
    mindset: 'No patience for lifestyle fluff. Pure bottom-line focus: What is the net return? Evaluates whether economic advantages, cost/time savings, and asset appreciation are communicated clearly.'
  },
  {
    id: 'SWARM-03',
    name: 'Jonas (33, Tech Founder & Automation Lead)',
    role: 'Scaling Founder & Systems Architect',
    focus: 'Asymmetrical Leverage, Automation & Maximum Time Efficiency',
    mindset: 'Rejects sluggish, conservative agencies. Strongly triggered by metaphors like "Asymmetrical Leverage", "Autopilot", and "Autonomous Pipeline". Demands modern, forward-thinking execution.'
  },
  {
    id: 'SWARM-04',
    name: 'Sarah (32, Trust & Family Customer)',
    role: 'Family Decision Maker & Security-Focused Buyer',
    focus: 'Security, Proven Protection, Transparent Pricing & Reliability',
    mindset: 'Fears hidden fees, unfair clauses, and aggressive sales pitches. Responds positively to keywords like "Security", "Guaranteed", "Fixed Price", "Tested", and clear upfront transparency.'
  },
  {
    id: 'SWARM-05',
    name: 'Alexander (46, Premium & High-End Buyer)',
    role: 'High-Net-Worth Executive & Status Buyer',
    focus: 'Exclusivity, First-Class Quality, Discretion & Prestige',
    mindset: 'Repelled by discount codes and cheap bargain-basement claims. Demands elite distinction, bespoke quality, and premium brand tone.'
  }
];

export const SWARM_PERSONAS = DEFAULT_ENGLISH_PERSONAS;

export default class AgentSwarm extends BaseAgent {
  constructor() {
    super('agent_swarm');
    this.personas = [...DEFAULT_ENGLISH_PERSONAS];
    this.currentOffer = 'General Offer';
    this.currentIndustry = 'General Industry';
    this.currentAudience = 'Target Customers';
  }

  /**
   * Derives offer, industry, and target audience from ad copy assets, theme, or context.
   */
  deriveOfferAndAudience(adContext = {}) {
    let textToAnalyze = '';

    if (adContext.headlines && Array.isArray(adContext.headlines)) {
      textToAnalyze += adContext.headlines.join(' ') + ' ';
    }
    if (adContext.descriptions && Array.isArray(adContext.descriptions)) {
      textToAnalyze += adContext.descriptions.join(' ') + ' ';
    }
    if (adContext.theme) {
      textToAnalyze += adContext.theme + ' ';
    }
    if (adContext.contextIndustry) {
      textToAnalyze += adContext.contextIndustry + ' ';
    }

    let offer = adContext.offer || '';
    let industry = adContext.industry || adContext.contextIndustry || adContext.theme || '';
    let targetAudience = adContext.targetAudience || '';

    // Infer Industry if generic
    if (!industry || industry === 'Immobilien & High-Price Lead Gen') {
      const lower = textToAnalyze.toLowerCase();
      if (lower.includes('saas') || lower.includes('software') || lower.includes('b2b')) {
        industry = 'B2B Software & Tech Services';
      } else if (lower.includes('finance') || lower.includes('refinanc') || lower.includes('loan') || lower.includes('bank') || lower.includes('kredit')) {
        industry = 'Financial Services & Capital Management';
      } else if (lower.includes('e-commerce') || lower.includes('shop') || lower.includes('store')) {
        industry = 'E-Commerce & DTC Retail';
      } else if (lower.includes('immo') || lower.includes('estate') || lower.includes('haus') || lower.includes('wohnung') || lower.includes('rendite')) {
        industry = 'Real Estate & High-Ticket Investments';
      } else {
        industry = adContext.theme || 'Performance Marketing & Lead Gen';
      }
    }

    // Infer Offer if not set
    if (!offer) {
      if (adContext.headlines && adContext.headlines.length > 0) {
        offer = adContext.headlines.slice(0, 3).join(' | ');
      } else if (adContext.theme) {
        offer = `${adContext.theme} Solution`;
      } else {
        offer = 'High-Value Product / Service Offer';
      }
    }

    // Infer Target Audience if not set
    if (!targetAudience) {
      const lowerInd = industry.toLowerCase();
      if (lowerInd.includes('b2b') || lowerInd.includes('software')) {
        targetAudience = 'B2B Executives, Founders & Operations Directors';
      } else if (lowerInd.includes('real estate') || lowerInd.includes('immo')) {
        targetAudience = 'High-Net-Worth Investors, Homebuyers & Property Owners';
      } else if (lowerInd.includes('finance') || lowerInd.includes('capital')) {
        targetAudience = 'Investors, Asset Managers & Capital Allocators';
      } else {
        targetAudience = 'Target Buyers & Decision Makers';
      }
    }

    return { offer, industry, targetAudience };
  }

  /**
   * Generates or calibrates the 5 Core Persona Agents matching Make.com architecture.
   */
  async generateDynamicPersonas(adContext = {}, apiKey = null) {
    const { offer, industry, targetAudience } = this.deriveOfferAndAudience(adContext);
    this.currentOffer = offer;
    this.currentIndustry = industry;
    this.currentAudience = targetAudience;

    this.log(`Calibrating 5 Core Swarm Agents (Make.com Architecture)...`);
    this.log(`  Derived Industry: ${industry}`);
    this.log(`  Derived Offer:    ${offer}`);
    this.log(`  Target Audience:  ${targetAudience}`);

    const config = getConfig();
    const activeApiKey = apiKey || config.geminiApiKey;

    if (activeApiKey) {
      try {
        const personas = await this.generatePersonasWithLLM(activeApiKey, offer, industry, targetAudience, adContext);
        if (personas && personas.length === 5) {
          this.personas = personas;
          this.log(`[SUCCESS] LLM calibrated 5 Persona Agents tailored to offer & branding!`);
          return this.personas;
        }
      } catch (err) {
        this.log(`Notice: LLM persona calibration fallback (${err.message}). Using 5 Make.com Core Archetypes.`);
      }
    }

    this.personas = this.generatePersonasFallback(offer, industry, targetAudience);
    this.log(`[OK] Loaded 5 Core Persona Agents tailored to "${offer}".`);
    return this.personas;
  }

  async generatePersonasWithLLM(apiKey, offer, industry, targetAudience, adContext) {
    const systemPrompt = `
You are an AI Agent Swarm Architect calibrating a 5-Agent Swarm for predictive ad testing.
Your job is to tailor the 5 Core Personas (Walter, Christian, Jonas, Sarah, Alexander) specifically to:
- Industry: ${industry}
- Offer: ${offer}
- Target Audience: ${targetAudience}

The 5 Personas must be:
1. SWARM-01: Walter (54, Skeptical Quality Auditor & Engineer)
2. SWARM-02: Christian (48, Yield & ROI Investor)
3. SWARM-03: Jonas (33, Tech Founder & Automation Lead)
4. SWARM-04: Sarah (32, Trust & Family Customer)
5. SWARM-05: Alexander (46, Premium & High-End Buyer)

Return ONLY a valid JSON array of exactly 5 persona objects with keys: id, name, role, focus, mindset.
`;

    const sampleHeadlines = (adContext.headlines || []).slice(0, 5).join(' | ');
    const userPrompt = `Headlines context: ${sampleHeadlines}. Tailor the 5 personas to ${offer} in JSON.`;

    const rawText = await generateText(apiKey, systemPrompt, userPrompt, this.model, true);
    let cleanJson = rawText.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```(json)?/i, '').replace(/```$/, '').trim();
    }
    const parsed = JSON.parse(cleanJson);
    if (Array.isArray(parsed) && parsed.length === 5) {
      return parsed;
    }
    throw new Error('Invalid persona array returned from LLM');
  }

  generatePersonasFallback(offer, industry, targetAudience) {
    return [
      {
        id: 'SWARM-01',
        name: 'Walter (54, Skeptical Quality Auditor & Engineer)',
        role: 'Risk-Averse Controller & Engineer',
        focus: `Data Transparency, Exact Metrics & Anti-Hype in ${industry}`,
        mindset: `Questions every claim for ${offer}. Demands verifiable facts and proof before committing.`
      },
      {
        id: 'SWARM-02',
        name: 'Christian (48, Yield & ROI Investor)',
        role: 'Economic Decision Maker & Financial Strategist',
        focus: `ROI, Net Margins, Cashflow & Measurable Value for ${offer}`,
        mindset: `Data and ROI-focused. Dismissive of marketing hype lacking financial proof.`
      },
      {
        id: 'SWARM-03',
        name: 'Jonas (33, Tech Founder & Automation Lead)',
        role: 'Scaling Founder & Systems Architect',
        focus: `Asymmetrical Leverage & Automated Execution for ${offer}`,
        mindset: `Demands high leverage and automation. Rejects slow, outdated marketing patterns.`
      },
      {
        id: 'SWARM-04',
        name: 'Sarah (32, Trust & Family Customer)',
        role: 'Family Decision Maker & Security-Focused Buyer',
        focus: `Security, Guaranteed Pricing & Transparency for ${offer}`,
        mindset: `Fears hidden clauses and pushy sales. Responds to trust, fixed price, and clarity.`
      },
      {
        id: 'SWARM-05',
        name: 'Alexander (46, Premium & High-End Buyer)',
        role: 'High-Net-Worth Executive & Status Buyer',
        focus: `Exclusivity, Premium Standards & Distinction in ${industry}`,
        mindset: `Seeks elite, premium-grade solutions with discreet, high-standard positioning.`
      }
    ];
  }

  /**
   * Evaluates candidate ad alternatives using the 5 Make.com persona customer agents in ENGLISH.
   */
  async runPredictiveTesting(adCandidates, track = 'RSA', contextIndustry = 'General Industry', adContext = {}) {
    this.log(`[START] Starting 5-Agent Swarm Predictive Asset Testing in English...`);

    const combinedContext = {
      contextIndustry,
      theme: adContext.theme || contextIndustry,
      finalUrl: adContext.finalUrl,
      headlines: adContext.headlines || (adCandidates[0] ? adCandidates[0].headlines : []),
      descriptions: adContext.descriptions || (adCandidates[0] ? adCandidates[0].descriptions : []),
      offer: adContext.offer,
      targetAudience: adContext.targetAudience
    };

    await this.generateDynamicPersonas(combinedContext);

    this.log(`Track: ${track} | Industry: ${this.currentIndustry} | Offer: ${this.currentOffer}`);
    this.log(`Active Personas: 5 Make.com Swarm Agents (Walter, Christian, Jonas, Sarah, Alexander)`);

    const config = getConfig();
    const hasLLM = Boolean(config.geminiApiKey);

    const evaluatedCandidates = [];
    const topCandidates = adCandidates.slice(0, adContext.topCount || 40);

    for (let i = 0; i < topCandidates.length; i++) {
      const candidate = topCandidates[i];
      this.log(`\n--------------------------------------------------`);
      this.log(`Swarm evaluating Ad Candidate #${i + 1} [${candidate.id}] (${candidate.vectorization.d1_framework} | ${candidate.vectorization.d2_angle})`);

      let swarmResults = [];

      if (hasLLM) {
        swarmResults = await this.evaluateCandidateWithLLMSwarm(config.geminiApiKey, candidate, track, this.currentIndustry);
      } else {
        swarmResults = this.simulateSwarmEvaluation(candidate, track);
      }

      // Aggregate Swarm Metrics
      const avgCTR = (swarmResults.reduce((acc, curr) => acc + curr.projectedCTR, 0) / swarmResults.length).toFixed(2);
      const avgCPC = (swarmResults.reduce((acc, curr) => acc + curr.projectedCPC, 0) / swarmResults.length).toFixed(2);
      const avgCPM = (swarmResults.reduce((acc, curr) => acc + curr.projectedCPM, 0) / swarmResults.length).toFixed(2);
      const avgCPL = (swarmResults.reduce((acc, curr) => acc + curr.projectedCPL, 0) / swarmResults.length).toFixed(2);
      const approvalCount = swarmResults.filter(r => r.score >= 7.0).length;
      const approvalRate = ((approvalCount / swarmResults.length) * 100).toFixed(1);

      evaluatedCandidates.push({
        candidateId: candidate.id,
        track,
        spineTheme: candidate.spineTheme,
        metaphor: candidate.metaphor,
        matrixGrade: candidate.matrixEvaluation.grade,
        matrixScore: candidate.matrixEvaluation.weighted_score,
        headlines: candidate.headlines,
        longHeadlines: candidate.longHeadlines || [],
        descriptions: candidate.descriptions,
        vectorization: candidate.vectorization,
        swarmSummary: {
          approvalRatePercent: parseFloat(approvalRate),
          approvedAgentsCount: approvalCount,
          totalAgents: swarmResults.length,
          projectedMetrics: {
            ctrPercent: parseFloat(avgCTR),
            cpcEuro: parseFloat(avgCPC),
            cpmEuro: parseFloat(avgCPM),
            costPerLeadEuro: parseFloat(avgCPL)
          }
        },
        agentStatements: swarmResults
      });
    }

    evaluatedCandidates.sort((a, b) => b.swarmSummary.approvalRatePercent - a.swarmSummary.approvalRatePercent);

    const winner = evaluatedCandidates[0];
    this.log(`\n[WINNER] AD ALTERNATIVE DETERMINED BY 5-AGENT SWARM:`);
    if (winner) {
      this.log(`  ID: ${winner.candidateId} (Grade: ${winner.matrixGrade}, Matrix Score: ${winner.matrixScore})`);
      this.log(`  Swarm Approval: ${winner.swarmSummary.approvalRatePercent}% (${winner.swarmSummary.approvedAgentsCount}/5 Agents)`);
      this.log(`  Projections: CTR ${winner.swarmSummary.projectedMetrics.ctrPercent}% | CPC €${winner.swarmSummary.projectedMetrics.cpcEuro} | CPM €${winner.swarmSummary.projectedMetrics.cpmEuro} | CPL €${winner.swarmSummary.projectedMetrics.costPerLeadEuro}`);
    }

    return {
      timestamp: new Date().toISOString(),
      track,
      industry: this.currentIndustry,
      offer: this.currentOffer,
      targetAudience: this.currentAudience,
      totalCandidatesTested: topCandidates.length,
      swarmSize: this.personas.length,
      winnerCandidateId: winner ? winner.candidateId : null,
      evaluatedCandidates
    };
  }

  /**
   * Uses Gemini to evaluate a candidate ad against all 5 Make.com personas in English.
   */
  async evaluateCandidateWithLLMSwarm(apiKey, candidate, track, contextIndustry) {
    const systemPrompt = `
You are a high-precision simulator for the 5-Agent Swarm testing system matching Make.com architecture:
1. Walter (SWARM-01): 54, skeptical auditor, engineer. Allergic to hype/fluff. Demands hard facts, numbers, proof.
2. Christian (SWARM-02): 48, investor, economic decision maker. Focuses on ROI, net margin, financial leverage.
3. Jonas (SWARM-03): 33, tech founder. Looks for automation, asymmetrical leverage, modern AI workflows.
4. Sarah (SWARM-04): 32, family decision maker. Looks for security, trust, guaranteed terms, no hidden fees.
5. Alexander (SWARM-05): 46, premium buyer. Demands exclusivity, first-class quality, and elite tone.

Your task is to analyze an ad creative (Track: ${track}, Industry Context: ${contextIndustry}, Offer: ${this.currentOffer}) from the perspectives of all 5 personas and output their qualitative statement and performance metric projections.

CRITICAL INSTRUCTION: ALL STATEMENTS, FEEDBACK, AND COMMENTS MUST BE IN ENGLISH.

Return a valid JSON array of exactly 5 objects:
[
  {
    "personaId": "SWARM-01",
    "personaName": "Walter (54, Skeptical Quality Auditor & Engineer)",
    "score": 8.5,
    "statement": "Authentic feedback comment in English in Walter's skeptical tone",
    "projectedCTR": 6.8,
    "projectedCPC": 2.10,
    "projectedCPM": 32.00,
    "projectedCPL": 45.00
  },
  ...
]
`;

    const userPrompt = `
AD DRAFT FOR EVALUATION:
Candidate ID: ${candidate.id}
Offer: ${this.currentOffer}
Industry: ${contextIndustry}
Spine Theme: ${candidate.spineTheme}
Angle / Metaphor: ${candidate.metaphor}
Framework: ${candidate.vectorization.d1_framework} | Angle: ${candidate.vectorization.d2_angle} | Hook: ${candidate.vectorization.d5_hook_type}

Headlines:
${candidate.headlines.map(h => `- ${h}`).join('\n')}

${candidate.longHeadlines && candidate.longHeadlines.length > 0 ? `Long Headlines:\n${candidate.longHeadlines.map(lh => `- ${lh}`).join('\n')}\n` : ''}
Descriptions:
${candidate.descriptions.map(d => `- ${d}`).join('\n')}
`;

    try {
      const rawText = await generateText(apiKey, systemPrompt, userPrompt, this.model, true);
      let cleanJson = rawText.trim();
      if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.replace(/^```(json)?/i, '').replace(/```$/, '').trim();
      }
      const parsed = JSON.parse(cleanJson);
      if (Array.isArray(parsed) && parsed.length === 5) {
        return parsed;
      }
      throw new Error('LLM returned incomplete 5-persona array.');
    } catch (err) {
      this.log(`LLM Swarm evaluation fallback triggered: ${err.message}`);
      return this.simulateSwarmEvaluation(candidate, track);
    }
  }

  /**
   * Deterministic mathematical fallback simulation for 5 Make.com personas in ENGLISH.
   */
  simulateSwarmEvaluation(candidate, track) {
    const baseScore = candidate.matrixEvaluation.weighted_score;
    const isPMax = track.toUpperCase() === 'PMAX';

    return this.personas.map((p, idx) => {
      const variance = ((idx * 7) % 19 - 9) / 10;
      const personaScore = Math.min(9.9, Math.max(3.0, parseFloat((baseScore + variance).toFixed(1))));

      const ctr = parseFloat((3.5 + (personaScore / 10) * 4.8 + (idx % 3) * 0.4).toFixed(2));
      const cpc = parseFloat((3.80 - (personaScore / 10) * 1.60 + (idx % 4) * 0.25).toFixed(2));
      const cpm = parseFloat((24.00 + (10 - personaScore) * 3.50 + (idx % 5) * 2.10).toFixed(2));
      const cpl = parseFloat((isPMax ? 38.00 : 48.00) + (10 - personaScore) * 7.50 + (idx % 6) * 3.20).toFixed(2);

      let statement = '';
      if (idx === 0) { // Walter
        statement = personaScore >= 7.5 
          ? `"The concrete numbers and structured claims hold up to technical scrutiny. No obvious marketing fluff."`
          : `"Too many generic claims without hard evidence. I need exact figures, transparent methods, and verification."`;
      } else if (idx === 1) { // Christian
        statement = personaScore >= 7.5 
          ? `"The bottom-line value proposition is clear. Direct ROI focus without unnecessary lifestyle distractions."`
          : `"What is the actual financial leverage here? The economic edge needs to be stated much more directly."`;
      } else if (idx === 2) { // Jonas
        statement = personaScore >= 7.5 
          ? `"Strong modern framing. The automated pipeline angle and systemized leverage stand out immediately."`
          : `"Feels like standard agency copy. Needs a much bolder automation and asymmetric leverage angle."`;
      } else if (idx === 3) { // Sarah
        statement = personaScore >= 7.5 
          ? `"The clear fixed guarantees and transparent conditions give me a strong feeling of trust and security."`
          : `"Feels a bit pushy. I would want clearer proof of security and guarantees before trusting this offer."`;
      } else { // Alexander
        statement = personaScore >= 7.5 
          ? `"Sophisticated tone and high-end positioning. Reflects premium quality without loud bargain shouting."`
          : `"Lacks distinction. Premium buyers expect more subtlety and an exclusive standard of execution."`;
      }

      return {
        personaId: p.id,
        personaName: p.name,
        score: personaScore,
        statement,
        projectedCTR: ctr,
        projectedCPC: Math.max(0.80, cpc),
        projectedCPM: Math.max(12.00, cpm),
        projectedCPL: Math.max(18.00, cpl)
      };
    });
  }
}
