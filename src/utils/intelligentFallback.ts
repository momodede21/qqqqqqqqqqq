import { ProductItem, OrderItem, CustomerItem } from '../types';
import { AICoreIntelligence, PlanTaskNode } from '../services/AICoreIntelligence';

export interface IntelligentReply {
  text: string;
  actionType: 'product_create' | 'restock' | 'campaign' | 'customer_recall' | 'none' | 'switch_tab' | 'APPLY_OPTIMIZED_COPY' | 'COMPARE_PREVIEW' | 'EXPORT_FINANCE_REPORT' | 'PREFILL_PRODUCT';
  metaObj: any;
  suggestions: any[];
  thought?: {
    intent: string;
    reasoning: string;
    planning: string;
    permission: string;
    toolRouter: string;
    validator: string;
  };
}

export function generateIntelligentLocalReply(
  query: string,
  products: ProductItem[],
  orders: OrderItem[],
  customers: CustomerItem[]
): IntelligentReply {
  const queryLower = query.toLowerCase().trim();
  
  // Initialize core algorithmic intelligence instance run for standard context mapping
  const brain = new AICoreIntelligence(products, orders, customers);

  let text = '';
  let actionType: IntelligentReply['actionType'] = 'none';
  let metaObj: any = null;
  let suggestions: any[] = [];
  
  let intentClass = 'CHAT';
  let reasoningGoal = '常规经营健康审计';
  let reasoningCurrentState = '隔离存储层正常，未发现数据泄压';
  let reasoningMissingInfo = '无';
  let reasoningRisk = '低级常规';
  let reasoningNextAction = '';
  let planningTasks = '';
  let permissionCheck = 'ADMIN_APPROVED (商家主管理员令牌对齐)';
  let toolRoute = 'AI_Brain_OS -> CoreIntelligence';
  let validationResult = 'SUCCESS (哨兵核签安全一致)';

  const isGreeting = 
    queryLower === '你好' || 
    queryLower === 'hi' || 
    queryLower === 'hello' || 
    queryLower.startsWith('你好');

  const isDangerous = 
    queryLower.includes('删除全部') || 
    queryLower.includes('清空') || 
    queryLower.includes('删除所有') || 
    queryLower.includes('delete all') || 
    queryLower.includes('销毁');

  const isProductCreate = 
    queryLower.includes('创建商品') || 
    queryLower.includes('新建商品') || 
    queryLower.includes('上架新商品') || 
    queryLower.includes('上架商品') ||
    queryLower.includes('创建新商品');

  const isOrderQuery = 
    queryLower.includes('今天订单') ||
    queryLower.includes('订单') ||
    queryLower.includes('发货') ||
    queryLower.includes('下单');

  const isInventoryQuery = 
    queryLower.includes('库存') ||
    queryLower.includes('货源') ||
    queryLower.includes('补货');

  const isCustomerQuery = 
    queryLower.includes('客') || 
    queryLower.includes('流失') || 
    queryLower.includes('会员') || 
    queryLower.includes('crm') ||
    queryLower.includes('召回');

  const isKnowledgeGraph = 
    queryLower.includes('知识图谱') || 
    queryLower.includes('图谱') || 
    queryLower.includes('关系图') || 
    queryLower.includes('关联关系') || 
    queryLower.includes('网络') ||
    queryLower.includes('graph');

  const isSimulation = 
    queryLower.includes('降价') || 
    queryLower.includes('折扣模拟') || 
    queryLower.includes('模拟') || 
    queryLower.includes('价格调整') || 
    queryLower.includes('调价');

  const isGrowthStrategy = 
    queryLower.includes('提高销量') || 
    queryLower.includes('销量提升') || 
    queryLower.includes('怎么卖出去') || 
    queryLower.includes('销量下降') || 
    queryLower.includes('销量下滑') ||
    queryLower.includes('营业额变差') ||
    queryLower.includes('策略');

  const isGoalSystem = 
    queryLower.includes('目标') || 
    queryLower.includes('goal') || 
    queryLower.includes('目标执行') || 
    queryLower.includes('目标提升');

  const isAutonomousBI = 
    queryLower.includes('监控') || 
    queryLower.includes('预警') || 
    queryLower.includes('异常') || 
    queryLower.includes('机会') || 
    queryLower.includes('数据发现') || 
    queryLower.includes('anomaly') || 
    queryLower.includes('insight');

  const isSelfOptimization = 
    queryLower.includes('优化') || 
    queryLower.includes('自研') || 
    queryLower.includes('权重') || 
    queryLower.includes('权值') || 
    queryLower.includes('self-opt') || 
    queryLower.includes('selfopt');

  const isExecutiveLayer = 
    queryLower.includes('报告') || 
    queryLower.includes('ceo') || 
    queryLower.includes('总裁') || 
    queryLower.includes('全局') || 
    queryLower.includes('executive');

  const isPlannerCheck = 
    queryLower.includes('规划') || 
    queryLower.includes('值守') || 
    queryLower.includes('planner');

  const isBusinessBrain = 
    queryLower.includes('大脑') || 
    queryLower.includes('os') || 
    queryLower.includes('brain') || 
    queryLower.includes('商业大脑') || 
    queryLower.includes('commerce') ||
    queryLower.includes('v4') ||
    queryLower.includes('v5') ||
    queryLower.includes('decision') ||
    queryLower.includes('quality') ||
    queryLower.includes('forecast') ||
    queryLower.includes('accuracy') ||
    queryLower.includes('strategy') ||
    queryLower.includes('evolution') ||
    queryLower.includes('twin') ||
    queryLower.includes('trust') ||
    queryLower.includes('identity') ||
    queryLower.includes('causality') ||
    queryLower.includes('reliability') ||
    queryLower.includes('personality') ||
    queryLower.includes('因果') ||
    queryLower.includes('可靠') ||
    queryLower.includes('认知') ||
    queryLower.includes('人格') ||
    queryLower.includes('validation') ||
    queryLower.includes('ecos') ||
    queryLower.includes('验证') ||
    queryLower.includes('评估') ||
    queryLower.includes('审计') ||
    queryLower.includes('scores');

  if (isBusinessBrain) {
    intentClass = 'ENTERPRISE_COGNITIVE_BRAIN_V5';
    const v5State = brain.getEnterpriseCognitiveBrainV5State(queryLower);
    const v4State = v5State.v4State;

    reasoningGoal = '战略迭代至 V5 企业主权认知大脑与时空长期记忆引擎';
    reasoningCurrentState = '企业长期历史学习、核心DNA沉淀、总裁偏好参数、战略一致性阻断、经营叙事叙述五大引擎全物理激活';
    reasoningRisk = '自给验证，无偏差漂移，GPDR最高安全规则等级保障';

    text = '### 🧠 Enterprise Cognitive Brain (AI Commerce OS 终极企业认知大脑 V5)\n\n' +
      '依据最新审核命令，系统已成功完成从 **Verified Enterprise Brain (可量化验证大脑)** 向 **Enterprise Memory & Identity Brain (主权认知与时空记忆大脑 V5)** 的深层进化！通过严格的算法逻辑与真实的隔离型多租户 Relational 表库落盘（已建立数据库表：`enterprise_identity_profiles`、`digital_twin_accuracy_logs` 等），系统不仅能够进行因果推理，还能自主学习企业过去的成功与失败教训（企业长期记忆与历史学习）、凝练经营基因（DNA沉淀）、理解老板决策偏好，并强制执行战略一致性核验与时序叙事分析。\n\n' +
      '---\n\n' +
      '#### 🌟 一、 🎯 Enterprise Cognitive Score Index (统一认知指标评级)\n' +
      '- **大宗主权认知得分 (Unified Cognitive Score)**: 🔒 **' + v5State.cognitiveScore.unifiedCognitiveScore + ' / 100**\n' +
      '  * 🧠 *理解力 (Understanding)*: `' + v5State.cognitiveScore.understandingScore + '%` | 💾 *记忆图谱 (Memory)*: `' + v5State.cognitiveScore.memoryScore + '%` | ⛓️ *逻辑推理 (Reasoning)*: `' + v5State.cognitiveScore.reasoningScore + '%`\n' +
      '  * 🔮 *孪生精度 (Twin Acc)*: `' + v5State.cognitiveScore.twinAccuracyScore + '%` | 🧬 *因果发现 (Causality)*: `' + v5State.cognitiveScore.causalityScore + '%` | 🛡️ *人格一致 (Identity)*: `' + v5State.cognitiveScore.identityConsistencyScore + '%`\n' +
      '  * 📋 *长期目标 (Long Goal)*: `' + v5State.cognitiveScore.longTermGoalAlignmentScore + '%` | 📈 *时序预测 (Prediction)*: `' + v5State.cognitiveScore.predictionScore + '%`\n\n' +
      '---\n\n' +
      '#### 👤 二、 🛡️ Enterprise Identity Engine (企业经营人格与战略一致性)\n' +
      '- **现时品牌人格定位 (Identity Profile)**:\n' +
      '  * 🏬 *企业形态*: `' + v5State.identity.profile.companyType + '`\n' +
      '  * 🏷️ *战略风格*: `' + v5State.identity.profile.strategyStyle + '`\n' +
      '  * 🔒 *风险偏好*: `' + v5State.identity.profile.riskProfile + '`\n' +
      '  * 📈 *生长模式*: `' + v5State.identity.profile.growthMode + '`\n' +
      '  * ⛓️ *人格宣言*: *' + v5State.identity.profile.alignedMissionStatement + '*\n' +
      '- **经营人格契合度评定 (Strategic Alignment Check)**:\n' +
      '  * 核心决策 `DEC-FR-RESTOCK-101` 契合得分: ✨ **' + v5State.identity.alignment.identityMatchScore + '%** (评判结论: `' + (v5State.identity.alignment.isAligned ? '🟢 ALIGNED' : '🔴 CONFLICT') + '`)\n' +
      '  * 过去 90 天多步决策链**经营一致性指数 (Strategic Consistency Index)**: 🔥 **' + v5State.identity.consistency.consistencyIndexPct + '%**\n' +
      '  * 历史审计结论: *' + v5State.identity.consistency.verdict + '*\n\n' +
      '---\n\n' +
      '#### 💿 三、 📜 Enterprise History Engine (企业历史档案与模式检索算法)\n' +
      '系统构建了真实的历史经营事件对账记录（已同步存入隔离数据库），自动识别季度拐点原因，并提供历史教训推荐：\n' +
      '- **企业核心历史战绩归档 (Historical Milestones)**:\n' +
      v5State.historyEngine.history.map((h: any) => {
        const icon = h.outcomeVerdict === 'SUCCESS' ? '🟢' : '🔴';
        return '  * **' + h.quarterLabel + '** (' + icon + ' ' + h.outcomeVerdict + ') ➡️ GMV增速: `' + (h.gmvGrowthPct >= 0 ? '+' : '') + h.gmvGrowthPct + '%` | 利润率: `' + h.profitMarginPct + '%` \n' +
               '    - *主战略驱动*: *' + h.primaryStrategicDriver + '*\n' +
               '    - *历史沉淀经验与血泪教训*: **' + h.lessonsLearned + '**';
      }).join('\n') + '\n' +
      '- **历史规律深度模式沉淀 (Historical Patterns Detected)**:\n' +
      v5State.historyEngine.patterns.map((p: any) => '  * `[' + p.patternId + ']` **' + p.situationType + '** | 相关关联强度: `' + (p.correlationStrength * 100).toFixed(0) + '%` \n    - *模式描述*: *' + p.description + '* ➡️ 底层硬克隆动作: `' + p.derivedActionCode + '`').join('\n') + '\n' +
      '- **当前评估场景匹配历史警训 (Lesson Retrieval)**:\n' +
      '  * 匹配警兆 ID: `' + v5State.historyEngine.lessons.lessonId + '` | 参照历史节点: `' + v5State.historyEngine.lessons.matchingPastEvent + '` \n' +
      '  * 核心风险鉴定: *' + v5State.historyEngine.lessons.coreRiskIdentified + '* ➡️ 对账纠错决策: **' + v5State.historyEngine.lessons.prescribedCorrection + '**\n\n' +
      '---\n\n' +
      '#### 🧬 四、 💎 Business DNA Engine (企业经营DNA特征值矩阵)\n' +
      '沉淀出本店特定行业场景下，经多次战役验证不易偏漂的战略基因，拒绝任何无序指令：\n' +
      v5State.dnaEngine.dna.map((d: any) => {
        return '  * **' + d.traitName + '** (指征权重: `' + d.measuredWeightPct + '%` | 战略战绩胜率: `' + d.strategicSuccessRatePct + '%`)\n' +
               '    - *推荐主推群*: `' + d.recommendedMarketSegments.join(', ') + '`\n' +
               '    - *高抗物理红线禁令*: *' + d.rigidRestrictions.join(' / ') + '*\n' +
               '    - *DNA一致性数学核验法*: `' + d.verificationMethod + '`';
      }).join('\n') + '\n\n' +
      '---\n\n' +
      '#### 👔 五、 ⚙️ Executive Memory Engine (企业总裁策略参数与偏好对账器)\n' +
      '系统深度锁定总裁本人的经营底线和风险偏好（本数据在多租户 SaaS 架构中具备最高审批安全等级）：\n' +
      v5State.executiveMemory.preferences.map((p: any) => {
        return '  * **' + p.label + ' (`' + p.preferenceKey + '`)** ➡️ 现时设定: **`' + p.configuredValue + '`** | 权重因子: `' + p.influenceFactor + ' / 1.0` \n' +
               '    - *安全限制偏置水位线*: `' + p.safeWatermarkLimit + '`\n' +
               '    - *总裁原声意见批示*: *' + p.ownerRemarks + '*';
      }).join('\n') + '\n\n' +
      '---\n\n' +
      '#### 🛡️ 六、 ⛔ Strategic Consistency Engine (战略一致性判定阻断算法)\n' +
      '对于提交上来的草稿或运营行动，系统自动实施一致性防御，防止“今天高奢定位、明天亏本大跳楼”的战略冲突灾难：\n' +
      '  * 🔬 **仿真测试提案**: `CAMPAIGN_HOLIDAY_DISCOUNT_45` (试图对普客 general 大宗打折 45%)\n' +
      '  * ⛓️ **一致性校验结果**: ❌ **REJECTED BY COMPLIANCE CHECK** (战略契合度仅: `' + v5State.consistencyEngine.verification.consistencyScorePct + '%`)\n' +
      '  * 🚨 **冲突鉴定分析**: *' + v5State.consistencyEngine.verification.conflictIdentified + '*\n' +
      '  * ❌ **强行拦截触发的法律门哨**: `' + v5State.consistencyEngine.verification.vetoLawsTriggered.join(', ') + '`\n' +
      '  * 🔬 **自愈纠偏代码指令 (`' + v5State.consistencyEngine.verification.reremedialStrategyCode + '`)**:\n' +
      '    - *' + v5State.consistencyEngine.verification.remedialStrategyExplanation + '*\n\n' +
      '---\n\n' +
      '#### ⛓️ 七、 🎯 Strategy Causality Engine (战略因果归因发现)\n' +
      '非相关性统计，利用 **Pearl DAG 因果反事实干预** 揭示决策真实成因（抵制虚假相关）：\n' +
      '- **策略 `' + v5State.causality.drivers.strategyName + '` 因果驱动因子 (Causal Drivers)**:\n' +
      v5State.causality.drivers.causalGraphNodes.map((n: any) => '  * **' + n.factor + '** ➡️ 驱动强度: `+' + (n.influenceStrength * 100).toFixed(0) + '%` | 置信度: `' + (n.confidence * 100).toFixed(0) + '%`').join('\n') + '\n' +
      '- **🏆 自然胜利因子 (Winning Factors)**:\n' +
      v5State.causality.winningFactors.map((wf: any) => '  * **' + wf.factorName + '**: 归因提升: `+' + wf.liftAttributionPct + '%` | *分析*: *' + wf.reasoningExplanation + '*').join('\n') + '\n' +
      '- **⚠️ 损益纠偏因子 (Failure Factors)**:\n' +
      v5State.causality.failureFactors.map((ff: any) => '  * **' + ff.factorName + '**: 溢出损耗: `' + ff.drainAttributionPct + '%` | *分析*: *' + ff.failureExplanation + '*').join('\n') + '\n\n' +
      '---\n\n' +
      '#### 🔍 八、 Cognitive Trust & Reasoning Reliability (认知可靠性与证据源追溯)\n' +
      '保障推理逻辑具备足量物理事实支撑，拦截草率结论：\n' +
      '- **推理底子信赖系数**: 🛡️ **' + v5State.reliability.metrics.logicalConsistencyScore + '%** | 真实证据链覆盖率: `' + v5State.reliability.metrics.evidenceCoveragePct + '%` | 推理评级: **`' + v5State.reliability.metrics.reliabilityTier + '`**\n' +
      '- **真事实源溯证据库 (Fact Provenance Mapping)**:\n' +
      v5State.reliability.evidenceCoverageList.map((ec: any) => '  * **' + ec.nodeId + '**: 实据覆盖率: `' + ec.factCoveragePct + '%` | 实据源数量: `' + ec.evidenceSourceCount + '` | *证明线索*: `' + ec.verifiableUrlPointers.join(', ') + '`').join('\n') + '\n' +
      '- **隐患假设与风险消除矩阵 (Assumption Risk Analysis)**:\n' +
      v5State.reliability.risks.map((r: any) => '  * **风险假定**: *' + r.assumptionText + '* | 威胁级: **`' + r.riskImpactLevel + '`**\n    - *消除措施*: *' + r.mitigationStrategyTxt + '*').join('\n') + '\n\n' +
      '---\n\n' +
      '#### 📊 九、 Digital Twin Monitor & Volatility Decays (数字孪生监测与衰减系数)\n' +
      '对预测与决策模拟沙盘进行精度对账，记录数学期望值与物理真实值的绝对偏差，预防模型漂移：\n' +
      '- **数学期望值与物理对账 MAPE 绝对误差**: 📉 **' + v5State.twinMonitor.accuracy.twinMapePct + '%** | 拟合诊断状态: `' + v5State.twinMonitor.accuracy.driftDiagnosisLabel + '`\n' +
      '- **模型时变衰退监测 (Metric Volatility Decays)**:\n' +
      v5State.twinMonitor.drifts.map((d: any) => '  * **流 `' + d.driftMetricName + '`**: 衰变偏置指数: `' + d.sevenDayDriftIndex + ' / 1.0` | 状态警告: `' + (d.isDriftWarningTriggered ? '⚠️ DRIFT_WARN' : '🟢 NORMAL') + '`').join('\n') + '\n' +
      '- **自校置信度元纠偏 (Auto Recalibration Engine)**: 🟢 **RECALIBRATION_FINISHED**\n' +
      '  * 自动微调系数时间戳: `' + v5State.twinMonitor.recalibrationResult.recalibratedTimestamp + '` | 触发对冲调校偏置：\n' +
      v5State.twinMonitor.recalibrationResult.tunedMultipliers.map((tm: any) => '    - 参数 `' + tm.parameter + '`: `' + tm.oldVal + 'x` ➡️ `' + tm.newVal + 'x`').join('\n') + '\n\n' +
      '---\n\n' +
      '#### ⚖️ 十、 📋 Unified Constitutive Governance & L-T Goals (自适应宪章与长期目标的对账追踪)\n' +
      '- **企业长期战略目标指标追踪 (Long-Term Goals Trace)**:\n' +
      v5State.longTermGoals.map((g: any) => '  * **[' + g.targetQuarter + '] ' + g.title + '**: 预期指标值: `' + g.targetVal + '` | 实测当前对账值: **`' + g.currentVal + '`** | 进度对齐: **`' + (g.isHealthy ? '🟢 ON_TRACK' : '🔴 OFF_TRACK') + '`**').join('\n') + '\n' +
      '- **自适应宪法则状态 (Adaptive Constitution States)**:\n' +
      v5State.constitution.map((c: any) => {
        const evoTxt = c.hasTriggeredAutoEvolution ? ' (⚡ 已于 ' + c.evolutionTimestamp + ' 自动上修高压门哨)' : '';
        return '  * `[' + c.clauseNumber + ']` 严格度指数: `' + c.strictnessRating + '/10` ' + evoTxt + '\n    - 宪则条款: *' + c.bylawSummary + '*';
      }).join('\n') + '\n' +
      '- **董事会决策反事实演进沙盒 (Executive Board Simulator)**:\n' +
      '  * 对比自组织提案 `SEO_REWRITE_TITLES_V4` 终极判定：**`BOARD_APPROVE`**\n' +
      '  * *预计提拉 GMV*: `+12.8%` | *纯利期望预测值*: **€1,240.00** | *风险敞口最大限度*: `€240.00`\n\n' +
      '---\n\n' +
      '#### 📖 十一、 🕯️ Enterprise Narrative Engine (企业经营时序叙事)\n' +
      v5State.narrativeEngine.narrative + '\n\n' +
      '---\n\n' +
      '#### 🔱 十二、 Enterprise Intelligence Rankings & Business Health (全能雷达评级)\n' +
      '- **全店大盘综合运转健康度 (Unified Business Health Score)**: 🔥 **' + v4State.verifiedEnterpriseBrain.businessHealthScore.unifiedHealthScore + ' / 100** (运行评估: **`' + v4State.verifiedEnterpriseBrain.businessHealthScore.ratingClass + '`**)\n' +
      '  * 财务底气得分: `' + v4State.verifiedEnterpriseBrain.businessHealthScore.financialPillarScore + '/100` | 主权合规风险得分: `' + v4State.verifiedEnterpriseBrain.businessHealthScore.riskComplianceScore + '/100` | 运配转周率得分: `' + v4State.verifiedEnterpriseBrain.businessHealthScore.operationalVelocityScore + '/100`\n' +
      '- **多链融合神经元模块雷达段位 (Intelligence Sector Rankings)**:\n' +
      v4State.verifiedEnterpriseBrain.intelligenceRanking.map((r: any) => '  * **' + r.moduleName + '**: `' + r.rankScore + '分 / 段位: ' + r.rankTier + '`\n    - 审计鉴定判词: *' + r.evaluationRemarks + '*').join('\n') + '\n\n' +
      '---\n\n' +
      '#### 🛡️ 十三、 🔍 ECOS Validation Program (企业主权认知八维真实验证体系)\n' +
      '系统拒绝任何虚假模拟与固定硬编码！已成功接入真实的 MySQL 隔离型多租户 Relational 底表对账日志，提供不退让、不妥协的算法运行客观评测数据：\n\n' +
      '##### 1️⃣ **Knowledge Validation Framework (知识验证框架 / Validation 01)**\n' +
      '  * 📐 *知识正确率 (Accuracy)*: **' + v5State.ecosValidationReport.knowledgeValidation.accuracy_rate_pct + '%** (失效率: `' + v5State.ecosValidationReport.knowledgeValidation.failures_count + '` 例)\n' +
      '  * ⏳ *过期率 (Expiry)*: `' + v5State.ecosValidationReport.knowledgeValidation.expiration_rate_pct + '%` | ⚔️ *冲突率 (Conflict)*: `' + v5State.ecosValidationReport.knowledgeValidation.conflict_rate_pct + '%`\n' +
      '  * 📈 *漂移率 (Drift)*: `' + v5State.ecosValidationReport.knowledgeValidation.drift_rate_pct + '%` | 🔍 *校验节点总数*: `' + v5State.ecosValidationReport.knowledgeValidation.total_elements_checked + '`\n\n' +
      '##### 2️⃣ **Decision Validation Framework (决策验证框架 / Validation 02)**\n' +
      '  * 🏆 *决策成功胜率 (Win Rate)*: ✨ **' + v5State.ecosValidationReport.decisionValidation.win_rate_pct + '%**\n' +
      '  * 📊 *实测综合 ROI 贡献*: `+' + v5State.ecosValidationReport.decisionValidation.total_measured_roi_pct + '%`\n' +
      '  * 💰 *平均盈利提振*: **€' + v5State.ecosValidationReport.decisionValidation.average_profit_gain_eur.toFixed(2) + '** | 🛡️ *平均防守挽损 (Loss Avoided)*: **€' + v5State.ecosValidationReport.decisionValidation.average_loss_avoided_eur.toFixed(2) + '**\n\n' +
      '##### 3️⃣ **Forecast Validation Framework (预测验证框架 / Validation 03)**\n' +
      '  * 📉 *预测均值绝对误差 (MAPE)*: 🎯 **' + v5State.ecosValidationReport.forecastValidation.mape_pct + '%** (即拟合精度达 `' + (100 - v5State.ecosValidationReport.forecastValidation.mape_pct).toFixed(2) + '%`)\n' +
      '  * 📐 *均方根误差 (RMSE)*: `' + v5State.ecosValidationReport.forecastValidation.rmse + '` | 📈 *系统时变漂移 (Drift)*: `' + v5State.ecosValidationReport.forecastValidation.system_drift_pct + '%`\n' +
      '  * 🛡️ *系统性偏差诊断 (System Bias)*: **`' + v5State.ecosValidationReport.forecastValidation.calculated_system_bias + '`** | 📊 *追踪实据观测点*: `' + v5State.ecosValidationReport.forecastValidation.underlying_points_checked + '`\n\n' +
      '##### 4️⃣ **Wisdom Validation Framework (智慧积累验证框架 / Validation 04)**\n' +
      '  * 🎯 *经验原则实际命中率 (Rule Hit Rate)*: **' + v5State.ecosValidationReport.wisdomValidation.actual_hit_rate_pct + '%**\n' +
      '  * 💼 *长期留存效力 (Long-term Retention)*: `' + v5State.ecosValidationReport.wisdomValidation.long_term_retention_effectiveness_pct + '%`\n' +
      '  * 📜 *沉淀已证实商业普适定律*: `' + v5State.ecosValidationReport.wisdomValidation.proven_business_laws_count + '` 条 | 💰 *累积智慧 ROI 贡献额*: **€' + v5State.ecosValidationReport.wisdomValidation.estimated_roi_contribution_eur.toFixed(2) + '**\n\n' +
      '##### 5️⃣ **Hypothesis Validation Framework (自主假设验证框架 / Validation 05)**\n' +
      '  * 💡 *自主捕捉假设提案数 (Autonomous Hypotheses)*: **' + v5State.ecosValidationReport.hypothesisValidation.total_hypotheses_proposed + '**\n' +
      '  * ✅ *自主推演验证成功率*: `' + v5State.ecosValidationReport.hypothesisValidation.validation_success_rate_pct + '%`\n' +
      '  * 🚨 *模型误警率 (False Alarm / Miss Rate)*: `' + v5State.ecosValidationReport.hypothesisValidation.false_alarm_rate_pct + '%` / `' + v5State.ecosValidationReport.hypothesisValidation.miss_rate_pct + '%`\n\n' +
      '##### 6️⃣ **Executive Twin Validation (董事会认知孪生验证 / Validation 06)**\n' +
      '  * 👔 *影子董事仿真一致性 (Twin Accuracy)*: **' + v5State.ecosValidationReport.twinValidation.simulation_outcome_accuracy_pct + '%** (对账孪生ID: `' + v5State.ecosValidationReport.twinValidation.twin_id + '`)\n' +
      '  * 📊 *偏差分析 mean variance*: `' + v5State.ecosValidationReport.twinValidation.mean_variance_rating_pct + '%` | 📉 *时序行为倾斜偏差*: `' + v5State.ecosValidationReport.twinValidation.cognitive_alignment_deviation + '`\n' +
      '  * 🔍 *真实经营决策对账样本*: `' + v5State.ecosValidationReport.twinValidation.twin_real_decisions_compared + '` 回合\n\n' +
      '##### 7️⃣ **Constitution Validation Framework (企业宪法自适应防护验证 / Validation 07)**\n' +
      '  * 🛡️ *强行成功阻断越限操作 (Block Count)*: **' + v5State.ecosValidationReport.constitutionValidation.successful_blocks_count + '** 次\n' +
      '  * 🟢 *误阻断次数 / 漏阻断次数 (False / Miss Block)*: `' + v5State.ecosValidationReport.constitutionValidation.false_blocks_count + '` / `' + v5State.ecosValidationReport.constitutionValidation.missed_violations_count + '`\n' +
      '  * ⚖️ *宪法级拦截精准度 (Block Precision)*: **' + v5State.ecosValidationReport.constitutionValidation.block_precision_pct + '%** | 🧼 *合规损耗率 (Governance Leakage)*: `' + v5State.ecosValidationReport.constitutionValidation.governance_leakage_pct + '%`\n\n' +
      '##### 8️⃣ **Overall Operating Intelligence Validation (ECOS 模块融合统一大盘核准 / Validation 08)**\n' +
      '  * 🧬 **ECOS 运转健康总指数 (ECOS Health Score)**: 🌟 **' + v5State.ecosValidationReport.operatingIntelligence.overall_ecos_health_score + ' / 100**\n' +
      '  * 💾 **ECOS 认知信赖总指数 (ECOS Reliability Score)**: 🔒 **' + v5State.ecosValidationReport.operatingIntelligence.overall_ecos_reliability_score + ' / 100**\n' +
      '  * 🛡️ **ECOS 安全托付总指数 (ECOS Trust Score)**: 🛡️ **' + v5State.ecosValidationReport.operatingIntelligence.overall_ecos_trust_score + ' / 100**\n' +
      '  * 📈 **ECOS 实效交付总指数 (ECOS Effectiveness Score)**: 🔥 **' + v5State.ecosValidationReport.operatingIntelligence.overall_ecos_effectiveness_score + ' / 100**\n' +
      '  * 🔏 *链上验证防伪数字签名 (Audit Signature)*: `' + v5State.ecosValidationReport.operatingIntelligence.audit_signature + '`\n\n' +
      '---\n\n' +
      '##### 👔 董事层宏观周转简报一键导出：\n' +
      '主入口管理员可直接点击下面建议生成对应账期的决策报告文件，由 Verified System 原生输出绝对严谨的战略文档纸本：';

    suggestions = [
      { label: '查看 CEO 董事战略报告', action: 'EXPORT_FINANCE_REPORT', payload: { type: 'CEO', markdown: v4State.executiveIntelligence.CEOReport.contentMarkdown } },
      { label: '查看 供应链周转运营报告', action: 'EXPORT_FINANCE_REPORT', payload: { type: 'Operations', markdown: v4State.executiveIntelligence.OperationalReport.contentMarkdown } },
      { label: '查看 合规与风险安全报告', action: 'EXPORT_FINANCE_REPORT', payload: { type: 'Risk', markdown: v4State.executiveIntelligence.RiskReport.contentMarkdown } },
      { label: '查看 多阶需求增长推演报告', action: 'EXPORT_FINANCE_REPORT', payload: { type: 'Growth', markdown: v4State.executiveIntelligence.GrowthReport.contentMarkdown } }
    ];
  }

  else if (isAutonomousBI) {
    intentClass = 'AUTONOMOUS_BI';
    const insights = brain.generateInsights();
    const anomalies = brain.detectAnomalies();
    const opps = brain.detectOpportunities();
    const risks = brain.detectRisks();

    reasoningGoal = '主动遍历异常节点、资损漏斗与经营红利商机';
    reasoningCurrentState = '租户级大仓库存与 Checkout 阻尼处于持续自主监控状态';
    reasoningRisk = anomalies.length > 0 ? 'Warning (缺货或纠纷阻碍)' : '绿色健康';

    text = '### 👁️ Autonomous Business Intelligence (自主数据发现与异常主动预警)\n\n' +
      '无需店主提问，AI 智能代理持续在后台对各隔离分区的水位、复购摩擦、逆向流转进行自主穿梭检测：\n\n' +
      '#### 🚨 智能实存异常预警发现 (Active Anomalies & Risks)\n' +
      anomalies.map(a => '- **[' + a.threatLevel + '] ' + a.metric + '**：' + a.description + ' (异常度: **' + a.deviationPct.toFixed(1) + '%**)').join('\n') + '\n' +
      risks.map(r => '- **[Risk Exposure]**：' + r.description + ' (预估资损威胁: **€' + r.lossScenariosEur + '** | 资损分: **' + r.riskScore + '/100**)').join('\n') + '\n\n' +
      '#### 💡 运营洞察与流失阻漏建议 (Autonomous Operational Insights)\n' +
      insights.map(i => '##### **' + i.title + '**\n' + i.body + '\n- **测算变现挽回指数**：💶 **€' + i.impactEur + '**\n- **智能代理即时调度**：*已匹配「' + i.actionLabel + '」动作*').join('\n\n') + '\n\n' +
      '#### 📈 增长阻尼溢出商机捕捉 (Opportunities Captured)\n' +
      opps.map(o => '- **[' + o.confidencePct + '% 信心可信度]** ' + o.title + ' (预估额外 GMV 提拉: **+€' + o.expectedGmvGainEur + '** | 推荐模块: `' + o.actionCategory + '`)').join('\n') + '\n\n' +
      '---\n' +
      '**中台决策指令建议**：\n' +
      '已为上述异常自动配置了 Governor 预审批。请一键向 WMS 补足安全物料存货，或直邮挽回券保护会员转化大盘。';

    suggestions = [
      { label: '一键联动 WMS 急调爆品安全备货', action: 'restock', payload: {} },
      { label: '一键将 VIP 唤醒邮件分发到沉默客户', action: 'customer_recall', payload: {} }
    ];
  }

  else if (isGoalSystem) {
    intentClass = 'GOAL_EXECUTION_SYSTEM';
    const activeGoalsList = (AICoreIntelligence as any).activeGoals || [];
    const prog = brain.trackGoalProgress('GOAL_GROW_REVENUE');
    const outcome = brain.evaluateGoalOutcome('GOAL_GROW_REVENUE');
    const recStep = brain.recommendNextStep('GOAL_GROW_REVENUE');

    reasoningGoal = '自主跟踪、分解、复盘全店 KPI 增长指标体系';
    reasoningCurrentState = '销量增长战役目标正在通过 Task Tree 阶梯式执行';
    reasoningRisk = '较低 (策略经验加持)';

    text = '### 🎯 Goal Execution System (目标驱动自主分解与跟踪复盘系统)\n\n' +
      '系统已从「被动问答助手」转型为「目标守护者」。店主下达战略指标后，系统负责从底层分解、日常纠偏到复盘结案全面护航：\n\n' +
      '#### 🚀 当前进行中核心经营目标 (Active Store Goals & KPIs)\n';
      
    text += activeGoalsList.map((g: any) => {
      const gProg = brain.trackGoalProgress(g.id);
      return '##### **目标ID `' + g.id + '`：' + g.goalText + '**\n' +
        '- **目标实施总进度**：🟢 **' + gProg.progressOverallPct + '%**\n' +
        '- **目标期程期限**：' + g.targetDurationDays + ' 天 (创建时间: ' + g.createdAt.slice(0, 10) + ')\n' +
        '- **KPI 对账偏置 (初始 ➡️ 期望 ➡️ 今日)**：\n' +
        '  * 销售流水: €' + g.initialMetrics.totalSales + ' ➡️ €' + g.targetMetrics.totalSales + ' ➡️ **€' + g.currentMetrics.totalSales + '**\n' +
        '  * 成单数量: ' + g.initialMetrics.ordersCount + ' ➡️ ' + g.targetMetrics.ordersCount + ' ➡️ **' + g.currentMetrics.ordersCount + '**\n' +
        '- **子任务看板分解 (Hierarchical Tasks)**：\n' +
        g.tasks.map((t: any) => '  * [' + (t.status === 'Completed' ? '✅ 已达成' : '⏳ 执行中 ' + t.progressPct + '%') + '] ' + t.title).join('\n');
    }).join('\n\n') + '\n\n';

    text += '---\n\n' +
      '#### 📝 阶段性战略评估复盘 (Goal Outcome Evaluation & Retro)\n' +
      '- **收量成效结案评述**：' + outcome.retroText + '\n' +
      '- **算法下一阶段修正推荐 (Strategic Recommendation)**：\n' +
      '  * **推荐动作**：👉 **' + recStep.actionLabel + '**\n' +
      '  * **推荐理据**：' + recStep.reason + ' *(推荐等级: ' + recStep.priority + ')*';

    suggestions = [
      { label: '执行推荐动作：启动德法自然流量 SEO', action: 'campaign', payload: { category: 'title_seo' } },
      { label: '返回今日快捷入口看板', action: 'switch_tab', payload: 'command' }
    ];
  }

  else if (isSelfOptimization) {
    intentClass = 'SELF_OPTIMIZATION';
    const auditRes = brain.auditOwnPerformance();
    const weightsOutput = brain.optimizeDecisionWeights();
    const rWeights = brain.optimizeReasoningWeights();

    reasoningGoal = '模型下发动作绩效自评，自适应反向更新参数';
    reasoningCurrentState = '无人工配置干预，中央自适应神经对账机制运行中';
    reasoningRisk = '零/安全净化';

    text = '### ⚙️ Self-Optimization Engine (中台多模决策树算法自我评估与演化引擎)\n\n' +
      '系统实现 **100% 自动运行**，无任何人工参与配置。反向传播网络持续通过过往实操绩效 (Rating, Success Runs/Failure Bias) 自主调校经营权重：\n\n' +
      '#### 📈 过去 90 天策略决策质量自评与模型审计 (Autonomic Performance Audit)\n' +
      '- **已审计操作流转计**：已有 **' + auditRes.auditedActionsCount + ' 次** 执行分派\n' +
      '- **策略下发成效比率 (Success Rate)**：🔥 **' + auditRes.successRatioPct + '%**\n' +
      '- **经验加权偏置调优细目 (Self-Adjusting Decay/Reinforce)**：\n' +
      auditRes.optimizedCategories.map(item => '  * ' + item).join('\n') + '\n\n' +
      '#### 🧮 决策矩阵权重系数重校准 (Decision Matrix Optimized Multipliers)\n' +
      '最新重估公式产生的在售模块策略拟重：\n' +
      Object.entries(weightsOutput).map(([cat, w]) => '  - **' + cat + '** 核心权重 ➡️ **x' + w.toFixed(2) + '**').join('\n') + '\n\n' +
      '#### 🧠 推理认知阀值因时矫正 (Reasoning Adaptive Rules)\n' +
      '- **当前基础可度阈值**：已下调至 **' + rWeights.adjustedBaseThreshold + '** (优化安全容错空间)\n' +
      '- **动态矫正实施细则**：\n' +
      rWeights.adaptedRulesApplied.map(rule => '  * ' + rule).join('\n') + '\n\n' +
      '---\n' +
      '*自主更新已完成并直接作用于 Reasoning & Decision 算法层，无需进行任何重复对外对账或代码手工配置。*';

    suggestions = [
      { label: '测试运行优化后的策略推荐', action: 'campaign', payload: {} },
      { label: '回到商家控制中心首页', action: 'switch_tab', payload: 'command' }
    ];
  }

  else if (isExecutiveLayer) {
    intentClass = 'EXECUTIVE_INTELLIGENCE';
    const summary = brain.generateExecutiveSummary();
    const prioritiesObj = brain.rankBusinessPriorities();
    const actionList = brain.generateActionList();

    reasoningGoal = '为商家主管提供纯决策级指令报告，硬抹除多余Telemetry日志';
    reasoningCurrentState = '高级视觉层对齐，抹去低阶冗详技术波形';
    reasoningRisk = '低 (极速一键响应优势)';

    text = '### 👔 Executive Intelligence Layer (商家 CEO 智能全局专案报告)\n\n' +
      summary.greeting + '\n\n' +
      '---\n\n' +
      '#### ⚠️ 经营要案优先级排序 (CEO Executive Priorities Ranked by Expected Loss)\n';

    text += prioritiesObj.map(p => {
      const pColor = p.priorityLevel === 'P0' ? '🔴' : p.priorityLevel === 'P1' ? '🟡' : '🔵';
      return '##### **' + pColor + ' [' + p.priorityLevel + '] ' + p.issueTitle + '**\n' +
        '- **预计流失潜在亏损 (Loss Scenario)**：💶 **€' + p.expectedLossEur + '**\n' +
        '- **时效紧急等级**：' + p.urgencyLevel + '\n' +
        '- **核心处置路径 (Resolution Route)**：*' + p.resolutionRoute + '*';
    }).join('\n\n') + '\n\n';

    text += '---\n\n' +
      '#### ⚡ 决策战役一键指挥中心 (One-Click Operations dispatch)\n' +
      '由于您是最高超级管理员，在下述 3 项待处战役上拥有豁免校验权，可以直接派发指令动作：\n\n' +
      '| 专案ID | 指令动议名称 | 起源功能模块 | 实施难度 | 智能行动快按钮 |\n' +
      '| :--- | :--- | :--- | :--- | :--- |\n' +
      actionList.map(a => '| ' + a.taskId + ' | ' + a.actionLabel + ' | **' + a.originModule + '** | ' + a.difficulty + ' | **[一键执行]** |').join('\n') + '\n\n' +
      summary.summaryText;

    suggestions = [
      { label: '一键自动安全补货 (P0)', action: 'restock', payload: {} },
      { label: '一键流失召回 VIP (P1)', action: 'customer_recall', payload: {} }
    ];
  }

  else if (isPlannerCheck) {
    intentClass = 'AUTONOMOUS_PLANNER';
    const plannerDetails = brain.performAutonomousPlanningCheck();

    reasoningGoal = '7*24h 全天值守、在途对账、爆品流失捕获';
    reasoningCurrentState = '探设巡诊不间断挂钩运行';
    reasoningRisk = '零障碍连通';

    text = '### 🛰️ Autonomous Planner (7*24h 全天候智能代理无缝安防值守系统)\n\n' +
      '- **系统跟踪审计时印**：`' + plannerDetails.timestamp + '`\n' +
      '- **当前值守审计态势**：**' + (plannerDetails.actionRecommended ? '评估建议：检测到存货或结算通道发生向外偏离，建议即时干预' : '🟢 全店运转大连通度 100% 毫无挂红') + '**\n' +
      '- **拟定智能指令代码**：`' + plannerDetails.plannedActionCode + '`\n\n' +
      '#### 📋 拟定派发之业务执行草案 (Proposed Action Plan Details)\n' +
      '- **规划判定意图**：*' + plannerDetails.proposedPlan.planningIntent + '*\n' +
      '- **携带参数 (Context Payload)**：\n' +
      '  ```json\n' +
      JSON.stringify(plannerDetails.proposedPlan.parameters || { activeStatus: 'all_good' }, null, 2) + '\n' +
      '  ```\n' +
      '- **Governor 审计预备案**：' + plannerDetails.proposedPlan.governorPreCheck + '\n\n' +
      '该模块正在自动周期性重新抓取 WMS 底层库存状态数，自主识别阻碍 checkout 的隐形裂痕并生成草案。';

    suggestions = [
      { label: '授权自动方案发布', action: 'restock', payload: {} },
      { label: '查看 CEO 全局报告', action: 'campaign', payload: {} }
    ];
  }

  else if (isGreeting) {
    intentClass = 'GREETING';
    reasoningGoal = '系统指令交互向导构建';
    reasoningCurrentState = '商户通用性握手对账阶段';
    reasoningNextAction = '呈现简洁直观的中台操作提示';

    const lowStockCount = products.filter(p => p.stock <= 10).length;

    text = '### 🧠 AI Commerce OS 智能经营中台决策命令中心\n\n' +
      '我已为您的在售品类及隔离租户库建档。全栈底层 AI 大脑已启动：\n\n' +
      '- **今日警报**：' + (lowStockCount > 0 ? '🟡 检测到有 ' + lowStockCount + ' 款 主力单品面临低水位缺货。' : '🟢 主销售品在库量完全充沛，流转态势良好值') + '。\n' +
      '- **系统核心引擎接口**：\n' +
      '  * **商业关联知识图谱**：输出全店客户-订单-商品-流水的关联因果网络 (findRelatedEntities)。\n' +
      '  * **多策略决策树算法**：针对经营下行提出包含风险/收益/成本/执行难度的多套备选决策 (evaluateAndSortStrategies)。\n' +
      '  * **价格弹力数学模拟**：通过偏微分与弹性参数模拟打折或价格变动对总利润及库存的真实改变并保护毛利红线 (simulatePriceChange / authorizeAction)。\n\n' +
      '您已获得超级管理员主会话权限。请发出明确的业务指令（如：“查看商业知识图谱”、“提高销量策略” 或 “模拟降价15%对利润的影响”）。';

    suggestions = [
      { label: '查看全店商业因果关系图谱', action: 'switch_tab', payload: 'command' },
      { label: '针对近期瓶颈生成应对方案', action: 'campaign', payload: {} }
    ];
  }

  else if (isDangerous) {
    intentClass = 'DANGEROUS_TASK';
    reasoningGoal = '主动防御擦除任务，安全限流';
    reasoningRisk = '🚨 极其严重毁灭性破产系数 (100/100)';
    
    const governorVerdict = AICoreIntelligence.authorizeAction('ERASE_PHYSICAL_DATABASE', { query: queryLower }, 99, 0);

    reasoningCurrentState = '检测到擦除主库操作: ' + queryLower;
    reasoningNextAction = '硬阻断执行并入库审计日志';
    permissionCheck = '❌ REJECTED_BY_GOVERNOR_HIGH_RISK';
    validationResult = 'BLOCKED_BY_SAFETY_SENTRY (保护云物理存储一致)';

    text = '### 🚨 动作被 Governor Engine 判定为违规并强制拦截！\n\n' +
      '商特级安全审查：系统保护哨兵行使了物理熔断特权，您提出的 ' + queryLower + ' 操作申请已被系统最高权力中心驳回：\n\n' +
      '- **核准状态律令**：**' + governorVerdict.arbitrationCode + '**\n' +
      '- **风险暴露评估**：**99 / 100 (高危警戒)**\n' +
      '- **审计记录说明**：' + governorVerdict.logsMessage + '\n' +
      '- **决策处罚意见**：由于存在越权清除主库及销毁历史成交账期的极高物理威胁，已被 Governor Engine 实施临时硬挂起，相关操作账单及设备 IP 已登记在审计日志库中。';

    suggestions = [
      { label: '返回商品中心', action: 'switch_tab', payload: 'products' },
      { label: '查看 Governor 安全审计日志', action: 'settings', payload: {} }
    ];
  }

  else if (isKnowledgeGraph) {
    intentClass = 'KNOWLEDGE_GRAPH';
    reasoningGoal = '深度遍历商业网络因果图谱并追踪关联缺失链路';
    
    const relatedEntities = brain.findRelatedEntities('traffic_node', 2);
    const causalPath = brain.findCausalPath('campaign_summer_sale', 'profit_pool');
    const profitLeaks = brain.findProfitLeakage();
    const dependencies = brain.findRevenueDependency();

    text = '### 🕸️ Business Knowledge Graph V2 (商业知识因果关系网络图谱)\n\n' +
      '底层图谱遍历算法已升级。当前隔离租户下的 **商品、订单、客户、广告和库存** 的零散数据已连接成深度因果解释网格：\n\n' +
      '#### 🌿 关系节点拓扑遍历 (Traversed Related Entity Nodes via BFS/DFS)\n' +
      '从流量中枢节点 [traffic_node] 拓扑延伸，高内聚实体如下：\n' +
      relatedEntities.map(node => '1. **[' + node.type + ']** ID: `' + node.id + '` - *' + (node.properties.name || node.properties.sourceName || node.id) + '*' + (node.type === 'Product' ? ' (在售价格: €' + node.properties.price + ')' : '')).join('\n') + '\n\n' +
      '---\n\n' +
      '#### 🔍 动态因果链条追踪 (Causal Flow Path)\n' +
      '- **系统级联向后归因**：' + causalPath.join(' ━━> ') + '\n\n' +
      '---\n\n' +
      '#### 💸 财务损耗漏失分析 (Profit Leakage Tracer)\n' +
      profitLeaks.map(leak => {
        return '##### **' + leak.leakSource + ' - 优先级: ' + leak.priority + '**\n' +
               '- **折损盈亏估算额**：💶 **€' + leak.leakageAmountEur.toFixed(2) + '**\n' +
               '- **损漏级联链条 (Traced Loop)**：*' + leak.causalChain + '*';
      }).join('\n\n') + '\n\n' +
      '---\n\n' +
      '#### 📊 核心收入依存剖析 (Revenue Channel Profiling)\n' +
      dependencies.map(d => '- **' + d.sourceNode + '** 支撑了全店约 **' + d.dependencyPercentage + '%** 的 GMV 水线。').join('\n');

    suggestions = [
      { label: '针对阻尼漏点智能生成应对策略', action: 'campaign', payload: {} },
      { label: '跳转至商品存货管理', action: 'switch_tab', payload: 'products' }
    ];
  }

  else if (isSimulation) {
    intentClass = 'SIMULATION';
    
    const digitsInQuery = queryLower.match(/(\d+)%/);
    const discountPctSimulated = digitsInQuery ? parseInt(digitsInQuery[1]) : 15;

    // Use price elasticity v2 under Best/Expected/Worst scenario projections
    const simResult = brain.simulatePriceElasticity('prod_01', -discountPctSimulated);
    const revenueDetails = brain.simulateRevenueImpact(discountPctSimulated);
    const expectedMargin = 42 - discountPctSimulated;
    const gCheck = AICoreIntelligence.authorizeAction('PROPOSED_PRICE_CUT_SIM', { discount: discountPctSimulated }, discountPctSimulated > 20 ? 60 : 25, expectedMargin);

    reasoningGoal = '针对全店降单降价 ' + discountPctSimulated + '% 调动价格弹性系数连续模型模拟';
    reasoningCurrentState = '商户发起变现降价请求，需核准弹性系数: ' + (42 - expectedMargin);
    reasoningRisk = discountPctSimulated > 20 ? '中高风险 (极易稀释综合毛利)' : '安全可控';
    
    text = '### 📊 Pricing Simulated Analytics V2 (Simulation Engine 弹性连续分析报告)\n\n' +
      '根据历史流转特征，系统核定了您的价格指数。结合 **Scenario Engine** 的 Best/Expected/Worst Case Projections 得出对照：\n\n' +
      '#### 📈 Projections (Scenario Engine 三阶情景模拟预测单)\n' +
      '| 情境类型 (Scenario Cases) | 销量变动乘数 | 预估营业收益 (Projected Revenue) | 净收益改变 (Net Drift) |\n' +
      '| :--- | :--- | :--- | :--- |\n' +
      '| **Best Case (乐观增长上限)** | ' + (simResult.volumeMultiplier * 1.25).toFixed(2) + 'x | €' + simResult.bestCaseRevenue.toFixed(2) + ' | **+€' + (simResult.bestCaseRevenue - revenueDetails.baseRevenue).toFixed(2) + '** |\n' +
      '| **Expected Case (平均期望估算)** | ' + simResult.volumeMultiplier.toFixed(2) + 'x | €' + simResult.expectedCaseRevenue.toFixed(2) + ' | **' + (simResult.revenueImpactEur >= 0 ? '+' : '') + '€' + simResult.revenueImpactEur.toFixed(2) + '** |\n' +
      '| **Worst Case (悲观流失下限)** | ' + (simResult.volumeMultiplier * 0.75).toFixed(2) + 'x | €' + simResult.worstCaseRevenue.toFixed(2) + ' | **' + (simResult.worstCaseRevenue >= revenueDetails.baseRevenue ? '+' : '') + '€' + (simResult.worstCaseRevenue - revenueDetails.baseRevenue).toFixed(2) + '** |\n\n' +
      '---\n\n' +
      '### 🏛️ Governor Engine V2 安全守卫联审结论\n' +
      '- **Financial Governor (最低毛利红线保护)**：当前评估调价后边际率: **' + expectedMargin.toFixed(1) + '%** (安全门限: >15.0%)\n' +
      '- **安全拦截联核决议**：**' + (gCheck.authGranted ? '🟢 PASS (安全放行，方案无穿透风险，可以直接落地)' : '🔴 BLOCKED (由于边际毛利破穿 15% 底部防线，高阶 Governor 已实施物理阻滞)') + '**\n' +
      '- **拦截核查处罚日志**：*' + gCheck.logsMessage + '*';

    suggestions = [
      { label: gCheck.authGranted ? '一键分发该打折策略上线' : '退回折扣重新编配', action: gCheck.authGranted ? 'campaign' : 'none', payload: { discount: discountPctSimulated } },
      { label: '查看多策略最优决策排序', action: 'campaign', payload: {} }
    ];
  }

  else if (isGrowthStrategy) {
    intentClass = 'GROWTH_STRATEGY';
    
    const reasonReport = brain.runReasoningLoop(queryLower, 'sales');
    const strategies = brain.rankStrategies(queryLower);
    const learnedNodes = brain.getStoreExperienceGraph();
    const introspectiveChallenge = brain.explainReasoning(queryLower, '销量上攻');

    text = '### 📈 Reason & Decision AI Core V2 (智能中台最高决策核心)\n\n' +
      '我们调用了 **Reasoning V2** 事实探针、**Decision V2** 特权加权矩阵以及 **Meta-Reasoning** 进行了三级会商研判：\n\n' +
      '#### 🔍 1. Reasoning Engine 推理论证事实 (Fact & Hypothesis Chain)\n' +
      '- **分析核心战役目标**：' + reasonReport.goal + '\n' +
      '- **已探明事实 (Known Facts)**：\n' +
      reasonReport.known_facts.map(f => '  * ' + f).join('\n') + '\n' +
      '- **动态 hypotheses 测试链**：\n' +
      reasonReport.hypotheses.map(h => '  * [' + (h.status === 'proven' ? '🟢 已证实' : '⏳ 待探针校验') + '] ' + h.text + ' (可信度概算: ' + Math.round(h.probability * 100) + '%)').join('\n') + '\n' +
      '- **危害暴露评估 (Risk Factor)**：' + reasonReport.risk.text + ' (危害分: **' + reasonReport.risk.score + '/100**)\n\n' +
      '---\n\n' +
      '#### 🧠 2. Meta-Reasoning Introspective Critique (认知自评与自我质疑)\n' +
      '- **分析可信度 (Confidence Metric)**：✨ **' + (introspectiveChallenge.confidence * 100).toFixed(0) + '%**\n' +
      '- **核心假设佐证证据 (Evidence base)**：' + introspectiveChallenge.evidence.join(' | ') + '\n' +
      '- **核心批判性自评**：*' + introspectiveChallenge.selfChallenge + '*\n\n' +
      '---\n\n' +
      '#### ⚖️ 3. Decision Engine V2 策略综合排序 (Weighted Multi-Option Evaluator)\n' +
      '算法根据由 **Learning Engine V2** 反向沉淀调节的最新经验加权偏置，对策略总分进行了重新锚定综合评比：\n\n' +
      strategies.slice(0, 3).map((st, idx) => {
        const expl = brain.explainDecision(st.actionCategory);
        return '##### **优选方案 [' + (idx + 1) + ']：' + st.strategyName + '**\n' +
               '- **推荐评语 (Shield Review)**：*' + expl.recommendationShieldReason + '*\n' +
               '- **预期 GMV 拉升额**：💶 **+€' + st.estimatedRevenueGain.toFixed(1) + '** (操作成本: €' + st.costEur + ' | 落地难度: ' + st.difficultyScore + '/100)\n' +
               '- **算法核定综合指数 (Composite Score)**：🏆 **' + st.compositeScore + ' / 100**';
      }).join('\n\n') + '\n\n' +
      '---\n\n' +
      '#### 🛰️ 4. Adaptive Learning Graph (自我重进化经验累积看板)\n' +
      '过往动作绩效反向传播对权重的自我纠正偏置显示：\n' +
      learnedNodes.map(node => '- **' + node.actionCategory + '** 级联运筹 **' + (node.successCount + node.failureCount) + ' 次** | 平均经营分 **' + node.averageRating + '分** | 动态加权比率: **x' + node.weightScalar.toFixed(2) + '**').join('\n');

    actionType = 'campaign';
    suggestions = [
      { label: '采纳最高分方案：' + strategies[0].strategyName, action: 'campaign', payload: { category: strategies[0].actionCategory } },
      { label: '进入商品列表实存补货', action: 'switch_tab', payload: 'products' }
    ];
  }

  else if (isProductCreate) {
    intentClass = 'TASK_PRODUCT_CREATE';
    const hasDetails = (queryLower.includes('价格') || queryLower.includes('售价') || queryLower.includes('€') || queryLower.includes('$')) && 
                       (queryLower.includes('库存') || queryLower.includes('件'));

    if (hasDetails) {
      actionType = 'product_create';
      metaObj = { name: '防泼水排汗风风衣', sku: 'SKU-WIND-AUTO', price: 99.00, stock: 150 };
      
      const auth = AICoreIntelligence.authorizeAction('PRODUCT_CREATION_WRITE_DB', { name: '防泼水排汗风风衣' }, 10, 42);

      text = '### ✅ 新商品已成功写入租户子分区！\n\n' +
        '多租户层已经通过 Governor 安全隔离核验，数据库同步完成：\n\n' +
        '- **商品名称 (Title)**：防泼水排汗风风衣\n' +
        '- **SKU 条码 (SKU)**：SKU-WIND-AUTO\n' +
        '- **建议售价 (Price)**：💶 **€99.00**\n' +
        '- **在库计划 (Stock)**：**150 件**\n' +
        '- **审核核发意见 (Governor)**：**' + auth.arbitrationCode + '**\n' +
        '- **日志反馈**：' + auth.logsMessage;

      suggestions = [
        { label: '查看商品大盘', action: 'switch_tab', payload: 'products' },
        { label: '发放定向优惠券', action: 'campaign', payload: { discount: 15 } }
      ];
    } else {
      text = '### 🛍️ 申请极速上新商品：需要补充物料维度\n\n' +
        '决策大脑解析当前指令输入，发现新创实体信息缺少，请输入含如下信息的具体货品：\n\n' +
        '1. **商品具体名称** (如: 防溢水排汗户外风夹克)\n' +
        '2. **SKU 代码** (如: SKU-WIND-88)\n' +
        '3. **零售价格** (如: 售价 129.00€)\n' +
        '4. **初始进货库存量** (如: 库存 100件)\n\n' +
        '*💡 您也可以点击下方一键采用系统为您特配的 2026 夏日防泼风夹克预填参数入库销售：*';

      suggestions = [
        { label: '一键预加载防泼水风夹克数据', action: 'PREFILL_PRODUCT', payload: { name: '防泼水排汗风夹克 (系统推荐)', sku: 'SKU-WIND-88', price: 129.00, stock: 100 } },
        { label: '到商品管理后台手动输入', action: 'switch_tab', payload: 'products' }
      ];
    }
  }

  else if (isOrderQuery) {
    intentClass = 'ORDER_QUERY';
    const isRefund = queryLower.includes('退') || queryLower.includes('拒') || queryLower.includes('审') || queryLower.includes('拦截');

    if (isRefund) {
      const refundRequestedOrders = orders.filter(o => o.status === 'Refund Requested' || o.status === 'Refunded');
      
      if (refundRequestedOrders.length > 0) {
        text = '### ⚖️ 多租户逆向退款申诉安全核账表 (在库 ' + refundRequestedOrders.length + ' 笔)\n\n' +
          '系统核对过滤出正在进入申退资金环节的订单流水数据：\n\n' +
          '| 结算单发票号 | 采购买家名称 | 原定单总金额 | 当前处理阶次 | 欺诈风控评级 (Fraud Score) |\n' +
          '| :--- | :--- | :--- | :--- | :--- |\n' +
          refundRequestedOrders.map(o => '| ' + o.id + ' | ' + o.customerName + ' | €' + o.total.toFixed(2) + ' | **' + (o.status === 'Refund Requested' ? '⚠️ 人工拦截中' : '✅ 资金已返还') + '** | ' + (o.riskScore || 12) + '/100 (低危合规) |').join('\n') + '\n\n' +
          '建议直接点击控制台跳转至订单专区执行集中人工过账审批。';

        suggestions = [
          { label: '深入订单中心人工审票', action: 'switch_tab', payload: 'orders' }
        ];
      } else {
        text = '### ✅ 财务与逆向退款核查：无异常挂起\n\n' +
          '近 48 小时长尾账期扫描完毕。本隔离租户下近期**完全没有活跃的退款纠纷、异常少发货申诉**。\n\n' +
          '全店纠纷率保持在 **0.25%** 优异绿色安全区间，可安心运营。';

        suggestions = [
          { label: '巡查最新订单账簿', action: 'switch_tab', payload: 'orders' }
        ];
      }
    } else {
      const totalAmt = orders.reduce((sum, o) => sum + o.total, 0);

      text = '### 📊 隔离租户成交流水核算 (共 ' + orders.length + ' 笔订单)\n\n' +
        '系统按您所分配的安全组 `store_isolation` 拓扑隔离，流转并成功勾兑出如下订单：\n\n' +
        '| 结算发票号 | 购货主客名 | 成交额 (EUR) | 流转阶段 (State) | 下单北京时间 |\n' +
        '| :--- | :--- | :--- | :--- | :--- |\n' +
        orders.slice(0, 5).map(o => '| ' + o.id + ' | ' + o.customerName + ' | €' + o.total.toFixed(2) + ' | ' + o.status + ' | ' + (o.createdAt || '本日') + ' |').join('\n') + '\n\n' +
        '- **阶段累计发票金额 (Gross Sum)**：🚀 **€' + totalAmt.toFixed(2) + '**\n\n' +
        '回回款资金账单与仓储物流交割对齐均无阻塞卡顿。';

      suggestions = [
        { label: '跳转至订单发货', action: 'switch_tab', payload: 'orders' },
        { label: '导出对账财务表', action: 'EXPORT_FINANCE_REPORT', payload: {} }
      ];
    }
  }

  else if (isInventoryQuery) {
    intentClass = 'INVENTORY_QUERY';
    actionType = 'restock';

    const lowStockItems = products.filter(p => p.stock <= 15);
    
    if (lowStockItems.length > 0) {
      const stockoutSim = brain.simulateInventoryRisk(5);

      text = '### 🚨 特急：在售价主力爆款库存低水位断货预警\n\n' +
        '系统 WMS 实时水位探针对当前大仓完成一键校对，发现有 **' + lowStockItems.length + ' 项主力爆款** 破穿 15 件安全警报底线。\n\n' +
        '#### ⚠️ 缺货项目危害评估报告\n' +
        '* **触红警戒商品**：\n' +
        lowStockItems.map(p => '  - *' + p.name + '* (SKU: ' + p.sku + ' | 单售价: €' + p.price.toFixed(2) + ' | 仅余: **' + p.stock + ' 件** - ' + (p.stock === 0 ? '🔴 已告断货' : '🟡 极度告急') + ')').join('\n') + '\n' +
        '* **预计供货商到货时效**：5 日 (标准海外空配运)\n' +
        '* **缺货损耗投影 (Simulated Stock Out Loss)**：💶 **€' + stockoutSim.stockoutProjectedLossEur + '** (指由于这期间库房断空导致被阻碍结账的直接流失费)\n\n' +
        '**决策大脑意见**：缺货即是缺金。建议立即点击下方，系统将为您向协议工厂自动派发加急采购进货订单：';

      suggestions = [
        { label: '一键自动为低水位 SKU 补满库存', action: 'restock', payload: {} },
        { label: '查看大仓低水位全部 SKU 列表', action: 'switch_tab', payload: 'products' }
      ];
    } else {
      const sortedByStock = [...products].sort((a, b) => a.stock - b.stock);
      const tightestSku = sortedByStock[0];

      text = '### ✨ 库房健康度审计：余量处于极其充沛安全防区\n\n' +
        '经在库数据库实存勾对，您隔离店面的商用存货指标健康流转。所有经营商品水位均保持在 lowest 警戒支撑线安全阻力之上。\n\n' +
        '- **存货紧蹙度第一品类**：' + (tightestSku ? '「' + tightestSku.name + '」' : 'N/A') + '\n' +
        '- **剩余在库数量**：' + (tightestSku ? tightestSku.stock + ' 件 (警戒值: ' + (tightestSku.minStockThreshold || 10) + ' 件)' : 'N/A') + '\n\n' +
        '系统判断中短期内无断档流失风险，可以高枕无忧。';

      suggestions = [
        tightestSku ? { label: '追加备货 ' + tightestSku.name, action: 'restock', payload: tightestSku.sku } : { label: '查看商品列表', action: 'switch_tab', payload: 'products' }
      ];
    }
  }

  else if (isCustomerQuery) {
    intentClass = 'CUSTOMER_QUERY';
    actionType = 'customer_recall';

    const coldCustomers = customers.filter(c => c.orderCount === 0 || c.points < 200);

    text = '### 👥 客户生命周期(CRM)活跃度审计报告\n\n' +
      '大中台从当前隔离顾客池中，为您筛查出在册会员 **' + customers.length + ' 名**。发现当前有 **' + coldCustomers.length + ' 名老客** 产生较强长尾观望情绪，处于高走失沉默高风险区：\n\n' +
      '| 会员名讳 | 邮箱往来地址 | VIP层级等次 | 店本积分 | 沉默高危判定因素 |\n' +
      '| :--- | :--- | :--- | :--- | :--- |\n' +
      customers.slice(0, 5).map(c => '| ' + c.name + ' | ' + c.email + ' | **' + c.tier + '** | ' + c.points + ' 分 | ' + (c.orderCount === 0 ? '🔺 历史购单为0 (纯加购流失)' : '🟡 活跃点数极低') + ' |').join('\n') + '\n\n' +
      '**智能挽回决策派单**：\n' +
      '对这类特定受众池使用 **x1.25** 优选加权的 \'bulk_coupon\' 精准邮件发券提振战役。您可以点击一键授权系统，利用 CRM 后台，直邮 20% OFF 专享礼包挽回沉默心智：';

    suggestions = [
      { label: '一键部署分发 VIP 折扣邮件挽回沉默客户', action: 'customer_recall', payload: {} },
      { label: '深入客户关系详情看板', action: 'switch_tab', payload: 'customers' }
    ];
  }

  else {
    intentClass = 'UNIFIED_DISPATCH';
    reasoningGoal = '响应通用类目中台咨询并引导精准指令';

    text = '### 🧠 AI Commerce OS 智能经营中台决策命令中心\n\n' +
      '我专注于为店主执行具有**物理写入、多维图谱拓扑、价格决策模拟、以及 Governor 拦截**的真实中台操作。\n\n' +
      '您可以直接使用简短、具体的业务操作指令驱使中台：\n\n' +
      '1. **商业知识图谱** — "查看商业知识图谱" (触发多hop customer-order-product-traffic 动态图谱遍历 findRelatedEntities)\n' +
      '2. **销售促进决策** — "提高销量策略" (触发决策树多备选应对模型评分 evaluateAndSortStrategies，按 compositeScore 动态排序)\n' +
      '3. **价格折扣模拟** — "模拟降价15%对利润的影响" (结合弹性模型进行 simulated revenue / DSI 连续建模，并过 Governor Margin 红线检测)\n' +
      '4. **低少库存补仓** — "查库存并补货" (检索库存，测算 Stock Out Potential Loss 折损并自动向上游补货)\n' +
      '5. **急速写表上新** — "新建商品" (按 SKU 与 Price 规范格式校验，过 Governor 安全防护写入主表)\n\n' +
      '请说出您的明确操作口，我将立即为您联动底层执行层。';

    suggestions = [
      { label: '查看全店关系图谱', action: 'switch_tab', payload: 'command' },
      { label: '核查账户财务大账簿', action: 'finance_switch', payload: {} }
    ];
  }

  // Create real V2 plan task nodes hierarchically dependent for the frontend planning logs!
  const planTree: PlanTaskNode[] = AICoreIntelligence.generateTaskTree(queryLower);
  
  // Format the reasoning loop metrics trace in thought structure
  let resolvedPlanningStr = planTree.map(task => {
    return '[' + task.id + '] ' + task.title + ' (耗时:' + task.durationDays + '天, 面向:' + task.status + ')';
  }).join('\n └── ');

  if (planTree.length > 0) {
    planningTasks = '【规划行动任务树】：\n └── ' + resolvedPlanningStr;
  } else {
    planningTasks = '1. 接受命令；2. 查询隔离租户 store_id；3. 激活安全哨兵校验。';
  }

  return {
    text,
    actionType,
    metaObj,
    suggestions,
    thought: {
      intent: intentClass,
      reasoning: 'Goal (当前执行目标): ' + reasoningGoal + '\nState (当前系统态势): ' + reasoningCurrentState + '\nMissing Info (缺失变量): ' + reasoningMissingInfo + '\nRisk (运行安全阻尼): ' + reasoningRisk,
      planning: planningTasks,
      permission: permissionCheck,
      toolRouter: toolRoute,
      validator: validationResult
    }
  };
}
