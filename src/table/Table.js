import React, {PropTypes, Component} from "react";

import Head from "../head/Head";
import Body from "../body/Body";

export default class Table extends Component {

    getChildContext() {
        return {
            className: this.props.className
        };
    }

    getContainerStyles() {
        const styles = {};

        if(this.props.maxHeight) {
            styles.maxHeight = this.props.maxHeight;
            styles.overflowY = "auto";
        }

        return styles;
    }

    render() {
        return (
            <div
                className={`${this.props.className}-container`}
                style={this.getContainerStyles()}
            >
                <table className={this.props.className}>
                    <Head
                        columns={this.props.columns}
                        sorterComponent={this.props.sorterComponent}
                    />
                    <Body
                        columns={this.props.columns}
                        data={this.props.data}
                        details={this.props.details}
                    />
                </table>
            </div>
        )
    }
}

Table.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    className: PropTypes.string,
    details: PropTypes.func,
    sorterComponent: PropTypes.func,
    maxHeight: PropTypes.string
};

Table.childContextTypes = {
    className: PropTypes.string
};

Table.defaultProps = {
    className: "table"
};