import React from "react";
import {expect} from "chai";
import {mount} from "enzyme";
import sinon from "sinon";
import Head from "./Head";
import Column from "./Column";
import Sorter from "./Sorter";

describe("Head", () => {

    const props = {
        columns: []
    };

    const options = {
        context: {
            semantic: true
        }
    };

    it("should render table header with basic markup", () => {
        const wrapper = mount(<Head />, options);

        expect(wrapper.find("thead")).to.have.length(1);
    });

    it("should render no columns if no data provided", () => {
        const wrapper = mount(<Head {...props} />, options);

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
        const wrapper = mount(<Head {...newProps} />, options);
        const columnsElements = wrapper.find("th");

        expect(columnsElements).to.have.length(columns.length);
        expect(columnsElements.at(0).text()).to.equal(columns[0].title);
        expect(columnsElements.at(1).text()).to.equal(columns[1].title);
    });

    it("should render sorting indicator", () => {
        const columns = [
            {
                title: "Column1",
                sorted: "ASC"
            },
            {
                title: "Column2",
                sorted: "DESC"
            }
        ];
        const newProps = Object.assign({}, props, {
            columns
        });
        const wrapper = mount(<Head {...newProps} />, options);
        const columnsElements = wrapper.find("th");

        expect(columnsElements).to.have.length(columns.length);
        expect(columnsElements.at(0).find(".sorter.sorted-asc")).to.have.length(1);
        expect(columnsElements.at(1).find(".sorter.sorted-desc")).to.have.length(1);
    });

    it("should render sorting indicator with specified template", () => {
        const columns = [
            {
                title: "Column1",
                sorted: "ASC"
            },
            {
                title: "Column2",
                sorted: "DESC"
            }
        ];
        const sorterComponent = (sorted) => <p className="custom-sorter">{sorted}</p>;
        const newProps = Object.assign({}, props, {
            columns,
            sorterComponent
        });
        const wrapper = mount(<Head {...newProps} />, options);
        const columnsElements = wrapper.find("th");

        expect(columnsElements).to.have.length(columns.length);
        expect(columnsElements.at(0).find(".custom-sorter").text()).to.equal("ASC");
        expect(columnsElements.at(1).find(".custom-sorter").text()).to.equal("DESC");
    });

    it("should display sorter if Column isSortable", () => {
        const columns = [{
            title: "Column1",
            sorted: "ASC",
            isSortable: true
        }];
        const newProps = Object.assign({}, props, {
            columns
        });
        const wrapper = mount(<Head {...newProps} />, options);

        expect(wrapper.find(Column)).to.have.length(1);
        expect(wrapper.find(Sorter)).to.have.length(1);
    });

    it("should not display sorter if Column is not sortable", () => {
        const columns = [{
            title: "Column1",
            sorted: "ASC",
            isSortable: false
        }];
        const newProps = Object.assign({}, props, {
            columns
        });
        const wrapper = mount(<Head {...newProps} />, options);

        expect(wrapper.find(Column)).to.have.length(1);
        expect(wrapper.find(Sorter)).to.have.length(0);
    });

    it("should call onSort callback with clicked column", () => {
        const columns = [
            {
                title: "Column1",
                sorted: "ASC"
            },
            {
                title: "Column2",
                sorted: "DESC"
            }
        ];
        const sorterComponent = sorted => <p className="custom-sorter">{sorted}</p>;
        const onSort = sinon.spy();
        const newProps = Object.assign({}, props, {
            columns,
            sorterComponent,
            onSort
        });
        const wrapper = mount(<Head {...newProps} />, options);
        const columnsElements = wrapper.find("th");

        columnsElements.at(0).simulate("click");

        expect(onSort.calledWith(columns[0])).to.equal(true);
    });

    it("should render title as string", () => {
        const columns = [
            {
                title: "Column1",
                sorted: "ASC"
            }
        ];
        const newProps = Object.assign({}, props, {
            columns
        });
        const wrapper = mount(<Head {...newProps} />, options);

        expect(wrapper.find(Column).text()).to.contains("Column1")
    });

    it("should render title as functional Component", () => {
        const columns = [
            {
                title: () => <p className="custom-class">Component</p>,
                sorted: "ASC"
            }
        ];
        const newProps = Object.assign({}, props, {
            columns
        });
        const wrapper = mount(<Head {...newProps} />, options);

        expect(wrapper.find(".custom-class")).to.have.length(1);
    });

    it("should render wrapper for header cell", () => {
        const columns = [
            {
                title: "Title",
                sorted: "ASC",
                headerComponent: (renderTitle) => <p className="custom-class">{renderTitle()}</p>
            }
        ];
        const newProps = Object.assign({}, props, {
            columns
        });
        const wrapper = mount(<Head {...newProps} />, options);

        expect(wrapper.find(".custom-class")).to.have.length(1);
        expect(wrapper.find(".custom-class").text()).to.equal("Title");
    });

    it("should not render title if it is a function but not react element", () => {
        const columns = [
            {
                title: () => {},
                sorted: "ASC"
            }
        ];
        const newProps = Object.assign({}, props, {
            columns
        });
        const wrapper = mount(<Head {...newProps} />, options);

        expect(wrapper.find("th").children()).to.have.length(1); // for Sorter
    });

    it("should apply width if specified", () => {
        const columns = [
            {
                title: "Column1",
                sorted: "ASC",
                absoluteWidth: 140
            }
        ];
        const newProps = Object.assign({}, props, {
            columns
        });
        const wrapper = mount(<Head {...newProps} />, options);

        expect(wrapper.find(Column).html()).to.contains("140px")
    });
});