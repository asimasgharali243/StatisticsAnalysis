// import React from 'react';
// import { APBreakdownChart } from '../components/charts/APBreakdownChart';
// import { useFilters } from '../context/FilterContext';
// import { companies } from '../data/mockData';
// const generatePayables = (selectedIds: string[]) => {
//   const vendors = [
//   'AWS',
//   'Microsoft',
//   'Salesforce',
//   'Google Cloud',
//   'WeWork',
//   'Oracle',
//   'Adobe'];

//   const statuses = ['Pending', 'Overdue', 'Scheduled'];
//   return Array.from({
//     length: 12
//   }).map((_, i) => {
//     const comp =
//     companies.find((c) => c.id === selectedIds[i % selectedIds.length]) ||
//     companies[0];
//     const status = statuses[Math.floor(Math.random() * statuses.length)];
//     return {
//       id: `BILL-${5000 + i}`,
//       company: comp.name,
//       vendor: vendors[Math.floor(Math.random() * vendors.length)],
//       amount: Math.floor(Math.random() * 30000) + 500,
//       dueDate: new Date(
//         Date.now() + Math.floor(Math.random() * 30 - 10) * 86400000
//       ).toLocaleDateString(),
//       status: status
//     };
//   });
// };
// export function Payables() {
//   const { selectedCompanies } = useFilters();
//   const data =
//   selectedCompanies.length > 0 ? generatePayables(selectedCompanies) : [];
//   const formatCurrency = (val: number) =>
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD'
//   }).format(val);
//   const getStatusColor = (status: string) => {
//     if (status === 'Scheduled')
//     return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
//     if (status === 'Pending')
//     return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
//     return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
//   };
//   return (
//     <div className="space-y-6 animate-in fade-in duration-500">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//           Accounts Payable
//         </h1>
//       </div>

//       <div className="grid grid-cols-1 gap-6">
//         <APBreakdownChart />
//       </div>

//       <div className="card overflow-hidden">
//         <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
//             Pending Bills
//           </h3>
//           <button className="btn-primary">Add Bill</button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">
//             <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50">
//               <tr>
//                 <th className="px-6 py-4 font-medium">Bill #</th>
//                 <th className="px-6 py-4 font-medium">Company</th>
//                 <th className="px-6 py-4 font-medium">Vendor</th>
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
                
//                   <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
//                     {row.id}
//                   </td>
//                   <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
//                     {row.company}
//                   </td>
//                   <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">
//                     {row.vendor}
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
// src/pages/Payables.tsx
import React, { useMemo } from 'react';
import { APBreakdownChart } from '../components/charts/APBreakdownChart';
import { useFilters } from '../context/FilterContext';
import { useGetCompaniesQuery } from '../store/api/dashboardApi';

export function Payables() {
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

  // Generate payable data from API
  const payableData = useMemo(() => {
    if (!dashboardData) return [];
    
    const data: any[] = [];
    const companiesToShow = selectedSingleCompany 
      ? [selectedSingleCompany]
      : selectedCompanies;
    
    companiesToShow.forEach(companyId => {
      const metrics = dashboardData[companyId];
      if (metrics) {
        const payable = metrics.find(m => m.texts.toLowerCase() === 'payable');
        if (payable) {
          data.push({
            id: `BILL-${companyId.toUpperCase()}`,
            company: getCompanyName(companyId),
            vendor: 'Various Vendors',
            amount: payable.value,
            dueDate: new Date(Date.now() + 15 * 86400000).toLocaleDateString(),
            status: 'Pending'
          });
        }
      }
    });
    
    return data;
  }, [dashboardData, selectedCompanies, selectedSingleCompany, companies]);

  const getStatusColor = (status: string) => {
    if (status === 'Pending') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
  };

  if (!dashboardData || Object.keys(dashboardData).length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-slate-500">Loading payable data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Accounts Payable
          {selectedSingleCompany && (
            <span className="text-lg font-normal text-slate-500 ml-2">
              - {getCompanyName(selectedSingleCompany)}
            </span>
          )}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <APBreakdownChart />
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Pending Bills
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 font-medium">Bill #</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Vendor</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium">Due Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {payableData.map((row, idx) => (
                <tr key={idx} className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.id}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row.company}</td>
                  <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{row.vendor}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">{formatCurrency(row.amount)}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row.dueDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
              {payableData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No payable data available
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