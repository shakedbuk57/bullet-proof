import * as React from 'react';

type OrganizationHeaderProps = {
  organizationName: string;
};

export const OrganizationHeader = ({
  organizationName,
}: OrganizationHeaderProps) => {
  return (
    <div className="mb-6 border-b border-input pb-6">
      <div className="mb-2 text-sm text-muted-foreground">
        Organization
      </div>
      <h2 className="text-2xl font-semibold text-foreground">
        {organizationName}
      </h2>
    </div>
  );
};
