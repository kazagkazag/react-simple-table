import React from "react";
import PropTypes from "prop-types";
import sid from "shortid";

import Column from "./Column";
import addClassName from "../enhancements/addClassName";
import provideCorrectDOMNode from "../enhancements/provideCorrectDOMNode";

export function Columns(props) {
    const {Element} = props;

    return (
        <Element className={props.className}>
            {getColumns(props)}
        </Element>
    );
}

function getColumns(columnsDefinitions) {
    const {
        columns,
        sorterComponent,
        onSort,
        columnClassName,
        onReorder
    } = columnsDefinitions;

    return columns && columns.length ? columns.map(column => {
        column.sorterComponent = sorterComponent;
        column.onSort = onSort;

        return (
            <Column
                className={columnClassName}
                key={sid.generate()}
                column={column}
                onReorder={onReorder}
            />
        );
    }) : null;
}

Columns.propTypes = {
    columns: PropTypes.array,
    sorterComponent: PropTypes.func,
    onSort: PropTypes.func,
    columnClassName: PropTypes.string,
    className: PropTypes.string,
    Element: PropTypes.string,
    onReorder: PropTypes.func
};

export default provideCorrectDOMNode("tr")(
    addClassName("_head-row")(Columns)
);