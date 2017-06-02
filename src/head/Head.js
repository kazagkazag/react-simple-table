import React, {PropTypes} from "react";

import Columns from "./Columns";

import addClassName from "../enhancements/addClassName";
import provideCorrectDOMNode from "../enhancements/provideCorrectDOMNode";

export function Head({
    columns = [],
    sorterComponent,
    onSort,
    className,
    Element
 }) {
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
    onSort: PropTypes.func,
    className: PropTypes.string,
    Element: PropTypes.string
};

export default provideCorrectDOMNode("thead")(
    addClassName("_head")(
        Head
    )
);