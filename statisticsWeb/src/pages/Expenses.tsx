// import React from 'react';
// import { ExpenseDistributionChart } from '../components/charts/ExpenseDistributionChart';
// import { ExpenseTrendChart } from '../components/charts/ExpenseTrendChart';
// import { useFilters } from '../context/FilterContext';
// import { companies } from '../data/mockData';
// const generateExpenses = (selectedIds: string[]) => {
//   const categories = [
//   'Salaries',
//   'Rent',
//   'Utilities',
//   'Operations',
//   'Marketing',
//   'Software',
//   'Travel'];

//   return Array.from({
//     length: 15
//   }).map((_, i) => {
//     const comp =
//     companies.find((c) => c.id === selectedIds[i % selectedIds.length]) ||
//     companies[0];
//     return {
//       id: `EXP-${8000 + i}`,
//       company: comp.name,
//       category: categories[Math.floor(Math.random() * categories.length)],
//       description: `Monthly ${categories[Math.floor(Math.random() * categories.length)]} Expense`,
//       amount: Math.floor(Math.random() * 15000) + 100,
//       date: new Date(
//         Date.now() - Math.floor(Math.random() * 30) * 86400000
//       ).toLocaleDateString()
//     };
//   });
// };
// export function Expenses() {
//   const { selectedCompanies } = useFilters();
//   const data =
//   selectedCompanies.length > 0 ? generateExpenses(selectedCompanies) : [];
//   const formatCurrency = (val: number) =>
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD'
//   }).format(val);
//   return (
//     <div className="space-y-6 animate-in fade-in duration-500">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//           Expenses
//         </h1>
//         <button className="btn-primary">Record Expense</button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ExpenseDistributionChart />
//         <ExpenseTrendChart />
//       </div>

//       <div className="card overflow-hidden">
//         <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
//             Recent Expenses
//           </h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">
//             <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50">
//               <tr>
//                 <th className="px-6 py-4 font-medium">ID</th>
//                 <th className="px-6 py-4 font-medium">Date</th>
//                 <th className="px-6 py-4 font-medium">Company</th>
//                 <th className="px-6 py-4 font-medium">Category</th>
//                 <th className="px-6 py-4 font-medium">Description</th>
//                 <th className="px-6 py-4 font-medium text-right">Amount</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//               {data.map((row) =>
//               <tr
//                 key={row.id}
//                 className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                
//                   <td className="px-6 py-4 font-medium text-slate-500">
//                     {row.id}
//                   </td>
//                   <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
//                     {row.date}
//                   </td>
//                   <td className="px-6 py-4 text-slate-900 dark:text-white">
//                     {row.company}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
//                       {row.category}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
//                     {row.description}
//                   </td>
//                   <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
//                     {formatCurrency(row.amount)}
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
// src/pages/Expenses.tsx
import React, { useMemo } from 'react';
import { ExpenseDistributionChart } from '../components/charts/ExpenseDistributionChart';
import { ExpenseTrendChart } from '../components/charts/ExpenseTrendChart';
import { useFilters } from '../context/FilterContext';
import { useGetCompaniesQuery } from '../store/api/dashboardApi';

export function Expenses() {
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

  // Generate expense data from API
  const expenseData = useMemo(() => {
    if (!dashboardData) return [];
    
    const data: any[] = [];
    const companiesToShow = selectedSingleCompany 
      ? [selectedSingleCompany]
      : selectedCompanies;
    
    companiesToShow.forEach(companyId => {
      const metrics = dashboardData[companyId];
      if (metrics) {
        const expense = metrics.find(m => m.texts.toLowerCase() === 'expense');
        if (expense) {
          data.push({
            id: `EXP-${companyId.toUpperCase()}`,
            company: getCompanyName(companyId),
            category: 'Operating Expense',
            description: 'Total Expenses',
            amount: expense.value,
            date: new Date().toLocaleDateString()
          });
        }
      }
    });
    
    return data;
  }, [dashboardData, selectedCompanies, selectedSingleCompany, companies]);

  if (!dashboardData || Object.keys(dashboardData).length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-slate-500">Loading expense data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Expenses
          {selectedSingleCompany && (
            <span className="text-lg font-normal text-slate-500 ml-2">
              - {getCompanyName(selectedSingleCompany)}
            </span>
          )}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseDistributionChart />
        <ExpenseTrendChart />
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Expense Summary
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {expenseData.map((row, idx) => (
                <tr key={idx} className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.company}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      {row.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row.description}</td>
                  <td className="px-6 py-4 text-right font-medium text-red-600 dark:text-red-400">
                    {formatCurrency(row.amount)}
                  </td>
                </tr>
              ))}
              {expenseData.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No expense data available
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