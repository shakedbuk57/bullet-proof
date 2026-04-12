import { Meta, StoryObj } from '@storybook/react-vite';
import { ChatInput } from './chat-input';

const meta: Meta<typeof ChatInput> = {
  title: 'UI/Form/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="dark" style={{ 
        width: '600px',
        background: 'hsl(222.2 84% 4.9%)',
        color: 'hsl(210 40% 98%)',
        padding: '20px',
        borderRadius: '8px',
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
  args: {
    onSendMessage: (message) => console.log('Message sent:', message),
    onFileClick: () => console.log('File clicked'),
    onImageClick: () => console.log('Image clicked'),
    onDrawingClick: () => console.log('Drawing clicked'),
    onVoiceClick: () => console.log('Voice clicked'),
    onEmojiClick: () => console.log('Emoji clicked'),
    placeholder: 'Ask Anything?',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: 'Type your message here...',
  },
};
