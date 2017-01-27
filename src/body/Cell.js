import React, {PropTypes} from "react";

function Cell(props) {
    const {children, ...rest} = props;

    return (
        <td {...rest}>
            {children}
        </td>
    );
}

Cell.propTypes = {
    className: PropTypes.string,
    colSpan: PropTypes.number,
    onClick: PropTypes.func,
    children: PropTypes.node
};

export default Cell;