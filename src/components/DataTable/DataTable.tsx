import { useState, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';

// Props Interfaces
export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

// Function to sort data
const sortData = <T extends {}>(
  data: T[],
  key: keyof T,
  sortDirection: 'asc' | 'desc'
): T[] => {
  return [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
};

const DataTable = <T extends {}>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const sortedData = useMemo(() => {
    if (sortConfig.key) {
      return sortData(data, sortConfig.key, sortConfig.direction);
    }
    return data;
  }, [data, sortConfig]);

  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleRowSelect = (row: T) => {
    if (!selectable) return;

    const isSelected = selectedRows.includes(row);
    const newSelectedRows = isSelected
      ? selectedRows.filter((r) => r !== row)
      : [...selectedRows, row];

    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const spinnerVariants: Variants = {
    spin: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: 'linear',
      },
    },
  };

  const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  if (loading) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center p-8 text-gray-500 bg-gray-50 rounded-lg shadow-inner"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <motion.svg
          className="h-8 w-8 text-gray-400 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          variants={spinnerVariants}
          animate="spin"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.418 10h.582M18 9a3 3 0 01-3 3h-2a3 3 0 01-3-3m0-1a1 1 0 00-1-1H9a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1z"
          />
          <circle cx="12" cy="12" r="10" stroke="#E2E8F0" strokeWidth="4" />
          <path fill="#4A90E2" d="M12 2A10 10 0 002 12h4a6 6 0 0112 0h4a10 10 0 00-10-10z" />
        </motion.svg>
        <p className="text-xl font-medium text-gray-600">Loading data...</p>
      </motion.div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center p-8 text-gray-500 bg-gray-50 rounded-lg shadow-inner"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <svg
          className="h-10 w-10 text-gray-400 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-lg font-medium">No data available.</p>
      </motion.div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-2xl rounded-xl font-sans bg-surface p-2">
      <table className="w-full text-sm text-left text-primary">
        <thead className="text-xs font-semibold uppercase text-white bg-gray-900 rounded-lg">
          <tr>
            {selectable && (
              <th scope="col" className="p-4 rounded-tl-xl">
                <span className="sr-only">Select</span>
              </th>
            )}
            {columns.map((column, index) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-4 transition-all duration-200 ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-700' : ''
                } ${index === columns.length - 1 ? 'rounded-tr-xl' : ''}`}
                onClick={() => column.sortable && handleSort(column.dataIndex)}
              >
                <div className="flex items-center">
                  {column.title}
                  {column.sortable && (
                    <span className="ml-2">
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          sortConfig.key === column.dataIndex
                            ? 'text-white'
                            : 'text-gray-400'
                        } ${
                          sortConfig.key === column.dataIndex &&
                          sortConfig.direction === 'desc'
                            ? 'rotate-180'
                            : ''
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 10l5 5 5-5z" />
                      </svg>
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-gray-200 transition-all duration-200 ${
                selectable ? 'cursor-pointer' : ''
              } ${
                selectable && selectedRows.includes(row)
                  ? 'bg-purple-100/50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleRowSelect(row)}
            >
              {selectable && (
                <td className="w-4 p-4">
                  <input
                    id={`checkbox-table-${rowIndex}`}
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                    checked={selectedRows.includes(row)}
                    readOnly
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 font-medium text-gray-900">
                  {String(row[column.dataIndex] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
