// // // src/store/api/dashboardApi.ts
// // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // export interface Company {
// //   id: string;
// //   name: string;
// // }

// // export interface DashboardMetric {
// //   texts: string;
// //   value: number;
// // }

// // export type DashboardData = Record<string, DashboardMetric[]>;

// // export interface DashboardRequest {
// //   companyIds: string[];
// //   dateFrom?: string;
// //   dateTo?: string;
// // }

// // // Helper function to get auth token
// // const getAuthToken = () => localStorage.getItem('token');

// // export const dashboardApi = createApi({
// //   reducerPath: 'dashboardApi',
// //   baseQuery: fetchBaseQuery({
// //     baseUrl: 'http://localhost:5290/api',
    
// //     prepareHeaders: (headers) => {
// //       // Set content type
// //       headers.set('Content-Type', 'application/json');
      
// //       // Add authorization token if exists
// //       const token = getAuthToken();
// //       if (token) {
// //         headers.set('Authorization', `Bearer ${token}`);
// //       }
      
// //       return headers;
// //     },
    
// //     // Include credentials (cookies, authorization headers, etc.)
// //     credentials: 'include',
    
// //     // Handle responses
// //     responseHandler: async (response) => {
// //       if (!response.ok) {
// //         if (response.status === 401) {
// //           // Handle unauthorized - clear local storage and redirect to login
// //           localStorage.removeItem('token');
// //           localStorage.removeItem('user');
// //           window.location.href = '/login';
// //         }
// //         const error = await response.json().catch(() => ({}));
// //         throw new Error(error.message || 'API request failed');
// //       }
// //       return response.json();
// //     },
// //   }),
  
// //   tagTypes: ['Dashboard', 'Companies'],
  
// //   endpoints: (builder) => ({
// //     // Get all companies
// //     getCompanies: builder.query<Company[], void>({
// //       query: () => '/Dashboard/companies',
// //       providesTags: ['Companies'],
// //     }),
    
// //     // Get dashboard data for selected companies
// //     getDashboardData: builder.mutation<DashboardData, DashboardRequest>({
// //       query: (data) => ({
// //         url: '/Dashboard/data',
// //         method: 'POST',
// //         body: data,
// //       }),
// //       invalidatesTags: ['Dashboard'],
// //     }),
// //   }),
// // });

// // export const { useGetCompaniesQuery, useGetDashboardDataMutation } = dashboardApi;





// // // // src/store/api/dashboardApi.ts
// // // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // // export interface Company {
// // //   id: string;
// // //   name: string;
// // // }

// // // export interface DashboardMetric {
// // //   texts: string;
// // //   value: number;
// // // }

// // // export type DashboardData = Record<string, DashboardMetric[]>;

// // // export interface DashboardRequest {
// // //   companyIds: string[];
// // //   dateFrom?: string;
// // //   dateTo?: string;
// // // }

// // // export const dashboardApi = createApi({
// // //   reducerPath: 'dashboardApi',
// // //   baseQuery: fetchBaseQuery({
// // //     // baseUrl: 'http://localhost:5290/api', // Your backend URL
// // //     baseUrl: 'https://dashboard.ultsol.cloud/api', // Your backend URL
    
    
// // //     prepareHeaders: (headers) => {
// // //       headers.set('Content-Type', 'application/json');
// // //       return headers;
// // //     },
// // //   }),
// // //   tagTypes: ['Dashboard', 'Companies'],
// // //   endpoints: (builder) => ({
// // //     // Get all companies
// // //     getCompanies: builder.query<Company[], void>({
// // //       query: () => '/Dashboard/companies',
// // //       providesTags: ['Companies'],
// // //     }),
    
// // //     // Get dashboard data for selected companies
// // //     getDashboardData: builder.mutation<DashboardData, DashboardRequest>({
// // //       query: (data) => ({
// // //         url: '/Dashboard/data',
// // //         method: 'POST',
// // //         body: data,
// // //       }),
// // //       invalidatesTags: ['Dashboard'],
// // //     }),
// // //   }),
// // // });

// // // export const { useGetCompaniesQuery, useGetDashboardDataMutation } = dashboardApi;

// // src/store/api/dashboardApi.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export interface Company {
//   id: string;
//   name: string;
// }

// export interface DashboardMetric {
//   texts: string;
//   value: number;
// }

// export type DashboardData = Record<string, DashboardMetric[]>;

// export interface DashboardRequest {
//   companyIds: string[];
//   dateFrom?: string;
//   dateTo?: string;
// }

// export interface ReceivablePayableItem {
//   receiveName: string | null;
//   receivable: number | null;
//   payableName: string | null;
//   payable: number | null;
// }

// export interface CompanyReceivablePayable {
//   companyId: string;
//   companyName: string;
//   data: ReceivablePayableItem[];
//   totalReceivable: number;
//   totalPayable: number;
// }

