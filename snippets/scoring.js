/**
 * TermOver AI — Industry-Aware Scoring Engine
 * 
 * Risk thresholds are adjusted based on the website's industry.
 * A "content upload" clause is expected on YouTube but alarming on a bank.
 * 
 * NOTE: This is a simplified illustration. Full implementation is proprietary.
 */

const INDUSTRIES = {
  streaming:  { contentUpload: 'low',    dataSelling: 'high',   autoRenewal: 'medium' },
  ecommerce:  { contentUpload: 'none',   dataSelling: 'high',   autoRenewal: 'high'   },
  saas:       { contentUpload: 'low',    dataSelling: 'medium', autoRenewal: 'high'   },
  finance:    { contentUpload: 'none',   dataSelling: 'high',   autoRenewal: 'medium' },
  social:     { contentUpload: 'medium', dataSelling: 'high',   autoRenewal: 'low'    },
  default:    { contentUpload: 'medium', dataSelling: 'high',   autoRenewal: 'medium' },
};

function getIndustryThresholds(industry) {
  return INDUSTRIES[industry] ?? INDUSTRIES.default;
}

function scoreClause(clauseType, industry) {
  const thresholds = getIndustryThresholds(industry);
  const level = thresholds[clauseType];

  const scoreMap = { none: 0, low: 25, medium: 60, high: 90 };
  return scoreMap[level] ?? 50;
}
