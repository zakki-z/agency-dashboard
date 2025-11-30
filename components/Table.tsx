import React from 'react';

interface Column<T> {
    header: string;
    accessor: keyof T;
    render?: (value: T) => React.ReactNode;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    title?: string;
}

export function Table<T extends { id: string }>({ data, columns, title }: TableProps<T>) {
    return (
        <div className="w-full bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            {title && (
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-900 uppercase font-semibold text-xs">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="px-6 py-3 border-b border-gray-200">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                                No data found.
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50 transition-colors odd:bg-white even:bg-slate-50/50">
                                {columns.map((col, idx) => (
                                    <td key={idx} className="px-6 py-4 whitespace-nowrap">
                                        {col.render ? col.render(row) : (row[col.accessor] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