// export interface ReceivablePayableResponse {
//   success: boolean;
//   data: CompanyReceivablePayable[];
// }

// // Helper function to get auth token
// const getAuthToken = () => localStorage.getItem('token');

// export const dashboardApi = createApi({
//   reducerPath: 'dashboardApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5290/api',
    
//     prepareHeaders: (headers) => {
//       // Set content type
//       headers.set('Content-Type', 'application/json');
      
//       // Add authorization token if exists
//       const token = getAuthToken();
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
      
//       return headers;
//     },
    
//     // Include credentials (cookies, authorization headers, etc.)
//     credentials: 'include',
    
//     // Handle responses
//     responseHandler: async (response) => {
//       if (!response.ok) {
//         if (response.status === 401) {
//           // Handle unauthorized - clear local storage and redirect to login
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           window.location.href = '/login';
//         }
//         const error = await response.json().catch(() => ({}));
//         throw new Error(error.message || 'API request failed');
//       }
//       return response.json();
//     },
//   }),
  
//   tagTypes: ['Dashboard', 'Companies', 'ReceivablePayable'],
  
//   endpoints: (builder) => ({
//     // Get all companies
//     getCompanies: builder.query<Company[], void>({
//       query: () => '/Dashboard/companies',
//       providesTags: ['Companies'],
//     }),
    
//     // Get dashboard data for selected companies
//     getDashboardData: builder.mutation<DashboardData, DashboardRequest>({
//       query: (data) => ({
//         url: '/Dashboard/data',
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Dashboard'],
//     }),
    
//     // Get receivable/payable details for companies
//     getReceivablePayableData: builder.mutation<ReceivablePayableResponse, DashboardRequest>({
//       query: (data) => ({
//         url: '/Dashboard/receivable-payable',
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['ReceivablePayable'],
//     }),
//   }),
// });

// export const { 
//   useGetCompaniesQuery, 
//   useGetDashboardDataMutation,
//   useGetReceivablePayableDataMutation 
// } = dashboardApi;
// src/store/api/dashboardApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Company {
  id: string;
  name: string;
}

export interface DashboardMetric {
  texts: string;
  value: number;
}

export type DashboardData = Record<string, DashboardMetric[]>;

export interface DashboardRequest {
  companyIds: string[];
  dateFrom?: string;
  dateTo?: string;
}

export interface ReceivablePayableItem {
  receiveName: string | null;
  receivable: number | null;
  payableName: string | null;
  payable: number | null;
}

export interface CompanyReceivablePayable {
  companyId: string;
  companyName: string;
  data: ReceivablePayableItem[];
  totalReceivable: number;
  totalPayable: number;
}

export interface ReceivablePayableResponse {
  success: boolean;
  data: CompanyReceivablePayable[];
}

export interface ClosingBalanceItem {
  id: number;
  closingBalance: number;
  name: string;
  businessType: number;
  contactNo: string | null;
}

export interface CompanyClosingBalance {
  companyId: string;
  companyName: string;
  type: number;
  typeName: string;
  data: ClosingBalanceItem[];
  totalClosingBalance: number;
}

export interface ClosingBalanceRequest {
  companyIds: string[];
  asOnDate?: string;
  type: number;
}


export const baseUrl = 'https://dashboard.ultsol.cloud/api';

// export const baseUrl = 'http://localhost:5290/api';
// Helper function to get auth token
const getAuthToken = () => localStorage.getItem('token');

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
baseQuery: fetchBaseQuery({
  // baseUrl: 'http://localhost:5290/api',
  baseUrl,
  prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      const token = getAuthToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    
    credentials: 'include',
    
    responseHandler: async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'API request failed');
      }
      return response.json();
    },
  }),
  
  tagTypes: ['Dashboard', 'Companies', 'ReceivablePayable', 'ClosingBalance'],
  
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], void>({
      query: () => '/Dashboard/companies',
      providesTags: ['Companies'],
    }),
    
    getDashboardData: builder.mutation<DashboardData, DashboardRequest>({
      query: (data) => ({
        url: '/Dashboard/data',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Dashboard'],
    }),
    
    getReceivablePayableData: builder.mutation<ReceivablePayableResponse, DashboardRequest>({
      query: (data) => ({
        url: '/Dashboard/receivable-payable',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ReceivablePayable'],
    }),
    
    getClosingBalanceData: builder.mutation<{ success: boolean; data: CompanyClosingBalance[] }, ClosingBalanceRequest>({
      query: (data) => ({
        url: '/Dashboard/closing-balance',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ClosingBalance'],
    }),
  }),
});

export const { 
  useGetCompaniesQuery, 
  useGetDashboardDataMutation,
  useGetReceivablePayableDataMutation,
  useGetClosingBalanceDataMutation
} = dashboardApi;