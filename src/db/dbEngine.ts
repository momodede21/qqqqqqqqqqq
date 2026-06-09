/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  UserProfile, 
  UserRole, 
  Tenant, 
  Store, 
  Product, 
  Order, 
  FinanceRecord, 
  AIAgent, 
  TaskQueueItem, 
  KnowledgeItem, 
  OrderStatus,
  EnterpriseUncertaintyLog,
  KnowledgeBoundaryEvent,
  DecisionHumilityRecord,
  FailurePredictionLog,
  BlindSpotDiscovery,
  EvidenceSufficiencyReport,
  SelfReflectionAudit,
  KnowledgeGapTask,
  EvidenceCollectionPlan,
  InvestigationCase,
  CuriosityEvent,
  ContrarianHypothesis,
  CompetingExplanation,
  BeliefUpdate
} from '../types';

// Structure of our entire local database state
interface DBState {
  users: UserProfile[];
  tenants: Tenant[];
  stores: Store[];
  products: Product[];
  orders: Order[];
  finance: FinanceRecord[];
  agents: AIAgent[];
  tasks: TaskQueueItem[];
  knowledge: KnowledgeItem[];
  enterprise_uncertainty_logs: EnterpriseUncertaintyLog[];
  knowledge_boundary_events: KnowledgeBoundaryEvent[];
  decision_humility_records: DecisionHumilityRecord[];
  failure_prediction_logs: FailurePredictionLog[];
  blind_spot_discoveries: BlindSpotDiscovery[];
  evidence_sufficiency_reports: EvidenceSufficiencyReport[];
  self_reflection_audits: SelfReflectionAudit[];
  knowledge_gap_tasks: KnowledgeGapTask[];
  evidence_collection_plans: EvidenceCollectionPlan[];
  investigation_cases: InvestigationCase[];
  curiosity_events: CuriosityEvent[];
  contrarian_hypotheses: ContrarianHypothesis[];
  competing_explanations: CompetingExplanation[];
  belief_updates: BeliefUpdate[];
}

const STORAGE_KEY = 'modaui_production_db';

// Simple pub-sub listener mechanism to achieve real-time reactivity
type Listener = () => void;
const listeners = new Map<keyof DBState | 'all', Set<Listener>>();

class DatabaseEngine {
  private state: DBState;

  constructor() {
    this.state = this.loadFromStorage();
    if (this.state.users.length === 0) {
      this.seedInitialDatabase();
    }
  }

