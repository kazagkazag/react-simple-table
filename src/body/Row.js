import React, {PropTypes} from "react";
import Cell from "./Cell";
import sid from "shortid";

function Row(props, context) {
    const rowClassName = `${context.className}_row`;
    const cellBaseClassName = `${context.className}_cell`;
    const Element = context.semantic ? "tr" : "div";

    const cells = props.cells.map((cell, key) => {
        const cellAdditionalClassName = cell.className ? cell.className : "";

        return (
            <Cell
                key={key}
                onClick={cell.onClick}
                colSpan={cell.colSpan}
                className={`${cellBaseClassName} ${cellAdditionalClassName}`}
            >
                {cell.content}
            </Cell>
        );
    });

    return (
        <Element
            className={rowClassName}
            key={sid.generate()}
        >
            {cells}
        </Element>
    );
}

Row.propTypes = {
    cells: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Row.contextTypes = {
    className: PropTypes.string,
    semantic: PropTypes.bool
};

export default Row;