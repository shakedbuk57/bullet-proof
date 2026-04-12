import type { Meta, StoryObj } from '@storybook/react-vite';

import { AskAnything } from './ask-anything';

const meta: Meta<typeof AskAnything> = {
  component: AskAnything,
  title: 'UI/AskAnything',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AskAnything>;

export const Default: Story = {
  render: () => (
    <div className="bg-black min-h-screen p-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <AskAnything
          onSubmit={(message) => console.log('Submitted:', message)}
          onAttachmentClick={() => console.log('Attachment clicked')}
          onLinkClick={() => console.log('Link clicked')}
          onImageClick={() => console.log('Image clicked')}
          onVoiceClick={() => console.log('Voice clicked')}
          onMenuClick={() => console.log('Menu clicked')}
        />
      </div>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="bg-black min-h-screen p-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <AskAnything
          onSubmit={(message) => console.log('Submitted:', message)}
          onAttachmentClick={() => console.log('Attachment clicked')}
          onLinkClick={() => console.log('Link clicked')}
          onImageClick={() => console.log('Image clicked')}
          onVoiceClick={() => console.log('Voice clicked')}
          onMenuClick={() => console.log('Menu clicked')}
        />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="bg-black min-h-screen p-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <AskAnything disabled />
      </div>
    </div>
  ),
};

export const CustomPlaceholder: Story = {
  render: () => (
    <div className="bg-black min-h-screen p-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <AskAnything
          placeholder="What would you like to know?"
          onSubmit={(message) => console.log('Submitted:', message)}
        />
      </div>
    </div>
  ),
};
