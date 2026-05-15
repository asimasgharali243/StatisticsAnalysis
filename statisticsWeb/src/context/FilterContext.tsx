// // // // src/context/FilterContext.tsx
// // // import React, { useState, createContext, useContext, useEffect } from 'react';
// // // import { useGetDashboardDataMutation, DashboardData } from '../store/api/dashboardApi';

// // // export type DateRange = 'This Month' | 'Last Month' | 'This Quarter' | 'This Year' | 'Custom';
// // // export type ModuleFilter = 'All' | 'Receivables' | 'Payables' | 'Expenses' | 'Invoices';
// // // export type StatusFilter = 'All' | 'Paid' | 'Unpaid' | 'Overdue';

// // // interface FilterContextType {
// // //   selectedCompanies: string[];
// // //   toggleCompany: (companyId: string) => void;
// // //   selectAllCompanies: (companyIds: string[]) => void;
// // //   clearCompanies: () => void;
// // //   dateRange: DateRange;
// // //   setDateRange: (range: DateRange) => void;
// // //   moduleFilter: ModuleFilter;
// // //   setModuleFilter: (module: ModuleFilter) => void;
// // //   statusFilter: StatusFilter;
// // //   setStatusFilter: (status: StatusFilter) => void;
// // //   dashboardData: DashboardData | null;
// // //   isLoading: boolean;
// // //   error: any;
// // //   fetchDashboardData: (companyIds: string[]) => void;
// // //   customDateFrom: Date | null;
// // //   customDateTo: Date | null;
// // //   setCustomDateRange: (from: Date | null, to: Date | null) => void;
// // // }

// // // const FilterContext = createContext<FilterContextType | undefined>(undefined);

// // // export function FilterProvider({ children }: { children: React.ReactNode }) {
// // //   const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
// // //   const [dateRange, setDateRange] = useState<DateRange>('This Year');
// // //   const [moduleFilter, setModuleFilter] = useState<ModuleFilter>('All');
// // //   const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
// // //   const [customDateFrom, setCustomDateFrom] = useState<Date | null>(null);
// // //   const [customDateTo, setCustomDateTo] = useState<Date | null>(null);
  
// // //   const [getDashboardData, { data: dashboardData, isLoading, error }] = useGetDashboardDataMutation();

// // //   const toggleCompany = (companyId: string) => {
// // //     setSelectedCompanies((prev) =>
// // //       prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId]
// // //     );
// // //   };

// // //   const selectAllCompanies = (companyIds: string[]) => {
// // //     setSelectedCompanies(companyIds);
// // //   };

// // //   const clearCompanies = () => {
// // //     setSelectedCompanies([]);
// // //   };

// // //   const setCustomDateRange = (from: Date | null, to: Date | null) => {
// // //     setCustomDateFrom(from);
// // //     setCustomDateTo(to);
// // //   };

// // //   const fetchDashboardData = (companyIds: string[]) => {
// // //     if (companyIds.length > 0) {
// // //       let dateFrom = '2020-01-01';
// // //       let dateTo = '2026-01-01';
      
// // //       // Handle custom date range
// // //       if (dateRange === 'Custom' && customDateFrom && customDateTo) {
// // //         dateFrom = customDateFrom.toISOString().split('T')[0];
// // //         dateTo = customDateTo.toISOString().split('T')[0];
// // //       } else {
// // //         // Handle predefined ranges
// // //         const now = new Date();
// // //         const currentYear = now.getFullYear();
// // //         const currentMonth = now.getMonth();
        
