// src/pages/Sales.tsx
import React from 'react';
import { useFilters } from '../context/FilterContext';
import { useGetCompaniesQuery } from '../store/api/dashboardApi';
import { TrendingUp, RefreshCw } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

export function Sales() {
  const { dashboardData, isLoading, refreshData, selectedSingleCompany, setSelectedSingleCompany } = useFilters();
  const { data: companies } = useGetCompaniesQuery();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getCompanyName = (companyId: string) => {
    return companies?.find(c => c.id === companyId)?.name || companyId;
  };

  // Get sales data for all companies
  const salesData = React.useMemo(() => {
    if (!dashboardData) return [];
    return Object.entries(dashboardData).map(([companyId, metrics]) => {
      const sales = metrics.find(m => m.texts.toLowerCase() === 'sales');
      return {
        company: getCompanyName(companyId),
        companyId: companyId,
        sales: sales?.value || 0
      };
    }).sort((a, b) => b.sales - a.sales);
  }, [dashboardData, companies]);

  // Pie chart colors
  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1'];

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);

  // Filter data if single company selected
  const displayData = selectedSingleCompany 
    ? salesData.filter(d => d.companyId === selectedSingleCompany)
    : salesData;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp size={28} className="text-emerald-500" />
            Sales Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track sales performance across all companies</p>
        </div>
        <button onClick={() => refreshData()} className="btn-secondary flex items-center gap-2">
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Sales</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(totalSales)}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Average per Company</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {formatCurrency(salesData.length > 0 ? totalSales / salesData.length : 0)}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Top Performing Company</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white truncate">
            {salesData[0]?.company || 'N/A'}
          </p>
          <p className="text-sm text-emerald-600">{formatCurrency(salesData[0]?.sales || 0)}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="card p-5 h-[400px]">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Sales by Company</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={displayData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} />
              <YAxis type="category" dataKey="company" width={100} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Bar dataKey="sales" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card p-5 h-[400px]">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Sales Distribution</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={displayData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="sales"
                nameKey="company"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {displayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table */}
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Sales Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 text-left">Company</th>
                <th className="px-6 py-3 text-right">Sales Amount</th>
                <th className="px-6 py-3 text-right">% of Total</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {displayData.map((item) => (
                <tr key={item.companyId} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-3 font-medium">{item.company}</td>
                  <td className="px-6 py-3 text-right text-emerald-600 font-semibold">{formatCurrency(item.sales)}</td>
                  <td className="px-6 py-3 text-right text-slate-500">{((item.sales / totalSales) * 100).toFixed(1)}%</td>
                  <td className="px-6 py-3 text-center">
                    <button 
                      onClick={() => setSelectedSingleCompany(item.companyId)}
                      className="text-xs text-brand-600 hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}