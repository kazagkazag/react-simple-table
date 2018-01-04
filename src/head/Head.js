import React from "react";
import PropTypes from "prop-types";

import Columns from "./Columns";

import addClassName from "../enhancements/addClassName";
import provideCorrectDOMNode from "../enhancements/provideCorrectDOMNode";

export function Head({
    columns = [],
    sorterComponent,
    onSort,
    className,
    Element,
    onReorder,
    headerComponent
 }) {
    return (
        <Element className={className}>
            <Columns
                columns={columns}
                sorterComponent={sorterComponent}
                onSort={onSort}
                onReorder={onReorder}
            />
        </Element>
    );
}

Head.propTypes = {
    columns: PropTypes.array,
    sorterComponent: PropTypes.func,
    onSort: PropTypes.func,
    className: PropTypes.string,
    Element: PropTypes.string,
    onReorder: PropTypes.func
};

export default provideCorrectDOMNode("thead")(
    addClassName("_head")(
        Head
    )
);