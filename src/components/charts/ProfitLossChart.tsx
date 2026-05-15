import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useFilters } from '../../context/FilterContext';
import { ExpandableChart } from '../ExpandableChart';

const formatYAxis = (tickItem: number) => {
  if (tickItem >= 1000000) return `$${(tickItem / 1000000).toFixed(1)}M`;
  if (tickItem >= 1000) return `$${(tickItem / 1000).toFixed(0)}k`;
  return `$${tickItem}`;
};

export function ProfitLossChart({ isExpanded = false, className = '' }: { isExpanded?: boolean; className?: string }) {
  const { dashboardData, selectedCompanies } = useFilters();

  const aggregatedData = useMemo(() => {
    if (!dashboardData) return [];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let totalRev = 0;
    let totalExp = 0;
    
    Object.entries(dashboardData).forEach(([companyId, metrics]) => {
      if (selectedCompanies.includes(companyId)) {
        const sales = metrics.find(m => m.texts.toLowerCase() === 'sales');
        const expense = metrics.find(m => m.texts.toLowerCase() === 'expense');
        totalRev += sales?.value || 0;
        totalExp += expense?.value || 0;
      }
    });
    
    return months.map((month) => ({
      month,
      Revenue: totalRev,
      Expenses: totalExp,
      Profit: totalRev - totalExp,
    }));
  }, [dashboardData, selectedCompanies]);

  if (!dashboardData || Object.keys(dashboardData).length === 0) {
    return (
      <div className="card p-5 h-[400px] flex flex-col items-center justify-center">
        <p className="text-slate-500">No profit/loss data available</p>
      </div>
    );
  }

  const chartContent = (
    <div className={`card p-5 flex flex-col ${className} ${isExpanded ? 'h-full' : 'h-[400px]'}`}>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Profit & Loss Overview (Yearly Total)
      </h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={aggregatedData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={formatYAxis} dx={-10} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
              formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            <Area type="monotone" dataKey="Revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" />
            <Area type="monotone" dataKey="Expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExp)" />
            <Area type="monotone" dataKey="Profit" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  if (isExpanded) return chartContent;
  
  return <ExpandableChart title="Profit & Loss Overview (Yearly Total)">{chartContent}</ExpandableChart>;
}