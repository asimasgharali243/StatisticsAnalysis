// // import React, { useState,useEffect } from 'react';
// // import { KPICards } from '../components/KPICards';
// // import { RevenueTrendChart } from '../components/charts/RevenueTrendChart';
// // import { ExpenseTrendChart } from '../components/charts/ExpenseTrendChart';
// // import { ProfitLossChart } from '../components/charts/ProfitLossChart';
// // import { CompanyComparisonChart } from '../components/charts/CompanyComparisonChart';
// // import { ARAgingChart } from '../components/charts/ARAgingChart';
// // import { APBreakdownChart } from '../components/charts/APBreakdownChart';
// // import { ExpenseDistributionChart } from '../components/charts/ExpenseDistributionChart';
// // import { CashFlowChart } from '../components/charts/CashFlowChart';
// // import { CompanyContributionChart } from '../components/charts/CompanyContributionChart';
// // import { InvoiceStatusChart } from '../components/charts/InvoiceStatusChart';
// // import { useFilters } from '../context/FilterContext';
// // import { RefreshCw, TrendingUp, TrendingDown, DollarSign, CreditCard, Banknote, ShoppingCart, Wallet, X, BarChart3, Building2 } from 'lucide-react';
// // import { useGetCompaniesQuery } from '../store/api/dashboardApi';
// // import { useLocation } from 'react-router-dom';

// // type TabType = 'overview' | 'sales' | 'purchases' | 'receivable' | 'payable' | 'expense' | 'banks';

// // export function Dashboard() {
// //   const { 
// //     dashboardData, 
// //     isLoading, 
// //     error, 
// //     refreshData, 
// //     selectedSingleCompany,
// //     setSelectedSingleCompany,
// //     selectedMetric,
// //     setSelectedMetric,
// //     clearCompanies
// //   } = useFilters();
// //   const { data: companies } = useGetCompaniesQuery();
// //   const [activeTab, setActiveTab] = useState<TabType>('overview');


// //   const location = useLocation();
// //   const formatCurrency = (value: number) => {
// //     return new Intl.NumberFormat('en-US', {
// //       style: 'currency',
// //       currency: 'USD',
// //       minimumFractionDigits: 0,
// //       maximumFractionDigits: 0,
// //     }).format(value);
// //   };

// //   const getMetricIcon = (text: string, size: number = 18) => {
// //     switch (text.toLowerCase()) {
// //       case 'sales': return <TrendingUp size={size} />;
// //       case 'purchases': return <ShoppingCart size={size} />;
// //       case 'receivable': return <CreditCard size={size} />;
// //       case 'payable': return <Banknote size={size} />;
// //       case 'expense': return <TrendingDown size={size} />;
// //       case 'banks': return <Wallet size={size} />;
// //       default: return <DollarSign size={size} />;
// //     }
// //   };

// //   const getMetricColor = (text: string) => {
// //     switch (text.toLowerCase()) {
// //       case 'sales': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30';
// //       case 'purchases': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
// //       case 'receivable': return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
// //       case 'payable': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30';
// //       case 'expense': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
// //       case 'banks': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
// //       default: return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800';
// //     }
// //   };

// //   const getCompanyName = (companyId: string) => {
// //     return companies?.find(c => c.id === companyId)?.name || companyId;
// //   };

  
// // useEffect(() => {
// //   // Check if we have navigation state from Companies page
// //   if (location.state) {
// //     if (location.state.activeTab) {
// //       setActiveTab(location.state.activeTab);
// //     }
// //     if (location.state.companyId) {
       
     
// //       setSelectedSingleCompany(location.state.companyId);
// //     }
// //     if (location.state.metricName) {
// //       setSelectedMetric(location.state.metricName as any);
// //     }
// //     // Clear the state after using it to prevent re-opening on refresh
// //     window.history.replaceState({}, document.title);
// //   }
// // }, [location.state]);

// //   // Loading state
// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-96">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
// //           <p className="text-slate-600 dark:text-slate-400">Loading financial data...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Error state
// //   if (error) {
// //     return (
// //       <div className="text-center text-red-600 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
// //         <p className="font-semibold">Error loading dashboard data</p>
// //         <p className="text-sm mt-2">Please make sure the backend is running</p>
// //         <button onClick={refreshData} className="btn-primary mt-4">Retry</button>
// //       </div>
// //     );
// //   }

// //   // No data state
// //   if (!dashboardData || Object.keys(dashboardData).length === 0) {
// //     return (
// //       <div className="flex justify-center items-center h-96">
// //         <div className="text-center">
// //           <p className="text-slate-600 dark:text-slate-400">No data available. Please select companies from the filter.</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Determine which companies to show
// //   const companiesToShow = selectedSingleCompany 
// //     ? { [selectedSingleCompany]: dashboardData?.[selectedSingleCompany] }
// //     : dashboardData;

// //   // Get all companies data for comparison
// //   const allCompaniesData = dashboardData || {};

// //   // Prepare chart data for selected metric across companies
// //   const getMetricComparisonData = (metricName: string) => {
// //     if (!allCompaniesData) return [];
// //     return Object.entries(allCompaniesData).map(([companyId, metrics]) => {
// //       const metric = metrics?.find(m => m.texts.toLowerCase() === metricName.toLowerCase());
// //       return {
// //         company: getCompanyName(companyId),
// //         value: metric?.value || 0,
// //         companyId: companyId
// //       };
// //     }).sort((a, b) => b.value - a.value);
// //   };

// //   const tabs = [
// //     { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
// //     { id: 'sales', label: 'Sales', icon: <TrendingUp size={16} /> },
// //     { id: 'purchases', label: 'Purchases', icon: <ShoppingCart size={16} /> },
// //     { id: 'receivable', label: 'Receivable', icon: <CreditCard size={16} /> },
// //     { id: 'payable', label: 'Payable', icon: <Banknote size={16} /> },
// //     { id: 'expense', label: 'Expense', icon: <TrendingDown size={16} /> },
// //     { id: 'banks', label: 'Banks', icon: <Wallet size={16} /> },
// //   ];

// //   const clearFilters = () => {
// //     setSelectedSingleCompany(null);
// //     setSelectedMetric('All');
// //   };

// //   // Get total for a specific metric
// //   const getTotalForMetric = (metricName: string) => {
// //     if (!allCompaniesData) return 0;
// //     let total = 0;
// //     Object.values(allCompaniesData).forEach(metrics => {
// //       const metric = metrics?.find(m => m.texts.toLowerCase() === metricName.toLowerCase());
// //       if (metric) total += metric.value;
// //     });
// //     return total;
// //   };

// //   return (
// //     <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
// //       {/* Header */}
// //       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
// //         <div>
// //           <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
// //             Financial Dashboard
// //             {selectedSingleCompany && (
// //               <span className="text-base sm:text-lg font-normal text-slate-500 ml-2">
// //                 - {getCompanyName(selectedSingleCompany)}
// //               </span>
// //             )}
// //           </h1>
// //         </div>
// //         <div className="flex gap-2 w-full sm:w-auto">
// //           {selectedSingleCompany && (
// //             <button onClick={clearFilters} className="btn-secondary flex items-center gap-2 text-sm flex-1 sm:flex-none justify-center">
// //               <X size={16} />
// //               <span className="hidden sm:inline">Show All Companies</span>
// //               <span className="sm:hidden">Clear</span>
// //             </button>
// //           )}
// //           <button onClick={refreshData} className="btn-secondary flex items-center gap-2 text-sm flex-1 sm:flex-none justify-center">
// //             <RefreshCw size={16} />
// //             <span className="hidden sm:inline">Refresh</span>
// //           </button>
// //         </div>
// //       </div>

// //       {/* KPI Cards - Summary */}
// //       <KPICards />

