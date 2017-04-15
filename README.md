# React Simple Table

React Simple Table (RST) provides a way to simple define table component
with basic functionality.

## Usage

This compoment is not available via npm, so you have to add this line to your
package.json in devDependencies section:
```
"react-simple-table": "kazagkazag/react-simple-table"
```

Now you can use it in your project:

```jsx
// somewhere in your components...

import Table from "react-simple-table";

<Table {...props} />
```

## Props

### `className` (string) 
Base class name. All components within table will inherit from that
base class and add some sufix to it (according to the BEM methodology).

Suffixes:
* `-container` for `table` container
* `_head` for `thead`
* `_head-row` for row in `thead`
* `_th` for `th`
* `_body` for `tbody`
* `_row` for row in `tbody`
* `_cell` for `td`

### `columns` (array) 
List of objects. Every object is a definition of column in your table.
Each column could have following properties:

#### `columns.title` (string) 
The title of the column, displayed in `<thead>`
#### `columns.field` (string) 
The name of the field from which column will display
data. `field` could indicate name of the property from your data objects, 
if your data is defined as list of objects, or index of the element if 
your data is defined as list of lists
#### `columns.sorted` (string) 
One of the following: `ASC`, `DESC`. Describes direction
of data sorting using on that column. This property only adds class on
columns cells, this will not sort your data!
#### `columns.component` (function) 
If you want to specify column unrelated to
specified data, for example column with available actions of item, 
you can use this function. It accepts two parameters "
* data of current row
* toggler function - if `details` props is specified for `Table`, then this function enables
toggling details row

### `data` (array) 
List of objects or lists. Every item represents one row
of your data. 
* If item is an array, then `columns[n].field` should point to the
index of element in that item. 
* If item is an object, then `columns[n].filed` should point to the 
property name of the item.

### `details` (function) 
Function that returns component. Takes one argument
- data from clicked row (in the form specified in `data` list).

### `detailsInlined` (boolean)
If `true` **and** `semantic` equals `false`, then rows details component will be rendered inside clicked row
as last child with css class `with-inlined-details`.

### `sorterComponent` (function) 
Function that returns component rendered
in table header. Takes one argument - string specified as `sorted` property
in columns definition. If you wan't to display sorter in header, you have to
specify `sorted` property in column definition.

### `maxHeight` (string) 
Valid css value for "max-height" property. If
specified then entire table is wrapped in div with that "max-height" applied.

### `onScrollToBottom` (function) 
Function fired after user scrolled to the bottom of the table. 
Takes one argument - react event.

### `onSort` (function)
Function fired after click on `th` element. Takes one argument - object from `columns` of clicked column.

### `sematinc` (boolean)
Default: `true`. If `false`, table will render with non semantic markup - `divs` will be use instead of all
HTML table elements.

### `bodyWrapper` (function)
Function that returns component wrapping entire table body.
Takes one argument - `body` which should be rendered inside your component.

## Examples

### Table with two columns and two rows, data defined as list of objects.

```jsx

<Table 
    data={[
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Bob"
        }
    ]}
    columns={[
        {
            title: "User name",
            field: "name"
        },
        {
            title: "User ID",
            field: "id"
        }
    ]}
/>

// result: Table with two columns: 
// 1. User name -> from "name" field of data item
// 2. User ID ->  from "id" field of data item
```

### Table with two columns and two rows, data defined as list of lists.

```jsx

<Table 
    data={[
        [
            1,
            "John"
        ],
        [
            2,
            "Bob"
        ]
    ]}
    columns={[
        {
            title: "User name",
            field: 1
        },
        {
            title: "User ID",
            field: 0
        }
    ]}
/>

// result: Table with two columns: 
// 1. User name -> from [1] field of data item
// 2. User ID ->  from [0] field of data item
```

### Table with three columns and two rows, data defined as list of objects. Last column contains button.

```jsx

<Table 
    data={[
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Bob"
        }
    ]}
    columns={[
        {
            title: "User name",
            field: "name"
        },
        {
            title: "User ID",
            field: "id"
        },
        {
            title: "Actions",
            component: user => <button>Delete user: {user.name}</button>
        }
    ]}
/>

// result: Table with three columns: 
// 1. User name -> from "name" field of data item
// 2. User ID ->  from "id" field of data item
// 3. Actions -> Button with "Delete user: John" in first row, and "Delete user: Bob" in second row.
```

### Table with two columns and two rows, data defined as list of objects. Details component specified.

```jsx

<Table 
    data={...like in previous example...}
    columns={[
        {
            title: "User name",
            field: "name"
        },
        {
            title: "User ID",
            field: "id"
        }
    ]}
    details={user => <p className="details">User: {user.id} {user.name}</p>}
/>

// result: Table with two columns: 
// 1. User name -> from "name" field of data item
// 2. User ID ->  from "id" field of data item

// After click on any row details row expands with paragraph 
// containing text "User: 1 John" for first row, and "User 2 Bob" for second row.
```

### Table with two columns and two rows, data defined as list of objects. Sorter component defined.

```jsx

<Table 
    data={...like in previous example...}
    columns={[
        {
            title: "User name",
            field: "name",
            sorted: "ASC"
        },
        {
            title: "User ID",
            field: "id"
        }
    ]}
    sorterComponent={sorted => <span>{sorted}</span>}
/>

// result: Table with two columns: 
// 1. User name -> from "name" field of data item
// 2. User ID ->  from "id" field of data item

// First column will contain span element with "ASC" text inside. 
// Second column will not have any sorter indicator, because
// it doesn't have "sorted" specified.
```
### Table with three columns and two rows, data defined as list of objects. Last column contains button.

```jsx

<Table 
    data={[
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Bob"
        }
    ]}
    columns={[
        {
            title: "User name",
            field: "name"
        },
        {
            title: "User ID",
            field: "id"
        },
        {
            title: "Actions",
            component: user => <button>Delete user: {user.name}</button>
        }
    ]}
/>

// result: Table with three columns: 
// 1. User name -> from "name" field of data item
// 2. User ID ->  from "id" field of data item
// 3. Actions -> Button with "Delete user: John" in first row, and "Delete user: Bob" in second row.
```

### Table with two columns and two rows, data defined as list of objects. Details component specified.

```jsx

<Table 
    data={...like in previous example...}
    columns={[
        {
            title: "User name",
            field: "name"
        },
        {
            title: "User ID",
            field: "id"
        }
    ]}
    details={user => <p className="details">User: {user.id} {user.name}</p>}
/>

// result: Table with two columns: 
// 1. User name -> from "name" field of data item
// 2. User ID ->  from "id" field of data item

// After click on any row details row expands with paragraph 
// containing text "User: 1 John" for first row, and "User 2 Bob" for second row.
```

### Table with two columns and two rows, data defined as list of objects. Sorter component defined.

```jsx

<Table 
    data={...like in previous example...}
    columns={[
        {
            title: "User name",
            field: "name",
            sorted: "ASC"
        },
        {
            title: "User ID",
            field: "id"
        }
    ]}
    sorterComponent={sorted => <span>{sorted}</span>}
/>

// result: Table with two columns: 
// 1. User name -> from "name" field of data item
// 2. User ID ->  from "id" field of data item

// First column will contain span element with "ASC" text inside. 
// Second column will not have any sorter indicator, because
// it doesn't have "sorted" specified.
```