// // //         switch (dateRange) {
// // //           case 'This Month':
// // //             dateFrom = new Date(currentYear, currentMonth, 1).toISOString().split('T')[0];
// // //             dateTo = new Date(currentYear, currentMonth + 1, 0).toISOString().split('T')[0];
// // //             break;
// // //           case 'Last Month':
// // //             dateFrom = new Date(currentYear, currentMonth - 1, 1).toISOString().split('T')[0];
// // //             dateTo = new Date(currentYear, currentMonth, 0).toISOString().split('T')[0];
// // //             break;
// // //           case 'This Quarter':
// // //             const quarterStart = new Date(currentYear, Math.floor(currentMonth / 3) * 3, 1);
// // //             dateFrom = quarterStart.toISOString().split('T')[0];
// // //             dateTo = new Date(currentYear, Math.floor(currentMonth / 3) * 3 + 3, 0).toISOString().split('T')[0];
// // //             break;
// // //           case 'This Year':
// // //             dateFrom = `${currentYear}-01-01`;
// // //             dateTo = `${currentYear}-12-31`;
// // //             break;
// // //         }
// // //       }
      
// // //       getDashboardData({ companyIds, dateFrom, dateTo });
// // //     }
// // //   };

// // //   // Auto-fetch when selected companies or date range changes
// // //   useEffect(() => {
// // //     if (selectedCompanies.length > 0) {
// // //       fetchDashboardData(selectedCompanies);
// // //     }
// // //   }, [selectedCompanies, dateRange, customDateFrom, customDateTo]);

// // //   return (
// // //     <FilterContext.Provider
// // //       value={{
// // //         selectedCompanies,
// // //         toggleCompany,
// // //         selectAllCompanies,
// // //         clearCompanies,
// // //         dateRange,
// // //         setDateRange,
// // //         moduleFilter,
// // //         setModuleFilter,
// // //         statusFilter,
// // //         setStatusFilter,
// // //         dashboardData: dashboardData || null,
// // //         isLoading,
// // //         error,
// // //         fetchDashboardData,
// // //         customDateFrom,
// // //         customDateTo,
// // //         setCustomDateRange,
// // //       }}>
// // //       {children}
// // //     </FilterContext.Provider>
// // //   );
// // // }

// // // export function useFilters() {
// // //   const context = useContext(FilterContext);
// // //   if (context === undefined) {
// // //     throw new Error('useFilters must be used within a FilterProvider');
// // //   }
// // //   return context;
// // // }
// // // src/context/FilterContext.tsx
// // import React, { useState, createContext, useContext, useEffect } from 'react';
// // import { useGetDashboardDataMutation, DashboardData } from '../store/api/dashboardApi';
// // import { useGetCompaniesQuery } from '../store/api/dashboardApi';

// // export type DateRange = 'This Month' | 'Last Month' | 'This Quarter' | 'This Year' | 'Custom';
// // export type ModuleFilter = 'All' | 'Receivables' | 'Payables' | 'Expenses' | 'Invoices';
// // export type StatusFilter = 'All' | 'Paid' | 'Unpaid' | 'Overdue';
// // export type SelectedMetric = 'All' | 'Purchases' | 'Sales' | 'Receivable' | 'Payable' | 'Banks' | 'Expense';

// // interface FilterContextType {
// //   selectedCompanies: string[];
// //   toggleCompany: (companyId: string) => void;
// //   selectAllCompanies: (companyIds: string[]) => void;
// //   clearCompanies: () => void;
// //   dateRange: DateRange;
// //   setDateRange: (range: DateRange) => void;
// //   moduleFilter: ModuleFilter;
// //   setModuleFilter: (module: ModuleFilter) => void;
// //   statusFilter: StatusFilter;
// //   setStatusFilter: (status: StatusFilter) => void;
// //   dashboardData: DashboardData | null;
// //   isLoading: boolean;
// //   error: any;
// //   fetchDashboardData: (companyIds: string[]) => void;
// //   customDateFrom: Date | null;
// //   customDateTo: Date | null;
// //   setCustomDateRange: (from: Date | null, to: Date | null) => void;
// //   selectedMetric: SelectedMetric;
// //   setSelectedMetric: (metric: SelectedMetric) => void;
// //   selectedSingleCompany: string | null;
// //   setSelectedSingleCompany: (companyId: string | null) => void;
// // }

// // const FilterContext = createContext<FilterContextType | undefined>(undefined);

