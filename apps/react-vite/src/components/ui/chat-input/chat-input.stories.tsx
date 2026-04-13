import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatInput } from './chat-input';

const meta: Meta<typeof ChatInput> = {
  title: 'Components/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'Ask Anything?',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
  args: {
    placeholder: 'Ask Anything?',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: 'Hello, this is a test message',
    disabled: false,
  },
};

export const WithCallback: Story = {
  args: {
    disabled: false,
  },
  decorators: [
    (Story) => {
      const handleSubmit = (message: string) => {
        console.log('Message submitted:', message);
        alert(`Message: ${message}`);
      };

      const handleIconClick = (iconName: string) => {
        console.log('Icon clicked:', iconName);
      };

      return (
        <ChatInput
          placeholder="Ask Anything?"
          onSubmit={handleSubmit}
          onIconClick={handleIconClick}
        />
      );
    },
  ],
};
