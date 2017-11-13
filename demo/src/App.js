import React, { Component } from 'react';
import Table from "@simple-gui/react-simple-table";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: "User name",
          field: "name"
        },
        {
          title: "User ID",
          field: "id"
        }
      ]
    };

    this.reorder = this.reorder.bind(this);
  }

  render() {
    return (
      <div className="App">
        <Table
          className="demo"
          semantic={false}
          onReorder={this.reorder}
          onRowClick={(row, event) => {
            console.log(row);
            console.log(event);
          }}
          data={[
            {
              id: "1",
              name: "Bob"
            },
            {
              id: "2",
              name: "Alice"
            }
          ]}
          columns={this.state.columns}
        />
      </div>
    );
  }

  reorder(sourceTitle, targetTitle) {
    const keyMatches = (column, title) => column.title === title;
    const keyMatchesToSourceColumnKey = (column) => keyMatches(column, sourceTitle);
    const keyMatchesToTargetColumnKey = (column) => keyMatches(column, targetTitle);
    const sourceColumnIndex = this.state.columns.findIndex(keyMatchesToSourceColumnKey);
    const targetColumnIndex = this.state.columns.findIndex(keyMatchesToTargetColumnKey);
    const newColumns = [...this.state.columns];

    newColumns.splice(
        targetColumnIndex,
        0,
        newColumns.splice(sourceColumnIndex, 1)[0]
    );

    this.setState({
      columns: newColumns
    });
  }
}

export default App;
