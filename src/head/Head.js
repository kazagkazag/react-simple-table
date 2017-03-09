import React, {PropTypes} from "react";
import Columns from "./Columns";

export default function Head({columns = [], sorterComponent, onSort}, {className, semantic}) {
    const headClassName = `${className}_head`;
    const Element = semantic ? "thead" : "div";

    return (
        <Element className={headClassName}>
            <Columns
                columns={columns}
                sorterComponent={sorterComponent}
                onSort={onSort}
            />
        </Element>
    );
}

Head.propTypes = {
    columns: PropTypes.array,
    sorterComponent: PropTypes.func,
    onSort: PropTypes.func
};

Head.contextTypes = {
    className: PropTypes.string,
    semantic: PropTypes.bool
};