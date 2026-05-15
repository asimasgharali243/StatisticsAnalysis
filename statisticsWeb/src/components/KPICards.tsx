import React from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  FileText,
  Percent } from
'lucide-react';
import { useFilters } from '../context/FilterContext';

const formatCurrency = (value: number) => {
 return value;
};

export function KPICards() {
  const { dashboardData } = useFilters();

  const calculateTotal = (metricName: string) => {
    if (!dashboardData) return 0;
    let total = 0;
    Object.values(dashboardData).forEach(metrics => {
      const metric = metrics.find(m => m.texts.toLowerCase() === metricName.toLowerCase());
      if (metric) total += metric.value;
    });
    return total;
  };

  const totalRevenue = calculateTotal('sales');
  const totalExpenses = calculateTotal('expense') + calculateTotal('purchases');
  const netProfit = totalRevenue - totalExpenses;
  const totalReceivables = calculateTotal('receivable');
  const totalPayables = calculateTotal('payable');
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  function calculateTrend(value: number) {
    return value > 0 ? `+${Math.abs(value / 1000).toFixed(1)}%` : '0%';
  }

  const cards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      trend: calculateTrend(totalRevenue),
      isPositive: true,
      icon: TrendingUp,
      color: 'text-profit-light dark:text-profit-dark',
      bg: 'bg-emerald-100 dark:bg-emerald-900/30'
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      trend: calculateTrend(totalExpenses),
      isPositive: false,
      icon: TrendingDown,
      color: 'text-loss-light dark:text-loss-dark',
      bg: 'bg-red-100 dark:bg-red-900/30'
    },
    {
      title: 'Net Profit',
      value: formatCurrency(netProfit),
      trend: calculateTrend(netProfit),
      isPositive: netProfit >= 0,
      icon: DollarSign,
      color: 'text-brand-600 dark:text-brand-400',
      bg: 'bg-brand-100 dark:bg-brand-900/30'
    },
    {
      title: 'Outstanding AR',
      value: formatCurrency(totalReceivables),
      trend: calculateTrend(totalReceivables),
      isPositive: false,
      icon: FileText,
      color: 'text-warning-light dark:text-warning-dark',
      bg: 'bg-amber-100 dark:bg-amber-900/30'
    },
    {
      title: 'Outstanding AP',
      value: formatCurrency(totalPayables),
      trend: calculateTrend(totalPayables),
      isPositive: false,
      icon: AlertCircle,
      color: 'text-orange-500 dark:text-orange-400',
      bg: 'bg-orange-100 dark:bg-orange-900/30'
    },
    {
      title: 'Profit Margin',
      value: `${profitMargin.toFixed(1)}%`,
      trend: calculateTrend(profitMargin),
      isPositive: profitMargin > 0,
      icon: Percent,
      color: 'text-purple-500 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <div key={index} className="card p-4">
          <div className="flex justify-between items-start mb-3">
            <div className={`p-2 rounded-lg ${card.bg} ${card.color}`}>
              <card.icon size={18} />
            </div>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                card.isPositive 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
              {card.trend}
            </span>
          </div>
          <div>
            <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              {card.title}
            </h3>
            <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}