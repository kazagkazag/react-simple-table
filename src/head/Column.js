import React, {PropTypes} from "react";
import Sorter from "./Sorter";
import addClassName from "../enhancements/addClassName";
import provideCorrectDOMNode from "../enhancements/provideCorrectDOMNode";

export function Column({column, className, Element}) {
    const props = {
        key: column.title,
        className
    };
    const isSortable = column.isSortable === undefined ? true : column.isSortable;

    return (
        <Element {...props}>
            {column.title}
            {renderSorter(column, isSortable)}
        </Element>
    );
}

function renderSorter(column, isSortable) {
    return isSortable ? (
        <Sorter
            onClick={() => onSorterClick(column)}
            sorted={column.sorted}
            sorterComponent={column.sorterComponent}
        />
    ) : null;
}

function onSorterClick(column) {
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