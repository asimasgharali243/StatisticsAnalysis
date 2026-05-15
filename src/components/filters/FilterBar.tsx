// // // src/components/filters/FilterBar.tsx
// // import React, { useState } from 'react';
// // import { Calendar, Filter, Layers, ChevronDown } from 'lucide-react';
// // import {
// //   useFilters,
// //   DateRange,
// //   ModuleFilter,
// //   StatusFilter } from
// // '../../context/FilterContext';

// // const dateRanges: DateRange[] = [
// // 'This Month',
// // 'Last Month',
// // 'This Quarter',
// // 'This Year',
// // 'Custom'];

// // const modules: ModuleFilter[] = [
// // 'All',
// // 'Receivables',
// // 'Payables',
// // 'Expenses',
// // 'Invoices'];

// // const statuses: StatusFilter[] = ['All', 'Paid', 'Unpaid', 'Overdue'];

// // export function FilterBar() {
// //   const {
// //     dateRange,
// //     setDateRange,
// //     moduleFilter,
// //     setModuleFilter,
// //     statusFilter,
// //     setStatusFilter,
// //     customDateFrom,
// //     customDateTo,
// //     setCustomDateRange
// //   } = useFilters();
  
// //   const [showCustomDate, setShowCustomDate] = useState(dateRange === 'Custom');

// //   const handleDateRangeChange = (range: DateRange) => {
// //     setDateRange(range);
// //     setShowCustomDate(range === 'Custom');
// //     if (range !== 'Custom') {
// //       setCustomDateRange(null, null);
// //     }
// //   };

// //   return (
// //     <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4">
// //       <div className="flex flex-wrap gap-4 items-center">
// //         {/* Date Range */}
// //         <div className="flex items-center gap-2 flex-shrink-0">
// //           <Calendar size={16} className="text-slate-400" />
// //           <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
// //             {dateRanges.map((range) => (
// //               <button
// //                 key={range}
// //                 onClick={() => handleDateRangeChange(range)}
// //                 className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
// //                   dateRange === range 
// //                     ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm' 
// //                     : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
// //                 }`}>
// //                 {range}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Custom Date Range */}
// //         {showCustomDate && (
// //           <div className="flex items-center gap-2">
// //             <input
// //               type="date"
// //               value={customDateFrom?.toISOString().split('T')[0] || ''}
// //               onChange={(e) => setCustomDateRange(new Date(e.target.value), customDateTo)}
// //               className="input-field text-sm py-1 px-2 w-36"
// //               placeholder="From"
// //             />
// //             <span className="text-slate-400">→</span>
// //             <input
// //               type="date"
// //               value={customDateTo?.toISOString().split('T')[0] || ''}
// //               onChange={(e) => setCustomDateRange(customDateFrom, new Date(e.target.value))}
// //               className="input-field text-sm py-1 px-2 w-36"
// //               placeholder="To"
// //             />
// //           </div>
// //         )}

// //         <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700"></div>

// //         {/* Module Filter */}
// //         {/* <div className="flex items-center gap-2 flex-shrink-0">
// //           <Layers size={16} className="text-slate-400" />
// //           <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
// //             {modules.map((mod) => (
// //               <button
// //                 key={mod}
// //                 onClick={() => setModuleFilter(mod)}
// //                 className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
// //                   moduleFilter === mod 
// //                     ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
// //                     : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
// //                 }`}>
// //                 {mod}
// //               </button>
// //             ))}
// //           </div>
// //         </div> */}

// //         {/* <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700"></div> */}

// //         {/* Status Filter */}
// //         {/* <div className="flex items-center gap-2 flex-shrink-0">
// //           <Filter size={16} className="text-slate-400" />
// //           <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
// //             {statuses.map((status) => (
// //               <button
// //                 key={status}
// //                 onClick={() => setStatusFilter(status)}
// //                 className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
// //                   statusFilter === status 
// //                     ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
// //                     : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
// //                 }`}>
// //                 {status}
// //               </button>
// //             ))}
// //           </div>
// //         </div> */}
// //       </div>
// //     </div>
// //   );
// // }
// // src/components/filters/FilterBar.tsx
// import React, { useState } from 'react';
// import { Calendar, Filter, Layers, ChevronDown } from 'lucide-react';
// import { useFilters, DateRange, ModuleFilter, StatusFilter } from '../../context/FilterContext';

// const dateRanges: DateRange[] = ['This Month', 'Last Month', 'This Quarter', 'This Year', 'Custom'];
// const modules: ModuleFilter[] = ['All', 'Receivables', 'Payables', 'Expenses', 'Invoices'];
// const statuses: StatusFilter[] = ['All', 'Paid', 'Unpaid', 'Overdue'];

// export function FilterBar() {
//   const { dateRange, setDateRange, moduleFilter, setModuleFilter, statusFilter, setStatusFilter, customDateFrom, customDateTo, setCustomDateRange } = useFilters();
//   const [showCustomDate, setShowCustomDate] = useState(dateRange === 'Custom');

