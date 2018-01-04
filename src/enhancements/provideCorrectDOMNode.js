import React from "react";
import PropTypes from "prop-types";

export default semanticNodeName => WrappedElement => {

    function ElementWithCorrectDOMNode(props, context) {
        const Element = context.semantic === false
            ? "div"
            : semanticNodeName;

        return (
            <WrappedElement
                {...props}
                Element={Element}
            />
        );
    }

    ElementWithCorrectDOMNode.contextTypes = {
        semantic: PropTypes.bool,
    };

    return ElementWithCorrectDOMNode;

}
