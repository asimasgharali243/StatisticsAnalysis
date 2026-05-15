// // // // // // // src/pages/Companies.tsx
// // // // // // import React from 'react';
// // // // // // import { useGetCompaniesQuery } from '../store/api/dashboardApi';
// // // // // // import { useFilters } from '../context/FilterContext';
// // // // // // import { Building2, Database, Check } from 'lucide-react';

// // // // // // export function Companies() {
// // // // // //   const { data: companies, isLoading, error } = useGetCompaniesQuery();
// // // // // //   const { toggleCompany, selectedCompanies } = useFilters();

// // // // // //   // Colors for company cards
// // // // // //   const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1'];

// // // // // //   if (isLoading) {
// // // // // //     return (
// // // // // //       <div className="flex justify-center items-center h-64">
// // // // // //         <div className="text-center">
// // // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
// // // // // //           <p className="text-slate-600 dark:text-slate-400">Loading companies...</p>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (error) {
// // // // // //     return (
// // // // // //       <div className="text-center text-red-600 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
// // // // // //         <p className="font-semibold">Error loading companies</p>
// // // // // //         <p className="text-sm mt-2">Please make sure the backend is running on http://localhost:5290</p>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="space-y-6">
// // // // // //       <div className="flex justify-between items-center">
// // // // // //         <div>
// // // // // //           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
// // // // // //             Companies
// // // // // //           </h1>
// // // // // //           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
// // // // // //             Select companies to view their financial data
// // // // // //           </p>
// // // // // //         </div>
// // // // // //         <div className="text-sm text-slate-500 dark:text-slate-400">
// // // // // //           {selectedCompanies.length} of {companies?.length || 0} selected
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
// // // // // //         {companies?.map((company, index) => {
// // // // // //           const isSelected = selectedCompanies.includes(company.id);
// // // // // //           const color = colors[index % colors.length];
          
// // // // // //           return (
// // // // // //             <div
// // // // // //               key={company.id}
// // // // // //               className={`card p-6 transition-all duration-200 cursor-pointer hover:shadow-lg ${
// // // // // //                 isSelected ? 'ring-2 ring-brand-500 border-transparent' : 'hover:border-slate-300 dark:hover:border-slate-600'
// // // // // //               }`}
// // // // // //               onClick={() => toggleCompany(company.id)}>
              
// // // // // //               <div className="flex justify-between items-start mb-4">
// // // // // //                 <div className="flex items-center gap-3">
// // // // // //                   <div
// // // // // //                     className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
// // // // // //                     style={{ backgroundColor: color }}>
// // // // // //                     <Database size={24} />
// // // // // //                   </div>
// // // // // //                   <div>
// // // // // //                     <h3 className="text-lg font-bold text-slate-900 dark:text-white">
// // // // // //                       {company.name}
// // // // // //                     </h3>
// // // // // //                     <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
// // // // // //                       <Database size={14} /> {company.id}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //                 <div
// // // // // //                   className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
// // // // // //                     isSelected ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-300 dark:border-slate-600'
// // // // // //                   }`}>
// // // // // //                   {isSelected && <Check size={14} />}
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
// // // // // //                 <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
// // // // // //                   Database Status
// // // // // //                 </p>
// // // // // //                 <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
// // // // // //                   <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
// // // // // //                   Connected
// // // // // //                 </p>
// // // // // //               </div>

// // // // // //               <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
// // // // // //                 <div className="flex justify-between items-center">
// // // // // //                   <span className="text-xs text-slate-400">Click to {isSelected ? 'deselect' : 'select'}</span>
// // // // // //                   {isSelected && (
// // // // // //                     <span className="text-xs font-medium text-brand-600">Selected</span>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           );
// // // // // //         })}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // src/pages/Companies.tsx


// // // // // // import React from 'react';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import { useGetCompaniesQuery } from '../store/api/dashboardApi';
// // // // // // import { useFilters } from '../context/FilterContext';
// // // // // // import { 
// // // // // //   Building2, Database, TrendingUp, TrendingDown, DollarSign, 
// // // // // //   CreditCard, Banknote, ShoppingCart, Wallet, ArrowRight 
// // // // // // } from 'lucide-react';

// // // // // // export function Companies() {
// // // // // //   const navigate = useNavigate();
// // // // // //   const { data: companies, isLoading, error } = useGetCompaniesQuery();
// // // // // //   const { dashboardData, setSelectedSingleCompany, setSelectedMetric } = useFilters();

// // // // // //   const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1'];

// // // // // //   const formatCurrency = (value: number) => {
// // // // // //     return new Intl.NumberFormat('en-US', {
// // // // // //       style: 'currency',
// // // // // //       currency: 'USD',
// // // // // //       minimumFractionDigits: 0,
// // // // // //       maximumFractionDigits: 0,
// // // // // //     }).format(value);
// // // // // //   };

// // // // // //   const getMetricIcon = (text: string, size: number = 14) => {
// // // // // //     switch (text.toLowerCase()) {
// // // // // //       case 'sales': return <TrendingUp size={size} />;
// // // // // //       case 'purchases': return <ShoppingCart size={size} />;
// // // // // //       case 'receivable': return <CreditCard size={size} />;
// // // // // //       case 'payable': return <Banknote size={size} />;
// // // // // //       case 'expense': return <TrendingDown size={size} />;
// // // // // //       case 'banks': return <Wallet size={size} />;
// // // // // //       default: return <DollarSign size={size} />;
// // // // // //     }
// // // // // //   };

// // // // // //   const getMetricColor = (text: string) => {
// // // // // //     switch (text.toLowerCase()) {
// // // // // //       case 'sales': return 'text-emerald-600 dark:text-emerald-400';
// // // // // //       case 'purchases': return 'text-blue-600 dark:text-blue-400';
// // // // // //       case 'receivable': return 'text-amber-600 dark:text-amber-400';
// // // // // //       case 'payable': return 'text-orange-600 dark:text-orange-400';
// // // // // //       case 'expense': return 'text-red-600 dark:text-red-400';
// // // // // //       case 'banks': return 'text-purple-600 dark:text-purple-400';
// // // // // //       default: return 'text-slate-600 dark:text-slate-400';
// // // // // //     }
// // // // // //   };

// // // // // //   const handleViewCompany = (companyId: string) => {
// // // // // //     setSelectedSingleCompany(companyId);
// // // // // //     setSelectedMetric('All');
// // // // // //     navigate('/');
// // // // // //   };

// // // // // //   const handleMetricClick = (companyId: string, metricName: string, page: string) => {
// // // // // //     setSelectedSingleCompany(companyId);
// // // // // //     setSelectedMetric(metricName as any);
    
// // // // // //     // Navigate to the corresponding page based on metric
// // // // // //     switch (metricName.toLowerCase()) {
// // // // // //       case 'sales':
// // // // // //       case 'purchases':
// // // // // //         navigate('/');
// // // // // //         break;
// // // // // //       case 'receivable':
// // // // // //         navigate('/receivables');
// // // // // //         break;
// // // // // //       case 'payable':
// // // // // //         navigate('/payables');
// // // // // //         break;
// // // // // //       case 'expense':
// // // // // //         navigate('/expenses');
// // // // // //         break;
// // // // // //       case 'banks':
// // // // // //         navigate('/');
// // // // // //         break;
// // // // // //       default:
// // // // // //         navigate('/');
// // // // // //     }
// // // // // //   };

// // // // // //   if (isLoading) {
// // // // // //     return (
// // // // // //       <div className="flex justify-center items-center h-64">
// // // // // //         <div className="text-center">
// // // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
// // // // // //           <p className="text-slate-600 dark:text-slate-400">Loading companies...</p>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (error) {
// // // // // //     return (
// // // // // //       <div className="text-center text-red-600 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
// // // // // //         <p className="font-semibold">Error loading companies</p>
// // // // // //         <p className="text-sm mt-2">Please make sure the backend is running on http://localhost:5290</p>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   // Get company metrics from dashboard data
// // // // // //   const getCompanyMetrics = (companyId: string) => {
// // // // // //     if (!dashboardData || !dashboardData[companyId]) return [];
// // // // // //     return dashboardData[companyId];
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="space-y-6">
// // // // // //       <div className="flex justify-between items-center">
// // // // // //         <div>
// // // // // //           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
// // // // // //             Companies
// // // // // //           </h1>
// // // // // //           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
// // // // // //             Click on any metric to view detailed report
// // // // // //           </p>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Compact Grid - Shows more companies without scrolling */}
// // // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
// // // // // //         {companies?.map((company, index) => {
// // // // // //           const color = colors[index % colors.length];
// // // // // //           const metrics = getCompanyMetrics(company.id);
          
