import React, { PropTypes, isValidElement } from "react";

import Sorter from "./Sorter";

import addClassName from "../enhancements/addClassName";
import provideCorrectDOMNode from "../enhancements/provideCorrectDOMNode";

export function Column({ column, className, Element, onReorder }) {
    const props = {
        key: column.title,
        "data-key": column.title,
        className
    };
    const isSortable = column.isSortable === undefined ? true : column.isSortable;

    if (isSortable && column.onSort) {
        props.onClick = () => {
            column.onSort(column);
        };
    }

    if (onReorder) {
        props.draggable = true;

        props.onDragStart = (event) => {
            event.dataTransfer.setData("text", column.title);
        }

        props.onDragOver = (event) => {
            event.preventDefault();
        }

        props.onDragEnter = (event) => {
            event.target.classList.add("drop-target-entered");
        }

        props.onDragLeave = (event) => {
            event.target.classList.remove("drop-target-entered");
        }

        props.onDrop = (event) => {
            event.preventDefault();
            event.target.classList.remove("drop-target-entered");
            const sourceColumnKey = event.dataTransfer.getData("text");
            const targetColumnKey = event.target.getAttribute("data-key");
            onReorder(sourceColumnKey, targetColumnKey);
        }
    }

    if (typeof column.absoluteWidth === "number") {
        props.style = {
            width: `${column.absoluteWidth}px`
        }
    }

    return column.headerComponent && typeof column.headerComponent === "function"
        ? (
            <Element {...props}>
                {
                    column.headerComponent(
                        () => renderTitle(column.title),
                        () => renderSorter(column, isSortable)
                    )
                }
            </Element>
        ) : (
            <Element {...props}>
                {renderTitle(column.title)}
                {renderSorter(column, isSortable)}
            </Element>
        );
}

function renderTitle(title) {
    return typeof title === "function" && isValidElement(title()) ?
        renderTitleAsComponent(title) :
        renderTitleAsString(title);
}

function renderTitleAsString(title) {
    return title ? title : null;
}

function renderTitleAsComponent(Title) {
    return <Title />;
}

function renderSorter(column, isSortable) {
    return isSortable ? (
        <Sorter
            sorted={column.sorted}
            sorterComponent={column.sorterComponent}
        />
    ) : null;
}

Column.propTypes = {
    column: PropTypes.object,
    className: PropTypes.string,
    Element: PropTypes.string,
    onReorder: PropTypes.func
};

export default provideCorrectDOMNode("th")(
    addClassName("_th")(Column)
);