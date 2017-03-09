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

    it("should render table in non semantic mode, with divs instead of table elements", () => {
        const columns = [
            {
                title: "Column1"
            },
            {
                title: "Column2"
            }
        ];
        const data = [
            {
                id: 0,
                title: "Some title"
            },
            {
                id: 1,
                title: "Another title"
            }
        ];
        const className = "my-table";
        const newProps = Object.assign({}, props, {
            className,
            columns,
            data,
            semantic: false
        });
        const wrapper = mount(<Table {...newProps}/>);
        expect(wrapper.find(`.${className}`).type()).to.equal("div");
        expect(wrapper.find(`.${className}_th`).at(0).type()).to.equal("div");
        expect(wrapper.find(`.${className}_head`).at(0).type()).to.equal("div");
        expect(wrapper.find(`.${className}_body`).at(0).type()).to.equal("div");
        expect(wrapper.find(`.${className}_row`).at(0).type()).to.equal("div");
        expect(wrapper.find(`.${className}_cell`).at(0).type()).to.equal("div");
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
        wrapper.instance().container = {
            clientHeight: 100,
            scrollTop: 100,
            scrollHeight: 200
        };

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
        wrapper.instance().container = {
            clientHeight: 100,
            scrollTop: 99,
            scrollHeight: 200
        };

        wrapper.simulate("scroll", {
            deltaY: 199
        });

        expect(newProps.onScrollToBottom.called).to.equal(false);
    });
});