// // // // // //           return (
// // // // // //             <div
// // // // // //               key={company.id}
// // // // // //               className="card overflow-hidden hover:shadow-lg transition-all duration-200 group"
// // // // // //             >
// // // // // //               {/* Company Header */}
// // // // // //               <div 
// // // // // //                 className="p-4 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800 cursor-pointer"
// // // // // //                 onClick={() => handleViewCompany(company.id)}
// // // // // //               >
// // // // // //                 <div className="flex items-center gap-3">
// // // // // //                   <div
// // // // // //                     className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0"
// // // // // //                     style={{ backgroundColor: color }}>
// // // // // //                     <Database size={18} />
// // // // // //                   </div>
// // // // // //                   <div className="flex-1 min-w-0">
// // // // // //                     <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
// // // // // //                       {company.name}
// // // // // //                     </h3>
// // // // // //                     <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
// // // // // //                       {company.id}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                   <ArrowRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Metrics Grid - Compact 2x3 layout */}
// // // // // //               <div className="p-3">
// // // // // //                 <div className="grid grid-cols-2 gap-2">
// // // // // //                   {metrics.map((metric, idx) => (
// // // // // //                     <button
// // // // // //                       key={idx}
// // // // // //                       onClick={() => handleMetricClick(company.id, metric.texts, '')}
// // // // // //                       className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all group/metric"
// // // // // //                     >
// // // // // //                       <div className="flex items-center gap-1.5">
// // // // // //                         <span className={`${getMetricColor(metric.texts)}`}>
// // // // // //                           {getMetricIcon(metric.texts, 12)}
// // // // // //                         </span>
// // // // // //                         <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
// // // // // //                           {metric.texts === 'Receivable' ? 'AR' : 
// // // // // //                            metric.texts === 'Payable' ? 'AP' :
// // // // // //                            metric.texts === 'Purchases' ? 'Pur' :
// // // // // //                            metric.texts === 'Expense' ? 'Exp' :
// // // // // //                            metric.texts === 'Banks' ? 'Bank' :
// // // // // //                            metric.texts.substring(0, 3)}
// // // // // //                         </span>
// // // // // //                       </div>
// // // // // //                       <span className="text-xs font-semibold text-slate-900 dark:text-white">
// // // // // //                         {formatCurrency(metric.value)}
// // // // // //                       </span>
// // // // // //                     </button>
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Footer with View Dashboard */}
// // // // // //               <div className="px-3 pb-3">
// // // // // //                 <button
// // // // // //                   onClick={() => handleViewCompany(company.id)}
// // // // // //                   className="w-full text-xs text-center py-1.5 rounded-md text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors font-medium"
// // // // // //                 >
// // // // // //                   View Full Dashboard →
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           );
// // // // // //         })}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // // src/pages/Companies.tsx
// // // // // import React from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { useGetCompaniesQuery } from '../store/api/dashboardApi';
// // // // // import { useFilters } from '../context/FilterContext';
// // // // // import { 
// // // // //   Building2, Database, TrendingUp, TrendingDown, DollarSign, 
// // // // //   CreditCard, Banknote, ShoppingCart, Wallet, ArrowRight 
// // // // // } from 'lucide-react';

// // // // // export function Companies() {
// // // // //   const navigate = useNavigate();
// // // // //   const { data: companies, isLoading, error } = useGetCompaniesQuery();
// // // // //   const { dashboardData, setSelectedSingleCompany, setSelectedMetric, selectedCompanies } = useFilters();

// // // // //   const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1'];

// // // // //   const formatCurrency = (value: number) => {
// // // // //     return new Intl.NumberFormat('en-US', {
// // // // //       style: 'currency',
// // // // //       currency: 'USD',
// // // // //       minimumFractionDigits: 0,
// // // // //       maximumFractionDigits: 0,
// // // // //     }).format(value);
// // // // //   };

// // // // //   const getMetricIcon = (text: string, size: number = 14) => {
// // // // //     switch (text.toLowerCase()) {
// // // // //       case 'sales': return <TrendingUp size={size} />;
// // // // //       case 'purchases': return <ShoppingCart size={size} />;
// // // // //       case 'receivable': return <CreditCard size={size} />;
// // // // //       case 'payable': return <Banknote size={size} />;
// // // // //       case 'expense': return <TrendingDown size={size} />;
// // // // //       case 'banks': return <Wallet size={size} />;
// // // // //       default: return <DollarSign size={size} />;
// // // // //     }
// // // // //   };

// // // // //   const getMetricColor = (text: string) => {
// // // // //     switch (text.toLowerCase()) {
// // // // //       case 'sales': return 'text-emerald-600 dark:text-emerald-400';
// // // // //       case 'purchases': return 'text-blue-600 dark:text-blue-400';
// // // // //       case 'receivable': return 'text-amber-600 dark:text-amber-400';
// // // // //       case 'payable': return 'text-orange-600 dark:text-orange-400';
// // // // //       case 'expense': return 'text-red-600 dark:text-red-400';
// // // // //       case 'banks': return 'text-purple-600 dark:text-purple-400';
// // // // //       default: return 'text-slate-600 dark:text-slate-400';
// // // // //     }
// // // // //   };

// // // // //   const handleViewCompany = (companyId: string) => {
// // // // //     setSelectedSingleCompany(companyId);
// // // // //     setSelectedMetric('All');
// // // // //     navigate('/');
// // // // //   };

// // // // //   const handleMetricClick = (companyId: string, metricName: string) => {
// // // // //     setSelectedSingleCompany(companyId);
// // // // //     setSelectedMetric(metricName as any);
    
// // // // //     // Navigate to the corresponding page based on metric
// // // // //     switch (metricName.toLowerCase()) {
// // // // //       case 'sales':
// // // // //       case 'purchases':
// // // // //         navigate('/');
// // // // //         break;
// // // // //       case 'receivable':
// // // // //         navigate('/receivables');
// // // // //         break;
// // // // //       case 'payable':
// // // // //         navigate('/payables');
// // // // //         break;
// // // // //       case 'expense':
// // // // //         navigate('/expenses');
// // // // //         break;
// // // // //       case 'banks':
// // // // //         navigate('/banks');
// // // // //         break;
// // // // //       default:
// // // // //         navigate('/');
// // // // //     }
// // // // //   };

// // // // //   // Check if a company has data (is selected in filters) - with null check
// // // // //   const hasCompanyData = (companyId: string) => {
// // // // //     return dashboardData && dashboardData[companyId];
// // // // //   };

// // // // //   // Get company metrics safely with null check
// // // // //   const getCompanyMetrics = (companyId: string) => {
// // // // //     if (!dashboardData) return [];
// // // // //     return dashboardData[companyId] || [];
// // // // //   };

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <div className="flex justify-center items-center h-64">
// // // // //         <div className="text-center">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
// // // // //           <p className="text-slate-600 dark:text-slate-400">Loading companies...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (error) {
// // // // //     return (
// // // // //       <div className="text-center text-red-600 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
// // // // //         <p className="font-semibold">Error loading companies</p>
// // // // //         <p className="text-sm mt-2">Please make sure the backend is running on http://localhost:5290</p>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   // Wait for dashboardData to load
// // // // //   if (!dashboardData) {
// // // // //     return (
// // // // //       <div className="flex justify-center items-center h-64">
// // // // //         <div className="text-center">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
// // // // //           <p className="text-slate-600 dark:text-slate-400">Loading company data...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   // Filter companies - ONLY show companies that are selected in the filter AND have data
// // // // //   const visibleCompanies = companies?.filter(company => 
// // // // //     selectedCompanies.includes(company.id) && dashboardData[company.id]
// // // // //   ) || [];

// // // // //   if (visibleCompanies.length === 0) {
// // // // //     return (
// // // // //       <div className="text-center py-12">
// // // // //         <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-8 max-w-md mx-auto">
// // // // //           <Database size={48} className="mx-auto text-slate-400 mb-4" />
// // // // //           <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Companies Selected</h2>
// // // // //           <p className="text-slate-500 dark:text-slate-400">
// // // // //             Please select companies from the dropdown in the top navigation bar to view their financial metrics.
// // // // //           </p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="space-y-6">
// // // // //       <div className="flex justify-between items-center">
// // // // //         <div>
// // // // //           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
// // // // //             Companies
// // // // //           </h1>
// // // // //           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
// // // // //             Click on any metric to view detailed report
// // // // //           </p>
// // // // //         </div>
// // // // //         <div className="text-sm text-slate-500 dark:text-slate-400">
// // // // //           {selectedCompanies.length} of {companies?.length || 0} selected
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Compact Grid - Shows ONLY selected companies with data */}
// // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
// // // // //         {visibleCompanies.map((company, index) => {
// // // // //           const color = colors[index % colors.length];
// // // // //           const metrics = getCompanyMetrics(company.id);
// // // // //           const isSelected = selectedCompanies.includes(company.id);
          
