import React, {PropTypes} from "react";

function Cell(props) {
    return (
        <td {...props}>
            {props.children}
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