import React, { Component } from 'react';
import './App.css';

import Table from "./table/Table";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Table
            className="my-table"
            columns={[
                {
                    title: "First column",
                    field: "id",
                    sorted: "ASC"
                },
                {
                    title: "Second one",
                    field: "age"
                },
                {
                    title: "Third column",
                    field: "name"
                },
                {
                    title: "Last column",
                    component: (user) => {
                        return <button>Delete {user.name}</button>
                    }
                }
            ]}
            data={
                [
                    {
                        id: 0,
                        name: "John",
                        age: 12
                    },
                    {
                        id: 1,
                        name: "Janet",
                        age: 23
                    },
                    {
                        id: 2,
                        name: "Jack",
                        age: 14
                    },
                    {
                        id: 3,
                        name: "Jordan",
                        age: 23
                    },
                    {
                        id: 4,
                        name: "Jonathan",
                        age: 13
                    },
                ]
            }
            details={(item) => {
                return <p className="details">Item: {item.id} {item.name}</p>;
            }}
            sorterComponent={(sorted) => <span>{sorted}</span>}
            maxHeight="120px"
        />
      </div>
    );
  }
}

export default App;