// // // // //           return (
// // // // //             <div
// // // // //               key={company.id}
// // // // //               className={`card overflow-hidden transition-all duration-200 group ${
// // // // //                 isSelected ? 'ring-2 ring-brand-500' : 'hover:shadow-lg'
// // // // //               }`}
// // // // //             >
// // // // //               {/* Company Header */}
// // // // //               <div 
// // // // //                 className="p-4 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800 cursor-pointer"
// // // // //                 onClick={() => handleViewCompany(company.id)}
// // // // //               >
// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <div
// // // // //                     className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0"
// // // // //                     style={{ backgroundColor: color }}>
// // // // //                     <Database size={18} />
// // // // //                   </div>
// // // // //                   <div className="flex-1 min-w-0">
// // // // //                     <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
// // // // //                       {company.name}
// // // // //                     </h3>
// // // // //                     <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
// // // // //                       {company.id}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                   <ArrowRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Metrics Grid */}
// // // // //               <div className="p-3">
// // // // //                 <div className="grid grid-cols-2 gap-2">
// // // // //                   {metrics.map((metric, idx) => (
// // // // //                     <button
// // // // //                       key={idx}
// // // // //                       onClick={() => handleMetricClick(company.id, metric.texts)}
// // // // //                       className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all group/metric"
// // // // //                     >
// // // // //                       <div className="flex items-center gap-1.5">
// // // // //                         <span className={`${getMetricColor(metric.texts)}`}>
// // // // //                           {getMetricIcon(metric.texts, 12)}
// // // // //                         </span>
// // // // //                         <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
// // // // //                           {metric.texts === 'Receivable' ? 'AR' : 
// // // // //                            metric.texts === 'Payable' ? 'AP' :
// // // // //                            metric.texts === 'Purchases' ? 'Pur' :
// // // // //                            metric.texts === 'Expense' ? 'Exp' :
// // // // //                            metric.texts === 'Banks' ? 'Bank' :
// // // // //                            metric.texts.substring(0, 3)}
// // // // //                         </span>
// // // // //                       </div>
// // // // //                       <span className="text-xs font-semibold text-slate-900 dark:text-white">
// // // // //                         {formatCurrency(metric.value)}
// // // // //                       </span>
// // // // //                     </button>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Footer with View Dashboard */}
// // // // //               <div className="px-3 pb-3">
// // // // //                 <button
// // // // //                   onClick={() => handleViewCompany(company.id)}
// // // // //                   className="w-full text-xs text-center py-1.5 rounded-md text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors font-medium"
// // // // //                 >
// // // // //                   View Full Dashboard →
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           );
// // // // //         })}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // src/pages/Companies.tsx


// // // // import React from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useGetCompaniesQuery } from '../store/api/dashboardApi';
// // // // import { useFilters } from '../context/FilterContext';
// // // // import { 
// // // //   Database, TrendingUp, TrendingDown, DollarSign, 
// // // //   CreditCard, Banknote, ShoppingCart, Wallet, ArrowRight 
// // // // } from 'lucide-react';

// // // // export function Companies() {
// // // //   const navigate = useNavigate();
// // // //   const { data: companies, isLoading, error } = useGetCompaniesQuery();
// // // //   const { dashboardData, setSelectedSingleCompany, setSelectedMetric, selectedCompanies } = useFilters();

// // // //   const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1'];

// // // //   const formatCurrency = (value: number) => {
// // // //     return new Intl.NumberFormat('en-US', {
// // // //       style: 'currency',
// // // //       currency: 'USD',
// // // //       minimumFractionDigits: 0,
// // // //       maximumFractionDigits: 0,
// // // //     }).format(value);
// // // //   };

// // // //   const getMetricIcon = (text: string, size: number = 14) => {
// // // //     switch (text.toLowerCase()) {
// // // //       case 'sales': return <TrendingUp size={size} />;
// // // //       case 'purchases': return <ShoppingCart size={size} />;
// // // //       case 'receivable': return <CreditCard size={size} />;
// // // //       case 'payable': return <Banknote size={size} />;
// // // //       case 'expense': return <TrendingDown size={size} />;
// // // //       case 'banks': return <Wallet size={size} />;
// // // //       default: return <DollarSign size={size} />;
// // // //     }
// // // //   };

// // // //   const getMetricColor = (text: string) => {
// // // //     switch (text.toLowerCase()) {
// // // //       case 'sales': return 'text-emerald-600 dark:text-emerald-400';
// // // //       case 'purchases': return 'text-blue-600 dark:text-blue-400';
// // // //       case 'receivable': return 'text-amber-600 dark:text-amber-400';
// // // //       case 'payable': return 'text-orange-600 dark:text-orange-400';
// // // //       case 'expense': return 'text-red-600 dark:text-red-400';
// // // //       case 'banks': return 'text-purple-600 dark:text-purple-400';
// // // //       default: return 'text-slate-600 dark:text-slate-400';
// // // //     }
// // // //   };

// // // //   const handleViewCompany = (companyId: string) => {
// // // //     setSelectedSingleCompany(companyId);
// // // //     setSelectedMetric('All');
// // // //     navigate('/');
// // // //   };

// // // //   const handleMetricClick = (companyId: string, metricName: string) => {
// // // //     setSelectedSingleCompany(companyId);
// // // //     setSelectedMetric(metricName as any);
    
// // // //     switch (metricName.toLowerCase()) {
// // // //       case 'sales':
// // // //       case 'purchases':
// // // //         navigate('/');
// // // //         break;
// // // //       case 'receivable':
// // // //         navigate('/receivables');
// // // //         break;
// // // //       case 'payable':
// // // //         navigate('/payables');
// // // //         break;
// // // //       case 'expense':
// // // //         navigate('/expenses');
// // // //         break;
// // // //       case 'banks':
// // // //         navigate('/banks');
// // // //         break;
// // // //       default:
// // // //         navigate('/');
// // // //     }
// // // //   };

// // // //   const getCompanyMetrics = (companyId: string) => {
// // // //     if (!dashboardData) return [];
// // // //     return dashboardData[companyId] || [];
// // // //   };

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-64">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
// // // //           <p className="text-slate-600 dark:text-slate-400">Loading companies...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="text-center text-red-600 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
// // // //         <p className="font-semibold">Error loading companies</p>
// // // //         <p className="text-sm mt-2">Please make sure the backend is running on http://localhost:5290</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Wait for dashboardData to load
// // // //   if (!dashboardData) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-64">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
// // // //           <p className="text-slate-600 dark:text-slate-400">Loading company data...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Filter companies - ONLY show companies that are selected in the filter AND have data
// // // //   const visibleCompanies = companies?.filter(company => 
// // // //     selectedCompanies.includes(company.id) && dashboardData[company.id]
// // // //   ) || [];

// // // //   if (visibleCompanies.length === 0) {
// // // //     return (
// // // //       <div className="text-center py-12">
// // // //         <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-8 max-w-md mx-auto">
// // // //           <Database size={48} className="mx-auto text-slate-400 mb-4" />
// // // //           <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Companies Selected</h2>
// // // //           <p className="text-slate-500 dark:text-slate-400">
// // // //             Please select companies from the dropdown in the top navigation bar to view their financial metrics.
// // // //           </p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       <div className="flex justify-between items-center">
// // // //         <div>
// // // //           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
// // // //             Companies
// // // //           </h1>
// // // //           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
// // // //             Click on any metric to view detailed report
// // // //           </p>
// // // //         </div>
// // // //         <div className="text-sm text-slate-500 dark:text-slate-400">
// // // //           {selectedCompanies.length} of {companies?.length || 0} selected
// // // //         </div>
// // // //       </div>

// // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
// // // //         {visibleCompanies.map((company, index) => {
// // // //           const color = colors[index % colors.length];
// // // //           const metrics = getCompanyMetrics(company.id);
// // // //           const isSelected = selectedCompanies.includes(company.id);
          
