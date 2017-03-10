import React, {PropTypes} from "react";
import Column from "./Column";
import sid from "shortid";
import addClassName from "../enhacements/addClassName";

export function Columns(props) {
    return (
        <tr className={props.className}>
            {getColumns(props)}
        </tr>
    );
}

function getColumns(columnsDefinitions) {
    const {
        columns,
        sorterComponent,
        onSort,
        columnClassName
    } = columnsDefinitions;

    return columns && columns.length ? columns.map(column => {

            column.sorterComponent = sorterComponent;
            column.onSort = onSort;

            return (
                <Column
                    className={columnClassName}
                    key={sid.generate()}
                    column={column}
                />
            );

        }) : null;
}

Columns.propTypes = {
    columns: PropTypes.array,
    sorterComponent: PropTypes.func,
    onSort: PropTypes.func,
    columnClassName: PropTypes.string,
    className: PropTypes.string
};

export default addClassName("_head-row")(Columns);