import React, {PropTypes} from "react";
import Sorter from "./Sorter";

export default function Column({column}) {
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

            <Sorter
                sorted={column.sorted}
                sorterComponent={column.sorterComponent}
            />
        </th>
    );
}

Column.propTypes = {
    column: PropTypes.object
};