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
                field: "title"
            },
            {
                field: "id"
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
                field: 1
            },
            {
                field: 0
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

    it("should render empty cell if more columns specified than data provided", () => {
        const data = [
            [0, "Some title"],
            [1, "Another title"]
        ];
        const columns = [
            {
                field: 1
            },
            {
                field: 0
            },
            {
                otherColProperty: "value"
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
        expect(rows.at(0).find("td").at(2).text()).to.equal("");
    });

    it("should render cell with provided component if defined", () => {
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
                field: "title",
                component: () => {
                    return <p>I am the template!</p>
                }
            },
            {
                field: "id"
            }
        ];
        const newProps = Object.assign({}, props, {
            data,
            columns
        });
        const wrapper = shallow(<Body {...newProps}/>);
        const rows = wrapper.find("tr");

        expect(rows).to.have.length(2);
        expect(rows.at(0).find("td").at(0).find("p")).to.have.length(1);
    });

    it("should render cell with provided component created upon provided data", () => {
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
                field: "title",
                component: (item = {}) => {
                    return <p>I am the template! {item.id} {item.title}</p>
                }
            },
            {
                field: "id"
            }
        ];
        const newProps = Object.assign({}, props, {
            data,
            columns
        });
        const wrapper = shallow(<Body {...newProps}/>);
        const rows = wrapper.find("tr");

        expect(rows).to.have.length(2);
        expect(rows.at(0).find("td").at(0).find("p")).to.have.length(1);
        expect(rows.at(0).find("td").at(0).find("p").text()).to.contains(data[0].id.toString());
        expect(rows.at(0).find("td").at(0).find("p").text()).to.contains(data[0].title);
    });

});