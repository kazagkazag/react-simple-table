import React, {PropTypes, Component} from "react";

import Head from "../head/Head";
import Body from "../body/Body";

export default class Table extends Component {

    constructor(props) {
        super(props);

        this.container = null;

        this.onScroll = this.onScroll.bind(this);
    }

    onScroll(event) {
        const scrolledToTheBottom = this.container.clientHeight + this.container.scrollTop >= this.container.scrollHeight;

        if(scrolledToTheBottom) {
            this.props.onScrollToBottom(event);
        }
    }

    getChildContext() {
        return {
            className: this.props.className
        };
    }

    getContainerStyles() {
        const styles = {};

        this.addMaxHeightStyles(styles);

        return styles;
    }

    addMaxHeightStyles(styles) {
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
                onScroll={this.onScroll}
                ref={element => this.container = element}
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
    maxHeight: PropTypes.string,
    onScrollToBottom: PropTypes.func
};

Table.childContextTypes = {
    className: PropTypes.string
};

Table.defaultProps = {
    className: "table"
};