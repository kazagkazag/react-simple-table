import React, {PropTypes} from "react";
import Sorter from "./Sorter";

export default function Column({column}, {className, semantic}) {
    const props = {
        key: column.title,
        className: `${className}_th`
    };
    const Element = semantic? "th" : "div";

    if(column.onSort) {
        props.onClick = () => {
            column.onSort(column);
        };
    }

    return (
        <Element {...props}>

            {column.title}

            <Sorter
                sorted={column.sorted}
                sorterComponent={column.sorterComponent}
            />
        </Element>
    );
}

Column.propTypes = {
    column: PropTypes.object,
    className: PropTypes.string
};

Column.contextTypes = {
    className: PropTypes.string,
    semantic: PropTypes.bool
};