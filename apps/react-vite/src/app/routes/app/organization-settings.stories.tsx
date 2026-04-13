import { Meta, StoryObj } from '@storybook/react';

import OrganizationSettingsRoute from './organization-settings';

const meta: Meta<typeof OrganizationSettingsRoute> = {
  component: OrganizationSettingsRoute,
  title: 'Routes/App/OrganizationSettings',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof OrganizationSettingsRoute>;

export const Default: Story = {};