// //       {/* Tab Navigation - Scrollable on mobile */}
// //       <div className="overflow-x-auto -mx-4 px-4 pb-2">
// //         <div className="flex gap-2 min-w-max border-b border-slate-200 dark:border-slate-700 pb-2">
// //           {tabs.map((tab) => (
// //             <button
// //               key={tab.id}
// //               onClick={() => setActiveTab(tab.id)}
// //               className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
// //                 activeTab === tab.id
// //                   ? 'bg-brand-600 text-white'
// //                   : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
// //               }`}>
// //               {tab.icon}
// //               <span className="hidden sm:inline">{tab.label}</span>
// //               <span className="sm:hidden">{tab.label.charAt(0)}</span>
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Tab Content */}
// //       <div className="min-h-[400px]">
// //         {activeTab === 'overview' && (
// //           <div className="space-y-4 sm:space-y-6">
// //             {/* Charts Section - Responsive grid */}
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
// //               <RevenueTrendChart />
// //               <ExpenseTrendChart />
// //             </div>
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
// //               <ProfitLossChart />
// //               <CompanyComparisonChart />
// //             </div>
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
// //               <ARAgingChart />
// //               <APBreakdownChart />
// //             </div>
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
// //               <ExpenseDistributionChart />
// //               <CashFlowChart />
// //             </div>
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
// //               <CompanyContributionChart />
// //               <InvoiceStatusChart />
// //             </div>

// //             {/* Company-wise Breakdown Cards */}
// //             {companiesToShow && Object.keys(companiesToShow).length > 0 && (
// //               <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
// //                 <div className="border-t border-slate-200 dark:border-slate-700 pt-4 sm:pt-6">
// //                   <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
// //                     <Building2 size={20} className="text-brand-500" />
// //                     Company-wise Financial Breakdown
// //                   </h2>
// //                 </div>
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
// //                   {Object.entries(companiesToShow).map(([companyId, metrics]) => (
// //                     <div key={companyId} className="card overflow-hidden hover:shadow-lg transition-all">
// //                       <div 
// //                         className="p-3 sm:p-4 bg-gradient-to-r from-brand-50 to-white dark:from-brand-900/20 dark:to-slate-800 cursor-pointer"
// //                         onClick={() => setSelectedSingleCompany(companyId)}
// //                       >
// //                         <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
// //                           {getCompanyName(companyId)}
// //                         </h3>
// //                         <p className="text-xs text-slate-500">{companyId}</p>
// //                       </div>
// //                       <div className="p-3 sm:p-4">
// //                         <div className="space-y-2">
// //                           {metrics?.map((metric, idx) => (
// //                             <div key={idx} className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50">
// //                               <div className="flex items-center gap-2">
// //                                 <div className={`p-1 rounded ${getMetricColor(metric.texts)}`}>
// //                                   {getMetricIcon(metric.texts, 12)}
// //                                 </div>
// //                                 <span className="text-xs text-slate-600 dark:text-slate-400">
// //                                   {metric.texts}
// //                                 </span>
// //                               </div>
// //                               <span className="text-sm font-semibold text-slate-900 dark:text-white">
// //                                 {formatCurrency(metric.value)}
// //                               </span>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* Sales Tab */}
// //         {activeTab === 'sales' && (
// //           <div className="space-y-4 sm:space-y-6">
// //             <div className="card p-4 sm:p-6">
// //               <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
// //                 <TrendingUp size={20} className="text-emerald-500" />
// //                 Sales Overview
// //               </h3>
// //               <div className="overflow-x-auto">
// //                 <table className="w-full text-sm">
// //                   <thead className="bg-slate-50 dark:bg-slate-800">
// //                     <tr>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Company</th>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">Sales Amount</th>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">% of Total</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
// //                     {getMetricComparisonData('sales').map((item, idx) => {
// //                       const total = getTotalForMetric('sales');
// //                       const percentage = total > 0 ? (item.value / total) * 100 : 0;
// //                       return (
// //                         <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white">{item.company}</td>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
// //                             {formatCurrency(item.value)}
// //                           </td>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm text-slate-500">{percentage.toFixed(1)}%</td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Purchases Tab */}
// //         {activeTab === 'purchases' && (
// //           <div className="space-y-4 sm:space-y-6">
// //             <div className="card p-4 sm:p-6">
// //               <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
// //                 <ShoppingCart size={20} className="text-blue-500" />
// //                 Purchases Overview
// //               </h3>
// //               <div className="overflow-x-auto">
// //                 <table className="w-full text-sm">
// //                   <thead className="bg-slate-50 dark:bg-slate-800">
// //                     <tr>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Company</th>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">Purchases Amount</th>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">% of Total</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
// //                     {getMetricComparisonData('purchases').map((item, idx) => {
// //                       const total = getTotalForMetric('purchases');
// //                       const percentage = total > 0 ? (item.value / total) * 100 : 0;
// //                       return (
// //                         <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white">{item.company}</td>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
// //                             {formatCurrency(item.value)}
// //                           </td>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm text-slate-500">{percentage.toFixed(1)}%</td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Receivable Tab */}
// //         {activeTab === 'receivable' && (
// //           <div className="space-y-4 sm:space-y-6">
// //             <div className="card p-4 sm:p-6">
// //               <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
// //                 <CreditCard size={20} className="text-amber-500" />
// //                 Accounts Receivable Overview
// //               </h3>
// //               <div className="overflow-x-auto">
// //                 <table className="w-full text-sm">
// //                   <thead className="bg-slate-50 dark:bg-slate-800">
// //                     <tr>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Company</th>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">Receivable Amount</th>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">% of Total</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
// //                     {getMetricComparisonData('receivable').map((item, idx) => {
// //                       const total = getTotalForMetric('receivable');
// //                       const percentage = total > 0 ? (item.value / total) * 100 : 0;
// //                       return (
// //                         <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white">{item.company}</td>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400">
// //                             {formatCurrency(item.value)}
// //                           </td>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm text-slate-500">{percentage.toFixed(1)}%</td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //             <ARAgingChart />
// //           </div>
// //         )}

// //         {/* Payable Tab */}
// //         {activeTab === 'payable' && (
// //           <div className="space-y-4 sm:space-y-6">
// //             <div className="card p-4 sm:p-6">
// //               <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
// //                 <Banknote size={20} className="text-orange-500" />
// //                 Accounts Payable Overview
// //               </h3>
// //               <div className="overflow-x-auto">
// //                 <table className="w-full text-sm">
// //                   <thead className="bg-slate-50 dark:bg-slate-800">
// //                     <tr>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Company</th>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">Payable Amount</th>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">% of Total</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
// //                     {getMetricComparisonData('payable').map((item, idx) => {
// //                       const total = getTotalForMetric('payable');
// //                       const percentage = total > 0 ? (item.value / total) * 100 : 0;
// //                       return (
// //                         <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white">{item.company}</td>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400">
// //                             {formatCurrency(item.value)}
// //                           </td>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm text-slate-500">{percentage.toFixed(1)}%</td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //             <APBreakdownChart />
// //           </div>
// //         )}

// //         {/* Expense Tab */}
// //         {activeTab === 'expense' && (
// //           <div className="space-y-4 sm:space-y-6">
// //             <div className="card p-4 sm:p-6">
// //               <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
// //                 <TrendingDown size={20} className="text-red-500" />
// //                 Expenses Overview
// //               </h3>
// //               <div className="overflow-x-auto">
// //                 <table className="w-full text-sm">
// //                   <thead className="bg-slate-50 dark:bg-slate-800">
// //                     <tr>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Company</th>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">Expense Amount</th>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">% of Total</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
// //                     {getMetricComparisonData('expense').map((item, idx) => {
// //                       const total = getTotalForMetric('expense');
// //                       const percentage = total > 0 ? (item.value / total) * 100 : 0;
// //                       return (
// //                         <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white">{item.company}</td>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400">
// //                             {formatCurrency(item.value)}
// //                           </td>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm text-slate-500">{percentage.toFixed(1)}%</td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //             <ExpenseDistributionChart />
// //             <ExpenseTrendChart />
// //           </div>
// //         )}

