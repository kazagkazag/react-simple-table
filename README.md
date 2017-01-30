# React Simple Table

React Simple Table (RST) provides a way to simple define table component
with basic functionality.

## Usage

```
npm install --save-dev react-simple-table
```

```jsx
// somewhere in your components...

import {Table} from "react-simple-table";

<Table {...props} />
```

## Props

* `className` (string) - base class name. All components within table will inherit from that
base class and add some sufix to it (according to the BEM methodology).
* `columns` (array) - list of objects. Every object is a definition of column in your table.
Each column could have following properties:
    * `title` (string) - the title of the column, displayed in `<thead>`
    * `field` (string) - the name of the field from which column will display
    data. `field` could indicate name of the property from your data objects, 
    if your data is defined as list of objects, or index of the element if 
    your data is defined as list of lists
    * `sorted` (string) - one of the following: `ASC`, `DESC`. Describes direction
    of data sorting using on that column. This property only adds class on
    columns cells, this will not sort your data!
    * `component` (function) - if you want to specify column unrelated to
    specified data, for example column with available actions of item, 
    you can use this function. It accepts one parameter - data of current row.
* `data` (array) - list of objects or lists. Every item represents one row
of your data. 
    * If item is an array, then `columns[n].field` should to point to the
index of element in that item. 
    *If item is an object, then `columns[n].filed` should point to the 
    property name of the item.
* `details` (function) - function that returns component. Takes one argument
- data from clicked row (in the form specified in `data` list)
* `sorterComponent` (function) - function that returns component rendered
in table header. Takes one argument - string specified as `sorted` property
in columns definition. If you wan't to display sorter in header, you have to
specify `sorted` property in column definition.
* `maxHeight` (string) - valid css value for "max-height" property. If
specified then entire table is wrapped in div with that "max-height" applied.
* `onScrollToBottom` (function) - function fired after user scrolled
to the bottom of the table. Takes one argument - react event.