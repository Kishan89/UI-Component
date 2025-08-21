import type { Meta, StoryObj } from '@storybook/react';
import DataTable from './DataTable';
import type { Column } from './DataTable';
interface User {
  id: number;
  name: string;
  age: number;
  city: string;
}

const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', age: 28, city: 'New York' },
  { id: 2, name: 'Bob Smith', age: 34, city: 'London' },
  { id: 3, name: 'Charlie Brown', age: 45, city: 'Paris' },
  { id: 4, name: 'Diana Miller', age: 22, city: 'Tokyo' },
  { id: 5, name: 'Ethan Hunt', age: 38, city: 'Berlin' },
];

const mockColumns: Column<User>[] = [
  { key: 'col1', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'col2', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'col3', title: 'City', dataIndex: 'city', sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    selectable: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockUsers,
    columns: mockColumns,
  },
};

export const Selectable: Story = {
  args: {
    data: mockUsers,
    columns: mockColumns,
    selectable: true,
  },
};

export const LoadingState: Story = {
  args: {
    data: [],
    columns: mockColumns,
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: mockColumns,
  },
};