// //         {/* Banks Tab */}
// //         {activeTab === 'banks' && (
// //           <div className="space-y-4 sm:space-y-6">
// //             <div className="card p-4 sm:p-6">
// //               <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
// //                 <Wallet size={20} className="text-purple-500" />
// //                 Bank Balances Overview
// //               </h3>
// //               <div className="overflow-x-auto">
// //                 <table className="w-full text-sm">
// //                   <thead className="bg-slate-50 dark:bg-slate-800">
// //                     <tr>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Company</th>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">Bank Balance</th>
// //                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">% of Total</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
// //                     {getMetricComparisonData('banks').map((item, idx) => {
// //                       const total = getTotalForMetric('banks');
// //                       const percentage = total > 0 ? (item.value / total) * 100 : 0;
// //                       return (
// //                         <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white">{item.company}</td>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400">
// //                             {formatCurrency(item.value)}
// //                           </td>
// //                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm text-slate-500">{percentage.toFixed(1)}%</td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from 'react';
// import { KPICards } from '../components/KPICards';
// import { RevenueTrendChart } from '../components/charts/RevenueTrendChart';
// import { ExpenseTrendChart } from '../components/charts/ExpenseTrendChart';
// import { ProfitLossChart } from '../components/charts/ProfitLossChart';
// import { CompanyComparisonChart } from '../components/charts/CompanyComparisonChart';
// import { ARAgingChart } from '../components/charts/ARAgingChart';
// import { APBreakdownChart } from '../components/charts/APBreakdownChart';
// import { ExpenseDistributionChart } from '../components/charts/ExpenseDistributionChart';
// import { CashFlowChart } from '../components/charts/CashFlowChart';
// import { CompanyContributionChart } from '../components/charts/CompanyContributionChart';
// import { InvoiceStatusChart } from '../components/charts/InvoiceStatusChart';
// import { useFilters } from '../context/FilterContext';
// import { RefreshCw, TrendingUp, TrendingDown, DollarSign, CreditCard, Banknote, ShoppingCart, Wallet, X, BarChart3, Building2 } from 'lucide-react';
// import { CompanyReceivablePayable, useGetCompaniesQuery,
//   useGetReceivablePayableDataMutation } from '../store/api/dashboardApi';
// import { useLocation, useNavigate } from 'react-router-dom';

// type TabType = 'overview' | 'sales' | 'purchases' | 'receivable' | 'payable' | 'expense' | 'banks';

// export function Dashboard() {
//   const { 
//     dashboardData, 
//     isLoading, 
//     error, 
//     refreshData, 
//     selectedSingleCompany,
//     setSelectedSingleCompany,
//     selectedMetric,
//     setSelectedMetric
//   } = useFilters();
//   const { data: companies } = useGetCompaniesQuery();
//   const [activeTab, setActiveTab] = useState<TabType>('overview');
//   const [getReceivablePayableData, { isLoading: isDetailLoading }] = useGetReceivablePayableDataMutation();
//   const [detailData, setDetailData] = useState<CompanyReceivablePayable | null>(null);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const fetchDetailData = async (companyId: string) => {
//     try {
//       const result = await getReceivablePayableData({
//         companyIds: [companyId],
//         dateFrom: '2020-01-01',
//         dateTo: '2026-01-01'
//       }).unwrap();
      
//       if (result.success && result.data && result.data.length > 0) {
//         setDetailData(result.data[0]);
//       } else {
//         setDetailData(null);
//       }
//     } catch (error) {
//       console.error('Error fetching detail data:', error);
//       setDetailData(null);
//     }
//   };

//   useEffect(() => {
//     if (location.state) {
//       const { activeTab: tab, companyId, metricName } = location.state;
      
//       if (tab) {
//         setActiveTab(tab);
//       }
      
//       if (companyId && (tab === 'receivable' || tab === 'payable')) {
//         setSelectedSingleCompany(companyId);
//         fetchDetailData(companyId);
//       } else if (companyId) {
//         setSelectedSingleCompany(companyId);
//       }
      
//       if (metricName) {
//         setSelectedMetric(metricName as any);
//       }
      
//       window.history.replaceState({}, document.title);
//     }
//   }, [location.state]);

//   const formatNumber = (value: number | null) => {
//     if (value === null || value === 0) return '-';
//     return new Intl.NumberFormat('en-US', {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(value);
//   };

//   const formatCompactNumber = (value: number | null) => {
//     if (value === null || value === 0) return '-';
//     if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
//     if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
//     return value.toString();
//   };

//   const getMetricIcon = (text: string, size: number = 18) => {
//     switch (text.toLowerCase()) {
//       case 'sales': return <TrendingUp size={size} />;
//       case 'purchases': return <ShoppingCart size={size} />;
//       case 'receivable': return <CreditCard size={size} />;
//       case 'payable': return <Banknote size={size} />;
//       case 'expense': return <TrendingDown size={size} />;
//       case 'banks': return <Wallet size={size} />;
//       default: return <DollarSign size={size} />;
//     }
//   };

//   const getMetricColor = (text: string) => {
//     switch (text.toLowerCase()) {
//       case 'sales': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30';
//       case 'purchases': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
//       case 'receivable': return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
//       case 'payable': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30';
//       case 'expense': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
//       case 'banks': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
//       default: return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800';
//     }
//   };

//   const getCompanyName = (companyId: string) => {
//     return companies?.find(c => c.id === companyId)?.name || companyId;
//   };

//   const clearFilters = () => {
//     setSelectedSingleCompany(null);
//     setSelectedMetric('All');
//     setDetailData(null);
//     navigate('/');
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
//           <p className="text-slate-600 dark:text-slate-400">Loading financial data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-600 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
//         <p className="font-semibold">Error loading dashboard data</p>
//         <p className="text-sm mt-2">Please make sure the backend is running</p>
//         <button onClick={refreshData} className="btn-primary mt-4">Retry</button>
//       </div>
//     );
//   }

//   if (!dashboardData || Object.keys(dashboardData).length === 0) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="text-center">
//           <p className="text-slate-600 dark:text-slate-400">No data available. Please select companies from the filter.</p>
//         </div>
//       </div>
//     );
//   }

//   // When a single company is selected, only show that company's data
//   const companiesToShow = selectedSingleCompany 
//     ? { [selectedSingleCompany]: dashboardData?.[selectedSingleCompany] }
//     : dashboardData;

//   const allCompaniesData = dashboardData || {};

//   const getMetricComparisonData = (metricName: string) => {
//     if (!allCompaniesData) return [];
//     // If single company selected, only return that company
//     const companiesToUse = selectedSingleCompany 
//       ? { [selectedSingleCompany]: allCompaniesData[selectedSingleCompany] }
//       : allCompaniesData;
    
//     return Object.entries(companiesToUse).map(([companyId, metrics]) => {
//       const metric = metrics?.find(m => m.texts.toLowerCase() === metricName.toLowerCase());
//       return {
//         company: getCompanyName(companyId),
//         value: metric?.value || 0,
//         companyId: companyId
//       };
//     }).sort((a, b) => b.value - a.value);
//   };

//   const getTotalForMetric = (metricName: string) => {
//     if (!allCompaniesData) return 0;
//     // If single company selected, only sum that company
//     const companiesToUse = selectedSingleCompany 
//       ? { [selectedSingleCompany]: allCompaniesData[selectedSingleCompany] }
//       : allCompaniesData;
    
//     let total = 0;
//     Object.values(companiesToUse).forEach(metrics => {
//       const metric = metrics?.find(m => m.texts.toLowerCase() === metricName.toLowerCase());
//       if (metric) total += metric.value;
//     });
//     return total;
//   };