// // // //           return (
// // // //             <div
// // // //               key={company.id}
// // // //               className={`card overflow-hidden transition-all duration-200 group ${
// // // //                 isSelected ? 'ring-2 ring-brand-500' : 'hover:shadow-lg'
// // // //               }`}
// // // //             >
// // // //               <div 
// // // //                 className="p-4 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800 cursor-pointer"
// // // //                 onClick={() => handleViewCompany(company.id)}
// // // //               >
// // // //                 <div className="flex items-center gap-3">
// // // //                   <div
// // // //                     className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0"
// // // //                     style={{ backgroundColor: color }}>
// // // //                     <Database size={18} />
// // // //                   </div>
// // // //                   <div className="flex-1 min-w-0">
// // // //                     <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
// // // //                       {company.name}
// // // //                     </h3>
// // // //                     <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
// // // //                       {company.id}
// // // //                     </p>
// // // //                   </div>
// // // //                   <ArrowRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
// // // //                 </div>
// // // //               </div>

// // // //               <div className="p-3">
// // // //                 <div className="grid grid-cols-2 gap-2">
// // // //                   {metrics.map((metric, idx) => (
// // // //                     <button
// // // //                       key={idx}
// // // //                       onClick={() => handleMetricClick(company.id, metric.texts)}
// // // //                       className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all group/metric"
// // // //                     >
// // // //                       <div className="flex items-center gap-1.5">
// // // //                         <span className={`${getMetricColor(metric.texts)}`}>
// // // //                           {getMetricIcon(metric.texts, 12)}
// // // //                         </span>
// // // //                         <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
// // // //                           {metric.texts === 'Receivable' ? 'AR' : 
// // // //                            metric.texts === 'Payable' ? 'AP' :
// // // //                            metric.texts === 'Purchases' ? 'Pur' :
// // // //                            metric.texts === 'Expense' ? 'Exp' :
// // // //                            metric.texts === 'Banks' ? 'Bank' :
// // // //                            metric.texts.substring(0, 3)}
// // // //                         </span>
// // // //                       </div>
// // // //                       <span className="text-xs font-semibold text-slate-900 dark:text-white">
// // // //                         {formatCurrency(metric.value)}
// // // //                       </span>
// // // //                     </button>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>

// // // //               <div className="px-3 pb-3">
// // // //                 <button
// // // //                   onClick={() => handleViewCompany(company.id)}
// // // //                   className="w-full text-xs text-center py-1.5 rounded-md text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors font-medium"
// // // //                 >
// // // //                   View Full Dashboard →
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           );
// // // //         })}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // // src/pages/Companies.tsx

// // // import React, { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { useGetCompaniesQuery } from '../store/api/dashboardApi';
// // // import { useFilters } from '../context/FilterContext';
// // // import { 
// // //   Database, TrendingUp, TrendingDown, DollarSign, 
// // //   CreditCard, Banknote, ShoppingCart, Wallet, ArrowRight, 
// // //   PieChart, BarChart3 
// // // } from 'lucide-react';
// // // import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// // // export function Companies() {
// // //   const navigate = useNavigate();
// // //   const { data: companies, isLoading, error } = useGetCompaniesQuery();
// // //   const { dashboardData, setSelectedSingleCompany, setSelectedMetric, selectedCompanies } = useFilters();
// // //   const [viewMode, setViewMode] = useState<'numeric' | 'chart'>('numeric');

// // //   const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1'];
// // //   const pieColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

// // //   const formatNumber = (value: number) => {
// // //     return new Intl.NumberFormat('en-US', {
// // //       minimumFractionDigits: 0,
// // //       maximumFractionDigits: 0,
// // //     }).format(value);
// // //   };

// // //   const formatCompactNumber = (value: number) => {
// // //     if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
// // //     if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
// // //     return value.toString();
// // //   };

// // //   const getMetricIcon = (text: string, size: number = 12) => {
// // //     switch (text.toLowerCase()) {
// // //       case 'sales': return <TrendingUp size={size} />;
// // //       case 'purchases': return <ShoppingCart size={size} />;
// // //       case 'receivable': return <CreditCard size={size} />;
// // //       case 'payable': return <Banknote size={size} />;
// // //       case 'expense': return <TrendingDown size={size} />;
// // //       case 'banks': return <Wallet size={size} />;
// // //       default: return <DollarSign size={size} />;
// // //     }
// // //   };

// // //   const getMetricColor = (text: string) => {
// // //     switch (text.toLowerCase()) {
// // //       case 'sales': return 'text-emerald-600 dark:text-emerald-400';
// // //       case 'purchases': return 'text-blue-600 dark:text-blue-400';
// // //       case 'receivable': return 'text-amber-600 dark:text-amber-400';
// // //       case 'payable': return 'text-orange-600 dark:text-orange-400';
// // //       case 'expense': return 'text-red-600 dark:text-red-400';
// // //       case 'banks': return 'text-purple-600 dark:text-purple-400';
// // //       default: return 'text-slate-600 dark:text-slate-400';
// // //     }
// // //   };

// // //   const handleViewCompany = (companyId: string) => {
// // //     setSelectedSingleCompany(companyId);
// // //     setSelectedMetric('All');
// // //     navigate('/');
// // //   };

// // //   const handleMetricClick = (companyId: string, metricName: string) => {
// // //     setSelectedSingleCompany(companyId);
// // //     setSelectedMetric(metricName as any);
    
// // //     switch (metricName.toLowerCase()) {
// // //       case 'sales':
// // //       case 'purchases':
// // //         navigate('/');
// // //         break;
// // //       case 'receivable':
// // //         navigate('/receivables');
// // //         break;
// // //       case 'payable':
// // //         navigate('/payables');
// // //         break;
// // //       case 'expense':
// // //         navigate('/expenses');
// // //         break;
// // //       case 'banks':
// // //         navigate('/banks');
// // //         break;
// // //       default:
// // //         navigate('/');
// // //     }
// // //   };

// // //   const getCompanyMetrics = (companyId: string) => {
// // //     if (!dashboardData) return [];
// // //     return dashboardData[companyId] || [];
// // //   };

// // //   const getPieData = (metrics: any[]) => {
// // //     return metrics.map((metric, index) => ({
// // //       name: metric.texts,
// // //       shortName: metric.texts === 'Receivable' ? 'AR' : 
// // //                  metric.texts === 'Payable' ? 'AP' :
// // //                  metric.texts === 'Purchases' ? 'Pur' :
// // //                  metric.texts === 'Expense' ? 'Exp' :
// // //                  metric.texts === 'Banks' ? 'Bank' :
// // //                  metric.texts.substring(0, 3),
// // //       value: metric.value,
// // //       color: pieColors[index % pieColors.length]
// // //     }));
// // //   };

// // //   // Custom Tooltip for Pie Chart
// // //   const CustomTooltip = ({ active, payload }: any) => {
// // //     if (active && payload && payload.length) {
// // //       return (
// // //         <div className="bg-slate-800 dark:bg-slate-900 border border-slate-700 rounded-lg shadow-lg p-2 px-3">
// // //           <p className="text-sm font-semibold text-white">
// // //             {payload[0].payload.name}
// // //           </p>
// // //           <p className="text-lg font-bold text-brand-400">
// // //             {formatNumber(payload[0].value)}
// // //           </p>
// // //         </div>
// // //       );
// // //     }
// // //     return null;
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-64">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
// // //           <p className="text-slate-600 dark:text-slate-400">Loading companies...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="text-center text-red-600 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
// // //         <p className="font-semibold">Error loading companies</p>
// // //         <p className="text-sm mt-2">Please make sure the backend is running on http://localhost:5290</p>
// // //       </div>
// // //     );
// // //   }

// // //   if (!dashboardData) {
// // //     return (
// // //       <div className="flex justify-center items-center h-64">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
// // //           <p className="text-slate-600 dark:text-slate-400">Loading company data...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const visibleCompanies = companies?.filter(company => 
// // //     selectedCompanies.includes(company.id) && dashboardData[company.id]
// // //   ) || [];

// // //   if (visibleCompanies.length === 0) {
// // //     return (
// // //       <div className="text-center py-12">
// // //         <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-8 max-w-md mx-auto">
// // //           <Database size={48} className="mx-auto text-slate-400 mb-4" />
// // //           <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Companies Selected</h2>
// // //           <p className="text-slate-500 dark:text-slate-400">
// // //             Please select companies from the dropdown in the top navigation bar to view their financial metrics.
// // //           </p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="space-y-4">
// // //       {/* Header with View Toggle */}
// // //       <div className="flex justify-between items-center flex-wrap gap-3">
// // //         <div>
// // //           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
// // //             Companies
// // //           </h1>
// // //           <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
// // //             Click on any metric to view detailed report
// // //           </p>
// // //         </div>
// // //         <div className="flex items-center gap-3">
// // //           <div className="text-sm text-slate-500 dark:text-slate-400">
// // //             {selectedCompanies.length} of {companies?.length || 0} selected
// // //           </div>
// // //           {/* Global View Toggle Button */}
// // //           <button
// // //             onClick={() => setViewMode(viewMode === 'numeric' ? 'chart' : 'numeric')}
// // //             className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors"
// // //           >
// // //             {viewMode === 'numeric' ? (
// // //               <>
// // //                 <PieChart size={16} />
// // //                 <span className="hidden sm:inline">Switch to Chart View</span>
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <BarChart3 size={16} />
// // //                 <span className="hidden sm:inline">Switch to Numeric View</span>
// // //               </>
// // //             )}
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Companies Grid - Compact */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
// // //         {visibleCompanies.map((company, index) => {
// // //           const color = colors[index % colors.length];
// // //           const metrics = getCompanyMetrics(company.id);
// // //           const isSelected = selectedCompanies.includes(company.id);
// // //           const pieData = getPieData(metrics);
// // //           const totalValue = metrics.reduce((sum, m) => sum + m.value, 0);

