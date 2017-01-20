import React, {PropTypes} from "react";

export default function Head({columns = [], sorterComponent}, {className}) {
    const headClassName = `${className}-head`;

    return (
        <thead className={headClassName}>
        <tr>
            {renderColumns(columns, sorterComponent)}
        </tr>
        </thead>
    );
}

Head.propTypes = {
    columns: PropTypes.array,
    sorterComponent: PropTypes.func
};

Head.contextTypes = {
    className: PropTypes.string
};

function renderColumns(columns, sorterComponent) {
    return columns.map(column => {
        column.sorterComponent = sorterComponent;
        return renderColumn(column);
    });
}

function renderColumn(column) {
    return (
        <th key={column.title}>
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