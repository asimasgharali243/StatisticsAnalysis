import React, { useMemo, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useFilters } from '../../context/FilterContext';
import { ExpandableChart } from '../ExpandableChart';

const EXPENSE_CATEGORIES = ['Salaries', 'Rent', 'Utilities', 'Operations', 'Marketing', 'Software', 'Travel'];
const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899'];

export function ExpenseDistributionChart({ isExpanded = false, className = '' }: { isExpanded?: boolean; className?: string }) {
  const { dashboardData, selectedCompanies, selectedSingleCompany } = useFilters();
  const [showLegend, setShowLegend] = useState(false);

  const expenseData = useMemo(() => {
    if (!dashboardData) return [];

    const companiesToShow = selectedSingleCompany 
      ? [selectedSingleCompany]
      : selectedCompanies;
    
    let totalExpense = 0;
    
    companiesToShow.forEach(companyId => {
      const metrics = dashboardData[companyId];
      if (metrics) {
        const expense = metrics.find(m => m.texts.toLowerCase() === 'expense');
        if (expense) totalExpense += expense.value;
      }
    });

    if (totalExpense === 0) return [];

    const percentages = [0.35, 0.2, 0.1, 0.15, 0.1, 0.05, 0.05];
    
    return EXPENSE_CATEGORIES.map((name, index) => ({
      name,
      value: Math.round(totalExpense * percentages[index]),
      color: COLORS[index % COLORS.length],
      shortName: name.substring(0, 4),
    }));
  }, [dashboardData, selectedCompanies, selectedSingleCompany]);

  const total = expenseData.reduce((acc, curr) => acc + curr.value, 0);

  // Custom label for small screens - shows only short name
  const renderCustomLabel = ({ name, percent, shortName }: any) => {
    if (percent < 0.05) return null;
    return `${shortName || name.substring(0, 4)}: ${(percent * 100).toFixed(0)}%`;
  };

  if (!expenseData.length) {
    return (
      <div className="card p-5 h-[350px] sm:h-[400px] flex flex-col items-center justify-center">
        <p className="text-slate-500">No expense data available</p>
      </div>
    );
  }

  const chartContent = (
    <div className={`card p-3 sm:p-5 flex flex-col ${className} ${isExpanded ? 'h-full' : 'h-[350px] sm:h-[400px]'}`}>
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2 sm:mb-4">
        Expense Distribution
      </h3>
      <div className="flex-1 min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              innerRadius={window.innerWidth < 640 ? 50 : 80}
              outerRadius={window.innerWidth < 640 ? 80 : 120}
              paddingAngle={2}
              dataKey="value"
              label={window.innerWidth < 640 ? renderCustomLabel : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={window.innerWidth >= 640}
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
              formatter={(value: number) =>
                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
              }
            />
            {!isExpanded && window.innerWidth < 640 ? (
              // Horizontal scrolling legend for mobile
              <div className="absolute bottom-0 left-0 right-0 -mb-8">
                <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                  {expenseData.map((entry, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 flex-shrink-0">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {entry.name}: {((entry.value / total) * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Legend 
                iconType="circle" 
                layout={window.innerWidth < 640 ? 'horizontal' : 'vertical'} 
                verticalAlign={window.innerWidth < 640 ? 'bottom' : 'middle'} 
                align={window.innerWidth < 640 ? 'center' : 'right'}
                wrapperStyle={window.innerWidth < 640 ? { paddingTop: '20px' } : {}}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
        <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none ${window.innerWidth < 640 ? 'pr-0' : 'pr-[120px]'}`}>
          <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Total Expenses</span>
          <span className="text-base sm:text-xl font-bold text-slate-900 dark:text-white">
          {total}
          </span>
        </div>
      </div>
    </div>
  );

  if (isExpanded) return chartContent;
  
  return <ExpandableChart title="Expense Distribution">{chartContent}</ExpandableChart>;
}