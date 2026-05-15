import React from 'react';
import { CompanyComparisonChart } from '../components/charts/CompanyComparisonChart';
import { CompanyContributionChart } from '../components/charts/CompanyContributionChart';
import { useFilters } from '../context/FilterContext';
import { companies, monthlyData } from '../data/mockData';
export function Analytics() {
  const { selectedCompanies } = useFilters();
  const activeCompanies = companies.filter((c) =>
  selectedCompanies.includes(c.id)
  );
  const tableData = activeCompanies.map((company) => {
    let totalRev = 0;
    let totalExp = 0;
    monthlyData.forEach((month) => {
      totalRev +=
      month[`${company.id}_rev` as keyof typeof month] as number || 0;
      totalExp +=
      month[`${company.id}_exp` as keyof typeof month] as number || 0;
    });
    const profit = totalRev - totalExp;
    const margin = totalRev > 0 ? profit / totalRev * 100 : 0;
    return {
      id: company.id,
      name: company.name,
      color: company.color,
      revenue: totalRev,
      expenses: totalExp,
      profit: profit,
      margin: margin
    };
  });
  const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(val);
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Cross-Company Analytics
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CompanyComparisonChart />
        <CompanyContributionChart />
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Performance Metrics
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium text-right">
                  Revenue YTD
                </th>
                <th className="px-6 py-4 font-medium text-right">
                  Expenses YTD
                </th>
                <th className="px-6 py-4 font-medium text-right">Net Profit</th>
                <th className="px-6 py-4 font-medium text-right">
                  Profit Margin
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {tableData.map((row) =>
              <tr
                key={row.id}
                className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                    <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: row.color
                    }} />
                  
                    {row.name}
                  </td>
                  <td className="px-6 py-4 text-right text-emerald-600 dark:text-emerald-400 font-medium">
                    {formatCurrency(row.revenue)}
                  </td>
                  <td className="px-6 py-4 text-right text-red-600 dark:text-red-400 font-medium">
                    {formatCurrency(row.expenses)}
                  </td>
                  <td className="px-6 py-4 text-right text-brand-600 dark:text-brand-400 font-medium">
                    {formatCurrency(row.profit)}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                    {row.margin.toFixed(1)}%
                  </td>
                </tr>
              )}
              {tableData.length === 0 &&
              <tr>
                  <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-slate-500">
                  
                    No companies selected. Please select companies from the top
                    navigation.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}