  private loadFromStorage(): DBState {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          users: parsed.users || [],
          tenants: parsed.tenants || [],
          stores: parsed.stores || [],
          products: parsed.products || [],
          orders: parsed.orders || [],
          finance: parsed.finance || [],
          agents: parsed.agents || [],
          tasks: parsed.tasks || [],
          knowledge: parsed.knowledge || [],
          enterprise_uncertainty_logs: parsed.enterprise_uncertainty_logs || [],
          knowledge_boundary_events: parsed.knowledge_boundary_events || [],
          decision_humility_records: parsed.decision_humility_records || [],
          failure_prediction_logs: parsed.failure_prediction_logs || [],
          blind_spot_discoveries: parsed.blind_spot_discoveries || [],
          evidence_sufficiency_reports: parsed.evidence_sufficiency_reports || [],
          self_reflection_audits: parsed.self_reflection_audits || [],
          knowledge_gap_tasks: parsed.knowledge_gap_tasks || [],
          evidence_collection_plans: parsed.evidence_collection_plans || [],
          investigation_cases: parsed.investigation_cases || [],
          curiosity_events: parsed.curiosity_events || [],
          contrarian_hypotheses: parsed.contrarian_hypotheses || [],
          competing_explanations: parsed.competing_explanations || [],
          belief_updates: parsed.belief_updates || []
        };
      }
    } catch (e) {
      console.error('Failed to parse database from storage, resetting:', e);
    }
    return {
      users: [],
      tenants: [],
      stores: [],
      products: [],
      orders: [],
      finance: [],
      agents: [],
      tasks: [],
      knowledge: [],
      enterprise_uncertainty_logs: [],
      knowledge_boundary_events: [],
      decision_humility_records: [],
      failure_prediction_logs: [],
      blind_spot_discoveries: [],
      evidence_sufficiency_reports: [],
      self_reflection_audits: [],
      knowledge_gap_tasks: [],
      evidence_collection_plans: [],
      investigation_cases: [],
      curiosity_events: [],
      contrarian_hypotheses: [],
      competing_explanations: [],
      belief_updates: []
    };
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save database to storage:', e);
    }
  }

  // Seeding initial standard settings and admin records so the platform works immediately on first load
  private seedInitialDatabase() {
    // Initial Tenant
    const defaultTenantId = 'tenant_global_moda';
    const defaultTenant: Tenant = {
      id: defaultTenantId,
      name: 'MODA Primary Group',
      branding: {
        primaryColor: '#0f172a', // Slate 900
        logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80'
      },
      billingPlan: 'Enterprise',
      billingStatus: 'Active',
      ownerId: 'usr_admin',
      status: 'Active',
      createdAt: new Date().toISOString(),
      teamMembers: [
        { userId: 'usr_admin', role: UserRole.PLATFORM_ADMIN },
        { userId: 'usr_merchant', role: UserRole.MERCHANT_OWNER }
      ]
    };

    // Standard Users (Preloaded with deterministic password matching 'password123' for fast evaluation)
    const adminUser: UserProfile = {
      id: 'usr_admin',
      email: 'admin@modaui.com',
      displayName: 'System Administrator',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      role: UserRole.PLATFORM_ADMIN,
      activeTenantId: defaultTenantId,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      passwordHash: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f' // SHA-256 of 'password123'
    };

    const merchantUser: UserProfile = {
      id: 'usr_merchant',
      email: 'merchant@modaui.com',
      displayName: 'Aubrette Munsen',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      role: UserRole.MERCHANT_OWNER,
      activeTenantId: defaultTenantId,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      passwordHash: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f' // SHA-256 of 'password123'
    };

    const customerUser: UserProfile = {
      id: 'usr_customer',
      email: 'customer@modaui.com',
      displayName: 'Alice Johnson',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      role: UserRole.CUSTOMER,
      activeTenantId: null,
      emailVerified: true,
      createdAt: new Date().toISOString(),
      passwordHash: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f' // SHA-256 of 'password123'
    };

    // Preloaded Store
    const defaultStoreId = 'store_moda_boutique';
    const defaultStore: Store = {
      id: defaultStoreId,
      tenantId: defaultTenantId,
      name: 'MODA Flagship Studio',
      domain: 'flagship.modaui.app',
      branding: {
        logoUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=120&q=80',
        coverUrl: 'https://images.unsplash.com/photo-1441984969893-c5344d368d37?auto=format&fit=crop&w=800&q=80'
      },
      theme: 'Minimal',
      createdAt: new Date().toISOString()
    };

    // Preloaded Products (real items, no placeholders)
    const product1: Product = {
      id: 'prod_trench_coat',
      storeId: defaultStoreId,
      name: 'Classic Tailored Trench Coat',
      description: 'Double-breasted water-resistant cotton gabardine trench coat with calf leather buckles and handcheck linings.',
      price: 245.00,
      imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80',
      category: 'Outerwear',
      inventory: 35,
      sku: 'APP-TRNCH-01',
      variants: [
        { name: 'Color', options: ['Camel', 'Midnight Black'] },
        { name: 'Size', options: ['S', 'M', 'L', 'XL'] }
      ],
      createdAt: new Date().toISOString()
    };

    const product2: Product = {
      id: 'prod_merino_sweater',
      storeId: defaultStoreId,
      name: 'Fine Merino Wool Sweater',
      description: 'Extrafine 100% merino wool knit sweater featuring ribbed crewneck, cuffs, and hem. Breathable and warm.',
      price: 110.00,
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80',
      category: 'Knitwear',
      inventory: 50,
      sku: 'APP-MERINO-02',
      variants: [
        { name: 'Color', options: ['Heather Grey', 'Ivory White', 'Navy Blue'] },
        { name: 'Size', options: ['M', 'L', 'XL'] }
      ],
      createdAt: new Date().toISOString()
    };

    const product3: Product = {
      id: 'prod_silk_scarf',
      storeId: defaultStoreId,
      name: 'Printed Mulberry Silk Scarf',
      description: 'Luxurious 100% mulberry silk scarf featuring hand-rolled edges and hand-painted bespoke abstract organic motifs.',
      price: 85.00,
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80',
      category: 'Accessories',
      inventory: 20,
      sku: 'ACC-SILK-03',
      variants: [
        { name: 'Pattern', options: ['Aura Waves', 'Sand Dunes'] }
      ],
      createdAt: new Date().toISOString()
    };

    // Preloaded Orders (Real Order Life-cycle)
    const order1: Order = {
      id: 'ord_1001',
      storeId: defaultStoreId,
      userId: 'usr_customer',
      items: [
        {
          productId: 'prod_merino_sweater',
          name: 'Fine Merino Wool Sweater',
          price: 110.00,
          quantity: 1,
          selectedVariant: { Color: 'Navy Blue', Size: 'M' }
        }
      ],
      status: OrderStatus.PAID,
      total: 110.00,
      paymentStatus: 'Paid',
      paymentId: 'stripe_ch_9A23DF8712',
      paymentMethod: 'Stripe',
      shippingAddress: '456 Oak Lane, Seattle, WA 98101',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString() // 1 day ago
    };

    // Preloaded Financial Records
    const finance1: FinanceRecord = {
      id: 'fin_rec_1',
      tenantId: defaultTenantId,
      storeId: defaultStoreId,
      type: 'Revenue',
      amount: 110.00,
      category: 'E-commerce Sale',
      description: 'Payment captured for Order #ord_1001',
      orderId: 'ord_1001',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
    };

    // AI Agents Preloaded
    const agentSales: AIAgent = {
      id: 'agt_sales',
      tenantId: defaultTenantId,
      name: 'Evelyn',
      role: 'Omnichannel Sales Specialist',
      state: 'idle',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      memory: ['Store brand emphasizes slow fashion and quality.', 'Target customer segment values merino wool and silk accessories.'],
      systemPrompt: 'You are Evelyn, an elite product specialist representing MODA Flagship Studio. Help customers choose perfect outfits, explain textile premium materials (merino, silk, cashmere), and double sales through personalized styling suggestions.',
      createdAt: new Date().toISOString(),
      assignedStoreId: defaultStoreId
    };

    const agentInventory: AIAgent = {
      id: 'agt_inv',
      tenantId: defaultTenantId,
      name: 'Marcus',
      role: 'Automated Operations & SKU Auditor',
      state: 'idle',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      memory: ['Reorder threshold is set to 10 units for outerwear.', 'Suppliers are located in Italy and Japan.'],
      systemPrompt: 'You are Marcus, an expert supply chain controller. Audit product inventory, identify products below warning safety levels, alert managers of supply chain backlogs, and write restocking orders automatically.',
      createdAt: new Date().toISOString(),
      assignedStoreId: defaultStoreId
    };

    const defaultUncertaintyLogs: EnterpriseUncertaintyLog[] = [
      {
        id: 'u_log_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        targetMetric: 'Weekly Profit Projection',
        predictedValue: '+$14,250.00 USD',
        confidence: 0.82,
        uncertainty: 0.18,
        unknownFactors: ['Pending Supplier raw fabric shipment clearance', 'Seasonal climate temperature shift affecting coat purchases'],
        source: 'Marcus Operational forecaster v1.0',
        evidenceId: 'evt_rev_702f831',
        validationId: 'val_rev_a8d3829'
      },
      {
        id: 'u_log_2',
        tenantId: defaultTenantId,
        timestamp: new Date().toISOString(),
        targetMetric: 'Refund Rate Trend Forecast',
        predictedValue: '2.4% (Flat)',
        confidence: 0.65,
        uncertainty: 0.35,
        unknownFactors: ['Post-holiday shipping courier friction', 'Ad-hoc buyer chargeback dispute latency'],
        source: 'Finance Audit Engine',
        evidenceId: 'evt_ref_9bfd12',
        validationId: 'val_ref_0e39da4'
      }
    ];

    const defaultKnowledgeBoundaryEvents: KnowledgeBoundaryEvent[] = [
      {
        id: 'k_bound_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        queryTopic: 'Custom Adyen Settlement Gateway Integration Rules',
        knownCoverage: 0.42,
        unknownCoverage: 0.58,
        missingEvidence: ['Adyen Europe multi-currency clearing API spec', 'Direct settlement fee structure contract'],
        insufficientData: true,
        source: 'AIBrain Orchestration Layer',
        evidenceId: 'evt_knw_38fa0921',
        validationId: 'val_knw_83fa1c9'
      }
    ];

    const defaultDecisionHumilityRecords: DecisionHumilityRecord[] = [
      {
        id: 'd_hum_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        decisionToken: 'dec_apparel_markup_49f823',
        originalRating: 95.0,
        finalRating: 78.5,
        confidencePenalty: 16.5,
        sampleCount: 32,
        conflictLevel: 0.15,
        source: 'Decision Humility Hub',
        evidenceId: 'evt_hum_a18f2cd1',
        validationId: 'val_hum_91cb82df'
      }
    ];

    const defaultFailurePredictionLogs: FailurePredictionLog[] = [
      {
        id: 'f_fail_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
        scenarioTitle: 'Automatic REST Import inventory depletion re-trigger',
        failureProbability: 0.28,
        failureImpact: 'high',
        mitigationSteps: ['Force mock-transaction dry-run validation', 'Configure backup cloud queue fallback buffer'],
        source: 'Marcus Failure Predictive Watchdog',
        evidenceId: 'evt_fail_bbb293cd1',
        validationId: 'val_fail_7731f8da'
      }
    ];

    const defaultBlindSpotDiscoveries: BlindSpotDiscovery[] = [
      {
        id: 'b_spot_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
        focusArea: 'Vanguard Marketing campaign click-through yield',
        blindSpotDetails: 'Missing active feedback loop for shoppers leaving checkout funnel before entering email address',
        missingVariables: ['Anonymous session bounce coordinates', 'Guest visitor cart abandons profile matrix'],
        investigationTasks: [
          { id: 'bt_1', description: 'Enable anonymous cart session telemetry mapping', assignedTo: 'Platform Engineering', isCompleted: false },
          { id: 'bt_2', description: 'Audit checkout funnel entry point bounce patterns', assignedTo: 'Marketing Operations', isCompleted: true }
        ],
        source: 'Blind Spot Discovery Engine',
        evidenceId: 'evt_spot_a9ef1c23',
        validationId: 'val_spot_bfd7391a'
      }
    ];

    const defaultEvidenceSufficiencyReports: EvidenceSufficiencyReport[] = [
      {
        id: 'e_suff_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
        conclusionTarget: 'Apparel Price Increase Strategy Recommendation',
        evidenceCoverage: 0.88,
        evidenceStrength: 0.91,
        isApproved: true,
        source: 'Evidence Sufficiency Monitor',
        evidenceId: 'evt_suff_20fbc38',
        validationId: 'val_suff_71d2bf9'
      },
      {
        id: 'e_suff_2',
        tenantId: defaultTenantId,
        timestamp: new Date().toISOString(),
        conclusionTarget: 'Japanese Supplier Contract Extension proposal',
        evidenceCoverage: 0.35,
        evidenceStrength: 0.48,
        isApproved: false,
        blockReason: 'Critical block: Supplier historical delivery latency sample size too low (only 2 records found). Weak evidence coverage (< 50%).',
        source: 'Evidence Sufficiency Monitor',
        evidenceId: 'evt_suff_cc9a01f',
        validationId: 'val_suff_aa91fc3'
      }
    ];

    const defaultSelfReflectionAudits: SelfReflectionAudit[] = [
      {
        id: 's_ref_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
        scope: 'reasoning',
        critiqueDetails: 'Over-indexed on high-density conversion triggers without checking merchant actual shipping logistical capability, causing near bottleneck in outerwear delivery lines.',
        ratingScore: 78,
        actionableImprovements: ['Establish cross-reference locks with Marcus logistics capabilities before issuing promo coupons'],
        source: 'ECOS Self Critique Audit Layer',
        evidenceId: 'evt_ref_fa21bc89',
        validationId: 'val_ref_002fcbeb'
      }
    ];

    const defaultKnowledgeGapTasks: KnowledgeGapTask[] = [
      {
        id: 'gap_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 20).toISOString(),
        gapTopic: 'Italian Supplier Premium Leather Cost Surge (APP-TRNCH-01)',
        targetEvidenceNeeded: 'Tannery processing cost statement (last 30 days) and raw material transit tariffs',
        status: 'resolving',
        resolutionRateScore: 40,
        source: 'Marcus Supply Chain Discovery v1.1',
        evidenceId: 'evt_gap_7d82fc1',
        validationId: 'val_gap_aac2d89'
      },
      {
        id: 'gap_2',
        tenantId: defaultTenantId,
        timestamp: new Date().toISOString(),
        gapTopic: 'Camel Trench Coat Returns with Collar Sizing Complaints',
        targetEvidenceNeeded: 'QA stitch density logs, supplier specification pattern, customer feedback transcript',
        status: 'pending',
        resolutionRateScore: 0,
        source: 'Evelyn Return-Rate Auditor v1.2',
        evidenceId: 'evt_gap_aa3bc8f',
        validationId: 'val_gap_20d8fca'
      }
    ];

    const defaultEvidenceCollectionPlans: EvidenceCollectionPlan[] = [
      {
        id: 'evp_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
        gapTaskId: 'gap_1',
        planTitle: 'Audit Tannery Energy Inflation Adjustments',
        plannedEvidenceItems: ['Milan factory energy cost invoice', 'Alps regional logistics diesel fuel rate sheet'],
        importance: 'high',
        estimatedValueScore: 85,
        isCollected: true,
        source: 'Automated Operations Planner',
        evidenceId: 'evt_pln_2c8b8f2',
        validationId: 'val_pln_aa8cc2d'
      },
      {
        id: 'evp_2',
        tenantId: defaultTenantId,
        timestamp: new Date().toISOString(),
        gapTaskId: 'gap_2',
        planTitle: 'Retrieve Pattern Cutter Sewing Blueprints',
        plannedEvidenceItems: ['Supplier standard template PDF', 'Production batch collar measurement metrics'],
        importance: 'medium',
        estimatedValueScore: 72,
        isCollected: false,
        source: 'Automated Operations Planner',
        evidenceId: 'evt_pln_9d8ef21',
        validationId: 'val_pln_bb91cb8'
      }
    ];

    const defaultInvestigationCases: InvestigationCase[] = [
      {
        id: 'case_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 15).toISOString(),
        caseTitle: 'Investigation: Italian Premium Leather Surcharge',
        associatedGapTaskId: 'gap_1',
        status: 'investigating',
        stages: ['Identify supplier charge parameters', 'Scan alternative suppliers in Spain', 'Audit shipping tariffs', 'Negotiate volume-discount bracket'],
        currentStageIndex: 1,
        findingsSummary: 'Milan tannery has applied an energy penalty of 12%. Alternate factories in Alicante (Spain) offer 4% lower base tariff but face 3 days slower freight.',
        source: 'ECOS Autonomous Investigator',
        evidenceId: 'evt_cas_0d9bac2',
        validationId: 'val_cas_fecca89'
      }
    ];

    const defaultCuriosityEvents: CuriosityEvent[] = [
      {
        id: 'cur_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        triggerAnomaly: 'Weekly printed silk accessory search traffic spikes +310% relative to 4-week moving average',
        anomalyMagnitude: 3.1,
        curiosityScore: 88,
        proposedHypothesis: 'Anomalous search trend points to organic search attribution or localized styling influencer post.',
        source: 'ECOS Business Curiosity Watchdog',
        evidenceId: 'evt_cur_bb342fc',
        validationId: 'val_cur_10ac9eb'
      }
    ];

    const defaultContrarianHypotheses: ContrarianHypothesis[] = [
      {
        id: 'con_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        associatedAnomalousEvent: 'cur_1',
        mainstreamBelief: 'Weekly surge is driven by normal spring/summer silk marketing seasonal demand.',
        contrarianAssertion: 'Demand is driven by a single micro-influencer TikTok styling combo utilizing silk scarf pack as a belt, generating highly-localized, high-intent traffic clusters.',
        validationTestCriteria: 'Correlate referral traffic source parameters against social media tags and checkout discount use.',
        oppositeConfidenceScore: 81,
        source: 'Contrarian Thinking engine',
        evidenceId: 'evt_con_ff032cb',
        validationId: 'val_con_bb872ac'
      }
    ];

    const defaultCompetingExplanations: CompetingExplanation[] = [
      {
        id: 'comp_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        targetAnomaly: 'Abrupt -24% checkout conversion drop at PST 14:00 on June 08',
        explanationA: 'Stripe webhook payment latency or regional routing timeout',
        scoreA: 18,
        explanationB: 'New layout bug: cart coupon submission button lacks mobile tactile hover area',
        scoreB: 82,
        explanationC: 'High shipping rate fee sticker shock triggering abandonment',
        scoreC: 35,
        winningExplanation: 'B',
        source: 'Competing Explanation Diagnoser',
        evidenceId: 'evt_com_8f23bcb',
        validationId: 'val_com_22ca9db'
      }
    ];

    const defaultBeliefUpdates: BeliefUpdate[] = [
      {
        id: 'bel_1',
        tenantId: defaultTenantId,
        timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
        beliefSubject: 'Camel Trench Coat Sizing Standard Alignment',
        previousUnderstanding: 'Camel Trench Coat fits according to standard physical sizing grid guidelines.',
        newUnderstanding: 'Camel Trench Coat shoulder sleeve is physically cut 1.5 inches smaller, meaning customers require ordering one size up for correct fit.',
        beliefChangeMagnitude: 72,
        source: 'ECOS Belief Update Core',
        evidenceId: 'evt_bel_cc2ef91',
        validationId: 'val_bel_002fcbb'
      }
    ];

    // Seed into State
    this.state = {
      users: [adminUser, merchantUser, customerUser],
      tenants: [defaultTenant],
      stores: [defaultStore],
      products: [product1, product2, product3],
      orders: [order1],
      finance: [finance1],
      agents: [agentSales, agentInventory],
      tasks: [],
      knowledge: [],
      enterprise_uncertainty_logs: defaultUncertaintyLogs,
      knowledge_boundary_events: defaultKnowledgeBoundaryEvents,
      decision_humility_records: defaultDecisionHumilityRecords,
      failure_prediction_logs: defaultFailurePredictionLogs,
      blind_spot_discoveries: defaultBlindSpotDiscoveries,
      evidence_sufficiency_reports: defaultEvidenceSufficiencyReports,
      self_reflection_audits: defaultSelfReflectionAudits,
      knowledge_gap_tasks: defaultKnowledgeGapTasks,
      evidence_collection_plans: defaultEvidenceCollectionPlans,
      investigation_cases: defaultInvestigationCases,
      curiosity_events: defaultCuriosityEvents,
      contrarian_hypotheses: defaultContrarianHypotheses,
      competing_explanations: defaultCompetingExplanations,
      belief_updates: defaultBeliefUpdates
    };

    this.saveToStorage();
  }

  // Reactive subscription system
  public subscribe(tab: keyof DBState | 'all', callback: Listener): () => void {
    if (!listeners.has(tab)) {
      listeners.set(tab, new Set());
    }
    listeners.get(tab)!.add(callback);
    return () => {
      listeners.get(tab)?.delete(callback);
    };
  }

  private notify(tab: keyof DBState | 'all') {
    this.saveToStorage();
    // Notify collection-specific listeners
    listeners.get(tab)?.forEach(cb => cb());
    // Notify global listeners
    listeners.get('all')?.forEach(cb => cb());
  }

  // 1. USERS COLLECTION CRUD
  public users = {
    getAll: (): UserProfile[] => [...this.state.users],
    getById: (id: string): UserProfile | undefined => this.state.users.find(u => u.id === id),
    getByEmail: (email: string): UserProfile | undefined => this.state.users.find(u => u.email.toLowerCase() === email.toLowerCase()),
    create: (data: Omit<UserProfile, 'id' | 'createdAt'> & { id?: string }): UserProfile => {
      const newUser: UserProfile = {
        ...data,
        id: data.id || `usr_${Math.random().toString(36).substring(2, 11)}`,
        createdAt: new Date().toISOString()
      };
      this.state.users.push(newUser);
      this.notify('users');
      return newUser;
    },
    update: (id: string, updates: Partial<UserProfile>): UserProfile => {
      const index = this.state.users.findIndex(u => u.id === id);
      if (index === -1) throw new Error(`User with ID ${id} not found`);
      const updated = { ...this.state.users[index], ...updates };
      this.state.users[index] = updated;
      this.notify('users');
      return updated;
    },
    delete: (id: string) => {
      this.state.users = this.state.users.filter(u => u.id !== id);
      this.notify('users');
    }
  };

  // 2. TENANTS COLLECTION CRUD
  public tenants = {
    getAll: (): Tenant[] => [...this.state.tenants],
    getById: (id: string): Tenant | undefined => this.state.tenants.find(t => t.id === id),
    create: (data: Omit<Tenant, 'id' | 'createdAt'>): Tenant => {
      const newTenant: Tenant = {
        ...data,
        id: `tenant_${Math.random().toString(36).substring(2, 11)}`,
        createdAt: new Date().toISOString()
      };
      this.state.tenants.push(newTenant);
      this.notify('tenants');
      return newTenant;
    },
    update: (id: string, updates: Partial<Tenant>): Tenant => {
      const index = this.state.tenants.findIndex(t => t.id === id);
      if (index === -1) throw new Error(`Tenant with ID ${id} not found`);
      const updated = { ...this.state.tenants[index], ...updates };
      this.state.tenants[index] = updated;
      this.notify('tenants');
      return updated;
    }
  };

  // 3. STORES COLLECTION CRUD
  public stores = {
    getAll: (): Store[] => [...this.state.stores],
    getByTenant: (tenantId: string): Store[] => this.state.stores.filter(s => s.tenantId === tenantId),
    getById: (id: string): Store | undefined => this.state.stores.find(s => s.id === id),
    create: (data: Omit<Store, 'id' | 'createdAt'>): Store => {
      const newStore: Store = {
        ...data,
        id: `store_${Math.random().toString(36).substring(2, 11)}`,
        createdAt: new Date().toISOString()
      };
      this.state.stores.push(newStore);
      this.notify('stores');
      return newStore;
    },
    update: (id: string, updates: Partial<Store>): Store => {
      const index = this.state.stores.findIndex(s => s.id === id);
      if (index === -1) throw new Error(`Store with ID ${id} not found`);
      const updated = { ...this.state.stores[index], ...updates };
      this.state.stores[index] = updated;
      this.notify('stores');
      return updated;
    },
    delete: (id: string) => {
      this.state.stores = this.state.stores.filter(s => s.id !== id);
      this.notify('stores');
    }
  };

  // 4. PRODUCTS COLLECTION CRUD
  public products = {
    getAll: (): Product[] => [...this.state.products],
    getByStore: (storeId: string): Product[] => this.state.products.filter(p => p.storeId === storeId),
    getById: (id: string): Product | undefined => this.state.products.find(p => p.id === id),
    create: (data: Omit<Product, 'id' | 'createdAt'>): Product => {
      const newProduct: Product = {
        ...data,
        id: `prod_${Math.random().toString(36).substring(2, 11)}`,
        createdAt: new Date().toISOString()
      };
      this.state.products.push(newProduct);
      this.notify('products');
      return newProduct;
    },
    update: (id: string, updates: Partial<Product>): Product => {
      const index = this.state.products.findIndex(p => p.id === id);
      if (index === -1) throw new Error(`Product with ID ${id} not found`);
      const updated = { ...this.state.products[index], ...updates };
      this.state.products[index] = updated;
      this.notify('products');
      return updated;
    },
    delete: (id: string) => {
      this.state.products = this.state.products.filter(p => p.id !== id);
      this.notify('products');
    }
  };

  // 5. ORDERS COLLECTION CRUD
  public orders = {
    getAll: (): Order[] => [...this.state.orders],
    getByStore: (storeId: string): Order[] => this.state.orders.filter(o => o.storeId === storeId),
    getByUser: (userId: string): Order[] => this.state.orders.filter(o => o.userId === userId),
    getById: (id: string): Order | undefined => this.state.orders.find(o => o.id === id),
    create: (data: Omit<Order, 'id' | 'createdAt'>): Order => {
      const newOrder: Order = {
        ...data,
        id: `ord_${1002 + this.state.orders.length}`,
        createdAt: new Date().toISOString()
      };
      this.state.orders.push(newOrder);

      // Add to financial ledger automatically if Paid
      if (newOrder.status === OrderStatus.PAID) {
        const store = this.stores.getById(newOrder.storeId);
        if (store) {
          this.finance.create({
            tenantId: store.tenantId,
            storeId: store.id,
            type: 'Revenue',
            amount: newOrder.total,
            category: 'E-commerce Sale',
            description: `Payment captured for Order #${newOrder.id}`,
            orderId: newOrder.id
          });
        }
      }

      this.notify('orders');
      return newOrder;
    },
    updateStatus: (id: string, status: OrderStatus, paymentStatus: 'Unpaid' | 'Paid' | 'Refunded'): Order => {
      const index = this.state.orders.findIndex(o => o.id === id);
      if (index === -1) throw new Error(`Order with ID ${id} not found`);
      const current = this.state.orders[index];
      const updated = { ...current, status, paymentStatus };
      this.state.orders[index] = updated;

      // Handle Finance bookkeeping
      if (status === OrderStatus.PAID && current.status !== OrderStatus.PAID) {
        const store = this.stores.getById(current.storeId);
        if (store) {
          this.finance.create({
            tenantId: store.tenantId,
            storeId: store.id,
            type: 'Revenue',
            amount: current.total,
            category: 'E-commerce Sale',
            description: `Payment captured for Order #${current.id}`,
            orderId: current.id
          });
        }
      } else if (status === OrderStatus.REFUNDED && current.status !== OrderStatus.REFUNDED) {
        const store = this.stores.getById(current.storeId);
        if (store) {
          this.finance.create({
            tenantId: store.tenantId,
            storeId: store.id,
            type: 'Expense',
            amount: current.total,
            category: 'Refund',
            description: `Refund processed for Order #${current.id}`,
            orderId: current.id
          });
        }
      }

      this.notify('orders');
      return updated;
    }
  };

  // 6. FINANCE RECORDS COLLECTION CRUD
  public finance = {
    getAll: (): FinanceRecord[] => [...this.state.finance],
    getByTenant: (tenantId: string): FinanceRecord[] => this.state.finance.filter(f => f.tenantId === tenantId),
    create: (data: Omit<FinanceRecord, 'id' | 'createdAt'>): FinanceRecord => {
      const record: FinanceRecord = {
        ...data,
        id: `fin_rec_${Math.random().toString(36).substring(2, 11)}`,
        createdAt: new Date().toISOString()
      };
      this.state.finance.push(record);
      this.notify('finance');
      return record;
    }
  };

  // 7. AI AGENTS COLLECTION CRUD
  public agents = {
    getAll: (): AIAgent[] => [...this.state.agents],
    getByTenant: (tenantId: string): AIAgent[] => this.state.agents.filter(a => a.tenantId === tenantId),
    getById: (id: string): AIAgent | undefined => this.state.agents.find(a => a.id === id),
    create: (data: Omit<AIAgent, 'id' | 'createdAt'>): AIAgent => {
      const agent: AIAgent = {
        ...data,
        id: `agt_${Math.random().toString(36).substring(2, 11)}`,
        createdAt: new Date().toISOString()
      };
      this.state.agents.push(agent);
      this.notify('agents');
      return agent;
    },
    update: (id: string, updates: Partial<AIAgent>): AIAgent => {
      const index = this.state.agents.findIndex(a => a.id === id);
      if (index === -1) throw new Error(`Agent with ID ${id} not found`);
      const updated = { ...this.state.agents[index], ...updates };
      this.state.agents[index] = updated;
      this.notify('agents');
      return updated;
    },
    delete: (id: string) => {
      this.state.agents = this.state.agents.filter(a => a.id !== id);
      this.notify('agents');
    }
  };

  // 8. TASK RUNTIME QUEUE CRUD
  public tasks = {
    getAll: (): TaskQueueItem[] => [...this.state.tasks],
    getByAgent: (agentId: string): TaskQueueItem[] => this.state.tasks.filter(t => t.agentId === agentId),
    getById: (id: string): TaskQueueItem | undefined => this.state.tasks.find(t => t.id === id),
    create: (data: Omit<TaskQueueItem, 'id' | 'createdAt'>): TaskQueueItem => {
      const tk: TaskQueueItem = {
        ...data,
        id: `tsk_${Math.random().toString(36).substring(2, 11)}`,
        createdAt: new Date().toISOString()
      };
      this.state.tasks.push(tk);
      this.notify('tasks');
      return tk;
    },
    update: (id: string, updates: Partial<TaskQueueItem>): TaskQueueItem => {
      const index = this.state.tasks.findIndex(t => t.id === id);
      if (index === -1) throw new Error(`Task with ID ${id} not found`);
      const updated = { ...this.state.tasks[index], ...updates };
      this.state.tasks[index] = updated;
      this.notify('tasks');
      return updated;
    }
  };

  // 9. KNOWLEDGE BASE CRUD
  public knowledge = {
    getAll: (): KnowledgeItem[] => [...this.state.knowledge],
    getByTenant: (tenantId: string): KnowledgeItem[] => this.state.knowledge.filter(k => k.tenantId === tenantId),
    create: (data: Omit<KnowledgeItem, 'id' | 'createdAt'>): KnowledgeItem => {
      const ki: KnowledgeItem = {
        ...data,
        id: `knw_${Math.random().toString(36).substring(2, 11)}`,
        createdAt: new Date().toISOString()
      };
      this.state.knowledge.push(ki);
      this.notify('knowledge');
      return ki;
    },
    delete: (id: string) => {
      this.state.knowledge = this.state.knowledge.filter(k => k.id !== id);
      this.notify('knowledge');
    }
  };

  // 10. ENTERPRISE UNCERTAINTY LOGS
  public enterprise_uncertainty_logs = {
    getAll: (): EnterpriseUncertaintyLog[] => [...this.state.enterprise_uncertainty_logs],
    getByTenant: (tenantId: string): EnterpriseUncertaintyLog[] => this.state.enterprise_uncertainty_logs.filter(l => l.tenantId === tenantId),
    create: (data: Omit<EnterpriseUncertaintyLog, 'id'>): EnterpriseUncertaintyLog => {
      const log: EnterpriseUncertaintyLog = {
        ...data,
        id: `unc_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.enterprise_uncertainty_logs.push(log);
      this.saveToStorage();
      this.notify('all');
      return log;
    }
  };

  // 11. KNOWLEDGE BOUNDARY EVENTS
  public knowledge_boundary_events = {
    getAll: (): KnowledgeBoundaryEvent[] => [...this.state.knowledge_boundary_events],
    getByTenant: (tenantId: string): KnowledgeBoundaryEvent[] => this.state.knowledge_boundary_events.filter(e => e.tenantId === tenantId),
    create: (data: Omit<KnowledgeBoundaryEvent, 'id'>): KnowledgeBoundaryEvent => {
      const evt: KnowledgeBoundaryEvent = {
        ...data,
        id: `kbd_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.knowledge_boundary_events.push(evt);
      this.saveToStorage();
      this.notify('all');
      return evt;
    }
  };

  // 12. DECISION HUMILITY RECORDS
  public decision_humility_records = {
    getAll: (): DecisionHumilityRecord[] => [...this.state.decision_humility_records],
    getByTenant: (tenantId: string): DecisionHumilityRecord[] => this.state.decision_humility_records.filter(r => r.tenantId === tenantId),
    create: (data: Omit<DecisionHumilityRecord, 'id'>): DecisionHumilityRecord => {
      const rec: DecisionHumilityRecord = {
        ...data,
        id: `hum_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.decision_humility_records.push(rec);
      this.saveToStorage();
      this.notify('all');
      return rec;
    }
  };

  // 13. FAILURE PREDICTION LOGS
  public failure_prediction_logs = {
    getAll: (): FailurePredictionLog[] => [...this.state.failure_prediction_logs],
    getByTenant: (tenantId: string): FailurePredictionLog[] => this.state.failure_prediction_logs.filter(g => g.tenantId === tenantId),
    create: (data: Omit<FailurePredictionLog, 'id'>): FailurePredictionLog => {
      const log: FailurePredictionLog = {
        ...data,
        id: `fpl_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.failure_prediction_logs.push(log);
      this.saveToStorage();
      this.notify('all');
      return log;
    }
  };

  // 14. BLIND SPOT DISCOVERIES
  public blind_spot_discoveries = {
    getAll: (): BlindSpotDiscovery[] => [...this.state.blind_spot_discoveries],
    getByTenant: (tenantId: string): BlindSpotDiscovery[] => this.state.blind_spot_discoveries.filter(d => d.tenantId === tenantId),
    create: (data: Omit<BlindSpotDiscovery, 'id'>): BlindSpotDiscovery => {
      const spot: BlindSpotDiscovery = {
        ...data,
        id: `bsd_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.blind_spot_discoveries.push(spot);
      this.saveToStorage();
      this.notify('all');
      return spot;
    },
    updateTask: (discoveryId: string, taskId: string, isCompleted: boolean): BlindSpotDiscovery => {
      const index = this.state.blind_spot_discoveries.findIndex(d => d.id === discoveryId);
      if (index === -1) throw new Error(`Blind spot discovery ID ${discoveryId} not found`);
      const updated = { ...this.state.blind_spot_discoveries[index] };
      updated.investigationTasks = updated.investigationTasks.map(t => t.id === taskId ? { ...t, isCompleted } : t);
      this.state.blind_spot_discoveries[index] = updated;
      this.saveToStorage();
      this.notify('all');
      return updated;
    }
  };

  // 15. EVIDENCE SUFFICIENCY REPORTS
  public evidence_sufficiency_reports = {
    getAll: (): EvidenceSufficiencyReport[] => [...this.state.evidence_sufficiency_reports],
    getByTenant: (tenantId: string): EvidenceSufficiencyReport[] => this.state.evidence_sufficiency_reports.filter(r => r.tenantId === tenantId),
    create: (data: Omit<EvidenceSufficiencyReport, 'id'>): EvidenceSufficiencyReport => {
      const rep: EvidenceSufficiencyReport = {
        ...data,
        id: `esr_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.evidence_sufficiency_reports.push(rep);
      this.saveToStorage();
      this.notify('all');
      return rep;
    }
  };

  // 16. SELF REFLECTION AUDITS
  public self_reflection_audits = {
    getAll: (): SelfReflectionAudit[] => [...this.state.self_reflection_audits],
    getByTenant: (tenantId: string): SelfReflectionAudit[] => this.state.self_reflection_audits.filter(a => a.tenantId === tenantId),
    create: (data: Omit<SelfReflectionAudit, 'id'>): SelfReflectionAudit => {
      const aud: SelfReflectionAudit = {
        ...data,
        id: `sra_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.self_reflection_audits.push(aud);
      this.saveToStorage();
      this.notify('all');
      return aud;
    }
  };

  // 17. KNOWLEDGE GAP TASKS
  public knowledge_gap_tasks = {
    getAll: (): KnowledgeGapTask[] => [...this.state.knowledge_gap_tasks],
    getByTenant: (tenantId: string): KnowledgeGapTask[] => this.state.knowledge_gap_tasks.filter(a => a.tenantId === tenantId),
    create: (data: Omit<KnowledgeGapTask, 'id'>): KnowledgeGapTask => {
      const item: KnowledgeGapTask = {
        ...data,
        id: `gpk_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.knowledge_gap_tasks.push(item);
      this.saveToStorage();
      this.notify('all');
      return item;
    },
    updateStatus: (id: string, status: 'pending' | 'resolving' | 'resolved', rate: number): KnowledgeGapTask => {
      const idx = this.state.knowledge_gap_tasks.findIndex(t => t.id === id);
      if (idx === -1) throw new Error(`Knowledge gap task ${id} not found`);
      const updated = { ...this.state.knowledge_gap_tasks[idx], status, resolutionRateScore: rate };
      this.state.knowledge_gap_tasks[idx] = updated;
      this.saveToStorage();
      this.notify('all');
      return updated;
    }
  };

  // 18. EVIDENCE COLLECTION PLANS
  public evidence_collection_plans = {
    getAll: (): EvidenceCollectionPlan[] => [...this.state.evidence_collection_plans],
    getByTenant: (tenantId: string): EvidenceCollectionPlan[] => this.state.evidence_collection_plans.filter(a => a.tenantId === tenantId),
    create: (data: Omit<EvidenceCollectionPlan, 'id'>): EvidenceCollectionPlan => {
      const item: EvidenceCollectionPlan = {
        ...data,
        id: `evp_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.evidence_collection_plans.push(item);
      this.saveToStorage();
      this.notify('all');
      return item;
    },
    markCollected: (id: string, isCollected: boolean): EvidenceCollectionPlan => {
      const idx = this.state.evidence_collection_plans.findIndex(p => p.id === id);
      if (idx === -1) throw new Error(`Evidence collection plan ${id} not found`);
      const updated = { ...this.state.evidence_collection_plans[idx], isCollected };
      this.state.evidence_collection_plans[idx] = updated;
      this.saveToStorage();
      this.notify('all');
      return updated;
    }
  };

  // 19. INVESTIGATION CASES
  public investigation_cases = {
    getAll: (): InvestigationCase[] => [...this.state.investigation_cases],
    getByTenant: (tenantId: string): InvestigationCase[] => this.state.investigation_cases.filter(a => a.tenantId === tenantId),
    create: (data: Omit<InvestigationCase, 'id'>): InvestigationCase => {
      const item: InvestigationCase = {
        ...data,
        id: `cas_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.investigation_cases.push(item);
      this.saveToStorage();
      this.notify('all');
      return item;
    },
    updateStage: (id: string, stageIndex: number, status: 'open' | 'investigating' | 'closed', summary?: string): InvestigationCase => {
      const idx = this.state.investigation_cases.findIndex(c => c.id === id);
      if (idx === -1) throw new Error(`Investigation case ${id} not found`);
      const updated = { ...this.state.investigation_cases[idx], currentStageIndex: stageIndex, status };
      if (summary !== undefined) updated.findingsSummary = summary;
      this.state.investigation_cases[idx] = updated;
      this.saveToStorage();
      this.notify('all');
      return updated;
    }
  };

  // 20. CURIOSITY EVENTS
  public curiosity_events = {
    getAll: (): CuriosityEvent[] => [...this.state.curiosity_events],
    getByTenant: (tenantId: string): CuriosityEvent[] => this.state.curiosity_events.filter(a => a.tenantId === tenantId),
    create: (data: Omit<CuriosityEvent, 'id'>): CuriosityEvent => {
      const item: CuriosityEvent = {
        ...data,
        id: `cur_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.curiosity_events.push(item);
      this.saveToStorage();
      this.notify('all');
      return item;
    }
  };

  // 21. CONTRARIAN HYPOTHESES
  public contrarian_hypotheses = {
    getAll: (): ContrarianHypothesis[] => [...this.state.contrarian_hypotheses],
    getByTenant: (tenantId: string): ContrarianHypothesis[] => this.state.contrarian_hypotheses.filter(a => a.tenantId === tenantId),
    create: (data: Omit<ContrarianHypothesis, 'id'>): ContrarianHypothesis => {
      const item: ContrarianHypothesis = {
        ...data,
        id: `con_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.contrarian_hypotheses.push(item);
      this.saveToStorage();
      this.notify('all');
      return item;
    }
  };

  // 22. COMPETING EXPLANATIONS
  public competing_explanations = {
    getAll: (): CompetingExplanation[] => [...this.state.competing_explanations],
    getByTenant: (tenantId: string): CompetingExplanation[] => this.state.competing_explanations.filter(a => a.tenantId === tenantId),
    create: (data: Omit<CompetingExplanation, 'id'>): CompetingExplanation => {
      const item: CompetingExplanation = {
        ...data,
        id: `comp_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.competing_explanations.push(item);
      this.saveToStorage();
      this.notify('all');
      return item;
    }
  };

  // 23. BELIEF UPDATES
  public belief_updates = {
    getAll: (): BeliefUpdate[] => [...this.state.belief_updates],
    getByTenant: (tenantId: string): BeliefUpdate[] => this.state.belief_updates.filter(a => a.tenantId === tenantId),
    create: (data: Omit<BeliefUpdate, 'id'>): BeliefUpdate => {
      const item: BeliefUpdate = {
        ...data,
        id: `bel_${Math.random().toString(36).substring(2, 11)}`
      };
      this.state.belief_updates.push(item);
      this.saveToStorage();
      this.notify('all');
      return item;
    }
  };
}

export const dbEngine = new DatabaseEngine();
