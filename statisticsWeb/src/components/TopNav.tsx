import React, { useEffect, useState, useRef } from 'react';
import { Menu, Moon, Sun, Bell, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useFilters } from '../context/FilterContext';
import { useGetCompaniesQuery } from '../store/api/dashboardApi';

interface TopNavProps {
  toggleSidebar: () => void;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

export function TopNav({ toggleSidebar }: TopNavProps) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const {
    selectedCompanies,
    toggleCompany,
    selectAllCompanies,
    clearCompanies
  } = useFilters();
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  
  const { data: apiCompanies, isLoading: companiesLoading } = useGetCompaniesQuery();
  const companies = apiCompanies || [];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserInfo({
          firstName: parsed.firstName || parsed.firstName,
          lastName: parsed.lastName || parsed.lastName,
          email: parsed.email || parsed.email
        });
      } catch (e) {
        console.error('Failed to parse user info:', e);
      }
    }
  }, []);

  const getUserInitials = () => {
    return `${userInfo.firstName.charAt(0)}${userInfo.lastName.charAt(0)}`.toUpperCase();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCompanyDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

 
  const selectedCount = selectedCompanies.length;
  const isAllSelected = companies.length > 0 && selectedCount === companies.length;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleProfileClick = () => {
    setIsUserDropdownOpen(false);
    navigate('/settings');
  };

  const handleSettingsClick = () => {
    setIsUserDropdownOpen(false);
    navigate('/settings');
  };

  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1'];

  return (
    <header className="h-14 sm:h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-3 sm:px-6 sticky top-0 z-30">
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        <button
          onClick={toggleSidebar}
          className="p-1.5 sm:p-2 -ml-1 sm:-ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Company Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="hidden sm:inline">
              {companiesLoading ? 'Loading...' : (isAllSelected ? 'All Companies' : `${selectedCount} Selected`)}
            </span>
            <span className="sm:hidden">
              {companiesLoading ? '...' : (isAllSelected ? 'All' : selectedCount)}
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform ${isCompanyDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCompanyDropdownOpen && !companiesLoading && (
            <div className="absolute top-full left-0 mt-2 w-56 sm:w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-2 z-50">
              <div className="px-3 pb-2 mb-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                <button
                  onClick={() => selectAllCompanies(companies.map(c => c.id))}
                  className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Select All
                </button>
                <button
                  onClick={clearCompanies}
                  className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:underline"
                >
                  Clear
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {companies.map((company, index) => {
                  const isSelected = selectedCompanies.includes(company.id);
                  return (
                    <button
                      key={company.id}
                      onClick={() => toggleCompany(company.id)}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-left"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-brand-600 border-brand-600 text-white' : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && <Check size={12} />}
                      </div>
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: colors[index % colors.length] }} />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                        {company.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Section - Title (Hidden on very small screens) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:block">
        <h1 className="text-sm sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent dark:from-brand-400 dark:to-brand-300">
       Group Of Companies Dashboard
        </h1>
        <p className="text-[8px] sm:text-[10px] text-slate-400 dark:text-slate-500 text-center hidden md:block">
          Multi-Company Analytics Dashboard
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 sm:gap-4 flex-1 justify-end">
        <button
          onClick={toggleTheme}
          className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={16} className="sm:w-5 sm:h-5" /> : <Moon size={16} className="sm:w-5 sm:h-5" />}
        </button>

        <button className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 relative hidden sm:block">
          <Bell size={16} className="sm:w-5 sm:h-5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
        </button>

        {/* User Avatar with Dropdown */}
        <div className="relative" ref={userDropdownRef}>
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center gap-1 focus:outline-none"
            aria-label="User menu"
          >
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm shadow-md">
              {getUserInitials()}
            </div>
            <ChevronDown
              size={12}
              className={`text-slate-400 transition-transform hidden sm:block ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isUserDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {userInfo.firstName} {userInfo.lastName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {userInfo.email}
                </p>
              </div>
              
              <div className="py-1">
                <button 
                  onClick={handleProfileClick}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </button>
                <button 
                  onClick={handleSettingsClick}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </button>
              </div>
              
              <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}