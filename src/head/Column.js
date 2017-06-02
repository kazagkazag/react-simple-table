import React, {PropTypes} from "react";
import Sorter from "./Sorter";
import addClassName from "../enhancements/addClassName";
import provideCorrectDOMNode from "../enhancements/provideCorrectDOMNode";

export function Column({column, className, Element}) {
    const props = {
        key: column.title,
        className
    };

    return (
        <Element {...props}>
            {column.title}
            {renderSorter(column)}
        </Element>
    );
}

function renderSorter(column) {
    return column.isSortable ? (
        <Sorter
            onClick={() => onColumnClick(column)}
            sorted={column.sorted}
            sorterComponent={column.sorterComponent}
        />
    ) : null;
}

function onColumnClick(column) {
    if (column.onSort) {
        column.onSort(column);
    }
}

Column.propTypes = {
    column: PropTypes.object,
    className: PropTypes.string,
    Element: PropTypes.string
};

export default provideCorrectDOMNode("th")(
    addClassName("_th")(Column)
);