import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import Table from "./Table";
import Head from "../head/Head";
import Body from "../body/Body";

describe("Table", () => {

    it("should render table with header and footer", () => {
        const wrapper = shallow(<Table />);

        expect(wrapper.find(Head)).to.have.length(1);
        expect(wrapper.find(Body)).to.have.length(1);
    });

    it("should render table with basic class name", () => {
        const wrapper = shallow(<Table className="my-table" />);
        expect(wrapper.hasClass("my-table")).to.equal(true);
    });
});