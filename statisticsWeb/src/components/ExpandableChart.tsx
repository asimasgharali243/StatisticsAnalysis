import React, { useState, useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';

interface ExpandableChartProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ExpandableChart({ title, children, className = '' }: ExpandableChartProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [key, setKey] = useState(0);

  const handleExpand = () => {
    setKey(prev => prev + 1);
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  // Clone the child with isExpanded prop and new key to force re-render
  const enhancedChild = React.isValidElement(children)
    ? React.cloneElement(children, {
        isExpanded: isExpanded,
        key: key,
      } as any)
    : children;

  return (
    <>
      {/* Normal view - click to expand */}
      <div 
        className={`relative cursor-pointer group ${className}`}
        onClick={handleExpand}
      >
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-md text-slate-500 hover:text-brand-600"
            onClick={(e) => {
              e.stopPropagation();
              handleExpand();
            }}
          >
            <Maximize2 size={16} />
          </button>
        </div>
        {children}
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div 
            className="relative w-[95vw] h-[85vh] bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex-shrink-0">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Content - Ensure proper sizing for charts */}
            <div className="flex-1 p-4 min-h-0">
              <div className="w-full h-full">
                {enhancedChild}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}