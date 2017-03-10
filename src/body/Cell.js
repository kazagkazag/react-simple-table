import React, {PropTypes} from "react";
import addClassName from "../enhacements/addClassName";

export function Cell(props, {semantic}) {
    const Element = semantic ? "td" : "div";

    return (
        <Element
            colSpan={props.colSpan}
            onClick={props.onClick}
            className={`${props.className} ${props.additionalClassName}`}
        >
            {props.children}
        </Element>
    );
}

Cell.propTypes = {
    additionalClassName: PropTypes.string,
    className: PropTypes.string,
    colSpan: PropTypes.number,
    onClick: PropTypes.func,
    children: PropTypes.node
};

Cell.contextTypes = {
    semantic: PropTypes.bool
};

export default addClassName("_cell")(Cell);