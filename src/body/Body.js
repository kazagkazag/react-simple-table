import React, {PropTypes, Component} from "react";
import sid from "shortid";

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

    getDataInOrderFromColumns() {
        const columns = this.props.columns;
        const data = this.state.data;

        return data.map((rowData, index) => {
            if (rowData.isRowWithDetails) {
                const numberOfCellsInEachRow = columns.length;
                return [{
                    colSpan: numberOfCellsInEachRow,
                    content: this.props.details(data[index - 1]),
                    className: "with-details"
                }];
            } else {
                return columns.map(column => {
                    const cellProperties = {};

                    if (column.component && typeof column.component === "function") {
                        cellProperties.content = column.component(rowData);
                    } else {
                        cellProperties.content = rowData[column.field];
                    }

                    if (this.props.details) {
                        cellProperties.onClick = () => {
                            this.toggleDetails(rowData);
                        };
                    }

                    return cellProperties;
                });
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
    const cells = Object.entries(row).map(renderCell);

    return (
        <tr key={sid.generate()}>
            {cells}
        </tr>
    );
}

function renderCell(cellData) {
    const [key, cell] = cellData;
    const cellProperties = {
        key,
        className: cell.className,
        colSpan: cell.colSpan
    };

    if (cell.onClick) {
        cellProperties.onClick = cell.onClick;
    }

    return (
        <td {...cellProperties}>
            {cell.content}
        </td>
    );
}