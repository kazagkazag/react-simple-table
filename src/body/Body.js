import React, {PropTypes, Component} from "react";

import Row from "./Row";

import addClassName from "../enhancements/addClassName";
import provideCorrectDOMNode from "../enhancements/provideCorrectDOMNode";

export class Body extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data || []
        };

        this.toggleDetails = this.toggleDetails.bind(this);
    }

    componentWillReceiveProps({data = []}) {
        this.setState({
            data
        });
    }

    toggleDetails(item) {
        const indexOfClickedItem = this.state.data.indexOf(item);
        const nextItem = this.state.data[indexOfClickedItem + 1];
        const areDetailsCurrentlyVisible = nextItem
            && nextItem.isRowWithDetails;

        if (areDetailsCurrentlyVisible) {
            this.hideDetails(indexOfClickedItem);
        } else {
            this.showDetails(indexOfClickedItem);
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

        return data.map((rowData, index) => {
            if (rowData.isRowWithDetails) {
                const dataOfPreviousRow = data[index - 1];
                return this.getDetailsRowCells(dataOfPreviousRow);
            } else if (rowData.fullRow) {
                return this.getFullRowCells(rowData);
            } else {
                return this.getStandardRowCells(rowData);
            }
        });

    }

    renderRows() {
        return this.getCellsForRowsInColumnsOrder()
            .map((cells, index) => {
                return (
                    <Row
                        key={index}
                        cells={cells}
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
    className: PropTypes.string,
    Element: PropTypes.string
};

export default provideCorrectDOMNode("tbody")(
    addClassName("_body")(Body)
);