// // //           return (
// // //             <div
// // //               key={company.id}
// // //               className={`card overflow-hidden transition-all duration-200 group ${
// // //                 isSelected ? 'ring-2 ring-brand-500' : 'hover:shadow-md'
// // //               }`}
// // //             >
// // //               {/* Company Header - Compact */}
// // //               <div 
// // //                 className="p-3 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800 cursor-pointer"
// // //                 onClick={() => handleViewCompany(company.id)}
// // //               >
// // //                 <div className="flex items-center gap-2">
// // //                   <div
// // //                     className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0"
// // //                     style={{ backgroundColor: color }}>
// // //                     <Database size={16} />
// // //                   </div>
// // //                   <div className="flex-1 min-w-0">
// // //                     <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
// // //                       {company.name}
// // //                     </h3>
// // //                     <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
// // //                       {company.id}
// // //                     </p>
// // //                   </div>
// // //                   <ArrowRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
// // //                 </div>
// // //               </div>

// // //               {/* Content - Compact */}
// // //               <div className="p-2">
// // //                 {viewMode === 'chart' ? (
// // //                   // Pie Chart View - Compact
// // //                   <div className="h-36">
// // //                     <ResponsiveContainer width="100%" height="100%">
// // //                       <RePieChart>
// // //                         <Pie
// // //                           data={pieData}
// // //                           cx="50%"
// // //                           cy="50%"
// // //                           innerRadius={30}
// // //                           outerRadius={45}
// // //                           paddingAngle={1}
// // //                           dataKey="value"
// // //                         >
// // //                           {pieData.map((entry, idx) => (
// // //                             <Cell key={`cell-${idx}`} fill={entry.color} />
// // //                           ))}
// // //                         </Pie>
// // //                         <Tooltip content={<CustomTooltip />} />
// // //                       </RePieChart>
// // //                     </ResponsiveContainer>
// // //                     <div className="text-center mt-1">
// // //                       <p className="text-[10px] text-slate-500">Total: {formatCompactNumber(totalValue)}</p>
// // //                     </div>
// // //                   </div>
// // //                 ) : (
// // //                   // Numeric Values Grid - Compact (No $ sign, larger font)
// // //                   <div className="grid grid-cols-2 gap-1">
// // //                     {metrics.map((metric, idx) => (
// // //                       <button
// // //                         key={idx}
// // //                         onClick={() => handleMetricClick(company.id, metric.texts)}
// // //                         className="flex items-center justify-between p-1.5 rounded-md bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
// // //                       >
// // //                         <div className="flex items-center gap-1">
// // //                           <span className={`${getMetricColor(metric.texts)}`}>
// // //                             {getMetricIcon(metric.texts, 10)}
// // //                           </span>
// // //                           <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
// // //                             {metric.texts === 'Receivable' ? 'AR' : 
// // //                              metric.texts === 'Payable' ? 'AP' :
// // //                              metric.texts === 'Purchases' ? 'Pur' :
// // //                              metric.texts === 'Expense' ? 'Exp' :
// // //                              metric.texts === 'Banks' ? 'Bank' :
// // //                              metric.texts.substring(0, 3)}
// // //                           </span>
// // //                         </div>
// // //                         <span className="text-[14px] font-semibold text-slate-900 dark:text-white">
// // //                           {formatCompactNumber(metric.value)}
// // //                         </span>
// // //                       </button>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* Footer - Compact */}
// // //               <div className="px-2 pb-2">
// // //                 <button
// // //                   onClick={() => handleViewCompany(company.id)}
// // //                   className="w-full text-[10px] text-center py-1 rounded-md text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors font-medium"
// // //                 >
// // //                   View Dashboard →
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // src/pages/Companies.tsx
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useGetCompaniesQuery } from '../store/api/dashboardApi';
// // import { useFilters } from '../context/FilterContext';
// // import { 
// //   Database, TrendingUp, TrendingDown, DollarSign, 
// //   CreditCard, Banknote, ShoppingCart, Wallet, ArrowRight, 
// //   PieChart, BarChart3 
// // } from 'lucide-react';
// // import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// // export function Companies() {
// //   const navigate = useNavigate();
// //   const { data: companies, isLoading, error } = useGetCompaniesQuery();
// //   const { dashboardData, setSelectedSingleCompany, setSelectedMetric, selectedCompanies } = useFilters();
// //   const [viewMode, setViewMode] = useState<'numeric' | 'chart'>('numeric');

// //   const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1'];

// //   // Colors matching the metric icons (same as getMetricColor but for pie chart)
// //   const getMetricPieColor = (text: string) => {
// //     switch (text.toLowerCase()) {
// //       case 'sales': return '#10b981';      // emerald-500
// //       case 'purchases': return '#3b82f6';   // blue-500
// //       case 'receivable': return '#f59e0b';  // amber-500
// //       case 'payable': return '#f97316';     // orange-500
// //       case 'expense': return '#ef4444';     // red-500
// //       case 'banks': return '#8b5cf6';       // purple-500
// //       default: return '#64748b';
// //     }
// //   };

// //   // Get label color based on metric type (same as pie slice)
// //   const getLabelColor = (text: string) => {
// //     switch (text.toLowerCase()) {
// //       case 'sales': return '#10b981';
// //       case 'purchases': return '#3b82f6';
// //       case 'receivable': return '#f59e0b';
// //       case 'payable': return '#f97316';
// //       case 'expense': return '#ef4444';
// //       case 'banks': return '#8b5cf6';
// //       default: return '#64748b';
// //     }
// //   };

// //   const formatNumber = (value: number) => {
// //     return new Intl.NumberFormat('en-US', {
// //       minimumFractionDigits: 0,
// //       maximumFractionDigits: 0,
// //     }).format(value);
// //   };

// //   const formatCompactNumber = (value: number) => {
// //     if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
// //     if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
// //     return value.toString();
// //   };

// //   const getMetricIcon = (text: string, size: number = 12) => {
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
// //       case 'sales': return 'text-emerald-600 dark:text-emerald-400';
// //       case 'purchases': return 'text-blue-600 dark:text-blue-400';
// //       case 'receivable': return 'text-amber-600 dark:text-amber-400';
// //       case 'payable': return 'text-orange-600 dark:text-orange-400';
// //       case 'expense': return 'text-red-600 dark:text-red-400';
// //       case 'banks': return 'text-purple-600 dark:text-purple-400';
// //       default: return 'text-slate-600 dark:text-slate-400';
// //     }
// //   };

// //   const handleViewCompany = (companyId: string) => {
// //     setSelectedSingleCompany(companyId);
// //     setSelectedMetric('All');
// //     navigate('/');
// //   };

// //   const handleMetricClick = (companyId: string, metricName: string) => {
// //     setSelectedSingleCompany(companyId);
// //     setSelectedMetric(metricName as any);
    
// //     switch (metricName.toLowerCase()) {
// //       case 'sales':
// //       case 'purchases':
// //         navigate('/');
// //         break;
// //       case 'receivable':
// //         navigate('/receivables');
// //         break;
// //       case 'payable':
// //         navigate('/payables');
// //         break;
// //       case 'expense':
// //         navigate('/expenses');
// //         break;
// //       case 'banks':
// //         navigate('/banks');
// //         break;
// //       default:
// //         navigate('/');
// //     }
// //   };

// //   const getCompanyMetrics = (companyId: string) => {
// //     if (!dashboardData) return [];
// //     return dashboardData[companyId] || [];
// //   };

// //   const getPieData = (metrics: any[]) => {
// //     return metrics.map((metric, index) => ({
// //       name: metric.texts,
// //       shortName: metric.texts === 'Receivable' ? 'AR' : 
// //                  metric.texts === 'Payable' ? 'AP' :
// //                  metric.texts === 'Purchases' ? 'Pur' :
// //                  metric.texts === 'Expense' ? 'Exp' :
// //                  metric.texts === 'Banks' ? 'Bank' :
// //                  metric.texts.substring(0, 3),
// //       value: metric.value,
// //       color: getMetricPieColor(metric.texts),
// //     }));
// //   };

