/**
 * AI Commerce OS - Data Types
 */

export type IndustryType = 
  | 'retail' 
  | 'food' 
  | 'education' 
  | 'healthcare' 
  | 'service' 
  | 'manufacturing'
  | 'fashion_wholesale' 
  | 'restaurant_takeout' 
  | 'general_merch_electronics' 
  | 'beauty_booking' 
  | 'ecommerce_store' 
  | 'pos_retail';

export interface TenantConfig {
  id: string;
  companyName: string;
  industry: IndustryType;
  storeName: string;
  createdAt: string;
  status: 'active' | 'suspended';
  aiBudget: number; // in USD
  aiSpent: number; // in USD
}

export interface Metric {
  name: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minStockThreshold: number;
  price: number;
  sales: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  category?: string;
  brand?: string;
}

export interface OrderItem {
  id: string;
  customerName: string;
  contact: string;
  total: number;
  status: 'Pending' | 'AI Confirmed' | 'Shipped' | 'Refund Requested' | 'Refunded' | 'Completed' | 'Cancelled';
  createdAt: string;
  riskScore: number; // 0 to 100 calculated by AI
  shippingAddress?: string;
  paymentMethod?: string;
  items?: { productId?: string; sku?: string; name: string; price: number; quantity?: number; qty?: number }[];
}

export interface AIEmployee {
  id: string;
  name: string;
  title: string;
  role: string;
  status: 'Idle' | 'Analyzing' | 'Running Workflow' | 'Responding' | 'Offline';
  emoji: string;
  description: string;
  capabilities: string[];
  systemPrompt: string;
  model: string;
  tasksCompleted: number;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'ai_decision';
  title: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  details: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  nodes: WorkflowNode[];
  active: boolean;
  frequency: string;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  category: string;
  content: string;
  size: string;
  lastUpdated: string;
}

export interface McpTool {
  id: string;
  name: string;
  category: 'Shopify' | 'Marketing' | 'WMS' | 'CRM' | 'Finance';
  description: string;
  parameters: string[];
  status: 'connected' | 'disconnected';
}

export interface CollaborationLog {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  details: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'tool';
}

export interface AppMarketItem {
  id: string;
  name: string;
  developer: string;
  icon: string;
  price: string;
  rating: number;
  category: 'Agent' | 'Workflow' | 'Plugin' | 'Knowledge Pack';
  description: string;
  installed: boolean;
}

export interface SourcingRecommendation {
  name: string;
  sku: string;
  price: number;
  wholesaleCost: number;
  marginPct: number;
  targetDemand: string;
  trendReason: string;
  audience: string;
  profitabilityAnalysis: string;
  estMonthlySales: number;
  synced?: boolean;
}

export interface CustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: '普通会员' | '白银会员' | '黄金会员' | '白金会员' | '钻石会员';
  points: number;
  tags: string[];
  totalSpend: number;
  orderCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
  lastOrderAt?: string;
}

// SaaS Operator & Super Admin Types
export interface SaaSPlan {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  priceMonthly: number;
  transactionFeePct: number;
  dailyApiLimit: number;
  storageLimitGb: number;
  grantedAiTokens: number;
  features: string[];
}

export interface PaymentGatewayConfig {
  id: 'stripe' | 'adyen' | 'base_usdc' | 'custom';
  name: string;
  publicKey: string;
  secretKey: string;
  commissionPct: number;
  status: 'active' | 'inactive';
  supportedRegions: string[];
}

export interface SmsMailChannelConfig {
  id: 'twilio' | 'sendgrid' | 'custom_smtp';
  name: string;
  apiKey: string;
  senderId: string;
  remainingCredits: number;
  status: 'active' | 'inactive';
  lowBalanceThreshold: number;
}

export interface AppInstallationTrace {
  appId: string;
  appName: string;
  tenantId: string;
  tenantName: string;
  installedAt: string;
  permissionsGranted: string[];
  status: 'authorized' | 'revoked';
}

export interface PlatformGlobalAiConfig {
  defaultModel: string;
  systemSafeguardPrompt: string;
  maxDailyTokenPool: number;
  currentTokensUsed: number;
  unauthorizedBlockText: string;
}

