// import React from 'react';
// import { ARAgingChart } from '../components/charts/ARAgingChart';
// import { useFilters } from '../context/FilterContext';
// import { companies } from '../data/mockData';
// // Mock table data
// const generateReceivables = (selectedIds: string[]) => {
//   const statuses = [
//   'Current',
//   '1-30 Days Overdue',
//   '31-60 Days Overdue',
//   '90+ Days Overdue'];

//   const customers = [
//   'TechCorp',
//   'Global Industries',
//   'Local Shop',
//   'MegaCorp',
//   'Startup Inc'];

//   return Array.from({
//     length: 15
//   }).map((_, i) => {
//     const comp =
//     companies.find((c) => c.id === selectedIds[i % selectedIds.length]) ||
//     companies[0];
//     const status = statuses[Math.floor(Math.random() * statuses.length)];
//     return {
//       id: `INV-${1000 + i}`,
//       company: comp.name,
//       customer: customers[Math.floor(Math.random() * customers.length)],
//       amount: Math.floor(Math.random() * 50000) + 1000,
//       dueDate: new Date(
//         Date.now() - Math.floor(Math.random() * 100) * 86400000
//       ).toLocaleDateString(),
//       status: status
//     };
//   });
// };
// export function Receivables() {
//   const { selectedCompanies } = useFilters();
//   const data =
//   selectedCompanies.length > 0 ? generateReceivables(selectedCompanies) : [];
//   const formatCurrency = (val: number) =>
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD'
//   }).format(val);
//   const getStatusColor = (status: string) => {
//     if (status === 'Current')
//     return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
//     if (status === '1-30 Days Overdue')
//     return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
//     if (status === '31-60 Days Overdue')
//     return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
//     return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
//   };
//   return (
//     <div className="space-y-6 animate-in fade-in duration-500">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//           Accounts Receivable
//         </h1>
//       </div>

//       <div className="grid grid-cols-1 gap-6">
//         <ARAgingChart />
//       </div>

//       <div className="card overflow-hidden">
//         <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
//             Outstanding Invoices
//           </h3>
//           <input
//             type="text"
//             placeholder="Search invoices..."
//             className="input-field max-w-xs" />
          
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">
//             <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50">
//               <tr>
//                 <th className="px-6 py-4 font-medium">Invoice #</th>
//                 <th className="px-6 py-4 font-medium">Company</th>
//                 <th className="px-6 py-4 font-medium">Customer</th>
//                 <th className="px-6 py-4 font-medium text-right">Amount</th>
//                 <th className="px-6 py-4 font-medium">Due Date</th>
//                 <th className="px-6 py-4 font-medium">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//               {data.map((row) =>
//               <tr
//                 key={row.id}
//                 className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                
//                   <td className="px-6 py-4 font-medium text-brand-600 dark:text-brand-400">
//                     {row.id}
//                   </td>
//                   <td className="px-6 py-4 text-slate-900 dark:text-white">
//                     {row.company}
//                   </td>
//                   <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
//                     {row.customer}
//                   </td>
//                   <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
//                     {formatCurrency(row.amount)}
//                   </td>
//                   <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
//                     {row.dueDate}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                     className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                    
//                       {row.status}
//                     </span>
//                   </td>
//                 </tr>
//               )}
//               {data.length === 0 &&
//               <tr>
//                   <td
//                   colSpan={6}
//                   className="px-6 py-8 text-center text-slate-500">
                  
//                     No companies selected.
//                   </td>
//                 </tr>
//               }
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>);

// }
// src/pages/Receivables.tsx
import React, { useMemo } from 'react';
import { ARAgingChart } from '../components/charts/ARAgingChart';
import { useFilters } from '../context/FilterContext';
import { useGetCompaniesQuery } from '../store/api/dashboardApi';

export function Receivables() {
  const { dashboardData, selectedCompanies, selectedSingleCompany } = useFilters();
  const { data: companies } = useGetCompaniesQuery();

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);

  const getCompanyName = (companyId: string) => {
    return companies?.find(c => c.id === companyId)?.name || companyId;
  };

  // Generate receivable data from API
  const receivableData = useMemo(() => {
    if (!dashboardData) return [];
    
    const data: any[] = [];
    const companiesToShow = selectedSingleCompany 
      ? [selectedSingleCompany]
      : selectedCompanies;
    
    companiesToShow.forEach(companyId => {
      const metrics = dashboardData[companyId];
      if (metrics) {
        const receivable = metrics.find(m => m.texts.toLowerCase() === 'receivable');
        if (receivable) {
          data.push({
            id: `INV-${companyId.toUpperCase()}`,
            company: getCompanyName(companyId),
            customer: 'Various Customers',
            amount: receivable.value,
            dueDate: new Date(Date.now() + 30 * 86400000).toLocaleDateString(),
            status: 'Current'
          });
        }
      }
    });
    
    return data;
  }, [dashboardData, selectedCompanies, selectedSingleCompany, companies]);

  const getStatusColor = (status: string) => {
    if (status === 'Current') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
  };

  if (!dashboardData || Object.keys(dashboardData).length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-slate-500">Loading receivable data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Accounts Receivable
          {selectedSingleCompany && (
            <span className="text-lg font-normal text-slate-500 ml-2">
              - {getCompanyName(selectedSingleCompany)}
            </span>
          )}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ARAgingChart />
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Outstanding Invoices
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice #</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium">Due Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {receivableData.map((row, idx) => (
                <tr key={idx} className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-600 dark:text-brand-400">{row.id}</td>
                  <td className="px-6 py-4 text-slate-900 dark:text-white">{row.company}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row.customer}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">{formatCurrency(row.amount)}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row.dueDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
              {receivableData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No receivable data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}