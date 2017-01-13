import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import Head from "./Head";

describe("Head", () => {

    const props = {
        columns: []
    };

    it("should render table header with basic markup", () => {
        const wrapper = shallow(<Head />);

        expect(wrapper.find("thead")).to.have.length(1);
    });

    it("should render no columns if no data provided", () => {
         const wrapper = shallow(<Head {...props} />);

         expect(wrapper.find("th")).to.have.length(0);
    });

    it("should render columns", () => {
        const columns = [
            {
                title: "Column1"
            },
            {
                title: "Column2"
            }
        ];
        const newProps = Object.assign({}, props, {
            columns
        });
        const wrapper = shallow(<Head {...newProps} />);
        const columnsElements = wrapper.find("th");

        expect(columnsElements).to.have.length(columns.length);
        expect(columnsElements.at(0).text()).to.equal(columns[0].title);
        expect(columnsElements.at(1).text()).to.equal(columns[1].title);
    });
});