//   const tabs = [
//     { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
//     { id: 'sales', label: 'Sales', icon: <TrendingUp size={16} /> },
//     { id: 'purchases', label: 'Purchases', icon: <ShoppingCart size={16} /> },
//     { id: 'receivable', label: 'Receivable', icon: <CreditCard size={16} /> },
//     { id: 'payable', label: 'Payable', icon: <Banknote size={16} /> },
//     { id: 'expense', label: 'Expense', icon: <TrendingDown size={16} /> },
//     { id: 'banks', label: 'Banks', icon: <Wallet size={16} /> },
//   ];

//   return (
//     <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//         <div>
//           <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
//             Financial Dashboard
//             {selectedSingleCompany && (
//               <span className="text-base sm:text-lg font-normal text-slate-500 ml-2">
//                 - {getCompanyName(selectedSingleCompany)}
//               </span>
//             )}
//           </h1>
//         </div>
//         <div className="flex gap-2 w-full sm:w-auto">
//           {selectedSingleCompany && (
//             <button onClick={clearFilters} className="btn-secondary flex items-center gap-2 text-sm flex-1 sm:flex-none justify-center">
//               <X size={16} />
//               <span className="hidden sm:inline">Show All Companies</span>
//               <span className="sm:hidden">Clear</span>
//             </button>
//           )}
//           <button onClick={refreshData} className="btn-secondary flex items-center gap-2 text-sm flex-1 sm:flex-none justify-center">
//             <RefreshCw size={16} />
//             <span className="hidden sm:inline">Refresh</span>
//           </button>
//         </div>
//       </div>

//       <KPICards />

//       <div className="overflow-x-auto -mx-4 px-4 pb-2">
//         <div className="flex gap-2 min-w-max border-b border-slate-200 dark:border-slate-700 pb-2">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
//                 activeTab === tab.id
//                   ? 'bg-brand-600 text-white'
//                   : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
//               }`}>
//               {tab.icon}
//               <span className="hidden sm:inline">{tab.label}</span>
//               <span className="sm:hidden">{tab.label.charAt(0)}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="min-h-[400px]">
//         {activeTab === 'overview' && (
//           <div className="space-y-4 sm:space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//               <RevenueTrendChart />
//               <ExpenseTrendChart />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//               <ProfitLossChart />
//               <CompanyComparisonChart />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//               <ARAgingChart />
//               <APBreakdownChart />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//               <ExpenseDistributionChart />
//               <CashFlowChart />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//               <CompanyContributionChart />
//               <InvoiceStatusChart />
//             </div>

