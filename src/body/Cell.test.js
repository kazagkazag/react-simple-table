import React from "react";
import {expect} from "chai";
import {shallow, mount} from "enzyme";
import Cell from "./Cell";
import sinon from "sinon";

describe("Cell", () => {

    const props = {
        className: "",
        colSpan: undefined,
        onClick: () => {}
    };

    it("should render children", () => {
        const wrapper = shallow(<Cell><h1/></Cell>);

        expect(wrapper.find("h1")).to.have.length(1);
    });

    it("should call callback after click", () => {
        const newProps = Object.assign({}, props, {
            onClick: sinon.spy()
        });

        const wrapper = mount(<Cell {...newProps} />);

        wrapper.simulate("click");

        expect(newProps.onClick.called).to.equal(true);
    });

    it("should have expected class name", () => {
        const newProps = Object.assign({}, props, {
            className: "test-class-name"
        });

        const wrapper = shallow(<Cell {...newProps} />);

        expect(wrapper.hasClass(newProps.className)).to.equal(true);
    });

    it("should span across specified number of cells", () => {
        const newProps = Object.assign({}, props, {
            colSpan: 5
        });

        const wrapper = shallow(<Cell {...newProps} />);

        expect(wrapper.props().colSpan).to.equal(newProps.colSpan);
    })

});