import { AIContext } from './types/AIContext';
export type { AIContext };

export enum UserRole {
  PLATFORM_ADMIN = 'platform_admin',
  MERCHANT_OWNER = 'merchant_owner',
  MANAGER = 'manager',
  STAFF = 'staff',
  CUSTOMER = 'customer'
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  role: UserRole;
  activeTenantId: string | null;
  emailVerified: boolean;
  createdAt: string;
  passwordHash?: string;
  sessionToken?: string;
}

export interface Tenant {
  id: string;
  name: string;
  branding: {
    primaryColor: string;
    logoUrl?: string;
  };
  billingPlan: string;
  billingStatus: string;
  ownerId: string;
  status: string;
  createdAt: string;
  teamMembers: {
    userId: string;
    role: UserRole;
  }[];
}

export interface Store {
  id: string;
  tenantId: string;
  name: string;
  domain: string;
  branding: {
    logoUrl?: string;
    coverUrl?: string;
  };
  theme: string;
  createdAt: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  inventory: number;
  sku: string;
  variants?: {
    name: string;
    options: string[];
  }[];
  createdAt: string;
}

export enum OrderStatus {
  PENDING = 'Pending',
  PAID = 'Paid',
  SHIPPED = 'Shipped',
  REFUNDED = 'Refunded',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  AI_CONFIRMED = 'AI Confirmed',
  REFUND_REQUESTED = 'Refund Requested'
}

export interface Order {
  id: string;
  storeId: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    selectedVariant?: Record<string, string>;
  }[];
  status: OrderStatus;
  total: number;
  paymentStatus: 'Unpaid' | 'Paid' | 'Refunded';
  paymentId?: string;
  paymentMethod?: string;
  shippingAddress: string;
  createdAt: string;
}

export interface FinanceRecord {
  id: string;
  tenantId: string;
  storeId: string;
  type: 'Revenue' | 'Expense';
  amount: number;
  category: string;
  description: string;
  orderId?: string;
  createdAt: string;
}

export interface AIAgent {
  id: string;
  tenantId: string;
  name: string;
  role: string;
  state: 'idle' | 'analyzing' | 'running_workflow' | 'responding' | 'offline';
  avatarUrl: string;
  memory: string[];
  systemPrompt: string;
  createdAt: string;
  assignedStoreId: string;
}

export interface TaskQueueItem {
  id: string;
  agentId: string;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  details: string;
  createdAt: string;
}

export interface KnowledgeItem {
  id: string;
  tenantId: string;
  title: string;
  content: string;
  score?: number;
  createdAt: string;
}

// Enterprise Self-Awareness Program (Phases 143 ~ 150) Types
export interface EnterpriseUncertaintyLog {
  id: string;
  tenantId: string;
  timestamp: string;
  targetMetric: string;
  predictedValue: string;
  confidence: number;       // 0.0 to 1.0 representing certainty level
  uncertainty: number;      // 0.0 to 1.0 representing margin of doubt/error
  unknownFactors: string[]; // Known unknowns influencing this prediction
  source: string;           // File, agent, or mechanism generating this
  evidenceId: string;       // Unique reference to raw audit evidence
  validationId: string;     // Unique validation ID for audit trail
}

export interface KnowledgeBoundaryEvent {
  id: string;
  tenantId: string;
  timestamp: string;
  queryTopic: string;
  knownCoverage: number;     // calculated content presence ratio 
  unknownCoverage: number;   // calculated missing content ratio
  missingEvidence: string[]; // Specific files/facts that are missing
  insufficientData: boolean;// Flag indicating if the decision should be blocked
  source: string;
  evidenceId: string;
  validationId: string;
}

export interface DecisionHumilityRecord {
  id: string;
  tenantId: string;
  timestamp: string;
  decisionToken: string;
  originalRating: number;    // original intent score
  finalRating: number;       // score after humidity adjustments
  confidencePenalty: number; // deducted points due to lack of samples or high conflict
  sampleCount: number;       // number of historical records found 
  conflictLevel: number;     // 0.0 to 1.0 internal conflict metric
  source: string;
  evidenceId: string;
  validationId: string;
}

