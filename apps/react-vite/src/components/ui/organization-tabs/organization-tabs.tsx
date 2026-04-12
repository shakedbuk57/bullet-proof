import { LucideIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils/cn';

export type OrganizationTab = {
  id: string;
  label: string;
  icon?: LucideIcon;
};

export type OrganizationTabsProps = {
  tabs: OrganizationTab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  className?: string;
};

export const OrganizationTabs = React.forwardRef<
  HTMLDivElement,
  OrganizationTabsProps
>(({ tabs, activeTabId, onTabChange, className }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-wrap gap-3', className)}
  >
    {tabs.map((tab) => {
      const Icon = tab.icon;
      const isActive = tab.id === activeTabId;

      return (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex items-center gap-2 rounded-lg px-6 py-3 transition-all duration-200',
            isActive
              ? 'border border-gray-600 bg-gray-700 text-gray-100'
              : 'border border-gray-600 text-gray-400 hover:text-gray-300 bg-transparent',
          )}
        >
          {Icon && <Icon size={20} />}
          <span className="text-sm font-medium">{tab.label}</span>
        </button>
      );
    })}
  </div>
));

OrganizationTabs.displayName = 'OrganizationTabs';
