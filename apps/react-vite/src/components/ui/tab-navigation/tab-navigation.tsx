import * as React from 'react';

import { Button } from '../button';
import { cn } from '@/utils/cn';

export type TabItem = {
  label: string;
  value: string;
};

type TabNavigationProps = {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabValue: string) => void;
  className?: string;
};

export const TabNavigation = React.forwardRef<
  HTMLDivElement,
  TabNavigationProps
>(
  (
    { tabs, activeTab, onTabChange, className },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-2 border-b border-border',
          className,
        )}
        role="tablist"
      >
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            variant={activeTab === tab.value ? 'outline' : 'ghost'}
            size="default"
            className={cn(
              'rounded-b-none border-b-2 border-b-transparent',
              activeTab === tab.value && 'border-b-primary',
            )}
            role="tab"
            aria-selected={activeTab === tab.value}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    );
  },
);

TabNavigation.displayName = 'TabNavigation';
