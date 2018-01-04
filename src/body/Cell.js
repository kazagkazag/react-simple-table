import React from "react";
import PropTypes from "prop-types";

import addClassName from "../enhancements/addClassName";
import provideCorrectDOMNode from "../enhancements/provideCorrectDOMNode";

export function Cell(props) {
    const { Element } = props;
    const styles = {};

    if (props.absoluteWidth) {
        styles.width = `${props.absoluteWidth}px`;
    }

    return (
        <Element
            style={styles}
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
    children: PropTypes.node,
    absoluteWidth: PropTypes.number
};

export default provideCorrectDOMNode("td")(
    addClassName("_cell")(Cell)
);