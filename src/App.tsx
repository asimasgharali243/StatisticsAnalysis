// // // src/App.tsx
// // import React from 'react';
// // import { Provider } from 'react-redux';
// // import { store } from './store/store';
// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // import { ThemeProvider } from './context/ThemeContext';
// // import { FilterProvider } from './context/FilterContext';
// // import { Layout } from './components/Layout';
// // import { Dashboard } from './pages/Dashboard';
// // import { Analytics } from './pages/Analytics';
// // import { Receivables } from './pages/Receivables';
// // import { Payables } from './pages/Payables';
// // import { Expenses } from './pages/Expenses';
// // import { Invoices } from './pages/Invoices';
// // import { Companies } from './pages/Companies';
// // import { Reports } from './pages/Reports';
// // import { Settings } from './pages/Settings';
// // import { Login } from './pages/Login';
// // export function App() {
// //   return (
// //     <Provider store={store}>
// //       <ThemeProvider>
// //         <FilterProvider>
// //           <BrowserRouter>
// //           <Routes>
// //             <Route path="/login" element={<Login />} />
// //             <Route path="/" element={<Layout />}>
// //               <Route index element={<Dashboard />} />
// //               <Route path="analytics" element={<Analytics />} />
// //               <Route path="receivables" element={<Receivables />} />
// //               <Route path="payables" element={<Payables />} />
// //               <Route path="expenses" element={<Expenses />} />
// //               <Route path="invoices" element={<Invoices />} />
// //               <Route path="companies" element={<Companies />} />
// //               <Route path="reports" element={<Reports />} />
// //               <Route path="settings" element={<Settings />} />
// //             </Route>
// //             <Route path="*" element={<Navigate to="/" replace />} />
// //           </Routes>
// //           </BrowserRouter>
// //         </FilterProvider>
// //       </ThemeProvider>
// //     </Provider>
// //   );
// // }
// // src/App.tsx
// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from './context/ThemeContext';
// import { FilterProvider } from './context/FilterContext';
// import { Layout } from './components/Layout';
// import { Dashboard } from './pages/Dashboard';
// import { Analytics } from './pages/Analytics';
// import { Sales } from './pages/Sales';
// import { Purchases } from './pages/Purchases';
// import { Receivables } from './pages/Receivables';
// import { Payables } from './pages/Payables';
// import { Expenses } from './pages/Expenses';
// import { Banks } from './pages/Banks';
// import { Invoices } from './pages/Invoices';
// import { Companies } from './pages/Companies';
// import { Reports } from './pages/Reports';
// import { Settings } from './pages/Settings';
// import { Login } from './pages/Login';

// export function App() {
//   return (
//     <Provider store={store}>
//       <ThemeProvider>
//         <FilterProvider>
//           <BrowserRouter>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/" element={<Layout />}>
//                 <Route index element={<Dashboard />} />
//                 <Route path="analytics" element={<Analytics />} />
//                 <Route path="sales" element={<Sales />} />
//                 <Route path="purchases" element={<Purchases />} />
//                 <Route path="receivables" element={<Receivables />} />
//                 <Route path="payables" element={<Payables />} />
//                 <Route path="expenses" element={<Expenses />} />
//                 <Route path="banks" element={<Banks />} />
//                 <Route path="invoices" element={<Invoices />} />
//                 <Route path="companies" element={<Companies />} />
//                 <Route path="reports" element={<Reports />} />
//                 <Route path="settings" element={<Settings />} />
//                 <Route path="*" element={<Navigate to="/" replace />} />
//               </Route>
//             </Routes>
//           </BrowserRouter>
//         </FilterProvider>
//       </ThemeProvider>
//     </Provider>
//   );
// }

// src/App.tsx - Add protected route wrapper
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FilterProvider } from './context/FilterContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Sales } from './pages/Sales';
import { Purchases } from './pages/Purchases';
import { Receivables } from './pages/Receivables';
import { Payables } from './pages/Payables';
import { Expenses } from './pages/Expenses';
import { Banks } from './pages/Banks';
import { Invoices } from './pages/Invoices';
import { Companies } from './pages/Companies';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <FilterProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="sales" element={<Sales />} />
                <Route path="purchases" element={<Purchases />} />
                <Route path="receivables" element={<Receivables />} />
                <Route path="payables" element={<Payables />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="banks" element={<Banks />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="companies" element={<Companies />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </FilterProvider>
      </ThemeProvider>
    </Provider>
  );
}