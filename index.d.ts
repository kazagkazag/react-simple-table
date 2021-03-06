// Type definitions for React Simple Table
// Project: React Simple Table
// Definitions by: Kamil Zagrabski

import * as React from "react";

interface Column {
    title: string;
    field: string;
    sorderd?: string;
    isSortable?: boolean;
    component?: (row: any, toggleDetails: () => void) => any;
    absoluteWidth?: number;
    headerComponent?: (title: any, sorter: any) => any;
}

interface TableProps {
    columns?: Column[];
    data?: any[];
    className?: string;
    details?: (clickedRow: any) => any; 
    sorterComponent?: (sortingIndicator: any) => any; 
    maxHeight?: string;
    onScrollToBottom?: (event: any) => any;
    onSort?: (clickedColumn: any) => any;
    onReorder?: (sourceColumnTitle: string, targetColumntTitle: string) => void; 
    semantic?: boolean;
    detailsInlined?: boolean;
    bodyWrapper?: (body: any) => any;
    rowWrapper?: (row: any, cells: any) => any;
    onRowClick?: (clickedRow: any, event: any) => void;
}

declare class Table extends React.Component<TableProps, any> {
}

export default Table;