import React from "react";
import {expect} from "chai";
import {mount} from "enzyme";
import Body from "./Body";
import Row, {evenRowClassName, oddRowClassName} from "./Row"

describe("Body", () => {

    const props = {
        data: []
    };

    const options = {
        context: {
            semantic: true
        }
    };

    it("should render table body with basic markup", () => {
        const wrapper = mount(<Body />, options);

        expect(wrapper.find("tbody")).to.have.length(1);
    });

    it("should render no rows if no data specified", () => {
        const wrapper = mount(<Body />, options);

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
        const wrapper = mount(<Body {...newProps}/>, options);
        const rows = wrapper.find(Row);

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
        const wrapper = mount(<Body {...newProps}/>, options);
        const rows = wrapper.find(Row);

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
        const wrapper = mount(<Body {...newProps}/>, options);
        const rows = wrapper.find(Row);

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
        const wrapper = mount(<Body {...newProps}/>, options);
        const rows = wrapper.find(Row);

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
        const wrapper = mount(<Body {...newProps}/>, options);
        const rows = wrapper.find(Row);

        expect(rows).to.have.length(2);
        expect(rows.at(0).find("td").at(0).find("p")).to.have.length(1);
        expect(rows.at(0).find("td").at(0).find("p").text()).to.contains(data[0].id.toString());
        expect(rows.at(0).find("td").at(0).find("p").text()).to.contains(data[0].title);
    });

    it("should render details row after click on row for data in objects form", () => {
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
        const details = (item) => {
            return <h1 className="details">Details: {item.id} {item.title}</h1>;
        };
        const newProps = Object.assign({}, props, {
            data,
            columns,
            details
        });
        const wrapper = mount(<Body {...newProps}/>, options);
        const secondRow = wrapper.find(Row).at(1);
        const secondCellInSecondRow = secondRow.find("td").at(1);

        secondCellInSecondRow.simulate("click");

        const detailsContent = wrapper.find(".details");
        const detailsCell = wrapper.find(".with-details");

        expect(detailsContent).to.have.length(1);
        expect(detailsContent.text()).to.contains("Another title");
        expect(detailsCell.props().colSpan).to.equal(2);
    });

    it("should hide details row after second click on row for data in objects form", () => {
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
        const details = (item) => {
            return <h1 className="details">Details: {item.id} {item.title}</h1>;
        };
        const newProps = Object.assign({}, props, {
            data,
            columns,
            details
        });
        const wrapper = mount(<Body {...newProps}/>, options);

        let secondRow = wrapper.find(Row).at(1);
        let secondCellInSecondRow = secondRow.find("td").at(1);
        secondCellInSecondRow.simulate("click");

        secondRow = wrapper.find(Row).at(1);
        secondCellInSecondRow = secondRow.find("td").at(1);
        secondCellInSecondRow.simulate("click");

        const detailsContent = wrapper.find(".details");

        expect(detailsContent).to.have.length(0);
    });

    it("should hide inlined details row after receiving new data", () => {
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
        const details = (item) => {
            return <h1 className="details">Details: {item.id} {item.title}</h1>;
        };
        const newProps = Object.assign({}, props, {
            data,
            columns,
            details,
            detailsInlined: true
        });
        const wrapper = mount(<Body {...newProps}/>, {
            context: {
                semantic: false
            }
        });
        const secondRow = wrapper.find(Row).at(1);
        const secondCellInSecondRow = secondRow.find("div").at(1);

        secondCellInSecondRow.simulate("click");

        expect(wrapper.find(".details")).to.have.length(1);

        wrapper.setProps({
            data: [...newProps.data, {
                id: 2,
                title: "New data"
            }]
        });

        expect(wrapper.find(".details")).to.have.length(0);

    });

    it("should render subheader rows with plain text based on data as object", () => {
        const data = [
            {
                id: 0,
                title: "Some title"
            },
            {
                fullRow: true,
                content: "Subheader content"
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
        const wrapper = mount(<Body {...newProps}/>, options);
        const rows = wrapper.find(Row);

        expect(rows).to.have.length(3);
        expect(rows.at(1).find("td").at(0).text()).to.equal(data[1].content);
    });

    it("should render subheader rows with component based on data as object", () => {
        const subheaderText = "Subheader content";
        const data = [
            {
                id: 0,
                title: "Some title"
            },
            {
                fullRow: true,
                content: () => <p>{subheaderText}</p>
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
        const wrapper = mount(<Body {...newProps}/>, options);
        const rows = wrapper.find(Row);

        expect(rows).to.have.length(3);
        expect(rows.at(1).find("td").at(0).text()).to.equal(subheaderText);
    });

    it("should show details row after using handler provided to the component function", () => {
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
        const buttonClassName = "custom-button";
        const columns = [
            {
                field: "title",
                component: (item = {}, toggleRowDetails) => {
                    return (
                        <button
                            className={buttonClassName}
                            onClick={event => {
                                event.stopPropagation();
                                toggleRowDetails();
                            }}
                        >
                            Click me to show details
                        </button>
                    );
                }
            },
            {
                field: "id"
            }
        ];
        const details = (item) => {
            return <h1 className="details">Details: {item.id} {item.title}</h1>;
        };
        const newProps = Object.assign({}, props, {
            data,
            columns,
            details
        });
        const wrapper = mount(<Body {...newProps}/>, options);
        const button = wrapper.find(`.${buttonClassName}`).at(0);

        button.simulate("click");

        const detailsContent = wrapper.find(".details");

        expect(detailsContent).to.have.length(1);
    });

    it("should render details row inside clicked row after click on cell", () => {
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
        const details = (item) => {
            return <h1 className="details">Details: {item.id} {item.title}</h1>;
        };
        const newProps = Object.assign({}, props, {
            data,
            columns,
            details,
            detailsInlined: true
        });
        const wrapper = mount(<Body {...newProps}/>, {
            context: {
                semantic: false
            }
        });
        const secondRow = wrapper.find(Row).at(1);
        const secondCellInSecondRow = secondRow.find("div").at(1);

        secondCellInSecondRow.simulate("click");

        expect(wrapper.find(Row).at(1).find(".details")).to.have.length(1);
        expect(wrapper.find(Row).at(1).find(".with-inlined-details")).to.have.length(1);
    });

    it("should hide details row inside clicked row after second click on cell", () => {
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
        const details = (item) => {
            return <h1 className="details">Details: {item.id} {item.title}</h1>;
        };
        const newProps = Object.assign({}, props, {
            data,
            columns,
            details,
            detailsInlined: true
        });
        const wrapper = mount(<Body {...newProps}/>, {
            context: {
                semantic: false
            }
        });

        wrapper.find(Row).at(1).find("div").at(1).simulate("click");
        wrapper.find(Row).at(1).find("div").at(1).simulate("click");

        expect(wrapper.find(Row).at(1).find(".details")).to.have.length(0);
        expect(wrapper.find(Row).at(1).find(".with-inlined-details")).to.have.length(0);
    });

    it("should render rows class alternately when no subheader rows", () => {
        givenRows([
            {},
            {},
            {},
            {}]).shouldHaveClasses([evenRowClassName, oddRowClassName, evenRowClassName, oddRowClassName])
    });

    it("should restart row class commutativity on subheader row", () => {
        givenRows([
            {},
            {fullRow: true},
            {},
            {},
            {},
        ]).shouldHaveClasses([
            evenRowClassName,
            undefined,
            evenRowClassName,
            oddRowClassName,
            evenRowClassName
        ]);

        givenRows([
            {},
            {fullRow: true},
            {},
            {fullRow: true},
            {},
            {}
        ]).shouldHaveClasses([
            evenRowClassName,
            undefined,
            evenRowClassName,
            undefined,
            evenRowClassName,
            oddRowClassName
        ]);
    });

    it("should preserve row class commutativity on details row click", () => {
        const data = [
            {},
            {}
        ];
        const columns = [{}];

        const details = (item) => {
            return <h1 className="details">Details: {item.id} {item.title}</h1>;
        };

        const newProps = Object.assign({}, props, {
            data,
            columns,
            details,
            detailsInlined: true
        });
        const wrapper = mount(<Body {...newProps}/>, {
            context: {
                semantic: false
            }
        });

        const secondRow = wrapper.find(Row).at(1);

        secondRow.find("div").at(1).simulate("click");

        expect(secondRow.props().additionalClassName).to.equal(oddRowClassName);
    });

    it("should apply specified absolute width", () => {
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
                absoluteWidth: 1234
            },
            {
                field: "id"
            }
        ];
        const newProps = Object.assign({}, props, {
            data,
            columns
        });
        const wrapper = mount(<Body {...newProps}/>, options);
        const rows = wrapper.find(Row);

        expect(rows.at(0).find("td").at(0).html()).to.contains("1234px");
    });

    function givenRows(rows) {
        return new RowClassTester(rows)
    }

    class RowClassTester {
        constructor(rows) {
            const columns = [{}];
            const newProps = Object.assign({}, props, {
                data: rows,
                columns
            });
            const wrapper = mount(<Body {...newProps}/>, options);
            this.rows = wrapper.find(Row);
        }

        shouldHaveClasses(classes) {
            classes.forEach((clazz, index) => {
                expect(this.rows.at(index).props().additionalClassName).to.equal(clazz);
            });
        }
    }


});