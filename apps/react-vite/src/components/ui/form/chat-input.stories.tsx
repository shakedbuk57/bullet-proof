import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './chat-input';
import React from 'react';

const meta: Meta<typeof ChatInput> = {
  title: 'Components/UI/Form/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'centered',
  },
  args: {
    onSendMessage: (message: string) => console.log('Message sent:', message),
    onFileClick: () => console.log('File clicked'),
    onImageClick: () => console.log('Image clicked'),
    onDrawingClick: () => console.log('Drawing clicked'),
    onVoiceClick: () => console.log('Voice clicked'),
    onEmojiClick: () => console.log('Emoji clicked'),
  },
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
  args: {
    placeholder: 'Ask Anything?',
    isLoading: false,
    disabled: false,
  },
};

export const WithText: Story = {
  args: {
    placeholder: 'Ask Anything?',
    isLoading: false,
    disabled: false,
  },
  decorators: [
    (Story: React.ComponentType) => {
      const [message, setMessage] = React.useState('Tell me about this product');
      return <Story />;
    },
  ],
};

export const Loading: Story = {
  args: {
    placeholder: 'Ask Anything?',
    isLoading: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Ask Anything?',
    isLoading: false,
    disabled: true,
  },
};

