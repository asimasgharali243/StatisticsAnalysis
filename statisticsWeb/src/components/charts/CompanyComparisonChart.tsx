import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useFilters } from '../../context/FilterContext';
import { useGetCompaniesQuery } from '../../store/api/dashboardApi';
import { ExpandableChart } from '../ExpandableChart';

const formatYAxis = (tickItem: number) => {
  if (tickItem >= 1000000) return `$${(tickItem / 1000000).toFixed(1)}M`;
  if (tickItem >= 1000) return `$${(tickItem / 1000).toFixed(0)}k`;
  return `$${tickItem}`;
};

export function CompanyComparisonChart({ isExpanded = false, className = '' }: { isExpanded?: boolean; className?: string }) {
  const { dashboardData, selectedCompanies } = useFilters();
  const { data: companies } = useGetCompaniesQuery();

  const comparisonData = useMemo(() => {
    if (!dashboardData) return [];

    return Object.entries(dashboardData)
      .filter(([companyId]) => selectedCompanies.includes(companyId))
      .map(([companyId, metrics]) => {
        const sales = metrics.find(m => m.texts.toLowerCase() === 'sales');
        const expense = metrics.find(m => m.texts.toLowerCase() === 'expense');
        const totalRev = sales?.value || 0;
        const totalExp = expense?.value || 0;
        const company = companies?.find(c => c.id === companyId);
        
        return {
          name: company?.name || companyId,
          Revenue: totalRev,
          Expenses: totalExp,
          Profit: totalRev - totalExp,
        };
      });
  }, [dashboardData, selectedCompanies, companies]);

  if (!comparisonData.length) {
    return (
      <div className="card p-5 h-[400px] flex flex-col items-center justify-center">
        <p className="text-slate-500">No company data available</p>
      </div>
    );
  }

  const chartContent = (
    <div className={`card p-5 flex flex-col ${className} ${isExpanded ? 'h-full' : 'h-[400px]'}`}>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Company Performance Comparison
      </h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={formatYAxis} dx={-10} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
              formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  if (isExpanded) return chartContent;
  
  return <ExpandableChart title="Company Performance Comparison">{chartContent}</ExpandableChart>;
}