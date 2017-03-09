import React from "react";
import {expect} from "chai";
import {shallow, mount} from "enzyme";
import Table from "./Table";
import Head from "../head/Head";
import Body from "../body/Body";
import sinon from "sinon";

describe("Table", () => {

    const props = {
        className: "",
        maxHeight: undefined,
        onScrollToBottom: undefined
    };

    it("should render table with header and footer", () => {
        const wrapper = shallow(<Table />);

        expect(wrapper.find(Head)).to.have.length(1);
        expect(wrapper.find(Body)).to.have.length(1);
    });

    it("should render table with custom class name", () => {
        const columns = [
            {
                title: "Column1"
            },
            {
                title: "Column2"
            }
        ];
        const className = "my-table";
        const newProps = Object.assign({}, props, {
            className,
            columns
        });
        const wrapper = mount(<Table {...newProps}/>);
        expect(wrapper.find("table").hasClass(className)).to.equal(true);
        expect(wrapper.find("th").at(0).hasClass(`${className}_th`)).to.equal(true);
    });

    it("should render table with max height if specified", () => {
        const newProps = Object.assign({}, props, {
            className: "my-table",
            maxHeight: "200px"
        });
        const wrapper = shallow(<Table {...newProps}/>);
        expect(wrapper.find(".my-table-container").props().style.maxHeight).to.equal("200px");
    });

    //TODO: find a way to check clientHeight and other properties of NODE behind enzyme wrapper
    xit("should call onScroll callback after scrolling to the bottom of the table", () => {
        const newProps = Object.assign({}, props, {
            onScrollToBottom: sinon.spy(),
            maxHeight: "200px"
        });
        const wrapper = mount(<Table {...newProps}/>);

        wrapper.simulate("scroll", {
            deltaY: 201
        });

        expect(newProps.onScrollToBottom.called).to.equal(true);
    });

    it("should not call onScroll callback after scrolling not to the bottom of the table", () => {
        const newProps = Object.assign({}, props, {
            onScrollToBottom: sinon.spy(),
            maxHeight: "200px"
        });
        const wrapper = mount(<Table {...newProps}/>);

        wrapper.simulate("scroll", {
            deltaY: 199
        });

        expect(newProps.onScrollToBottom.called).to.equal(false);
    });
});