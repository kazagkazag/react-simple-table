import React, {PropTypes} from "react";
import Cell from "./Cell";
import addClassName from "../enhancements/addClassName";
import provideCorrectDOMNode from "../enhancements/provideCorrectDOMNode";

export const evenRowClassName = "is-even";
export const oddRowClassName = "is-odd";

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

    const rowAdditionalClassName = props.additionalClassName ? props.additionalClassName : "";

    return (
        <Element className={`${props.className} ${rowAdditionalClassName}`}>
            {cells}
        </Element>
    );
}

Row.propTypes = {
    cells: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    className: PropTypes.string,
    additionalClassName: PropTypes.string,
    Element: PropTypes.string
};

export default provideCorrectDOMNode("tr")(
    addClassName("_row")(Row)
);