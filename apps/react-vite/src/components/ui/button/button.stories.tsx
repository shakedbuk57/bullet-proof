import { Meta, StoryObj } from '@storybook/react';
import { Heart, Trash2, Plus } from 'lucide-react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

const ButtonShowcase = () => (
  <div className="space-y-12 p-8">
    {/* Variants Section */}
    <div>
      <h2 className="text-2xl font-bold mb-4">Variants</h2>
      <div className="flex flex-wrap gap-4">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>

    {/* Sizes Section */}
    <div>
      <h2 className="text-2xl font-bold mb-4">Sizes</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Add">+</Button>
      </div>
    </div>

    {/* States Section */}
    <div>
      <h2 className="text-2xl font-bold mb-4">States</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <Button>Active</Button>
        <Button disabled>Disabled</Button>
        <Button isLoading disabled>
          Loading
        </Button>
      </div>
    </div>

    {/* With Icons Section */}
    <div>
      <h2 className="text-2xl font-bold mb-4">With Icons</h2>
      <div className="flex flex-wrap gap-4">
        <Button icon={<Heart className="h-4 w-4" />}>Like</Button>
        <Button variant="destructive" icon={<Trash2 className="h-4 w-4" />}>
          Delete
        </Button>
        <Button variant="secondary" icon={<Plus className="h-4 w-4" />}>
          Add Item
        </Button>
      </div>
    </div>

    {/* Combined Variants and Sizes */}
    <div>
      <h2 className="text-2xl font-bold mb-4">Variant + Size Combinations</h2>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <Button variant="default" size="sm">
            Default Small
          </Button>
          <Button variant="destructive" size="sm">
            Destructive Small
          </Button>
          <Button variant="outline" size="sm">
            Outline Small
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="default" size="lg">
            Default Large
          </Button>
          <Button variant="destructive" size="lg">
            Destructive Large
          </Button>
          <Button variant="secondary" size="lg">
            Secondary Large
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export const Default: Story = {
  render: () => <ButtonShowcase />,
};

export const DefaultVariant: Story = {
  args: {
    children: 'Default',
    variant: 'default',
    size: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
    size: 'default',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
    size: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
    size: 'default',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
    size: 'default',
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
    size: 'default',
  },
};

export const SmallSize: Story = {
  args: {
    children: 'Small',
    variant: 'default',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    children: 'Large',
    variant: 'default',
    size: 'lg',
  },
};

export const IconSize: Story = {
  args: {
    variant: 'default',
    size: 'icon',
    children: '+',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Like',
    variant: 'default',
    size: 'default',
    icon: <Heart className="h-4 w-4" />,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading',
    variant: 'default',
    size: 'default',
    isLoading: true,
    disabled: true,
  },
};

export const DestructiveWithIcon: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
    size: 'default',
    icon: <Trash2 className="h-4 w-4" />,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'default',
    size: 'default',
    disabled: true,
  },
};
