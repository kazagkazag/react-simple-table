import React, {PropTypes} from "react";
import Sorter from "./Sorter";

export default function Column({column, className}) {
    const props = {
        key: column.title,
        className
    };

    if(column.onSort) {
        props.onClick = () => {
            column.onSort(column);
        };
    }

    return (
        <th {...props}>

            {column.title}

            <Sorter
                sorted={column.sorted}
                sorterComponent={column.sorterComponent}
            />
        </th>
    );
}

Column.propTypes = {
    column: PropTypes.object,
    className: PropTypes.string
};