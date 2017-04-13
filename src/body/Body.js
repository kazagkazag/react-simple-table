import React, {PropTypes, Component} from "react";

import Row from "./Row";
import {CLASS1,CLASS2} from "./Row"

import addClassName from "../enhancements/addClassName";
import provideCorrectDOMNode from "../enhancements/provideCorrectDOMNode";

export class Body extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data || [],
            itemsWithInlinedDetails: []
        };

        this.toggleDetails = this.toggleDetails.bind(this);
    }

    componentWillReceiveProps({data = []}) {
        this.setState({
            data
        });
    }

    toggleDetails(clickedItem) {
        if(this.props.detailsInlined) {
            this.toggleInlinedDetailsRow(clickedItem);
        } else {
            this.toggleStandaloneDetailsRow(clickedItem);
        }
    }

    toggleStandaloneDetailsRow(clickedItem) {
        const indexOfClickedItem = this.state.data.indexOf(clickedItem);
        const nextItem = this.state.data[indexOfClickedItem + 1];
        const areDetailsCurrentlyVisible = nextItem
            && nextItem.isRowWithDetails;

        if (areDetailsCurrentlyVisible) {
            this.hideDetails(indexOfClickedItem);
        } else {
            this.showDetails(indexOfClickedItem);
        }
    }

    toggleInlinedDetailsRow(clickedItem) {
        const indexOfClickedItem = this.state.data.indexOf(clickedItem);
        const detailsAlreadyOpened = this.state.itemsWithInlinedDetails.includes(indexOfClickedItem);

        if(detailsAlreadyOpened) {
            this.hideInlinedDetails(indexOfClickedItem);
        } else {
            this.showInlinedDetails(indexOfClickedItem);
        }
    }

    hideDetails(indexOfClickedItem) {
        const newData = [...this.state.data];
        newData.splice(indexOfClickedItem + 1, 1);
        this.setState({
            data: newData
        });
    }

    showDetails(indexOfClickedItem) {
        const newData = [...this.state.data];
        newData.splice(indexOfClickedItem + 1, 0, {
            isRowWithDetails: true
        });
        this.setState({
            data: newData
        });
    }

    hideInlinedDetails(indexOfClickedItem) {
        const indexOfDetailedItems = this.state.itemsWithInlinedDetails.indexOf(indexOfClickedItem);
        const newDetailedItems = [...this.state.itemsWithInlinedDetails];
        newDetailedItems.splice(indexOfDetailedItems, 1);

        this.setState({
            itemsWithInlinedDetails: newDetailedItems
        });
    }

    showInlinedDetails(indexOfClickedItem) {
        const newDetailedItems = [...this.state.itemsWithInlinedDetails];
        newDetailedItems.push(indexOfClickedItem);

        this.setState({
            itemsWithInlinedDetails: newDetailedItems
        });
    }

    getDetailsRowCells(dataOfClickedRow) {
        return [{
            colSpan: this.props.columns.length,
            content: this.props.details(dataOfClickedRow),
            className: "with-details"
        }]
    }

    getFullRowCells(dataOfClickedRow) {
        const contentType = typeof dataOfClickedRow.content;
        let content = null;

        if (contentType === "function") {
            content = dataOfClickedRow.content();
        } else {
            content = dataOfClickedRow.content;
        }

        return [{
            colSpan: this.props.columns.length,
            content: content,
            className: "is-full"
        }]
    }

    getRowWithInlinedDetailsCells(row) {
        return [
            ...this.props.columns.map(column => this.getCell(column, row)),
            {
                content: this.props.details(row),
                className: "with-details with-inlined-details"
            }
        ];
    }

    getStandardRowCells(row) {
        return this.props.columns.map(column => this.getCell(column, row));
    }

    getCell(column, row) {
        const cellProperties = {};
        const toggler = this.toggleDetails.bind(this, row);

        cellProperties.content = column.component && typeof column.component === "function"
            ? column.component(row, toggler)
            : row[column.field];

        if (this.props.details) {
            cellProperties.onClick = toggler;
        }

        return cellProperties;
    }

    getCellsForRowsInColumnsOrder() {
        const data = this.state.data;
        let lastFullRowIndex = -1;
        return data.map((rowData, index) => {
            if (rowData.isRowWithDetails && this.props.detailsInlined !== true) {
                const dataOfPreviousRow = data[index - 1];
                return {cells: this.getDetailsRowCells(dataOfPreviousRow), className: this.getClassName(lastFullRowIndex, index)};
            } else if (this.state.itemsWithInlinedDetails.indexOf(index) > -1 && this.props.detailsInlined && this.context.semantic === false) {
                return {cells: this.getRowWithInlinedDetailsCells(rowData)};
            } else if (rowData.fullRow) {
                lastFullRowIndex = index;
                return {cells: this.getFullRowCells(rowData)};
            } else {
                return {cells: this.getStandardRowCells(rowData), className: this.getClassName(lastFullRowIndex, index)}
            }
        });

    }

    getClassName(start, index) {
        return (index - start + 1) % 2 == 0 ? CLASS1 : CLASS2;
    }

    renderRows() {
        return this.getCellsForRowsInColumnsOrder()
            .map((row, index) => {
                return (
                    <Row
                        key={index}
                        cells={row.cells}
                        additionalClassName={row.className}
                    />
                );
            });
    }

    render() {
        const {Element} = this.props;

        return (
            <Element className={this.props.className}>
                {this.renderRows()}
            </Element>
        );
    }
}

Body.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    details: PropTypes.func,
    detailsInlined: PropTypes.bool,
    className: PropTypes.string,
    Element: PropTypes.string
};

Body.defaultProps = {
    detailsInlined: false
};

Body.contextTypes = {
    semantic: PropTypes.bool,
};

export default provideCorrectDOMNode("tbody")(
    addClassName("_body")(Body)
);