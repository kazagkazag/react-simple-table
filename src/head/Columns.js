import React, {PropTypes} from "react";
import Column from "./Column";
import sid from "shortid";

export default function Columns({columns, sorterComponent, onSort}) {
    return (
        <tr>
            {getColumns(columns, sorterComponent, onSort)}
        </tr>
    );
}

function getColumns(columns, sorterComponent, onSort) {
    return columns && columns.length ? columns.map(column => {

            column.sorterComponent = sorterComponent;
            column.onSort = onSort;

            return (
                <Column
                    key={sid.generate()}
                    column={column}
                />
            );

        }) : null;
}

Columns.propTypes = {
    columns: PropTypes.array,
    sorterComponent: PropTypes.func,
    onSort: PropTypes.func
};