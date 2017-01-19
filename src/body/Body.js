import React, {PropTypes, Component} from "react";
import sid from "shortid";
import Cell from "./Cell";

export default class Body extends Component {

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

        if(areDetailsCurrentlyVisible) {
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

    getDetailsRow(dataOfClickedRow) {
        return [{
            colSpan: this.props.columns.length,
            content: this.props.details(dataOfClickedRow),
            className: "with-details"
        }]
    }

    getCells(row) {
        return this.props.columns.map(column => this.getCell(column, row));
    }

    getCell(column, row) {
        const cellProperties = {};

        if (column.component && typeof column.component === "function") {
            cellProperties.content = column.component(row);
        } else {
            cellProperties.content = row[column.field];
        }

        if (this.props.details) {
            cellProperties.onClick = () => {
                this.toggleDetails(row);
            };
        }

        return cellProperties;
    }

    getDataInOrderFromColumns() {
        const data = this.state.data;

        return data.map((rowData, index) => {
            if (rowData.isRowWithDetails) {
                const dataOfPreviousRow = data[index - 1];
                return this.getDetailsRow(dataOfPreviousRow);
            } else {
                return this.getCells(rowData);
            }
        });

    }

    renderRows() {
        return this.getDataInOrderFromColumns().map(renderRow);
    }

    render() {
        return (
            <tbody>
                {this.renderRows()}
            </tbody>
        );
    }
}

Body.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    details: PropTypes.func
};

function renderRow(row) {
    const cells = Object.entries(row).map(([key, cell]) => {
        return (
            <Cell
                key={key}
                onClick={cell.onClick}
                colSpan={cell.colSpan}
                className={cell.className}
            >
                {cell.content}
            </Cell>
        );
    });

    return (
        <tr key={sid.generate()}>
            {cells}
        </tr>
    );
}