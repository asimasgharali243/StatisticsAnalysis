import React from 'react';
import {
  FileSpreadsheet,
  FileText,
  Download,
  Calendar,
  Building2 } from
'lucide-react';
export function Reports() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Report Generation
        </h1>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
          Configure Report
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Report Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="relative flex cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm focus:outline-none hover:border-brand-500 dark:hover:border-brand-500">
                <input
                  type="radio"
                  name="report-type"
                  className="sr-only"
                  defaultChecked />
                
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-slate-900 dark:text-white">
                      Profit & Loss
                    </span>
                    <span className="mt-1 flex items-center text-sm text-slate-500 dark:text-slate-400">
                      Comprehensive P&L statement
                    </span>
                  </span>
                </span>
                <div className="absolute top-4 right-4 text-brand-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd" />
                    
                  </svg>
                </div>
              </label>

              <label className="relative flex cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm focus:outline-none hover:border-brand-500 dark:hover:border-brand-500">
                <input type="radio" name="report-type" className="sr-only" />
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-slate-900 dark:text-white">
                      Balance Sheet
                    </span>
                    <span className="mt-1 flex items-center text-sm text-slate-500 dark:text-slate-400">
                      Assets, liabilities, equity
                    </span>
                  </span>
                </span>
              </label>

              <label className="relative flex cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm focus:outline-none hover:border-brand-500 dark:hover:border-brand-500">
                <input type="radio" name="report-type" className="sr-only" />
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-slate-900 dark:text-white">
                      Cash Flow
                    </span>
                    <span className="mt-1 flex items-center text-sm text-slate-500 dark:text-slate-400">
                      Inflows and outflows
                    </span>
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <Calendar size={16} /> Date Range
              </label>
              <select className="input-field">
                <option>This Year</option>
                <option>Last Year</option>
                <option>This Quarter</option>
                <option>Last Quarter</option>
                <option>Custom Range...</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <Building2 size={16} /> Companies
              </label>
              <select className="input-field">
                <option>All Selected Companies</option>
                <option>Consolidated View</option>
                <option>Individual Breakdowns</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex gap-4">
            <button className="btn-primary flex-1 flex items-center justify-center gap-2 py-3">
              <FileText size={18} /> Generate PDF
            </button>
            <button className="btn-secondary flex-1 flex items-center justify-center gap-2 py-3">
              <FileSpreadsheet size={18} /> Export Excel
            </button>
            <button className="btn-secondary flex-1 flex items-center justify-center gap-2 py-3">
              <Download size={18} /> Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>);

}