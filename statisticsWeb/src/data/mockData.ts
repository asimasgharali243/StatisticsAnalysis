export const companies = [
{ id: 'c1', name: 'Acme Corp', color: '#3b82f6' }, // blue-500
{ id: 'c2', name: 'GlobalTech', color: '#10b981' }, // emerald-500
{ id: 'c3', name: 'NovaPay', color: '#8b5cf6' }, // violet-500
{ id: 'c4', name: 'SilverLine', color: '#f59e0b' }, // amber-500
{ id: 'c5', name: 'BluePeak', color: '#ef4444' } // red-500
];

const months = [
'Jan',
'Feb',
'Mar',
'Apr',
'May',
'Jun',
'Jul',
'Aug',
'Sep',
'Oct',
'Nov',
'Dec'];


// Generate realistic monthly trend data
export const monthlyData = months.map((month, index) => {
  const baseMultiplier = 1 + index * 0.05; // Slight growth over the year
  return {
    month,
    c1_rev: Math.round(120000 * baseMultiplier + Math.random() * 20000),
    c1_exp: Math.round(85000 * baseMultiplier + Math.random() * 10000),
    c2_rev: Math.round(250000 * baseMultiplier + Math.random() * 40000),
    c2_exp: Math.round(190000 * baseMultiplier + Math.random() * 20000),
    c3_rev: Math.round(80000 * baseMultiplier + Math.random() * 15000),
    c3_exp: Math.round(60000 * baseMultiplier + Math.random() * 8000),
    c4_rev: Math.round(150000 * baseMultiplier + Math.random() * 25000),
    c4_exp: Math.round(110000 * baseMultiplier + Math.random() * 15000),
    c5_rev: Math.round(300000 * baseMultiplier + Math.random() * 50000),
    c5_exp: Math.round(260000 * baseMultiplier + Math.random() * 30000)
  };
});

// AR Aging Data
export const arAgingData = companies.map((c) => ({
  company: c.name,
  companyId: c.id,
  '0-30': Math.round(Math.random() * 50000 + 20000),
  '31-60': Math.round(Math.random() * 30000 + 10000),
  '61-90': Math.round(Math.random() * 15000 + 5000),
  '90+': Math.round(Math.random() * 10000 + 2000)
}));

// AP Breakdown Data (Vendors)
export const apBreakdownData = [
{ vendor: 'AWS', due: 45000, overdue: 0, companyId: 'c2' },
{ vendor: 'Microsoft', due: 28000, overdue: 5000, companyId: 'c1' },
{ vendor: 'Salesforce', due: 35000, overdue: 12000, companyId: 'c5' },
{ vendor: 'Google Cloud', due: 22000, overdue: 0, companyId: 'c3' },
{ vendor: 'WeWork', due: 50000, overdue: 15000, companyId: 'c4' },
{ vendor: 'Oracle', due: 18000, overdue: 8000, companyId: 'c2' }];


// Expense Distribution
export const expenseCategories = [
{ name: 'Salaries', value: 450000, color: '#3b82f6' },
{ name: 'Rent', value: 120000, color: '#8b5cf6' },
{ name: 'Utilities', value: 45000, color: '#10b981' },
{ name: 'Operations', value: 180000, color: '#f59e0b' },
{ name: 'Marketing', value: 95000, color: '#ef4444' }];


// Invoice Status
export const invoiceStatusData = [
{ name: 'Paid', value: 850, color: '#10b981' },
{ name: 'Unpaid', value: 230, color: '#f59e0b' },
{ name: 'Overdue', value: 85, color: '#ef4444' }];


// Helper to get aggregated KPIs based on selected companies
export const getAggregatedKPIs = (selectedCompanyIds: string[]) => {
  let totalRev = 0;
  let totalExp = 0;

  monthlyData.forEach((month) => {
    selectedCompanyIds.forEach((id) => {
      totalRev += month[`${id}_rev` as keyof typeof month] as number || 0;
      totalExp += month[`${id}_exp` as keyof typeof month] as number || 0;
    });
  });

  let totalAR = 0;
  arAgingData.
  filter((ar) => selectedCompanyIds.includes(ar.companyId)).
  forEach((ar) => {
    totalAR += ar['0-30'] + ar['31-60'] + ar['61-90'] + ar['90+'];
  });

  let totalAP = 0;
  apBreakdownData.
  filter((ap) => selectedCompanyIds.includes(ap.companyId)).
  forEach((ap) => {
    totalAP += ap.due + ap.overdue;
  });

  const netProfit = totalRev - totalExp;
  const margin = totalRev > 0 ? netProfit / totalRev * 100 : 0;

  return {
    revenue: totalRev,
    expenses: totalExp,
    profit: netProfit,
    receivables: totalAR,
    payables: totalAP,
    margin: margin
  };
};