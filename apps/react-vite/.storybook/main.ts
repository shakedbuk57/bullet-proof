import type { StorybookConfig } from '@storybook/react-vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'msw-storybook-addon',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      viteFinal: (config) => {
        config.plugins?.push(viteTsconfigPaths());
        return config;
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
