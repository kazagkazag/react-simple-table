import React, {PropTypes} from "react";
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
        columnClassName
    } = columnsDefinitions;

    return columns && columns.length ? columns.map(column => {
        const newColumnDefinition = Object.assign({}, column, {
            sorterComponent,
            onSort,
            isSortable: column.isSortable === undefined ? true : column.isSortable
        });

        return (
            <Column
                className={columnClassName}
                key={sid.generate()}
                column={newColumnDefinition}
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