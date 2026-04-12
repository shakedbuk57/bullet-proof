import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrganizationSettings } from './organization-settings';

const meta: Meta<typeof OrganizationSettings> = {
  title: 'Features/Organization/OrganizationSettings',
  component: OrganizationSettings,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof OrganizationSettings>;

export const Default: Story = {
  args: {
    organizationName: 'Git Org 1',
  },
};

export const DifferentOrganization: Story = {
  args: {
    organizationName: 'Acme Corporation',
  },
};
