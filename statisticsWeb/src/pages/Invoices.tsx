// import React from 'react';
// import { InvoiceStatusChart } from '../components/charts/InvoiceStatusChart';
// import { useFilters } from '../context/FilterContext';
// import { companies } from '../data/mockData';
// const generateInvoices = (selectedIds: string[]) => {
//   const statuses = ['Paid', 'Paid', 'Paid', 'Unpaid', 'Unpaid', 'Overdue'];
//   const clients = [
//   'Acme Corp',
//   'Stark Industries',
//   'Wayne Enterprises',
//   'Oscorp',
//   'Globex'];

//   return Array.from({
//     length: 15
//   }).map((_, i) => {
//     const comp =
//     companies.find((c) => c.id === selectedIds[i % selectedIds.length]) ||
//     companies[0];
//     const status = statuses[Math.floor(Math.random() * statuses.length)];
//     return {
//       id: `INV-${2024}-${1000 + i}`,
//       company: comp.name,
//       client: clients[Math.floor(Math.random() * clients.length)],
//       amount: Math.floor(Math.random() * 25000) + 500,
//       issueDate: new Date(
//         Date.now() - Math.floor(Math.random() * 60) * 86400000
//       ).toLocaleDateString(),
//       status: status
//     };
//   });
// };
// export function Invoices() {
//   const { selectedCompanies } = useFilters();
//   const data =
//   selectedCompanies.length > 0 ? generateInvoices(selectedCompanies) : [];
//   const formatCurrency = (val: number) =>
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD'
//   }).format(val);
//   const getStatusColor = (status: string) => {
//     if (status === 'Paid')
//     return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
//     if (status === 'Unpaid')
//     return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
//     return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
//   };
//   return (
//     <div className="space-y-6 animate-in fade-in duration-500">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//           Invoices & Billing
//         </h1>
//         <button className="btn-primary">Create Invoice</button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <InvoiceStatusChart />
//         <div className="card p-5 flex flex-col justify-center items-center text-center">
//           <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full flex items-center justify-center mb-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="32"
//               height="32"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round">
              
//               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//               <polyline points="14 2 14 8 20 8"></polyline>
//               <line x1="16" y1="13" x2="8" y2="13"></line>
//               <line x1="16" y1="17" x2="8" y2="17"></line>
//               <polyline points="10 9 9 9 8 9"></polyline>
//             </svg>
//           </div>
//           <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
//             Automated Billing
//           </h3>
//           <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
//             Set up recurring invoices and automated payment reminders to get
//             paid faster.
//           </p>
//           <button className="btn-secondary">Configure Automation</button>
//         </div>
//       </div>

//       <div className="card overflow-hidden">
//         <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
//             All Invoices
//           </h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">
//             <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50">
//               <tr>
//                 <th className="px-6 py-4 font-medium">Invoice #</th>
//                 <th className="px-6 py-4 font-medium">Issue Date</th>
//                 <th className="px-6 py-4 font-medium">Company</th>
//                 <th className="px-6 py-4 font-medium">Client</th>
//                 <th className="px-6 py-4 font-medium text-right">Amount</th>
//                 <th className="px-6 py-4 font-medium">Status</th>
//                 <th className="px-6 py-4 font-medium"></th>
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
//                   <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
//                     {row.issueDate}
//                   </td>
//                   <td className="px-6 py-4 text-slate-900 dark:text-white">
//                     {row.company}
//                   </td>
//                   <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
//                     {row.client}
//                   </td>
//                   <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
//                     {formatCurrency(row.amount)}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                     className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                    
//                       {row.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <button className="text-slate-400 hover:text-brand-600 transition-colors">
//                       <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round">
                      
//                         <circle cx="12" cy="12" r="1"></circle>
//                         <circle cx="12" cy="5" r="1"></circle>
//                         <circle cx="12" cy="19" r="1"></circle>
//                       </svg>
//                     </button>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>);

// }
// src/pages/Invoices.tsx - Update to use API data
import React, { useMemo } from 'react';
import { InvoiceStatusChart } from '../components/charts/InvoiceStatusChart';
import { useFilters } from '../context/FilterContext';
import { useGetCompaniesQuery } from '../store/api/dashboardApi';

export function Invoices() {
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

  // Generate invoice data from API
  const invoiceData = useMemo(() => {
    if (!dashboardData) return [];
    
    const data: any[] = [];
    const companiesToShow = selectedSingleCompany 
      ? [selectedSingleCompany]
      : selectedCompanies;
    
    companiesToShow.forEach(companyId => {
      const metrics = dashboardData[companyId];
      if (metrics) {
        const sales = metrics.find(m => m.texts.toLowerCase() === 'sales');
        const receivable = metrics.find(m => m.texts.toLowerCase() === 'receivable');
        
        if (sales) {
          const statuses = ['Paid', 'Paid', 'Paid', 'Unpaid', 'Unpaid', 'Overdue'];
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          
          data.push({
            id: `INV-${2024}-${companyId.toUpperCase()}`,
            company: getCompanyName(companyId),
            client: 'Various Clients',
            amount: sales.value,
            issueDate: new Date().toLocaleDateString(),
            status: status
          });
        }
      }
    });
    
    return data;
  }, [dashboardData, selectedCompanies, selectedSingleCompany, companies]);

  const getStatusColor = (status: string) => {
    if (status === 'Paid') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    if (status === 'Unpaid') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Invoices & Billing
          {selectedSingleCompany && (
            <span className="text-lg font-normal text-slate-500 ml-2">
              - {getCompanyName(selectedSingleCompany)}
            </span>
          )}
        </h1>
        <button className="btn-primary">Create Invoice</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InvoiceStatusChart />
        <div className="card p-5 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Automated Billing</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">Set up recurring invoices and automated payment reminders to get paid faster.</p>
          <button className="btn-secondary">Configure Automation</button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">All Invoices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice #</th>
                <th className="px-6 py-4 font-medium">Issue Date</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {invoiceData.map((row, idx) => (
                <tr key={idx} className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-600 dark:text-brand-400">{row.id}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row.issueDate}</td>
                  <td className="px-6 py-4 text-slate-900 dark:text-white">{row.company}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row.client}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">{formatCurrency(row.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
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