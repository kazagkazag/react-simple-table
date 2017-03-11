import React, {PropTypes} from "react";
import sid from "shortid";

import Column from "./Column";

import addClassName from "../enhacements/addClassName";
import provideCorrectDOMNode from "../enhacements/provideCorrectDOMNode";

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
    className: PropTypes.string,
    Element: PropTypes.string
};

export default provideCorrectDOMNode("tr")(
    addClassName("_head-row")(Columns)
);