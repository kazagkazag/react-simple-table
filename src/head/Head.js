import React, {PropTypes} from "react";
import Columns from "./Columns";

export default function Head({columns = [], sorterComponent, onSort}, {className}) {
    const headClassName = `${className}_head`;

    return (
        <thead className={headClassName}>
            <Columns
                columns={columns}
                sorterComponent={sorterComponent}
                onSort={onSort}
            />
        </thead>
    );
}

Head.propTypes = {
    columns: PropTypes.array,
    sorterComponent: PropTypes.func,
    onSort: PropTypes.func
};

Head.contextTypes = {
    className: PropTypes.string
};