// // export function FilterProvider({ children }: { children: React.ReactNode }) {
// //   const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
// //   const { data: companiesFromApi } = useGetCompaniesQuery();
// //   const [dateRange, setDateRange] = useState<DateRange>('This Year');
// //   const [moduleFilter, setModuleFilter] = useState<ModuleFilter>('All');
// //   const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
// //   const [customDateFrom, setCustomDateFrom] = useState<Date | null>(null);
// //   const [customDateTo, setCustomDateTo] = useState<Date | null>(null);
// //   const [selectedMetric, setSelectedMetric] = useState<SelectedMetric>('All');
// //   const [selectedSingleCompany, setSelectedSingleCompany] = useState<string | null>(null);
  
// //   const [getDashboardData, { data: dashboardData, isLoading, error }] = useGetDashboardDataMutation();

// //   const toggleCompany = (companyId: string) => {
// //     setSelectedCompanies((prev) =>
// //       prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId]
// //     );
// //   };

// //   const selectAllCompanies = (companyIds: string[]) => {
// //     setSelectedCompanies(companyIds);
// //   };

// //   const clearCompanies = () => {
// //     setSelectedCompanies([]);
// //     setSelectedSingleCompany(null);
// //   };

// //   const setCustomDateRange = (from: Date | null, to: Date | null) => {
// //     setCustomDateFrom(from);
// //     setCustomDateTo(to);
// //   };

// //   const fetchDashboardData = (companyIds: string[]) => {
// //     if (companyIds.length > 0) {
// //       let dateFrom = '2020-01-01';
// //       let dateTo = '2026-01-01';
      
// //       if (dateRange === 'Custom' && customDateFrom && customDateTo) {
// //         dateFrom = customDateFrom.toISOString().split('T')[0];
// //         dateTo = customDateTo.toISOString().split('T')[0];
// //       } else {
// //         const now = new Date();
// //         const currentYear = now.getFullYear();
// //         const currentMonth = now.getMonth();
        
// //         switch (dateRange) {
// //           case 'This Month':
// //             dateFrom = new Date(currentYear, currentMonth, 1).toISOString().split('T')[0];
// //             dateTo = new Date(currentYear, currentMonth + 1, 0).toISOString().split('T')[0];
// //             break;
// //           case 'Last Month':
// //             dateFrom = new Date(currentYear, currentMonth - 1, 1).toISOString().split('T')[0];
// //             dateTo = new Date(currentYear, currentMonth, 0).toISOString().split('T')[0];
// //             break;
// //           case 'This Quarter':
// //             const quarterStart = new Date(currentYear, Math.floor(currentMonth / 3) * 3, 1);
// //             dateFrom = quarterStart.toISOString().split('T')[0];
// //             dateTo = new Date(currentYear, Math.floor(currentMonth / 3) * 3 + 3, 0).toISOString().split('T')[0];
// //             break;
// //           case 'This Year':
// //             dateFrom = `${currentYear}-01-01`;
// //             dateTo = `${currentYear}-12-31`;
// //             break;
// //         }
// //       }
      
// //       getDashboardData({ companyIds, dateFrom, dateTo });
// //     }
// //   };

// //   useEffect(() => {
// //     if (companiesFromApi && companiesFromApi.length > 0 && selectedCompanies.length === 0) {
// //       selectAllCompanies(companiesFromApi.map(c => c.id));
// //     }
// //   }, [companiesFromApi]);

// //   useEffect(() => {
// //     if (selectedCompanies.length > 0) {
// //       fetchDashboardData(selectedCompanies);
// //     }
// //   }, [selectedCompanies, dateRange, customDateFrom, customDateTo]);

// //   return (
// //     <FilterContext.Provider
// //       value={{
// //         selectedCompanies,
// //         toggleCompany,
// //         selectAllCompanies,
// //         clearCompanies,
// //         dateRange,
// //         setDateRange,
// //         moduleFilter,
// //         setModuleFilter,
// //         statusFilter,
// //         setStatusFilter,
// //         dashboardData: dashboardData || null,
// //         isLoading,
// //         error,
// //         fetchDashboardData,
// //         customDateFrom,
// //         customDateTo,
// //         setCustomDateRange,
// //         selectedMetric,
// //         setSelectedMetric,
// //         selectedSingleCompany,
// //         setSelectedSingleCompany,
// //       }}>
// //       {children}
// //     </FilterContext.Provider>
// //   );
// // }