export interface FailurePredictionLog {
  id: string;
  tenantId: string;
  timestamp: string;
  scenarioTitle: string;
  failureProbability: number; // estimated risk of failure (0.0 to 1.0)
  failureImpact: 'low' | 'medium' | 'high' | 'critical';
  mitigationSteps: string[];
  source: string;
  evidenceId: string;
  validationId: string;
}

export interface BlindSpotDiscovery {
  id: string;
  tenantId: string;
  timestamp: string;
  focusArea: string;
  blindSpotDetails: string;
  missingVariables: string[];
  investigationTasks: {
    id: string;
    description: string;
    assignedTo: string;
    isCompleted: boolean;
  }[];
  source: string;
  evidenceId: string;
  validationId: string;
}

export interface EvidenceSufficiencyReport {
  id: string;
  tenantId: string;
  timestamp: string;
  conclusionTarget: string;
  evidenceCoverage: number; // 0.0 to 1.0
  evidenceStrength: number; // 0.0 to 1.0
  isApproved: boolean;      // blocked if coverage/strength is too weak
  blockReason?: string;
  source: string;
  evidenceId: string;
  validationId: string;
}

export interface SelfReflectionAudit {
  id: string;
  tenantId: string;
  timestamp: string;
  scope: 'decision' | 'forecast' | 'reasoning';
  critiqueDetails: string;
  ratingScore: number;      // self-given score based on rigorous metric (0 to 100)
  actionableImprovements: string[];
  source: string;
  evidenceId: string;
  validationId: string;
}

// ==========================================
// ECOS Autonomous Discovery Program (Phases 151 ~ 158) Types
// ==========================================

export interface KnowledgeGapTask {
  id: string;
  tenantId: string;
  timestamp: string;
  gapTopic: string;
  targetEvidenceNeeded: string;
  status: 'pending' | 'resolving' | 'resolved';
  resolutionRateScore: number; // 0 to 100 tracking closure completion
  source: string;
  evidenceId: string;
  validationId: string;
}

export interface EvidenceCollectionPlan {
  id: string;
  tenantId: string;
  timestamp: string;
  gapTaskId: string;
  planTitle: string;
  plannedEvidenceItems: string[];
  importance: 'high' | 'medium' | 'low';
  estimatedValueScore: number; // 1 to 100 predictive value
  isCollected: boolean;
  source: string;
  evidenceId: string;
  validationId: string;
}

export interface InvestigationCase {
  id: string;
  tenantId: string;
  timestamp: string;
  caseTitle: string;
  associatedGapTaskId: string;
  status: 'open' | 'investigating' | 'closed';
  stages: string[];
  currentStageIndex: number;
  findingsSummary: string;
  source: string;
  evidenceId: string;
  validationId: string;
}

export interface CuriosityEvent {
  id: string;
  tenantId: string;
  timestamp: string;
  triggerAnomaly: string;
  anomalyMagnitude: number; // custom volatility size metric
  curiosityScore: number;   // 1 to 100 system interest multiplier
  proposedHypothesis: string;
  source: string;
  evidenceId: string;
  validationId: string;
}

export interface ContrarianHypothesis {
  id: string;
  tenantId: string;
  timestamp: string;
  associatedAnomalousEvent: string;
  mainstreamBelief: string;
  contrarianAssertion: string;
  validationTestCriteria: string;
  oppositeConfidenceScore: number; // 0 to 100 rating
  source: string;
  evidenceId: string;
  validationId: string;
}

export interface CompetingExplanation {
  id: string;
  tenantId: string;
  timestamp: string;
  targetAnomaly: string;
  explanationA: string;
  scoreA: number; // 0 to 100
  explanationB: string;
  scoreB: number; // 0 to 100
  explanationC: string;
  scoreC: number; // 0 to 100
  winningExplanation: 'A' | 'B' | 'C' | 'none';
  source: string;
  evidenceId: string;
  validationId: string;
}

export interface BeliefUpdate {
  id: string;
  tenantId: string;
  timestamp: string;
  beliefSubject: string;
  previousUnderstanding: string;
  newUnderstanding: string;
  beliefChangeMagnitude: number; // 0 to 100 tracking learning shift scale
  source: string;
  evidenceId: string;
  validationId: string;
}






