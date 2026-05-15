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
import { useGetCompaniesQuery } from '../../store/api/dashboardApi';
import { ExpandableChart } from '../ExpandableChart';

const formatYAxis = (tickItem: number) => {
  if (tickItem >= 1000000) return `$${(tickItem / 1000000).toFixed(1)}M`;
  if (tickItem >= 1000) return `$${(tickItem / 1000).toFixed(0)}k`;
  return `$${tickItem}`;
};

export function ExpenseTrendChart({ isExpanded = false, className = '' }: { isExpanded?: boolean; className?: string }) {
  const { dashboardData, selectedCompanies } = useFilters();
  const { data: companies } = useGetCompaniesQuery();

  const chartData = useMemo(() => {
    if (!dashboardData) return [];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return months.map((month) => {
      const dataPoint: any = { month };
      
      Object.entries(dashboardData).forEach(([companyId, metrics]) => {
        if (selectedCompanies.includes(companyId)) {
          const expense = metrics.find(m => m.texts.toLowerCase() === 'expense');
          dataPoint[`${companyId}_exp`] = expense?.value || 0;
        }
      });
      
      return dataPoint;
    });
  }, [dashboardData, selectedCompanies]);

  const getCompanyColor = (companyId: string, index: number) => {
    const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1'];
    return colors[index % colors.length];
  };

  if (!dashboardData || Object.keys(dashboardData).length === 0) {
    return (
      <div className="card p-5 h-[350px] sm:h-[400px] flex flex-col items-center justify-center">
        <p className="text-slate-500">No expense data available</p>
      </div>
    );
  }

  const chartContent = (
    <div className={`card p-3 sm:p-5 flex flex-col ${className} ${isExpanded ? 'h-full' : 'h-[350px] sm:h-[400px]'}`}>
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2 sm:mb-4">
        Expense Trend (Yearly Total)
      </h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: window.innerWidth < 640 ? 10 : 12 }} 
              dy={10} 
              interval={window.innerWidth < 640 ? 2 : 0}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: window.innerWidth < 640 ? 10 : 12 }} 
              tickFormatter={formatYAxis} 
              dx={-5} 
              width={window.innerWidth < 640 ? 45 : 60}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
              formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, notation: 'compact' }).format(value)}
            />
            {window.innerWidth >= 640 && (
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            )}
            
            {Object.entries(dashboardData).map(([companyId, metrics], index) => {
              if (!selectedCompanies.includes(companyId)) return null;
              const company = companies?.find(c => c.id === companyId);
              return (
                <Line
                  key={companyId}
                  type="monotone"
                  dataKey={`${companyId}_exp`}
                  name={company?.name || companyId}
                  stroke={getCompanyColor(companyId, index)}
                  strokeWidth={window.innerWidth < 640 ? 1.5 : 2}
                  strokeDasharray="5 5"
                  dot={{ r: window.innerWidth < 640 ? 2 : 4 }}
                  activeDot={{ r: 5 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {window.innerWidth < 640 && !isExpanded && (
        <div className="mt-2 pt-1 border-t border-slate-200 dark:border-slate-700">
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {Object.entries(dashboardData).map(([companyId, metrics], index) => {
              if (!selectedCompanies.includes(companyId)) return null;
              const company = companies?.find(c => c.id === companyId);
              return (
                <div key={companyId} className="flex items-center gap-1 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getCompanyColor(companyId, index) }} />
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {company?.name?.substring(0, 6) || companyId?.substring(0, 6)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  if (isExpanded) return chartContent;
  
  return <ExpandableChart title="Expense Trend (Yearly Total)">{chartContent}</ExpandableChart>;
}