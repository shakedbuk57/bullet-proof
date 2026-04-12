import * as React from 'react';

import { Button } from '@/components/ui/button';

type Tab = 'integrations' | 'users';

type OrganizationTabsProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

const TABS: { id: Tab; label: string }[] = [
  { id: 'integrations', label: 'Integrations' },
  { id: 'users', label: 'Users' },
];

export const OrganizationTabs = ({
  activeTab,
  onTabChange,
}: OrganizationTabsProps) => {
  return (
    <div className="mb-6 flex gap-2 border-b border-input pb-4">
      {TABS.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
