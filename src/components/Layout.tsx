// // import React, { useState, useEffect } from 'react';
// // import { Outlet, useLocation } from 'react-router-dom';
// // import { Sidebar } from './Sidebar';
// // import { TopNav } from './TopNav';
// // import { FilterBar } from './filters/FilterBar';

// // export function Layout() {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
// //     const saved = localStorage.getItem('sidebarCollapsed');
// //     // On mobile, always start collapsed
// //     if (window.innerWidth < 768) return true;
// //     return saved === 'true';
// //   });
// //   const location = useLocation();

// //   // Close sidebar on mobile when route changes
// //   useEffect(() => {
// //     if (window.innerWidth < 768) {
// //       setSidebarOpen(false);
// //     }
// //   }, [location.pathname]);

// //   // Handle window resize - auto-collapse on mobile
// //   useEffect(() => {
// //     const handleResize = () => {
// //       if (window.innerWidth < 768) {
// //         setIsSidebarCollapsed(true);
// //         setSidebarOpen(false);
// //       }
// //     };
// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   // Don't show layout on login page
// //   if (location.pathname === '/login') {
// //     return <Outlet />;
// //   }

// //   return (
// //     <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
// //       <Sidebar 
// //         isOpen={sidebarOpen} 
// //         setIsOpen={setSidebarOpen}
// //         onCollapseChange={setIsSidebarCollapsed}
// //       />

// //       {/* Main Content - Adjust margin based on collapsed state */}
// //       <div 
// //         className={`
// //           flex-1 flex flex-col min-w-0 overflow-hidden
// //           transition-all duration-300 ease-in-out
// //           ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}
// //           ${sidebarOpen ? 'ml-0' : 'ml-0'}
// //         `}
// //       >
// //         <TopNav toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
// //         <FilterBar />

// //         <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
// //           <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// //             <Outlet />
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from 'react';
// import { Outlet, useLocation } from 'react-router-dom';
// import { Sidebar } from './Sidebar';
// import { TopNav } from './TopNav';
// import { FilterBar } from './filters/FilterBar';

// export function Layout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
//     const saved = localStorage.getItem('sidebarCollapsed');
//     // On mobile, always start collapsed
//     if (window.innerWidth < 768) return true;
//     return saved === 'true';
//   });
//   const location = useLocation();

//   // Close sidebar on mobile when route changes
//   useEffect(() => {
//     if (window.innerWidth < 768) {
//       setSidebarOpen(false);
//     }
//   }, [location.pathname]);

//   // Handle window resize - auto-collapse on mobile
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarCollapsed(true);
//         setSidebarOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Don't show layout on login page
//   if (location.pathname === '/login') {
//     return <Outlet />;
//   }

//   // Calculate margin based on sidebar state
//   const getMainMargin = () => {
//     if (window.innerWidth < 768) {
//       return 'ml-0'; // No margin on mobile, sidebar slides in
//     }
//     return isSidebarCollapsed ? 'ml-16' : 'ml-64';
//   };

//   return (
//     <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
//       <Sidebar 
//         isOpen={sidebarOpen} 
//         setIsOpen={setSidebarOpen}
//         onCollapseChange={setIsSidebarCollapsed}
//       />

//       {/* Main Content */}
//       <div className={`flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300 ease-in-out ${getMainMargin()}`}>
//         <TopNav toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <FilterBar />

//         <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
//           <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { FilterBar } from './filters/FilterBar';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    // On mobile, always start collapsed
    if (window.innerWidth < 768) return true;
    return saved === 'true';
  });
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  // Handle window resize - auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't show layout on login page
  if (location.pathname === '/login') {
    return <Outlet />;
  }

  // Calculate margin based on sidebar state and screen size
  const getMainMargin = () => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      return 'ml-0'; // No margin on mobile, sidebar slides over content
    }
    
    // Desktop: adjust based on collapsed state
    return isSidebarCollapsed ? 'ml-16' : 'ml-64';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        onCollapseChange={setIsSidebarCollapsed}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300 ease-in-out ${getMainMargin()}`}>
        <TopNav toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <FilterBar />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Remove max-w-7xl for full width, keep mx-auto only for centering if needed */}
          <div className="w-full space-y-4 sm:space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}