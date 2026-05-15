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

const formatXAxis = (tickItem: number) => {
  if (tickItem >= 1000000) return `$${(tickItem / 1000000).toFixed(1)}M`;
  if (tickItem >= 1000) return `$${(tickItem / 1000).toFixed(0)}k`;
  return `$${tickItem}`;
};

export function APBreakdownChart({ isExpanded = false, className = '' }: { isExpanded?: boolean; className?: string }) {
  const { dashboardData, selectedCompanies, selectedSingleCompany } = useFilters();
  const { data: companies } = useGetCompaniesQuery();

  const payableData = useMemo(() => {
    if (!dashboardData) return [];

    const companiesToShow = selectedSingleCompany 
      ? [selectedSingleCompany]
      : selectedCompanies;

    return companiesToShow
      .map((companyId) => {
        const metrics = dashboardData[companyId];
        if (!metrics) return null;
        
        const payable = metrics.find(m => m.texts.toLowerCase() === 'payable');
        const totalPayable = payable?.value || 0;
        const company = companies?.find(c => c.id === companyId);
        
        return {
          company: company?.name || companyId,
          companyId: companyId,
          'Total Payable': totalPayable,
        };
      })
      .filter(Boolean);
  }, [dashboardData, selectedCompanies, selectedSingleCompany, companies]);

  if (!payableData.length) {
    return (
      <div className="card p-5 h-[400px] flex flex-col items-center justify-center">
        <p className="text-slate-500">No payable data available</p>
      </div>
    );
  }

  const chartContent = (
    <div className={`card p-5 flex flex-col ${className} ${isExpanded ? 'h-full' : 'h-[400px]'}`}>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Accounts Payable
      </h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={payableData} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={formatXAxis} />
            <YAxis type="category" dataKey="company" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} width={100} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
              formatter={(value: number) =>
                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
              }
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="Total Payable" fill="#ef4444" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  if (isExpanded) return chartContent;
  
  return <ExpandableChart title="Accounts Payable">{chartContent}</ExpandableChart>;
}