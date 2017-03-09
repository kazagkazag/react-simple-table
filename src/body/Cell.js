import React, {PropTypes} from "react";

function Cell(props, {semantic}) {
    const {children, ...rest} = props;
    const Element = semantic ? "td" : "div";

    return (
        <Element {...rest}>
            {children}
        </Element>
    );
}

Cell.propTypes = {
    className: PropTypes.string,
    colSpan: PropTypes.number,
    onClick: PropTypes.func,
    children: PropTypes.node
};

Cell.contextTypes = {
    semantic: PropTypes.bool
};

export default Cell;