import React from "react";
import {expect} from "chai";
import {mount} from "enzyme";
import Columns from "./Columns";
import Column from "./Column";

describe("Columns", () => {
    const options = {
        context: {
            semantic: true
        }
    };

    const props = {
        columns: [
            {
                title: "Test"
            }
        ],
        sorterComponent: () => {},
        onSort: () => {}
    };

    it("should render Columns with basic markup", () => {
        const wrapper = mount(<Columns {...props} />, options);

        expect(wrapper.find("tr")).to.have.length(1);
    });

    it("should set isSortable flag to true if flag is undefined", () => {
        const wrapper = mount(<Columns {...props} />, options);

        expect(wrapper.find(Column).props().column.isSortable).to.equal(true);
    });

    it("should set isSortable flag to false if flag is falsy", () => {
        const newProps = Object.assign({}, props, {
            columns: [
                {
                    title: "Test",
                    isSortable: false
                }
            ],
        });
        const wrapper = mount(<Columns {...newProps} />, options);

        expect(wrapper.find(Column).props().column.isSortable).to.equal(false);
    });

    it("should set isSortable flag to true if flag is truthy", () => {
        const newProps = Object.assign({}, props, {
            columns: [
                {
                    title: "Test",
                    isSortable: true
                }
            ],
        });
        const wrapper = mount(<Columns {...newProps} />, options);

        expect(wrapper.find(Column).props().column.isSortable).to.equal(true);
    });
});