// //   // Custom label renderer for pie chart - shows value with same color as slice
// //   const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index, payload }: any) => {
// //     const RADIAN = Math.PI / 180;
// //     const radius = outerRadius + 18;
// //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
// //     const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
// //     const metricName = payload.name;
// //     const shortName = metricName === 'Receivable' ? 'AR' : 
// //                       metricName === 'Payable' ? 'AP' :
// //                       metricName === 'Purchases' ? 'Pur' :
// //                       metricName === 'Expense' ? 'Exp' :
// //                       metricName === 'Banks' ? 'Bank' :
// //                       metricName.substring(0, 3);
    
// //     const formattedValue = formatCompactNumber(value);
// //     const labelColor = getLabelColor(metricName);
    
// //     return (
// //       <text 
// //         x={x} 
// //         y={y} 
// //         fill={labelColor}
// //         textAnchor={x > cx ? 'start' : 'end'} 
// //         dominantBaseline="central"
// //         className="text-[11px] font-semibold"
// //       >
// //         {`${shortName}: ${formattedValue}`}
// //       </text>
// //     );
// //   };

// //   // Custom Tooltip for Pie Chart
// //   const CustomTooltip = ({ active, payload }: any) => {
// //     if (active && payload && payload.length) {
// //       return (
// //         <div className="bg-slate-800 dark:bg-slate-900 border border-slate-700 rounded-lg shadow-lg p-2 px-3">
// //           <p className="text-sm font-semibold text-white">
// //             {payload[0].payload.name}
// //           </p>
// //           <p className="text-lg font-bold text-brand-400">
// //             {formatNumber(payload[0].value)}
// //           </p>
// //         </div>
// //       );
// //     }
// //     return null;
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
// //           <p className="text-slate-600 dark:text-slate-400">Loading companies...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="text-center text-red-600 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
// //         <p className="font-semibold">Error loading companies</p>
// //         <p className="text-sm mt-2">Please make sure the backend is running on http://localhost:5290</p>
// //       </div>
// //     );
// //   }

// //   if (!dashboardData) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
// //           <p className="text-slate-600 dark:text-slate-400">Loading company data...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const visibleCompanies = companies?.filter(company => 
// //     selectedCompanies.includes(company.id) && dashboardData[company.id]
// //   ) || [];

// //   if (visibleCompanies.length === 0) {
// //     return (
// //       <div className="text-center py-12">
// //         <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-8 max-w-md mx-auto">
// //           <Database size={48} className="mx-auto text-slate-400 mb-4" />
// //           <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Companies Selected</h2>
// //           <p className="text-slate-500 dark:text-slate-400">
// //             Please select companies from the dropdown in the top navigation bar to view their financial metrics.
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-4">
// //       {/* Header with View Toggle */}
// //       <div className="flex justify-between items-center flex-wrap gap-3">
// //         <div>
// //           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
// //             Companies
// //           </h1>
// //           <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
// //             Click on any metric to view detailed report
// //           </p>
// //         </div>
// //         <div className="flex items-center gap-3">
// //           <div className="text-sm text-slate-500 dark:text-slate-400">
// //             {selectedCompanies.length} of {companies?.length || 0} selected
// //           </div>
// //           {/* Global View Toggle Button */}
// //           <button
// //             onClick={() => setViewMode(viewMode === 'numeric' ? 'chart' : 'numeric')}
// //             className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors"
// //           >
// //             {viewMode === 'numeric' ? (
// //               <>
// //                 <PieChart size={16} />
// //                 <span className="hidden sm:inline">Switch to Chart View</span>
// //               </>
// //             ) : (
// //               <>
// //                 <BarChart3 size={16} />
// //                 <span className="hidden sm:inline">Switch to Numeric View</span>
// //               </>
// //             )}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Companies Grid - Compact */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
// //         {visibleCompanies.map((company, index) => {
// //           const color = colors[index % colors.length];
// //           const metrics = getCompanyMetrics(company.id);
// //           const isSelected = selectedCompanies.includes(company.id);
// //           const pieData = getPieData(metrics);
// //           const totalValue = metrics.reduce((sum, m) => sum + m.value, 0);

// //           return (
// //             <div
// //               key={company.id}
// //               className={`card overflow-hidden transition-all duration-200 group ${
// //                 isSelected ? 'ring-2 ring-brand-500' : 'hover:shadow-md'
// //               }`}
// //             >
// //               {/* Company Header - Compact */}
// //               <div 
// //                 className="p-3 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800 cursor-pointer"
// //                 onClick={() => handleViewCompany(company.id)}
// //               >
// //                 <div className="flex items-center gap-2">
// //                   <div
// //                     className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0"
// //                     style={{ backgroundColor: color }}>
// //                     <Database size={16} />
// //                   </div>
// //                   <div className="flex-1 min-w-0">
// //                     <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
// //                       {company.name}
// //                     </h3>
// //                     <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
// //                       {company.id}
// //                     </p>
// //                   </div>
// //                   <ArrowRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
// //                 </div>
// //               </div>

// //               {/* Content - Compact */}
// //               <div className="p-2">
// //                 {viewMode === 'chart' ? (
// //                   // Pie Chart View - Compact with Labels showing values in same color as slices
// //                   <div className="h-40">
// //                     <ResponsiveContainer width="100%" height="100%">
// //                       <RePieChart>
// //                         <Pie
// //                           data={pieData}
// //                           cx="50%"
// //                           cy="50%"
// //                           innerRadius={30}
// //                           outerRadius={45}
// //                           paddingAngle={1}
// //                           dataKey="value"
// //                           label={renderLabel}
// //                           labelLine={true}
// //                         >
// //                           {pieData.map((entry, idx) => (
// //                             <Cell key={`cell-${idx}`} fill={entry.color} />
// //                           ))}
// //                         </Pie>
// //                         <Tooltip content={<CustomTooltip />} />
// //                       </RePieChart>
// //                     </ResponsiveContainer>
// //                     <div className="text-center mt-1">
// //                       <p className="text-[10px] text-slate-500">Total: {formatCompactNumber(totalValue)}</p>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   // Numeric Values Grid - Compact (No $ sign, larger font)
// //                   <div className="grid grid-cols-2 gap-1">
// //                     {metrics.map((metric, idx) => (
// //                       <button
// //                         key={idx}
// //                         onClick={() => handleMetricClick(company.id, metric.texts)}
// //                         className="flex items-center justify-between p-1.5 rounded-md bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
// //                       >
// //                         <div className="flex items-center gap-1">
// //                           <span className={`${getMetricColor(metric.texts)}`}>
// //                             {getMetricIcon(metric.texts, 10)}
// //                           </span>
// //                           <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
// //                             {metric.texts === 'Receivable' ? 'Receivable' : 
// //                              metric.texts === 'Payable' ? 'Payable' :
// //                              metric.texts === 'Purchases' ? 'Purchases' :
// //                              metric.texts === 'Expense' ? 'Expense' :
// //                              metric.texts === 'Banks' ? 'Banks' :
// //                              metric.texts.substring(0, 3)}
// //                           </span>
// //                         </div>
// //                         <span className="text-[14px] font-semibold text-slate-900 dark:text-white">
// //                           {formatCompactNumber(metric.value)}
// //                         </span>
// //                       </button>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Footer - Compact */}
// //               <div className="px-2 pb-2">
// //                 <button
// //                   onClick={() => handleViewCompany(company.id)}
// //                   className="w-full text-[10px] text-center py-1 rounded-md text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors font-medium"
// //                 >
// //                   View Dashboard →
// //                 </button>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }


// // src/pages/Companies.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useGetCompaniesQuery } from '../store/api/dashboardApi';
// import { useFilters } from '../context/FilterContext';
// import { 
//   Database, TrendingUp, TrendingDown, DollarSign, 
//   CreditCard, Banknote, ShoppingCart, Wallet, ArrowRight, 
//   PieChart, BarChart3 
// } from 'lucide-react';
// import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// export function Companies() {
//   const navigate = useNavigate();
//   const { data: companies, isLoading, error } = useGetCompaniesQuery();
//   const { dashboardData, setSelectedSingleCompany, setSelectedMetric, selectedCompanies } = useFilters();
//   const [viewMode, setViewMode] = useState<'numeric' | 'chart'>('numeric');

//   const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1'];

