import React, {PropTypes} from "react";

import Sorter from "./Sorter";

import addClassName from "../enhancements/addClassName";
import provideCorrectDOMNode from "../enhancements/provideCorrectDOMNode";

export function Column({column, className, Element}) {
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
    className: PropTypes.string,
    Element: PropTypes.string
};

export default provideCorrectDOMNode("th")(
    addClassName("_th")(Column)
);