import React, {PropTypes} from "react";

export default function Sorter({sorted, sorterComponent}) {
    return sorted ? renderSorterComponent(sorted, sorterComponent) : null;
}

function renderSorterComponent(sorted, sorterComponent) {
    return sorterComponent ? sorterComponent(sorted) : (
        <span className={`sorter sorted-${sorted.toLowerCase()}`} />
    );
}

Sorter.propTypes = {
    sorted: PropTypes.any,
    sorterComponent: PropTypes.func
};