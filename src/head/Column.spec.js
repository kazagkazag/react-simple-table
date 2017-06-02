import React from "react";
import {expect} from "chai";
import {mount} from "enzyme";
import Column from "./Column";
import Sorter from "./Sorter";

describe("Column", () => {
    const options = {
        context: {
            semantic: true
        }
    };

    it("should render itself with basic markup", () => {
        const props = {
            column: {
                title: "Test",
                isSortable: true
            }
        };
        const wrapper = mount(<Column {...props} />, options);

        expect(wrapper.find("th")).to.have.length(1);
    });

    it("should display sorter if Column isSortable", () => {
        const props = {
            column: {
                title: "Test",
                isSortable: true
            }
        };
        const wrapper = mount(<Column {...props} />, options);

        expect(wrapper.find(Sorter)).to.have.length(1);
    });

    it("should not display sorter if Column is not sortable", () => {
        const props = {
            column: {
                title: "Test",
                isSortable: false
            }
        };
        const wrapper = mount(<Column {...props} />, options);
        expect(wrapper.find(Sorter)).to.have.length(0);
    });
});