//   // Colors matching the metric icons (same as getMetricColor but for pie chart)
//   const getMetricPieColor = (text: string) => {
//     switch (text.toLowerCase()) {
//       case 'sales': return '#10b981';      // emerald-500
//       case 'purchases': return '#3b82f6';   // blue-500
//       case 'receivable': return '#f59e0b';  // amber-500
//       case 'payable': return '#f97316';     // orange-500
//       case 'expense': return '#ef4444';     // red-500
//       case 'banks': return '#8b5cf6';       // purple-500
//       default: return '#64748b';
//     }
//   };

//   // Get label color based on metric type (same as pie slice)
//   const getLabelColor = (text: string) => {
//     switch (text.toLowerCase()) {
//       case 'sales': return '#10b981';
//       case 'purchases': return '#3b82f6';
//       case 'receivable': return '#f59e0b';
//       case 'payable': return '#f97316';
//       case 'expense': return '#ef4444';
//       case 'banks': return '#8b5cf6';
//       default: return '#64748b';
//     }
//   };

//   const formatNumber = (value: number) => {
//     return new Intl.NumberFormat('en-US', {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(value);
//   };

//   const formatCompactNumber = (value: number) => {
//     if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
//     if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
//     return value.toString();
//   };

//   const getMetricIcon = (text: string, size: number = 12) => {
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
//       case 'sales': return 'text-emerald-600 dark:text-emerald-400';
//       case 'purchases': return 'text-blue-600 dark:text-blue-400';
//       case 'receivable': return 'text-amber-600 dark:text-amber-400';
//       case 'payable': return 'text-orange-600 dark:text-orange-400';
//       case 'expense': return 'text-red-600 dark:text-red-400';
//       case 'banks': return 'text-purple-600 dark:text-purple-400';
//       default: return 'text-slate-600 dark:text-slate-400';
//     }
//   };

//   const handleViewCompany = (companyId: string) => {
//     setSelectedSingleCompany(companyId);
//     setSelectedMetric('All');
//     navigate('/');
//   };

//  const handleMetricClick = (companyId: string, metricName: string) => {
//   setSelectedSingleCompany(companyId);
//   setSelectedMetric(metricName as any);
  
//   let targetTab = 'overview'; // default tab
  
//   switch (metricName.toLowerCase()) {
//     case 'sales':
//       targetTab = 'overview';
//       break;
//     case 'purchases':
//       targetTab = 'overview';
//       break;
//     case 'receivable':
//       targetTab = 'receivable';
//       break;
//     case 'payable':
//       targetTab = 'payable';
//       break;
//     case 'expense':
//       targetTab = 'expense';
//       break;
//     case 'banks':
//       targetTab = 'banks';
//       break;
//     default:
//       targetTab = 'overview';
//   }
  
//   // Navigate with state in ALL cases
//   navigate('/', { 
//     state: { 
//       activeTab: targetTab,
//       companyId: companyId,
//       metricName: metricName 
//     } 
//   });
// };
//   const getCompanyMetrics = (companyId: string) => {
//     if (!dashboardData) return [];
//     return dashboardData[companyId] || [];
//   };

//   const getPieData = (metrics: any[]) => {
//     return metrics.map((metric, index) => ({
//       name: metric.texts,
//       shortName: metric.texts === 'Receivable' ? 'AR' : 
//                  metric.texts === 'Payable' ? 'AP' :
//                  metric.texts === 'Purchases' ? 'Pur' :
//                  metric.texts === 'Expense' ? 'Exp' :
//                  metric.texts === 'Banks' ? 'Bank' :
//                  metric.texts.substring(0, 3),
//       value: metric.value,
//       color: getMetricPieColor(metric.texts),
//     }));
//   };

//   // Custom label renderer for pie chart - shows value with same color as slice
//   const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index, payload }: any) => {
//     const RADIAN = Math.PI / 180;
//     const radius = outerRadius + 18;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
//     const metricName = payload.name;
//     const shortName = metricName === 'Receivable' ? 'AR' : 
//                       metricName === 'Payable' ? 'AP' :
//                       metricName === 'Purchases' ? 'Pur' :
//                       metricName === 'Expense' ? 'Exp' :
//                       metricName === 'Banks' ? 'Bank' :
//                       metricName.substring(0, 3);
    
//     const formattedValue = formatCompactNumber(value);
//     const labelColor = getLabelColor(metricName);
    
//     return (
//       <text 
//         x={x} 
//         y={y} 
//         fill={labelColor}
//         textAnchor={x > cx ? 'start' : 'end'} 
//         dominantBaseline="central"
//         className="text-[11px] font-semibold"
//       >
//         {`${shortName}: ${formattedValue}`}
//       </text>
//     );
//   };

//   // Custom Tooltip for Pie Chart
//   const CustomTooltip = ({ active, payload }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-slate-800 dark:bg-slate-900 border border-slate-700 rounded-lg shadow-lg p-2 px-3">
//           <p className="text-sm font-semibold text-white">
//             {payload[0].payload.name}
//           </p>
//           <p className="text-lg font-bold text-brand-400">
//             {formatNumber(payload[0].value)}
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
//           <p className="text-slate-600 dark:text-slate-400">Loading companies...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-600 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
//         <p className="font-semibold">Error loading companies</p>
//         <p className="text-sm mt-2">Please make sure the backend is running on http://localhost:5290</p>
//       </div>
//     );
//   }

//   if (!dashboardData) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
//           <p className="text-slate-600 dark:text-slate-400">Loading company data...</p>
//         </div>
//       </div>
//     );
//   }

//   const visibleCompanies = companies?.filter(company => 
//     selectedCompanies.includes(company.id) && dashboardData[company.id]
//   ) || [];

//   if (visibleCompanies.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-8 max-w-md mx-auto">
//           <Database size={48} className="mx-auto text-slate-400 mb-4" />
//           <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Companies Selected</h2>
//           <p className="text-slate-500 dark:text-slate-400">
//             Please select companies from the dropdown in the top navigation bar to view their financial metrics.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {/* Header with View Toggle */}
//       <div className="flex justify-between items-center flex-wrap gap-3">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//             Companies
//           </h1>
//           <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
//             Click on any metric to view detailed report
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="text-sm text-slate-500 dark:text-slate-400">
//             {selectedCompanies.length} of {companies?.length || 0} selected
//           </div>
//           {/* Global View Toggle Button */}
//           <button
//             onClick={() => setViewMode(viewMode === 'numeric' ? 'chart' : 'numeric')}
//             className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors"
//           >
//             {viewMode === 'numeric' ? (
//               <>
//                 <PieChart size={16} />
//                 <span className="hidden sm:inline">Switch to Chart View</span>
//               </>
//             ) : (
//               <>
//                 <BarChart3 size={16} />
//                 <span className="hidden sm:inline">Switch to Numeric View</span>
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Companies Grid - 4 cards per row on desktop */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//         {visibleCompanies.map((company, index) => {
//           const color = colors[index % colors.length];
//           const metrics = getCompanyMetrics(company.id);
//           const isSelected = selectedCompanies.includes(company.id);
//           const pieData = getPieData(metrics);
//           const totalValue = metrics.reduce((sum, m) => sum + m.value, 0);

//           return (
//             <div
//               key={company.id}
//               className={`card overflow-hidden transition-all duration-200 group ${
//                 isSelected ? 'ring-2 ring-brand-500' : 'hover:shadow-md'
//               }`}
//             >
//               {/* Company Header - Compact */}
//               <div 
//                 className="p-3 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800 cursor-pointer"
//                 onClick={() => handleViewCompany(company.id)}
//               >
//                 <div className="flex items-center gap-2">
//                   <div
//                     className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0"
//                     style={{ backgroundColor: color }}>
//                     <Database size={16} />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
//                       {company.name}
//                     </h3>
//                     <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
//                       {company.id}
//                     </p>
//                   </div>
//                   <ArrowRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
//                 </div>
//               </div>