// // export function useFilters() {
// //   const context = useContext(FilterContext);
// //   if (context === undefined) {
// //     throw new Error('useFilters must be used within a FilterProvider');
// //   }
// //   return context;
// // }
// // src/context/FilterContext.tsx
// import React, { useState, createContext, useContext, useEffect } from 'react';
// import { useGetDashboardDataMutation, DashboardData } from '../store/api/dashboardApi';
// import { useGetCompaniesQuery } from '../store/api/dashboardApi';

// export type DateRange = 'This Month' | 'Last Month' | 'This Quarter' | 'This Year' | 'Custom';
// export type ModuleFilter = 'All' | 'Receivables' | 'Payables' | 'Expenses' | 'Invoices';
// export type StatusFilter = 'All' | 'Paid' | 'Unpaid' | 'Overdue';
// export type SelectedMetric = 'All' | 'Purchases' | 'Sales' | 'Receivable' | 'Payable' | 'Banks' | 'Expense';

// interface FilterContextType {
//   selectedCompanies: string[];
//   toggleCompany: (companyId: string) => void;
//   selectAllCompanies: (companyIds: string[]) => void;
//   clearCompanies: () => void;
//   dateRange: DateRange;
//   setDateRange: (range: DateRange) => void;
//   moduleFilter: ModuleFilter;
//   setModuleFilter: (module: ModuleFilter) => void;
//   statusFilter: StatusFilter;
//   setStatusFilter: (status: StatusFilter) => void;
//   dashboardData: DashboardData | null;
//   isLoading: boolean;
//   error: any;
//   refreshData: () => void;
//   customDateFrom: Date | null;
//   customDateTo: Date | null;
//   setCustomDateRange: (from: Date | null, to: Date | null) => void;
//   selectedMetric: SelectedMetric;
//   setSelectedMetric: (metric: SelectedMetric) => void;
//   selectedSingleCompany: string | null;
//   setSelectedSingleCompany: (companyId: string | null) => void;
// }

// const FilterContext = createContext<FilterContextType | undefined>(undefined);

// export function FilterProvider({ children }: { children: React.ReactNode }) {
//   const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
//   const { data: companiesFromApi } = useGetCompaniesQuery();
//   const [dateRange, setDateRange] = useState<DateRange>('This Year');
//   const [moduleFilter, setModuleFilter] = useState<ModuleFilter>('All');
//   const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
//   const [customDateFrom, setCustomDateFrom] = useState<Date | null>(null);
//   const [customDateTo, setCustomDateTo] = useState<Date | null>(null);
//   const [selectedMetric, setSelectedMetric] = useState<SelectedMetric>('All');
//   const [selectedSingleCompany, setSelectedSingleCompany] = useState<string | null>(null);
  
//   const [getDashboardData, { data: dashboardData, isLoading, error }] = useGetDashboardDataMutation();

//   const toggleCompany = (companyId: string) => {
//     setSelectedCompanies((prev) =>
//       prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId]
//     );
//   };

//   const selectAllCompanies = (companyIds: string[]) => {
//     setSelectedCompanies(companyIds);
//   };

//   const clearCompanies = () => {
//     setSelectedCompanies([]);
//     setSelectedSingleCompany(null);
//   };

//   const setCustomDateRange = (from: Date | null, to: Date | null) => {
//     setCustomDateFrom(from);
//     setCustomDateTo(to);
//   };

//   const getDateRangeValues = () => {
//     let dateFrom = '2020-01-01';
//     let dateTo = '2026-01-01';
    
//     if (dateRange === 'Custom' && customDateFrom && customDateTo) {
//       dateFrom = customDateFrom.toISOString().split('T')[0];
//       dateTo = customDateTo.toISOString().split('T')[0];
//     } else {
//       const now = new Date();
//       const currentYear = now.getFullYear();
//       const currentMonth = now.getMonth();
      
