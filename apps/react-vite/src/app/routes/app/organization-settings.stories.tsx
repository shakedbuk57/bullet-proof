import type { Meta, StoryObj } from '@storybook/react-vite';
import OrganizationSettingsRoute from './organization-settings';

const meta: Meta<typeof OrganizationSettingsRoute> = {
  title: 'Routes/OrganizationSettings',
  component: OrganizationSettingsRoute,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof OrganizationSettingsRoute>;

export const Default: Story = {};
