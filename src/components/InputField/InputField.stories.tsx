import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    clearable: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'password'] },
    value: { control: false },
    onChange: { control: false },
    onClear: { control: false },
    errorMessage: { control: false },
    helperText: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveStoryWrapper = (args: any) => {
  const [value, setValue] = useState('');
  return (
    <div className="w-[300px]">
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    </div>
  );
};

export const Default: Story = {
  render: InteractiveStoryWrapper,
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: "We'll never share your email.",
    clearable: true,
  },
};

export const Password: Story = {
  render: InteractiveStoryWrapper,
  args: {
    label: 'Password',
    placeholder: 'Enter a secure password',
    type: 'password',
  },
};

export const Invalid: Story = {
  render: InteractiveStoryWrapper,
  args: {
    label: 'Username',
    placeholder: 'Username is not available',
    invalid: true,
    errorMessage: 'Username is not available.',
  },
};

export const Disabled: Story = {
  render: InteractiveStoryWrapper,
  args: {
    label: 'Username',
    placeholder: 'username',
    disabled: true,
    helperText: 'This field is disabled.',
  },
};

export const Loading: Story = {
  args: {
    label: 'Fetching data',
    placeholder: 'Loading...',
    loading: true,
    disabled: true,
  },
};

export const FilledVariant: Story = {
  render: InteractiveStoryWrapper,
  args: {
    label: 'First Name',
    placeholder: 'John',
    variant: 'filled',
  },
};

export const GhostVariant: Story = {
  render: InteractiveStoryWrapper,
  args: {
    label: 'Last Name',
    placeholder: 'Doe',
    variant: 'ghost',
  },
};

export const LargeSize: Story = {
  render: InteractiveStoryWrapper,
  args: {
    label: 'Search',
    placeholder: 'Search...',
    size: 'lg',
  },
};

export const SmallSize: Story = {
  render: InteractiveStoryWrapper,
  args: {
    label: 'Tag',
    placeholder: 'Enter a tag',
    size: 'sm',
  },
};
