import React, {PropTypes} from "react";
import sid from "shortid";
import Cell from "./Cell";
import addClassName from "../enhacements/addClassName";

function Row(props, context) {
    const Element = context.semantic ? "tr" : "div";

    const cells = props.cells.map((cell, key) => {
        const cellAdditionalClassName = cell.className ? cell.className : "";

        return (
            <Cell
                key={key}
                onClick={cell.onClick}
                colSpan={cell.colSpan}
                additionalClassName={cellAdditionalClassName}
            >
                {cell.content}
            </Cell>
        );
    });

    return (
        <Element
            className={props.className}
            key={sid.generate()}
        >
            {cells}
        </Element>
    );
}

Row.propTypes = {
    cells: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    className: PropTypes.string
};

Row.contextTypes = {
    semantic: PropTypes.bool
};

export default addClassName("_row")(Row);