//   const handleDateRangeChange = (range: DateRange) => {
//     setDateRange(range);
//     setShowCustomDate(range === 'Custom');
//     if (range !== 'Custom') setCustomDateRange(null, null);
//   };

//   return (
//     <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-2 sm:p-3 md:p-4 overflow-x-auto hide-scrollbar">
//       <div className="flex flex-nowrap sm:flex-wrap gap-2 sm:gap-3 md:gap-4 items-center min-w-max sm:min-w-0">
//         <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
//           <Calendar size={14} className="sm:w-4 sm:h-4 text-slate-400" />
//           <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 sm:p-1 rounded-lg">
//             {dateRanges.map((range) => (
//               <button key={range} onClick={() => handleDateRangeChange(range)} className={`px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded whitespace-nowrap transition-colors ${dateRange === range ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}>
//                 {range === 'This Month' ? 'Month' : range === 'This Quarter' ? 'Quarter' : range === 'This Year' ? 'Year' : range}
//               </button>
//             ))}
//           </div>
//         </div>

//         {showCustomDate && (
//           <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
//             <input type="date" value={customDateFrom?.toISOString().split('T')[0] || ''} onChange={(e) => setCustomDateRange(new Date(e.target.value), customDateTo)} className="input-field text-[10px] sm:text-xs py-0.5 sm:py-1 px-1 sm:px-2 w-24 sm:w-28 md:w-36" />
//             <span className="text-slate-400 text-xs">→</span>
//             <input type="date" value={customDateTo?.toISOString().split('T')[0] || ''} onChange={(e) => setCustomDateRange(customDateFrom, new Date(e.target.value))} className="input-field text-[10px] sm:text-xs py-0.5 sm:py-1 px-1 sm:px-2 w-24 sm:w-28 md:w-36" />
//           </div>
//         )}

//         <div className="hidden md:block w-px h-5 bg-slate-200 dark:bg-slate-700" />

//         {/* <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
//           <Layers size={14} className="sm:w-4 sm:h-4 text-slate-400" />
//           <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 sm:p-1 rounded-lg">
//             {modules.map((mod) => (
//               <button key={mod} onClick={() => setModuleFilter(mod)} className={`px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded whitespace-nowrap transition-colors ${moduleFilter === mod ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}>
//                 {mod === 'Receivables' ? 'AR' : mod === 'Payables' ? 'AP' : mod === 'Expenses' ? 'Exp' : mod === 'Invoices' ? 'Inv' : mod}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="hidden md:block w-px h-5 bg-slate-200 dark:bg-slate-700" />

//         <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
//           <Filter size={14} className="sm:w-4 sm:h-4 text-slate-400" />
//           <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 sm:p-1 rounded-lg">
//             {statuses.map((status) => (
//               <button key={status} onClick={() => setStatusFilter(status)} className={`px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded whitespace-nowrap transition-colors ${statusFilter === status ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}>
//                 {status}
//               </button>
//             ))}
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Calendar, Filter, Layers, ChevronDown } from 'lucide-react';
import { useFilters, DateRange, ModuleFilter, StatusFilter } from '../../context/FilterContext';

const dateRanges: DateRange[] = ['This Month', 'Last Month', 'This Quarter', 'This Year', 'Custom'];

export function FilterBar() {
  const { dateRange, setDateRange, customDateFrom, customDateTo, setCustomDateRange } = useFilters();
  const [showCustomDate, setShowCustomDate] = useState(dateRange === 'Custom');

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    setShowCustomDate(range === 'Custom');
    if (range !== 'Custom') setCustomDateRange(null, null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-2 sm:p-3 md:p-4 overflow-x-auto hide-scrollbar">
      <div className="flex flex-nowrap sm:flex-wrap gap-2 sm:gap-3 md:gap-4 items-center min-w-max sm:min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <Calendar size={14} className="sm:w-4 sm:h-4 text-slate-400" />
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 sm:p-1 rounded-lg">
            {dateRanges.map((range) => (
              <button key={range} onClick={() => handleDateRangeChange(range)} className={`px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded whitespace-nowrap transition-colors ${dateRange === range ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}>
                {range === 'This Month' ? 'Month' : range === 'This Quarter' ? 'Quarter' : range === 'This Year' ? 'Year' : range}
              </button>
            ))}
          </div>
        </div>

        {showCustomDate && (
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <input type="date" value={customDateFrom?.toISOString().split('T')[0] || ''} onChange={(e) => setCustomDateRange(new Date(e.target.value), customDateTo)} className="input-field text-[10px] sm:text-xs py-0.5 sm:py-1 px-1 sm:px-2 w-24 sm:w-28 md:w-36" />
            <span className="text-slate-400 text-xs">→</span>
            <input type="date" value={customDateTo?.toISOString().split('T')[0] || ''} onChange={(e) => setCustomDateRange(customDateFrom, new Date(e.target.value))} className="input-field text-[10px] sm:text-xs py-0.5 sm:py-1 px-1 sm:px-2 w-24 sm:w-28 md:w-36" />
          </div>
        )}
      </div>
    </div>
  );
}