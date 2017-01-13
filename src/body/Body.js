import React, {PropTypes} from "react";
import sid from "shortid";

export default function Body({data = [], columns = []}) {
    const dataInOrderFromColumns = data.map(row => {
        return columns.map(column => {
            return row[column.source];
        });
    });

    return (
        <tbody>
            {renderRows(dataInOrderFromColumns)}
        </tbody>
    );
}

Body.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
};

function renderRows(rows) {
    return rows.map(renderRow);
}

function renderRow(row) {
    const cells = Object.entries(row).map(renderCell);

    return (
        <tr key={sid.generate()}>
            {cells}
        </tr>
    );
}

function renderCell([key, value]) {
    return (
        <td key={key}>
            {value}
        </td>
    );
}