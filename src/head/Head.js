import React, {PropTypes} from "react";
import Columns from "./Columns";
import addClassName from "../enhacements/addClassName";

export function Head({columns = [], sorterComponent, onSort, className}, { semantic}) {
    const Element = semantic ? "thead" : "div";

    return (
        <Element className={className}>
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

export default addClassName("_head")(Head);