//               {/* Content - Compact */}
//               <div className="p-2">
//                 {viewMode === 'chart' ? (
//                   // Pie Chart View - Compact with Labels showing values in same color as slices
//                   <div className="h-40">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <RePieChart>
//                         <Pie
//                           data={pieData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={30}
//                           outerRadius={45}
//                           paddingAngle={1}
//                           dataKey="value"
//                           label={renderLabel}
//                           labelLine={true}
//                         >
//                           {pieData.map((entry, idx) => (
//                             <Cell key={`cell-${idx}`} fill={entry.color} />
//                           ))}
//                         </Pie>
//                         <Tooltip content={<CustomTooltip />} />
//                       </RePieChart>
//                     </ResponsiveContainer>
//                     <div className="text-center mt-1">
//                       <p className="text-[10px] text-slate-500">Total: {formatCompactNumber(totalValue)}</p>
//                     </div>
//                   </div>
//                 ) : (
//                   // Numeric Values Grid - FULL NAMES (no abbreviations)
//                   <div className="grid grid-cols-1 gap-1">
//                     {metrics.map((metric, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => handleMetricClick(company.id, metric.texts)}
//                         className="flex items-center justify-between p-0.1 rounded-md bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
//                       >
//                         <div className="flex items-center gap-1">
//                           <span className={`${getMetricColor(metric.texts)}`}>
//                             {getMetricIcon(metric.texts, 20)}
//                           </span>
//                           <span className="text-[16px] font-medium text-slate-600 dark:text-slate-400">
//                             {metric.texts}
//                           </span>
//                         </div>
//                         <span className="text-[20px] font-semibold text-slate-900 dark:text-white">
//                           {formatCompactNumber(metric.value)}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Footer - Compact */}
//               <div className="px-2 pb-2">
//                 <button
//                   onClick={() => handleViewCompany(company.id)}
//                   className="w-full text-[10px] text-center py-1 rounded-md text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors font-medium"
//                 >
//                   View Dashboard →
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// src/pages/Companies.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCompaniesQuery } from '../store/api/dashboardApi';
import { useFilters } from '../context/FilterContext';
import { 
  Database, TrendingUp, TrendingDown, DollarSign, 
  CreditCard, Banknote, ShoppingCart, Wallet, ArrowRight, 
  PieChart, BarChart3 
} from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export function Companies() {
  const navigate = useNavigate();
  const { data: companies, isLoading, error } = useGetCompaniesQuery();
  const { dashboardData, setSelectedSingleCompany, setSelectedMetric, selectedCompanies } = useFilters();
  const [viewMode, setViewMode] = useState<'numeric' | 'chart'>('numeric');

  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1'];

  const getMetricPieColor = (text: string) => {
    switch (text.toLowerCase()) {
      case 'sales': return '#10b981';
      case 'purchases': return '#3b82f6';
      case 'receivable': return '#f59e0b';
      case 'payable': return '#f97316';
      case 'expense': return '#ef4444';
      case 'banks': return '#8b5cf6';
      default: return '#64748b';
    }
  };

  const getLabelColor = (text: string) => {
    switch (text.toLowerCase()) {
      case 'sales': return '#10b981';
      case 'purchases': return '#3b82f6';
      case 'receivable': return '#f59e0b';
      case 'payable': return '#f97316';
      case 'expense': return '#ef4444';
      case 'banks': return '#8b5cf6';
      default: return '#64748b';
    }
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCompactNumber = (value: number) => {
  return value.toLocaleString('en-US');
};

  const getMetricIcon = (text: string, size: number = 12) => {
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
      case 'sales': return 'text-emerald-600 dark:text-emerald-400';
      case 'purchases': return 'text-blue-600 dark:text-blue-400';
      case 'receivable': return 'text-amber-600 dark:text-amber-400';
      case 'payable': return 'text-orange-600 dark:text-orange-400';
      case 'expense': return 'text-red-600 dark:text-red-400';
      case 'banks': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  const handleViewCompany = (companyId: string) => {
    setSelectedSingleCompany(companyId);
    setSelectedMetric('All');
    navigate('/');
  };

  const handleMetricClick = (companyId: string, metricName: string) => {
    setSelectedSingleCompany(companyId);
    setSelectedMetric(metricName as any);
    
    let targetTab = 'overview';
    let metricType = 0;
    
    switch (metricName.toLowerCase()) {
      case 'sales':
        targetTab = 'sales';
        break;
      case 'purchases':
        targetTab = 'purchases';
        break;
      case 'receivable':
        targetTab = 'receivable';
        metricType = 1;
        break;
      case 'payable':
        targetTab = 'payable';
        metricType = 2;
        break;
      case 'expense':
        targetTab = 'expense';
        metricType = 3;
        break;
      case 'banks':
        targetTab = 'banks';
        metricType = 4;
        break;
      default:
        targetTab = 'overview';
    }
    
    navigate('/', { 
      state: { 
        activeTab: targetTab,
        companyId: companyId,
        metricName: metricName,
        metricType: metricType
      } 
    });
  };

  const getCompanyMetrics = (companyId: string) => {
    if (!dashboardData) return [];
    return dashboardData[companyId] || [];
  };

  const getPieData = (metrics: any[]) => {
    return metrics.map((metric) => ({
      name: metric.texts,
      shortName: metric.texts === 'Receivable' ? 'AR' : 
                 metric.texts === 'Payable' ? 'AP' :
                 metric.texts === 'Purchases' ? 'Pur' :
                 metric.texts === 'Expense' ? 'Exp' :
                 metric.texts === 'Banks' ? 'Bank' :
                 metric.texts.substring(0, 3),
      value: metric.value,
      color: getMetricPieColor(metric.texts),
    }));
  };

  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, payload }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 18;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    const metricName = payload.name;
    const shortName = metricName === 'Receivable' ? 'AR' : 
                      metricName === 'Payable' ? 'AP' :
                      metricName === 'Purchases' ? 'Pur' :
                      metricName === 'Expense' ? 'Exp' :
                      metricName === 'Banks' ? 'Bank' :
                      metricName.substring(0, 3);
    
    const formattedValue = formatCompactNumber(value);
    const labelColor = getLabelColor(metricName);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill={labelColor}
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-[11px] font-semibold"
      >
        {`${shortName}: ${formattedValue}`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 dark:bg-slate-900 border border-slate-700 rounded-lg shadow-lg p-2 px-3">
          <p className="text-sm font-semibold text-white">{payload[0].payload.name}</p>
          <p className="text-lg font-bold text-brand-400">{formatNumber(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading companies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="font-semibold">Error loading companies</p>
        <p className="text-sm mt-2">Please make sure the backend is running on http://localhost:5290</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading company data...</p>
        </div>
      </div>
    );
  }

  const visibleCompanies = companies?.filter(company => 
    selectedCompanies.includes(company.id) && dashboardData[company.id]
  ) || [];

  if (visibleCompanies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-8 max-w-md mx-auto">
          <Database size={48} className="mx-auto text-slate-400 mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Companies Selected</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Please select companies from the dropdown in the top navigation bar to view their financial metrics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Companies</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Click on any metric to view detailed report</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {selectedCompanies.length} of {companies?.length || 0} selected
          </div>
          <button
            onClick={() => setViewMode(viewMode === 'numeric' ? 'chart' : 'numeric')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors"
          >
            {viewMode === 'numeric' ? (
              <><PieChart size={16} /><span className="hidden sm:inline">Switch to Chart View</span></>
            ) : (
              <><BarChart3 size={16} /><span className="hidden sm:inline">Switch to Numeric View</span></>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {visibleCompanies.map((company, index) => {
          const color = colors[index % colors.length];
          const metrics = getCompanyMetrics(company.id);
          const isSelected = selectedCompanies.includes(company.id);
          const pieData = getPieData(metrics);
          const totalValue = metrics.reduce((sum, m) => sum + m.value, 0);

          return (
            <div key={company.id} className={`card overflow-hidden transition-all duration-200 group ${isSelected ? 'ring-2 ring-brand-500' : 'hover:shadow-md'}`}>
              <div className="p-3 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800 cursor-pointer" onClick={() => handleViewCompany(company.id)}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0" style={{ backgroundColor: color }}>
                    <Database size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{company.name}</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{company.id}</p>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </div>

              <div className="p-2">
                {viewMode === 'chart' ? (
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={30} outerRadius={45} paddingAngle={1} dataKey="value" label={renderLabel} labelLine={true}>
                          {pieData.map((entry, idx) => (<Cell key={`cell-${idx}`} fill={entry.color} />))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RePieChart>
                    </ResponsiveContainer>
                    <div className="text-center mt-1"><p className="text-[10px] text-slate-500">Total: {formatCompactNumber(totalValue)}</p></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-1">
                    {metrics.map((metric, idx) => (
                      <button key={idx} onClick={() => handleMetricClick(company.id, metric.texts)} className="flex items-center justify-between p-0.1 rounded-md bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all">
                        <div className="flex items-center gap-1">
                          <span className={getMetricColor(metric.texts)}>{getMetricIcon(metric.texts, 20)}</span>
                          <span className="text-[16px] font-medium text-slate-600 dark:text-slate-400">{metric.texts}</span>
                        </div>
                        <span className="text-[20px] font-semibold text-slate-900 dark:text-white">{formatCompactNumber(metric.value)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-2 pb-2">
                <button onClick={() => handleViewCompany(company.id)} className="w-full text-[10px] text-center py-1 rounded-md text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors font-medium">
                  View Dashboard →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}