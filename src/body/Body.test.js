import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import Body from "./Body";

describe("Body", () => {

    const props = {
        data: []
    };

    it("should render table body with basic markup", () => {
        const wrapper = shallow(<Body />);

        expect(wrapper.find("tbody")).to.have.length(1);
    });

    it("should render no rows if no data specified", () => {
        const wrapper = shallow(<Body />);

        expect(wrapper.find("tr")).to.have.length(0);
    });

    it("should render rows from object based on order from columns", () => {
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
        const columns = [
            {
                source: "title"
            },
            {
                source: "id"
            }
        ];
        const newProps = Object.assign({}, props, {
            data,
            columns
        });
        const wrapper = shallow(<Body {...newProps}/>);
        const rows = wrapper.find("tr");

        expect(rows).to.have.length(2);
        expect(rows.at(0).find("td").at(0).text()).to.equal(data[0].title);
        expect(rows.at(0).find("td").at(1).text()).to.equal(data[0].id.toString());
    });

    it("should render rows from array base on order from columns", () => {
        const data = [
            [0, "Some title"],
            [1, "Another title"]
        ];
        const columns = [
            {
                source: 1
            },
            {
                source: 0
            }
        ];
        const newProps = Object.assign({}, props, {
            data,
            columns
        });
        const wrapper = shallow(<Body {...newProps}/>);
        const rows = wrapper.find("tr");

        expect(rows).to.have.length(2);
        expect(rows.at(0).find("td").at(0).text()).to.equal(data[0][1]);
        expect(rows.at(0).find("td").at(1).text()).to.equal(data[0][0].toString());
    });

});