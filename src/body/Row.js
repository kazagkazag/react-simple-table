import React, {PropTypes} from "react";
import sid from "shortid";

import Cell from "./Cell";

import addClassName from "../enhancements/addClassName";
import provideCorrectDOMNode from "../enhancements/provideCorrectDOMNode";

function Row(props) {
    const {Element} = props;

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
    className: PropTypes.string,
    Element: PropTypes.string
};

export default provideCorrectDOMNode("tr")(
    addClassName("_row")(Row)
);