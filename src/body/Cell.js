import React, {PropTypes} from "react";

import addClassName from "../enhacements/addClassName";
import provideCorrectDOMNode from "../enhacements/provideCorrectDOMNode";

export function Cell(props) {
    const {Element} = props

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

export default provideCorrectDOMNode("td")(
    addClassName("_cell")(Cell)
);