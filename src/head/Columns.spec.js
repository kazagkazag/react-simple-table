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
});