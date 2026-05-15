// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   BarChart3,
//   ArrowDownToLine,
//   ArrowUpFromLine,
//   Receipt,
//   FileText,
//   Building2,
//   FileSpreadsheet,
//   Settings,
//   TrendingUp,
//   ShoppingCart,
//   Wallet,
//   X,
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';

// interface SidebarProps {
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
//   onCollapseChange?: (collapsed: boolean) => void;
// }

// const navItems = [
//   { name: 'Dashboard', path: '/', icon: LayoutDashboard },
//   { name: 'Analytics', path: '/analytics', icon: BarChart3 },
//   { name: 'Sales', path: '/sales', icon: TrendingUp },
//   { name: 'Purchases', path: '/purchases', icon: ShoppingCart },
//   { name: 'Receivables', path: '/receivables', icon: ArrowDownToLine },
//   { name: 'Payables', path: '/payables', icon: ArrowUpFromLine },
//   { name: 'Expenses', path: '/expenses', icon: Receipt },
//   { name: 'Banks', path: '/banks', icon: Wallet },
//   { name: 'Invoices', path: '/invoices', icon: FileText },
//   { name: 'Companies', path: '/companies', icon: Building2 },
//   { name: 'Reports', path: '/reports', icon: FileSpreadsheet },
//   { name: 'Settings', path: '/settings', icon: Settings },
// ];

// export function Sidebar({ isOpen, setIsOpen, onCollapseChange }: SidebarProps) {
//   const [isCollapsed, setIsCollapsed] = useState(() => {
//     // On mobile, show icons only (collapsed but visible)
//     if (window.innerWidth < 768) return true;
//     const saved = localStorage.getItem('sidebarCollapsed');
//     return saved === 'true';
//   });

//   useEffect(() => {
//     localStorage.setItem('sidebarCollapsed', String(isCollapsed));
//     onCollapseChange?.(isCollapsed);
//   }, [isCollapsed, onCollapseChange]);

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   // Close sidebar when clicking a link on mobile
//   const handleLinkClick = () => {
//     if (window.innerWidth < 768) {
//       setIsOpen(false);
//     }
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar - Always visible on desktop, slide-in on mobile */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
//           transition-all duration-300 ease-in-out
//           ${isCollapsed ? 'w-16' : 'w-64'}
//           ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
//         `}
//       >
//         {/* Header */}
//         <div className="h-16 flex items-center justify-between px-3 border-b border-slate-200 dark:border-slate-800">
//           {!isCollapsed ? (
//             <div className="flex items-center gap-2 text-brand-600 dark:text-brand-500 font-bold text-xl">
//               <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
//                 <BarChart3 size={20} />
//               </div>
//               <span className="whitespace-nowrap hidden sm:inline">FinDash</span>
//               <span className="whitespace-nowrap sm:hidden">FD</span>
//             </div>
//           ) : (
//             <div className="w-full flex justify-center">
//               <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
//                 <BarChart3 size={20} />
//               </div>
//             </div>
//           )}
//           <button
//             className="md:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
//             onClick={() => setIsOpen(false)}
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Navigation Items */}
//         <div className="py-4 px-2 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.path}
//               onClick={handleLinkClick}
//               className={({ isActive }) => `
//                 flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
//                 ${isActive 
//                   ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400' 
//                   : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
//                 }
//                 ${isCollapsed ? 'justify-center' : ''}
//               `}
//               title={isCollapsed ? item.name : ''}
//             >
//               <item.icon size={18} />
//               {!isCollapsed && <span>{item.name}</span>}
//             </NavLink>
//           ))}
//         </div>

//         {/* Collapse Toggle Button - Hide on mobile */}
//         <div className="absolute bottom-4 left-0 right-0 px-2 hidden md:block">
//           <button
//             onClick={toggleCollapse}
//             className={`
//               w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
//               text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800
//               hover:text-slate-900 dark:hover:text-slate-200 transition-colors
//               ${isCollapsed ? 'justify-center' : ''}
//             `}
//             title={isCollapsed ? 'Expand' : 'Collapse'}
//           >
//             {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
//             {!isCollapsed && <span>Collapse Menu</span>}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  ArrowDownToLine,
  ArrowUpFromLine,
  Receipt,
  FileText,
  Building2,
  FileSpreadsheet,
  Settings,
  TrendingUp,
  ShoppingCart,
  Wallet,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onCollapseChange?: (collapsed: boolean) => void;
}

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Companies', path: '/companies', icon: Building2 },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Sales', path: '/sales', icon: TrendingUp },
  { name: 'Purchases', path: '/purchases', icon: ShoppingCart },
  { name: 'Receivables', path: '/receivables', icon: ArrowDownToLine },
  { name: 'Payables', path: '/payables', icon: ArrowUpFromLine },
  { name: 'Expenses', path: '/expenses', icon: Receipt },
  { name: 'Banks', path: '/banks', icon: Wallet },
  { name: 'Invoices', path: '/invoices', icon: FileText },
  { name: 'Reports', path: '/reports', icon: FileSpreadsheet },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar({ isOpen, setIsOpen, onCollapseChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // On mobile, show icons only (collapsed but visible)
    if (window.innerWidth < 768) return true;
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(isCollapsed));
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Close sidebar when clicking a link on mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-3 border-b border-slate-200 dark:border-slate-800">
          {!isCollapsed ? (
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-500 font-bold text-xl">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                <BarChart3 size={20} />
              </div>
              <span className="whitespace-nowrap hidden sm:inline">FinDash</span>
              <span className="whitespace-nowrap sm:hidden">FD</span>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                <BarChart3 size={20} />
              </div>
            </div>
          )}
          <button
            className="md:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="py-4 px-2 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={handleLinkClick}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
              title={isCollapsed ? item.name : ''}
            >
              <item.icon size={18} />
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>

        {/* Collapse Toggle Button - Hide on mobile */}
        <div className="absolute bottom-4 left-0 right-0 px-2 hidden md:block">
          <button
            onClick={toggleCollapse}
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
              text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800
              hover:text-slate-900 dark:hover:text-slate-200 transition-colors
              ${isCollapsed ? 'justify-center' : ''}
            `}
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!isCollapsed && <span>Collapse Menu</span>}
          </button>
        </div>
      </aside>
    </>
  );
}