//             {companiesToShow && Object.keys(companiesToShow).length > 0 && (
//               <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
//                 <div className="border-t border-slate-200 dark:border-slate-700 pt-4 sm:pt-6">
//                   <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
//                     <Building2 size={20} className="text-brand-500" />
//                     Company-wise Financial Breakdown
//                   </h2>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
//                   {Object.entries(companiesToShow).map(([companyId, metrics]) => (
//                     <div key={companyId} className="card overflow-hidden hover:shadow-lg transition-all">
//                       <div 
//                         className="p-3 sm:p-4 bg-gradient-to-r from-brand-50 to-white dark:from-brand-900/20 dark:to-slate-800 cursor-pointer"
//                         onClick={() => setSelectedSingleCompany(companyId)}
//                       >
//                         <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
//                           {getCompanyName(companyId)}
//                         </h3>
//                         <p className="text-xs text-slate-500">{companyId}</p>
//                       </div>
//                       <div className="p-3 sm:p-4">
//                         <div className="space-y-2">
//                           {metrics?.map((metric, idx) => (
//                             <div key={idx} className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50">
//                               <div className="flex items-center gap-2">
//                                 <div className={`p-1 rounded ${getMetricColor(metric.texts)}`}>
//                                   {getMetricIcon(metric.texts, 12)}
//                                 </div>
//                                 <span className="text-xs text-slate-600 dark:text-slate-400">
//                                   {metric.texts}
//                                 </span>
//                               </div>
//                               <span className="text-sm font-semibold text-slate-900 dark:text-white">
//                                 {formatCompactNumber(metric.value)}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'sales' && (
//           <div className="space-y-4 sm:space-y-6">
//             <div className="card p-4 sm:p-6">
//               <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
//                 <TrendingUp size={20} className="text-emerald-500" />
//                 Sales Overview
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="bg-slate-50 dark:bg-slate-800">
//                     <tr>
//                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Company</th>
//                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">Sales Amount</th>
//                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">% of Total</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//                     {getMetricComparisonData('sales').map((item, idx) => {
//                       const total = getTotalForMetric('sales');
//                       const percentage = total > 0 ? (item.value / total) * 100 : 0;
//                       return (
//                         <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
//                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white">{item.company}</td>
//                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
//                             {formatNumber(item.value)}
//                           </td>
//                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm text-slate-500">{percentage.toFixed(1)}%</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>  
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'purchases' && (
//           <div className="space-y-4 sm:space-y-6">
//             <div className="card p-4 sm:p-6">
//               <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
//                 <ShoppingCart size={20} className="text-blue-500" />
//                 Purchases Overview
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="bg-slate-50 dark:bg-slate-800">
//                     <tr>
//                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Company</th>
//                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">Purchases Amount</th>
//                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">% of Total</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//                     {getMetricComparisonData('purchases').map((item, idx) => {
//                       const total = getTotalForMetric('purchases');
//                       const percentage = total > 0 ? (item.value / total) * 100 : 0;
//                       return (
//                         <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
//                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white">{item.company}</td>
//                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
//                             {formatNumber(item.value)}
//                           </td>
//                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm text-slate-500">{percentage.toFixed(1)}%</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'receivable' && (
//           <div className="space-y-4 sm:space-y-6">
//             {selectedSingleCompany && detailData ? (
//               <>
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="text-xl font-bold text-slate-900 dark:text-white">
//                       Accounts Receivable Details
//                     </h2>
//                     <p className="text-sm text-slate-500">{detailData.companyName}</p>
//                   </div>
//                   <button onClick={clearFilters} className="btn-secondary flex items-center gap-2">
//                     <X size={16} />
//                     Show All Companies
//                   </button>
//                 </div>
                
//                 {isDetailLoading ? (
//                   <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="card p-5 bg-gradient-to-r from-amber-50 to-white dark:from-amber-900/20 dark:to-slate-800">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <p className="text-sm text-slate-500 dark:text-slate-400">Total Receivable</p>
//                           <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
//                             {formatNumber(detailData.totalReceivable)}
//                           </p>
//                         </div>
//                         <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
//                           <CreditCard size={24} className="text-amber-600" />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="card overflow-hidden">
//                       <div className="p-4 border-b border-slate-200 dark:border-slate-700">
//                         <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Receivable Parties</h3>
//                         <p className="text-sm text-slate-500">Total {detailData.data.filter(item => item.receiveName).length} entries</p>
//                       </div>
//                       <div className="overflow-x-auto">
//                         <table className="w-full text-sm">
//                           <thead className="bg-slate-50 dark:bg-slate-800/50">
//                             <tr>
//                               <th className="px-6 py-3 text-left font-semibold">Party Name</th>
//                               <th className="px-6 py-3 text-right font-semibold">Receivable Amount</th>
//                             </tr>
//                           </thead>
//                           <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//                             {detailData.data.filter(item => item.receiveName).map((item, idx) => (
//                               <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
//                                 <td className="px-6 py-3 text-slate-700 dark:text-slate-300">{item.receiveName}</td>
//                                 <td className="px-6 py-3 text-right font-medium text-amber-600">{formatNumber(item.receivable)}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div className="card p-4 sm:p-6">
//                   <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
//                     <CreditCard size={20} className="text-amber-500" />
//                     Accounts Receivable Overview
//                   </h3>
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-sm">
//                       <thead className="bg-slate-50 dark:bg-slate-800">
//                         <tr>
//                           <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Company</th>
//                           <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">Receivable Amount</th>
//                           <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">% of Total</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//                         {getMetricComparisonData('receivable').map((item, idx) => {
//                           const total = getTotalForMetric('receivable');
//                           const percentage = total > 0 ? (item.value / total) * 100 : 0;
//                           return (
//                             <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
//                               <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white">{item.company}</td>
//                               <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400">
//                                 {formatNumber(item.value)}
//                               </td>
//                               <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm text-slate-500">{percentage.toFixed(1)}%</td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//                 <ARAgingChart />
//               </>
//             )}
//           </div>
//         )}

//         {activeTab === 'payable' && (
//           <div className="space-y-4 sm:space-y-6">
//             {selectedSingleCompany && detailData ? (
//               <>
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="text-xl font-bold text-slate-900 dark:text-white">
//                       Accounts Payable Details
//                     </h2>
//                     <p className="text-sm text-slate-500">{detailData.companyName}</p>
//                   </div>
//                   <button onClick={clearFilters} className="btn-secondary flex items-center gap-2">
//                     <X size={16} />
//                     Show All Companies
//                   </button>
//                 </div>
                
//                 {isDetailLoading ? (
//                   <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="card p-5 bg-gradient-to-r from-orange-50 to-white dark:from-orange-900/20 dark:to-slate-800">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <p className="text-sm text-slate-500 dark:text-slate-400">Total Payable</p>
//                           <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
//                             {formatNumber(detailData.totalPayable)}
//                           </p>
//                         </div>
//                         <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
//                           <Banknote size={24} className="text-orange-600" />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="card overflow-hidden">
//                       <div className="p-4 border-b border-slate-200 dark:border-slate-700">
//                         <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Payable Parties</h3>
//                         <p className="text-sm text-slate-500">Total {detailData.data.filter(item => item.payableName).length} entries</p>
//                       </div>
//                       <div className="overflow-x-auto">
//                         <table className="w-full text-sm">
//                           <thead className="bg-slate-50 dark:bg-slate-800/50">
//                             <tr>
//                               <th className="px-6 py-3 text-left font-semibold">Party Name</th>
//                               <th className="px-6 py-3 text-right font-semibold">Payable Amount</th>
//                             </tr>
//                           </thead>
//                           <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//                             {detailData.data.filter(item => item.payableName).map((item, idx) => (
//                               <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
//                                 <td className="px-6 py-3 text-slate-700 dark:text-slate-300">{item.payableName}</td>
//                                 <td className="px-6 py-3 text-right font-medium text-orange-600">{formatNumber(item.payable)}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div className="card p-4 sm:p-6">
//                   <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
//                     <Banknote size={20} className="text-orange-500" />
//                     Accounts Payable Overview
//                   </h3>
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-sm">
//                       <thead className="bg-slate-50 dark:bg-slate-800">
//                         <tr>
//                           <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Company</th>
//                           <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">Payable Amount</th>
//                           <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">% of Total</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//                         {getMetricComparisonData('payable').map((item, idx) => {
//                           const total = getTotalForMetric('payable');
//                           const percentage = total > 0 ? (item.value / total) * 100 : 0;
//                           return (
//                             <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
//                               <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white">{item.company}</td>
//                               <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400">
//                                 {formatNumber(item.value)}
//                               </td>
//                               <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm text-slate-500">{percentage.toFixed(1)}%</td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//                 <APBreakdownChart />
//               </>
//             )}
//           </div>
//         )}

//         {activeTab === 'expense' && (
//           <div className="space-y-4 sm:space-y-6">
//             <div className="card p-4 sm:p-6">
//               <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
//                 <TrendingDown size={20} className="text-red-500" />
//                 Expenses Overview
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="bg-slate-50 dark:bg-slate-800">
//                     <tr>
//                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Company</th>
//                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">Expense Amount</th>
//                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">% of Total</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//                     {getMetricComparisonData('expense').map((item, idx) => {
//                       const total = getTotalForMetric('expense');
//                       const percentage = total > 0 ? (item.value / total) * 100 : 0;
//                       return (
//                         <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
//                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white">{item.company}</td>
//                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400">
//                             {formatNumber(item.value)}
//                           </td>
//                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm text-slate-500">{percentage.toFixed(1)}%</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <ExpenseDistributionChart />
//             <ExpenseTrendChart />
//           </div>
//         )}

//         {activeTab === 'banks' && (
//           <div className="space-y-4 sm:space-y-6">
//             <div className="card p-4 sm:p-6">
//               <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
//                 <Wallet size={20} className="text-purple-500" />
//                 Bank Balances Overview
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="bg-slate-50 dark:bg-slate-800">
//                     <tr>
//                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Company</th>
//                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">Bank Balance</th>
//                       <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">% of Total</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//                     {getMetricComparisonData('banks').map((item, idx) => {
//                       const total = getTotalForMetric('banks');
//                       const percentage = total > 0 ? (item.value / total) * 100 : 0;
//                       return (
//                         <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
//                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white">{item.company}</td>
//                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400">
//                             {formatNumber(item.value)}
//                           </td>
//                           <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm text-slate-500">{percentage.toFixed(1)}%</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { KPICards } from '../components/KPICards';
import { RevenueTrendChart } from '../components/charts/RevenueTrendChart';
import { ExpenseTrendChart } from '../components/charts/ExpenseTrendChart';
import { ProfitLossChart } from '../components/charts/ProfitLossChart';
import { CompanyComparisonChart } from '../components/charts/CompanyComparisonChart';
import { ARAgingChart } from '../components/charts/ARAgingChart';
import { APBreakdownChart } from '../components/charts/APBreakdownChart';
import { ExpenseDistributionChart } from '../components/charts/ExpenseDistributionChart';
import { CashFlowChart } from '../components/charts/CashFlowChart';
import { CompanyContributionChart } from '../components/charts/CompanyContributionChart';
import { InvoiceStatusChart } from '../components/charts/InvoiceStatusChart';
import { useFilters } from '../context/FilterContext';
import { RefreshCw, TrendingUp, TrendingDown, DollarSign, CreditCard, Banknote, ShoppingCart, Wallet, X, BarChart3, Building2, Phone } from 'lucide-react';
import { useGetCompaniesQuery, useGetReceivablePayableDataMutation, useGetClosingBalanceDataMutation, CompanyReceivablePayable, CompanyClosingBalance } from '../store/api/dashboardApi';
import { useLocation, useNavigate } from 'react-router-dom';

type TabType = 'overview' | 'sales' | 'purchases' | 'receivable' | 'payable' | 'expense' | 'banks';

export function Dashboard() {
  const { 
    dashboardData, 
    isLoading, 
    error, 
    refreshData, 
    selectedSingleCompany,
    setSelectedSingleCompany,
    selectedMetric,
    setSelectedMetric
  } = useFilters();
  const { data: companies } = useGetCompaniesQuery();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [getReceivablePayableData] = useGetReceivablePayableDataMutation();
  const [getClosingBalanceData] = useGetClosingBalanceDataMutation();
  const [detailData, setDetailData] = useState<CompanyReceivablePayable | null>(null);
  const [closingBalanceData, setClosingBalanceData] = useState<CompanyClosingBalance | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchDetailData = async (companyId: string, type: string, metricType?: number) => {
    setIsDetailLoading(true);
    try {
      if (type === 'receivable' || type === 'payable') {
        const result = await getReceivablePayableData({
          companyIds: [companyId],
          dateFrom: '2020-01-01',
          dateTo: '2026-01-01'
        }).unwrap();
        
        if (result.success && result.data && result.data.length > 0) {
          setDetailData(result.data[0]);
          setClosingBalanceData(null);
        }
      } else if (metricType && metricType >= 1 && metricType <= 4) {
        const result = await getClosingBalanceData({
          companyIds: [companyId],
          asOnDate: new Date().toISOString().split('T')[0],
          type: metricType
        }).unwrap();
        
        if (result.success && result.data && result.data.length > 0) {
          setClosingBalanceData(result.data[0]);
          setDetailData(null);
        }
      }
    } catch (error) {
      console.error('Error fetching detail data:', error);
    } finally {
      setIsDetailLoading(false);
    }
  };

  useEffect(() => {
    if (location.state) {
      const { activeTab: tab, companyId, metricName, metricType } = location.state;
      
      if (tab) setActiveTab(tab);
      if (companyId) setSelectedSingleCompany(companyId);
      if (metricName) setSelectedMetric(metricName as any);
      
      if (companyId && (tab === 'receivable' || tab === 'payable')) {
        fetchDetailData(companyId, tab);
      } else if (companyId && metricType && metricType >= 1 && metricType <= 4) {
        fetchDetailData(companyId, tab, metricType);
      }
      
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const formatNumber = (value: number | null | undefined) => {
    if (value === null || value === undefined || value === 0) return '-';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getMetricIcon = (text: string, size: number = 18) => {
    switch (text.toLowerCase()) {
      case 'sales': return <TrendingUp size={size} />;
      case 'purchases': return <ShoppingCart size={size} />;
      case 'receivable': return <CreditCard size={size} />;
      case 'payable': return <Banknote size={size} />;
      case 'expense': return <TrendingDown size={size} />;
      case 'banks': return <Wallet size={size} />;
      default: return <DollarSign size={size} />;
    }
  };

  const getMetricColor = (text: string) => {
    switch (text.toLowerCase()) {
      case 'sales': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30';
      case 'purchases': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'receivable': return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
      case 'payable': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30';
      case 'expense': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'banks': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800';
    }
  };

  const getCompanyName = (companyId: string) => {
    return companies?.find(c => c.id === companyId)?.name || companyId;
  };

  const clearFilters = () => {
    setSelectedSingleCompany(null);
    setSelectedMetric('All');
    setDetailData(null);
    setClosingBalanceData(null);
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading financial data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="font-semibold">Error loading dashboard data</p>
        <p className="text-sm mt-2">Please make sure the backend is running</p>
        <button onClick={refreshData} className="btn-primary mt-4">Retry</button>
      </div>
    );
  }

  if (!dashboardData || Object.keys(dashboardData).length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">No data available. Please select companies from the filter.</p>
        </div>
      </div>
    );
  }

  const companiesToShow = selectedSingleCompany 
    ? { [selectedSingleCompany]: dashboardData?.[selectedSingleCompany] }
    : dashboardData;

  const allCompaniesData = dashboardData || {};

  const getMetricComparisonData = (metricName: string) => {
    if (!allCompaniesData) return [];
    const companiesToUse = selectedSingleCompany 
      ? { [selectedSingleCompany]: allCompaniesData[selectedSingleCompany] }
      : allCompaniesData;
    
    return Object.entries(companiesToUse).map(([companyId, metrics]) => {
      const metric = metrics?.find(m => m.texts.toLowerCase() === metricName.toLowerCase());
      return {
        company: getCompanyName(companyId),
        value: metric?.value || 0,
        companyId: companyId
      };
    }).sort((a, b) => b.value - a.value);
  };

  const getTotalForMetric = (metricName: string) => {
    if (!allCompaniesData) return 0;
    const companiesToUse = selectedSingleCompany 
      ? { [selectedSingleCompany]: allCompaniesData[selectedSingleCompany] }
      : allCompaniesData;
    
    let total = 0;
    Object.values(companiesToUse).forEach(metrics => {
      const metric = metrics?.find(m => m.texts.toLowerCase() === metricName.toLowerCase());
      if (metric) total += metric.value;
    });
    return total;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
    { id: 'sales', label: 'Sales', icon: <TrendingUp size={16} /> },
    { id: 'purchases', label: 'Purchases', icon: <ShoppingCart size={16} /> },
    { id: 'receivable', label: 'Receivable', icon: <CreditCard size={16} /> },
    { id: 'payable', label: 'Payable', icon: <Banknote size={16} /> },
    { id: 'expense', label: 'Expense', icon: <TrendingDown size={16} /> },
    { id: 'banks', label: 'Banks', icon: <Wallet size={16} /> },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Financial Dashboard
            {selectedSingleCompany && (
              <span className="text-base sm:text-lg font-normal text-slate-500 ml-2">
                - {getCompanyName(selectedSingleCompany)}
              </span>
            )}
          </h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {selectedSingleCompany && (
            <button onClick={clearFilters} className="btn-secondary flex items-center gap-2 text-sm flex-1 sm:flex-none justify-center">
              <X size={16} />
              <span className="hidden sm:inline">Show All Companies</span>
              <span className="sm:hidden">Clear</span>
            </button>
          )}
          <button onClick={refreshData} className="btn-secondary flex items-center gap-2 text-sm flex-1 sm:flex-none justify-center">
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      <KPICards />

      <div className="overflow-x-auto -mx-4 px-4 pb-2">
        <div className="flex gap-2 min-w-max border-b border-slate-200 dark:border-slate-700 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}>
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.charAt(0)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        {/* Overview Tab - Same as before */}
        {activeTab === 'overview' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <RevenueTrendChart />
              <ExpenseTrendChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <ProfitLossChart />
              <CompanyComparisonChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <ARAgingChart />
              <APBreakdownChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <ExpenseDistributionChart />
              <CashFlowChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <CompanyContributionChart />
              <InvoiceStatusChart />
            </div>

            {companiesToShow && Object.keys(companiesToShow).length > 0 && (
              <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 sm:pt-6">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <Building2 size={20} className="text-brand-500" />
                    Company-wise Financial Breakdown
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {Object.entries(companiesToShow).map(([companyId, metrics]) => (
                    <div key={companyId} className="card overflow-hidden hover:shadow-lg transition-all">
                      <div className="p-3 sm:p-4 bg-gradient-to-r from-brand-50 to-white dark:from-brand-900/20 dark:to-slate-800 cursor-pointer" onClick={() => setSelectedSingleCompany(companyId)}>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">{getCompanyName(companyId)}</h3>
                        <p className="text-xs text-slate-500">{companyId}</p>
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="space-y-2">
                          {metrics?.map((metric, idx) => (
                            <div key={idx} className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <div className="flex items-center gap-2">
                                <div className={`p-1 rounded ${getMetricColor(metric.texts)}`}>{getMetricIcon(metric.texts, 12)}</div>
                                <span className="text-xs text-slate-600 dark:text-slate-400">{metric.texts}</span>
                              </div>
                              <span className="text-sm font-semibold text-slate-900 dark:text-white">{formatNumber(metric.value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="card p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-500" />
                Sales Overview
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr><th className="px-3 sm:px-4 py-2 sm:py-3 text-left">Company</th><th className="px-3 sm:px-4 py-2 sm:py-3 text-right">Sales Amount</th><th className="px-3 sm:px-4 py-2 sm:py-3 text-right">% of Total</th></tr>
                  </thead>
                  <tbody className="divide-y">
                    {getMetricComparisonData('sales').map((item, idx) => {
                      const total = getTotalForMetric('sales');
                      const percentage = total > 0 ? (item.value / total) * 100 : 0;
                      return (
                        <tr key={idx} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
                          <td className="px-3 sm:px-4 py-2">{item.company}</td>
                          <td className="px-3 sm:px-4 py-2 text-right font-semibold text-emerald-600">{formatNumber(item.value)}</td>
                          <td className="px-3 sm:px-4 py-2 text-right text-slate-500">{percentage.toFixed(1)}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Purchases Tab */}
        {activeTab === 'purchases' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="card p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                <ShoppingCart size={20} className="text-blue-500" />
                Purchases Overview
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 text-left">Company</th>
                      <th className="px-3 sm:px-4 py-2 text-right">Purchases Amount</th>
                      <th className="px-3 sm:px-4 py-2 text-right">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getMetricComparisonData('purchases').map((item, idx) => {
                      const total = getTotalForMetric('purchases');
                      const percentage = total > 0 ? (item.value / total) * 100 : 0;
                      return (
                        <tr key={idx} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
                          <td className="px-3 sm:px-4 py-2">{item.company}</td>
                          <td className="px-3 sm:px-4 py-2 text-right font-semibold text-blue-600">{formatNumber(item.value)}</td>
                          <td className="px-3 sm:px-4 py-2 text-right text-slate-500">{percentage.toFixed(1)}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Receivable Tab */}
        {activeTab === 'receivable' && (
          <div className="space-y-4 sm:space-y-6">
            {selectedSingleCompany && (detailData || closingBalanceData) ? (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Accounts Receivable Details</h2>
                    <p className="text-sm text-slate-500">{detailData?.companyName || closingBalanceData?.companyName}</p>
                  </div>
                  <button onClick={clearFilters} className="btn-secondary flex items-center gap-2"><X size={16} />Show All Companies</button>
                </div>
                
                {isDetailLoading ? (
                  <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div></div>
                ) : detailData ? (
                  <>
                    <div className="card p-5 bg-gradient-to-r from-amber-50 to-white dark:from-amber-900/20 dark:to-slate-800">
                      <div className="flex justify-between items-start">
                        <div><p className="text-sm text-slate-500">Total Receivable</p><p className="text-3xl font-bold text-amber-600">{formatNumber(detailData.totalReceivable)}</p></div>
                        <div className="p-3 bg-amber-100 rounded-full"><CreditCard size={24} className="text-amber-600" /></div>
                      </div>
                    </div>
                    <div className="card overflow-hidden">
                      <div className="p-4 border-b"><h3 className="text-lg font-semibold">Receivable Parties</h3><p className="text-sm text-slate-500">Total {detailData.data.filter(item => item.receiveName).length} entries</p></div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50"><tr><th className="px-6 py-3 text-left">Party Name</th><th className="px-6 py-3 text-right">Receivable Amount</th></tr></thead>
                          <tbody className="divide-y">
                            {detailData.data.filter(item => item.receiveName).map((item, idx) => (
                              <tr key={idx} className="hover:bg-slate-50"><td className="px-6 py-3">{item.receiveName}</td><td className="px-6 py-3 text-right font-medium text-amber-600">{formatNumber(item.receivable)}</td></tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : closingBalanceData ? (
                  <>
                    <div className="card p-5 bg-gradient-to-r from-amber-50 to-white dark:from-amber-900/20 dark:to-slate-800">
                      <div className="flex justify-between items-start">
                        <div><p className="text-sm text-slate-500">Total Closing Balance</p><p className="text-3xl font-bold text-amber-600">{formatNumber(closingBalanceData.totalClosingBalance)}</p></div>
                        <div className="p-3 bg-amber-100 rounded-full"><CreditCard size={24} className="text-amber-600" /></div>
                      </div>
                    </div>
                    <div className="card overflow-hidden">
                      <div className="p-4 border-b"><h3 className="text-lg font-semibold">Customer Details</h3><p className="text-sm text-slate-500">Total {closingBalanceData.data.length} entries</p></div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50"><tr><th className="px-6 py-3 text-left">ID</th><th className="px-6 py-3 text-left">Name</th><th className="px-6 py-3 text-right">Balance</th><th className="px-6 py-3 text-left">Contact</th></tr></thead>
                          <tbody className="divide-y">
                            {closingBalanceData.data.map((item, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-6 py-3">{item.id}</td>
                                <td className="px-6 py-3 font-medium">{item.name}</td>
                                <td className={`px-6 py-3 text-right font-semibold ${item.closingBalance > 0 ? 'text-emerald-600' : item.closingBalance < 0 ? 'text-red-600' : 'text-slate-500'}`}>{formatNumber(item.closingBalance)}</td>
                                <td className="px-6 py-3">{item.contactNo ? <a href={`tel:${item.contactNo}`} className="flex items-center gap-1 text-brand-600 hover:underline"><Phone size={14} />{item.contactNo}</a> : '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ) : (
              <>
                <div className="card p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2"><CreditCard size={20} className="text-amber-500" />Accounts Receivable Overview</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50"><tr><th className="px-3 sm:px-4 py-2 text-left">Company</th><th className="px-3 sm:px-4 py-2 text-right">Receivable Amount</th><th className="px-3 sm:px-4 py-2 text-right">% of Total</th></tr></thead>
                      <tbody>
                        {getMetricComparisonData('receivable').map((item, idx) => {
                          const total = getTotalForMetric('receivable');
                          const percentage = total > 0 ? (item.value / total) * 100 : 0;
                          return (
                            <tr key={idx} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
                              <td className="px-3 sm:px-4 py-2">{item.company}</td>
                              <td className="px-3 sm:px-4 py-2 text-right font-semibold text-amber-600">{formatNumber(item.value)}</td>
                              <td className="px-3 sm:px-4 py-2 text-right text-slate-500">{percentage.toFixed(1)}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <ARAgingChart />
              </>
            )}
          </div>
        )}

        {/* Payable Tab */}
        {activeTab === 'payable' && (
          <div className="space-y-4 sm:space-y-6">
            {selectedSingleCompany && (detailData || closingBalanceData) ? (
              <>
                <div className="flex justify-between items-center">
                  <div><h2 className="text-xl font-bold text-slate-900 dark:text-white">Accounts Payable Details</h2><p className="text-sm text-slate-500">{detailData?.companyName || closingBalanceData?.companyName}</p></div>
                  <button onClick={clearFilters} className="btn-secondary flex items-center gap-2"><X size={16} />Show All Companies</button>
                </div>
                
                {isDetailLoading ? (
                  <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div></div>
                ) : detailData ? (
                  <>
                    <div className="card p-5 bg-gradient-to-r from-orange-50 to-white">
                      <div className="flex justify-between items-start">
                        <div><p className="text-sm text-slate-500">Total Payable</p><p className="text-3xl font-bold text-orange-600">{formatNumber(detailData.totalPayable)}</p></div>
                        <div className="p-3 bg-orange-100 rounded-full"><Banknote size={24} className="text-orange-600" /></div>
                      </div>
                    </div>
                    <div className="card overflow-hidden">
                      <div className="p-4 border-b"><h3 className="text-lg font-semibold">Payable Parties</h3><p className="text-sm text-slate-500">Total {detailData.data.filter(item => item.payableName).length} entries</p></div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50"><tr><th className="px-6 py-3 text-left">Party Name</th><th className="px-6 py-3 text-right">Payable Amount</th></tr></thead>
                          <tbody className="divide-y">
                            {detailData.data.filter(item => item.payableName).map((item, idx) => (
                              <tr key={idx} className="hover:bg-slate-50"><td className="px-6 py-3">{item.payableName}</td><td className="px-6 py-3 text-right font-medium text-orange-600">{formatNumber(item.payable)}</td></tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : closingBalanceData ? (
                  <>
                    <div className="card p-5 bg-gradient-to-r from-orange-50 to-white">
                      <div className="flex justify-between items-start">
                        <div><p className="text-sm text-slate-500">Total Closing Balance</p><p className="text-3xl font-bold text-orange-600">{formatNumber(closingBalanceData.totalClosingBalance)}</p></div>
                        <div className="p-3 bg-orange-100 rounded-full"><Banknote size={24} className="text-orange-600" /></div>
                      </div>
                    </div>
                    <div className="card overflow-hidden">
                      <div className="p-4 border-b"><h3 className="text-lg font-semibold">Supplier Details</h3><p className="text-sm text-slate-500">Total {closingBalanceData.data.length} entries</p></div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50"><tr><th className="px-6 py-3 text-left">ID</th><th className="px-6 py-3 text-left">Name</th><th className="px-6 py-3 text-right">Balance</th><th className="px-6 py-3 text-left">Contact</th></tr></thead>
                          <tbody className="divide-y">
                            {closingBalanceData.data.map((item, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-6 py-3">{item.id}</td>
                                <td className="px-6 py-3 font-medium">{item.name}</td>
                                <td className={`px-6 py-3 text-right font-semibold ${item.closingBalance > 0 ? 'text-emerald-600' : item.closingBalance < 0 ? 'text-red-600' : 'text-slate-500'}`}>{formatNumber(item.closingBalance)}</td>
                                <td className="px-6 py-3">{item.contactNo ? <a href={`tel:${item.contactNo}`} className="flex items-center gap-1 text-brand-600 hover:underline"><Phone size={14} />{item.contactNo}</a> : '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ) : (
              <>
                <div className="card p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2"><Banknote size={20} className="text-orange-500" />Accounts Payable Overview</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50"><tr><th className="px-3 sm:px-4 py-2 text-left">Company</th><th className="px-3 sm:px-4 py-2 text-right">Payable Amount</th><th className="px-3 sm:px-4 py-2 text-right">% of Total</th></tr></thead>
                      <tbody>
                        {getMetricComparisonData('payable').map((item, idx) => {
                          const total = getTotalForMetric('payable');
                          const percentage = total > 0 ? (item.value / total) * 100 : 0;
                          return (
                            <tr key={idx} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
                              <td className="px-3 sm:px-4 py-2">{item.company}</td>
                              <td className="px-3 sm:px-4 py-2 text-right font-semibold text-orange-600">{formatNumber(item.value)}</td>
                              <td className="px-3 sm:px-4 py-2 text-right text-slate-500">{percentage.toFixed(1)}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <APBreakdownChart />
              </>
            )}
          </div>
        )}

        {/* Expense Tab */}
        {activeTab === 'expense' && (
          <div className="space-y-4 sm:space-y-6">
            {selectedSingleCompany && closingBalanceData && closingBalanceData.type === 3 ? (
              <>
                <div className="flex justify-between items-center">
                  <div><h2 className="text-xl font-bold text-slate-900 dark:text-white">Expense Details</h2><p className="text-sm text-slate-500">{closingBalanceData.companyName}</p></div>
                  <button onClick={clearFilters} className="btn-secondary flex items-center gap-2"><X size={16} />Show All Companies</button>
                </div>
                
                <div className="card p-5 bg-gradient-to-r from-red-50 to-white">
                  <div className="flex justify-between items-start">
                    <div><p className="text-sm text-slate-500">Total Expenses</p><p className="text-3xl font-bold text-red-600">{formatNumber(closingBalanceData.totalClosingBalance)}</p></div>
                    <div className="p-3 bg-red-100 rounded-full"><TrendingDown size={24} className="text-red-600" /></div>
                  </div>
                </div>
                
                <div className="card overflow-hidden">
                  <div className="p-4 border-b"><h3 className="text-lg font-semibold">Expense Details</h3><p className="text-sm text-slate-500">Total {closingBalanceData.data.length} entries</p></div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50"><tr><th className="px-6 py-3 text-left">ID</th><th className="px-6 py-3 text-left">Name</th><th className="px-6 py-3 text-right">Amount</th></tr></thead>
                      <tbody className="divide-y">
                        {closingBalanceData.data.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="px-6 py-3">{item.id}</td>
                            <td className="px-6 py-3 font-medium">{item.name}</td>
                            <td className={`px-6 py-3 text-right font-semibold ${item.closingBalance > 0 ? 'text-red-600' : item.closingBalance < 0 ? 'text-emerald-600' : 'text-slate-500'}`}>{formatNumber(item.closingBalance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="card p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2"><TrendingDown size={20} className="text-red-500" />Expenses Overview</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50"><tr><th className="px-3 sm:px-4 py-2 text-left">Company</th><th className="px-3 sm:px-4 py-2 text-right">Expense Amount</th><th className="px-3 sm:px-4 py-2 text-right">% of Total</th></tr></thead>
                      <tbody>
                        {getMetricComparisonData('expense').map((item, idx) => {
                          const total = getTotalForMetric('expense');
                          const percentage = total > 0 ? (item.value / total) * 100 : 0;
                          return (
                            <tr key={idx} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
                              <td className="px-3 sm:px-4 py-2">{item.company}</td>
                              <td className="px-3 sm:px-4 py-2 text-right font-semibold text-red-600">{formatNumber(item.value)}</td>
                              <td className="px-3 sm:px-4 py-2 text-right text-slate-500">{percentage.toFixed(1)}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <ExpenseDistributionChart />
                <ExpenseTrendChart />
              </>
            )}
          </div>
        )}

        {/* Banks Tab */}
        {activeTab === 'banks' && (
          <div className="space-y-4 sm:space-y-6">
            {selectedSingleCompany && closingBalanceData && closingBalanceData.type === 4 ? (
              <>
                <div className="flex justify-between items-center">
                  <div><h2 className="text-xl font-bold text-slate-900 dark:text-white">Bank Balance Details</h2><p className="text-sm text-slate-500">{closingBalanceData.companyName}</p></div>
                  <button onClick={clearFilters} className="btn-secondary flex items-center gap-2"><X size={16} />Show All Companies</button>
                </div>
                
                <div className="card p-5 bg-gradient-to-r from-purple-50 to-white">
                  <div className="flex justify-between items-start">
                    <div><p className="text-sm text-slate-500">Total Bank Balance</p><p className="text-3xl font-bold text-purple-600">{formatNumber(closingBalanceData.totalClosingBalance)}</p></div>
                    <div className="p-3 bg-purple-100 rounded-full"><Wallet size={24} className="text-purple-600" /></div>
                  </div>
                </div>
                
                <div className="card overflow-hidden">
                  <div className="p-4 border-b"><h3 className="text-lg font-semibold">Bank Details</h3><p className="text-sm text-slate-500">Total {closingBalanceData.data.length} entries</p></div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50"><tr><th className="px-6 py-3 text-left">ID</th><th className="px-6 py-3 text-left">Name</th><th className="px-6 py-3 text-right">Balance</th><th className="px-6 py-3 text-left">Contact</th></tr></thead>
                      <tbody className="divide-y">
                        {closingBalanceData.data.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="px-6 py-3">{item.id}</td>
                            <td className="px-6 py-3 font-medium">{item.name}</td>
                            <td className="px-6 py-3 text-right font-semibold text-purple-600">{formatNumber(item.closingBalance)}</td>
                            <td className="px-6 py-3">{item.contactNo ? <a href={`tel:${item.contactNo}`} className="flex items-center gap-1 text-brand-600 hover:underline"><Phone size={14} />{item.contactNo}</a> : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="card p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2"><Wallet size={20} className="text-purple-500" />Bank Balances Overview</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50"><tr><th className="px-3 sm:px-4 py-2 text-left">Company</th><th className="px-3 sm:px-4 py-2 text-right">Bank Balance</th><th className="px-3 sm:px-4 py-2 text-right">% of Total</th></tr></thead>
                      <tbody>
                        {getMetricComparisonData('banks').map((item, idx) => {
                          const total = getTotalForMetric('banks');
                          const percentage = total > 0 ? (item.value / total) * 100 : 0;
                          return (
                            <tr key={idx} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedSingleCompany(item.companyId)}>
                              <td className="px-3 sm:px-4 py-2">{item.company}</td>
                              <td className="px-3 sm:px-4 py-2 text-right font-semibold text-purple-600">{formatNumber(item.value)}</td>
                              <td className="px-3 sm:px-4 py-2 text-right text-slate-500">{percentage.toFixed(1)}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}