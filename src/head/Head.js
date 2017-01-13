import React, {PropTypes} from "react";

export default function Head({columns = []}, {className}) {
    const headClassName = `${className}-head`;

    return (
        <thead className={headClassName}>
            <tr>
                {renderColumns(columns)}
            </tr>
        </thead>
    );
}

Head.propTypes = {
    columns: PropTypes.array
};

Head.contextTypes = {
    className: PropTypes.string
};

function renderColumns(columns) {
    return columns.map(renderColumn);
}

function renderColumn(column) {
    return (
        <th key={column.title}>
            {column.title}
        </th>
    );
}