//       switch (dateRange) {
//         case 'This Month':
//           dateFrom = new Date(currentYear, currentMonth, 1).toISOString().split('T')[0];
//           dateTo = new Date(currentYear, currentMonth + 1, 0).toISOString().split('T')[0];
//           break;
//         case 'Last Month':
//           dateFrom = new Date(currentYear, currentMonth - 1, 1).toISOString().split('T')[0];
//           dateTo = new Date(currentYear, currentMonth, 0).toISOString().split('T')[0];
//           break;
//         case 'This Quarter':
//           const quarterStart = new Date(currentYear, Math.floor(currentMonth / 3) * 3, 1);
//           dateFrom = quarterStart.toISOString().split('T')[0];
//           dateTo = new Date(currentYear, Math.floor(currentMonth / 3) * 3 + 3, 0).toISOString().split('T')[0];
//           break;
//         case 'This Year':
//           dateFrom = `${currentYear}-01-01`;
//           dateTo = `${currentYear}-12-31`;
//           break;
//       }
//     }
//     return { dateFrom, dateTo };
//   };

//   const fetchDashboardData = (companyIds: string[]) => {
//     if (companyIds.length > 0) {
//       const { dateFrom, dateTo } = getDateRangeValues();
//       getDashboardData({ companyIds, dateFrom, dateTo });
//     }
//   };

//   const refreshData = () => {
//     if (selectedCompanies.length > 0) {
//       fetchDashboardData(selectedCompanies);
//     }
//   };

//   useEffect(() => {
//     if (companiesFromApi && companiesFromApi.length > 0 && selectedCompanies.length === 0) {
//       selectAllCompanies(companiesFromApi.map(c => c.id));
//     }
//   }, [companiesFromApi]);

//   useEffect(() => {
//     if (selectedCompanies.length > 0) {
//       fetchDashboardData(selectedCompanies);
//     }
//   }, [selectedCompanies, dateRange, customDateFrom, customDateTo]);

//   return (
//     <FilterContext.Provider
//       value={{
//         selectedCompanies,
//         toggleCompany,
//         selectAllCompanies,
//         clearCompanies,
//         dateRange,
//         setDateRange,
//         moduleFilter,
//         setModuleFilter,
//         statusFilter,
//         setStatusFilter,
//         dashboardData: dashboardData || null,
//         isLoading,
//         error,
//         refreshData,
//         customDateFrom,
//         customDateTo,
//         setCustomDateRange,
//         selectedMetric,
//         setSelectedMetric,
//         selectedSingleCompany,
//         setSelectedSingleCompany,
//       }}>
//       {children}
//     </FilterContext.Provider>
//   );
// }

// export function useFilters() {
//   const context = useContext(FilterContext);
//   if (context === undefined) {
//     throw new Error('useFilters must be used within a FilterProvider');
//   }
//   return context;
// }
// src/context/FilterContext.tsx
import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { useGetDashboardDataMutation, DashboardData } from '../store/api/dashboardApi';
import { useGetCompaniesQuery } from '../store/api/dashboardApi';

export type DateRange = 'This Month' | 'Last Month' | 'This Quarter' | 'This Year' | 'Custom';
export type ModuleFilter = 'All' | 'Receivables' | 'Payables' | 'Expenses' | 'Invoices';
export type StatusFilter = 'All' | 'Paid' | 'Unpaid' | 'Overdue';
export type SelectedMetric = 'All' | 'Purchases' | 'Sales' | 'Receivable' | 'Payable' | 'Banks' | 'Expense';

