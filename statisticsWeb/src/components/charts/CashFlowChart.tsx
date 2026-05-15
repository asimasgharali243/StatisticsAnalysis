import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
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

export function CashFlowChart({ isExpanded = false, className = '' }: { isExpanded?: boolean; className?: string }) {
  const { dashboardData, selectedCompanies } = useFilters();

  const aggregatedData = useMemo(() => {
    if (!dashboardData) return [];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let totalInflow = 0;
    let totalOutflow = 0;
    
    Object.entries(dashboardData).forEach(([companyId, metrics]) => {
      if (selectedCompanies.includes(companyId)) {
        const sales = metrics.find(m => m.texts.toLowerCase() === 'sales');
        const expense = metrics.find(m => m.texts.toLowerCase() === 'expense');
        const purchases = metrics.find(m => m.texts.toLowerCase() === 'purchases');
        
        totalInflow += (sales?.value || 0) * 0.95;
        totalOutflow += ((expense?.value || 0) + (purchases?.value || 0)) * 1.05;
      }
    });

    return months.map((month) => ({
      month,
      Inflow: totalInflow,
      Outflow: totalOutflow,
    }));
  }, [dashboardData, selectedCompanies]);

  if (!dashboardData || Object.keys(dashboardData).length === 0) {
    return (
      <div className="card p-5 h-[400px] flex flex-col items-center justify-center">
        <p className="text-slate-500">No cash flow data available</p>
      </div>
    );
  }

  const chartContent = (
    <div className={`card p-5 flex flex-col ${className} ${isExpanded ? 'h-full' : 'h-[400px]'}`}>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Cash Flow Trend (Yearly Total)
      </h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={aggregatedData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={formatYAxis} dx={-10} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
              formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="Inflow" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Outflow" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  if (isExpanded) return chartContent;
  
  return <ExpandableChart title="Cash Flow Trend (Yearly Total)">{chartContent}</ExpandableChart>;
}