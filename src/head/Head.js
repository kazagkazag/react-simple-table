import React, {PropTypes} from "react";

export default function Head({columns = [], sorterComponent, onSort}, {className}) {
    const headClassName = `${className}-head`;

    return (
        <thead className={headClassName}>
        <tr>
            {renderColumns(columns, sorterComponent, onSort)}
        </tr>
        </thead>
    );
}

Head.propTypes = {
    columns: PropTypes.array,
    sorterComponent: PropTypes.func,
    onSort: PropTypes.func
};

Head.contextTypes = {
    className: PropTypes.string
};

function renderColumns(columns, sorterComponent, onSort) {
    return columns.map(column => {
        column.sorterComponent = sorterComponent;
        column.onSort = onSort;
        return renderColumn(column);
    });
}

function renderColumn(column) {
    const props = {
        key: column.title
    };

    if(column.onSort) {
        props.onClick = () => {
            column.onSort(column);
        };
    }

    return (
        <th {...props}>
            {column.title}
            {renderSorter(column.sorted, column.sorterComponent)}
        </th>
    );
}

function renderSorter(sorted, sorterComponent) {
    return sorted ? renderSorterComponent(sorted, sorterComponent) : null;
}

function renderSorterComponent(sorted, sorterComponent) {
    return sorterComponent ? sorterComponent(sorted) : (
        <span className={`sorter sorted-${sorted.toLowerCase()}`} />
    );
}