interface FilterContextType {
  selectedCompanies: string[];
  toggleCompany: (companyId: string) => void;
  selectAllCompanies: (companyIds: string[]) => void;
  clearCompanies: () => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  moduleFilter: ModuleFilter;
  setModuleFilter: (module: ModuleFilter) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: any;
  refreshData: () => void;
  customDateFrom: Date | null;
  customDateTo: Date | null;
  setCustomDateRange: (from: Date | null, to: Date | null) => void;
  selectedMetric: SelectedMetric;
  setSelectedMetric: (metric: SelectedMetric) => void;
  selectedSingleCompany: string | null;
  setSelectedSingleCompany: (companyId: string | null) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const { data: companiesFromApi } = useGetCompaniesQuery();
  const [dateRange, setDateRange] = useState<DateRange>('This Year');
  const [moduleFilter, setModuleFilter] = useState<ModuleFilter>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [customDateFrom, setCustomDateFrom] = useState<Date | null>(null);
  const [customDateTo, setCustomDateTo] = useState<Date | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<SelectedMetric>('All');
  const [selectedSingleCompany, setSelectedSingleCompany] = useState<string | null>(null);
  
  const [getDashboardData, { data: dashboardData, isLoading, error }] = useGetDashboardDataMutation();
  const hasInitialized = useRef(false);

  const toggleCompany = (companyId: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId]
    );
  };

  const selectAllCompanies = (companyIds: string[]) => {
    setSelectedCompanies(companyIds);
  };

  const clearCompanies = () => {
    setSelectedCompanies([]);
    setSelectedSingleCompany(null);
  };

  const setCustomDateRange = (from: Date | null, to: Date | null) => {
    setCustomDateFrom(from);
    setCustomDateTo(to);
  };

  const getDateRangeValues = () => {
    let dateFrom = '2020-01-01';
    let dateTo = '2026-01-01';
    
    if (dateRange === 'Custom' && customDateFrom && customDateTo) {
      dateFrom = customDateFrom.toISOString().split('T')[0];
      dateTo = customDateTo.toISOString().split('T')[0];
    } else {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      
      switch (dateRange) {
        case 'This Month':
          dateFrom = new Date(currentYear, currentMonth, 1).toISOString().split('T')[0];
          dateTo = new Date(currentYear, currentMonth + 1, 0).toISOString().split('T')[0];
          break;
        case 'Last Month':
          dateFrom = new Date(currentYear, currentMonth - 1, 1).toISOString().split('T')[0];
          dateTo = new Date(currentYear, currentMonth, 0).toISOString().split('T')[0];
          break;
        case 'This Quarter':
          const quarterStart = new Date(currentYear, Math.floor(currentMonth / 3) * 3, 1);
          dateFrom = quarterStart.toISOString().split('T')[0];
          dateTo = new Date(currentYear, Math.floor(currentMonth / 3) * 3 + 3, 0).toISOString().split('T')[0];
          break;
        case 'This Year':
          dateFrom = `${currentYear}-01-01`;
          dateTo = `${currentYear}-12-31`;
          break;
      }
    }
    return { dateFrom, dateTo };
  };

  const fetchDashboardData = (companyIds: string[]) => {
    if (companyIds.length > 0) {
      const { dateFrom, dateTo } = getDateRangeValues();
      getDashboardData({ companyIds, dateFrom, dateTo });
    }
  };

  const refreshData = () => {
    if (selectedCompanies.length > 0) {
      fetchDashboardData(selectedCompanies);
    }
  };

  // Only select all on initial load, not when clearing
  useEffect(() => {
    if (!hasInitialized.current && companiesFromApi && companiesFromApi.length > 0 && selectedCompanies.length === 0) {
      selectAllCompanies(companiesFromApi.map(c => c.id));
      hasInitialized.current = true;
    }
  }, [companiesFromApi]);

  useEffect(() => {
    if (selectedCompanies.length > 0) {
      fetchDashboardData(selectedCompanies);
    }
  }, [selectedCompanies, dateRange, customDateFrom, customDateTo]);

  return (
    <FilterContext.Provider
      value={{
        selectedCompanies,
        toggleCompany,
        selectAllCompanies,
        clearCompanies,
        dateRange,
        setDateRange,
        moduleFilter,
        setModuleFilter,
        statusFilter,
        setStatusFilter,
        dashboardData: dashboardData || null,
        isLoading,
        error,
        refreshData,
        customDateFrom,
        customDateTo,
        setCustomDateRange,
        selectedMetric,
        setSelectedMetric,
        selectedSingleCompany,
        setSelectedSingleCompany,
      }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}