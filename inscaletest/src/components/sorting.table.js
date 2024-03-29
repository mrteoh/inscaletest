// src/components/sorting.table.js
import React from "react";

import { useTable, useSortBy } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'react-moment';

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    )

  
    //get latest
    var findLatest = getLatest(data);

    //get max
    var findMaxSalary = getMax(data, "salary");
        
    // Render the UI for your table
    return (
        <div>
            <table className="table" {...getTableProps()}>
                <thead>
                    {/* header */}
                    <tr>
                        <td>Total : {data.length} </td>
                    </tr>
                    <tr>
                        <td>Higher Earning employee : {findMaxSalary.firstname} {findMaxSalary.lastname}</td>
                    </tr>
                    <tr>
                        <td>Employee Most Recently Joined : {findLatest.firstname} {findLatest.lastname}</td>
                    </tr>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' '
                                                : ' '
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </div >
    )
}

//latest
function getLatest(arr) {
  var array = arr;
  
  var max = null;
  var min = null;
  
  for (var i = 0; i < array.length; i++) {
    var current = array[i];
    if (max === null || Date.parse(current.dateJoined) > Date.parse(max.dateJoined)) {
      max = current;
    }
    if (min === null || Date.parse(current.dateJoined) < Date.parse(min.dateJoined)) {
      min = current;
    }
  }

  return max;
  
}

//formate date
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('-');
}

//max
function getMax(arr, prop) {
  var max;
  for (var i=0 ; i<arr.length ; i++) {
      if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
          max = arr[i];
  }
  return max;
}

//date
function stringToDate(_date)
{
    return _date;
}


function SortingTableComponent() {
    const columns = React.useMemo(
        () => [
            {
                Header: ' ',
                columns: [
                    {
                        Header: 'Full Name',
                        accessor: 'fullname',
                        Cell: props => {
                          return (
                            <div>
                              {props.row.original.firstname} {props.row.original.lastname}
                            </div>
                          );
                        }
                    },
                ],
            },
            {
                Header: ' ',
                columns: [
                    {
                        Header: 'Employee ID',
                        accessor: 'employeeId',
                    },
                    {
                        Header: 'Date Joined',
                        // accessor: 'dateJoined',
                        accessor: 'dateJoined',
                        Cell : (props)=>{
                          // const custom_date = Date.parse(props.value);
                          const custom_date = Date.parse(props.value);
                          const result = formatDate(custom_date);
                          return <span>{result}</span>
                        }
                
                  
                    },
                    {
                        Header: 'Salary',
                        accessor: 'salary',
                    },
                ],
            },
        ],
        []
    )

    const data = [
        {
          "id": 1003,
          "employeeId": "07f17d85-d8d9-4802-8db9-e1d50f96ae4b",
          "firstname": "Dunn",
          "lastname": "Rosales",
          "dateJoined": "Fri Dec 09 1994 18:04:18 GMT+0800 (Malaysia Time)",
          "salary": 5863
        },
        {
          "id": 1004,
          "employeeId": "66bd4320-4075-4d87-873e-5bc9e9843744",
          "firstname": "Elsa",
          "lastname": "Hill",
          "dateJoined": "Mon Oct 27 1980 01:12:37 GMT+0730 (Malaysia Time)",
          "salary": 11444
        },
        {
          "id": 1005,
          "employeeId": "51ce9fe4-7fee-451a-a20c-ef0d626efd3a",
          "firstname": "Lea",
          "lastname": "Lindsay",
          "dateJoined": "Mon Jul 08 1991 13:19:00 GMT+0800 (Malaysia Time)",
          "salary": 8523
        },
        {
          "id": 1006,
          "employeeId": "636d7aa0-1777-46d9-87ac-b1406020372f",
          "firstname": "Morgan",
          "lastname": "Jarvis",
          "dateJoined": "Mon Jul 15 1985 07:25:52 GMT+0800 (Malaysia Time)",
          "salary": 9002
        },
        {
          "id": 1007,
          "employeeId": "d68dc6b0-87fc-4e7c-a4d0-5be688904c5b",
          "firstname": "Hancock",
          "lastname": "Cohen",
          "dateJoined": "Mon Apr 14 1980 23:41:12 GMT+0730 (Malaysia Time)",
          "salary": 10877
        },
        {
          "id": 1008,
          "employeeId": "8e1b2e3a-01aa-43d0-b3cb-ef95f396f77c",
          "firstname": "Gordon",
          "lastname": "Dodson",
          "dateJoined": "Fri Oct 20 1995 12:39:26 GMT+0800 (Malaysia Time)",
          "salary": 10084
        },
        {
          "id": 1009,
          "employeeId": "d667e0c3-f522-4725-83fb-45d43eba9591",
          "firstname": "Snow",
          "lastname": "Holland",
          "dateJoined": "Thu Apr 18 1991 19:25:12 GMT+0800 (Malaysia Time)",
          "salary": 5225
        },
        {
          "id": 1010,
          "employeeId": "14f17781-3c21-43f7-9520-3fa2f81e0e42",
          "firstname": "Helena",
          "lastname": "Chaney",
          "dateJoined": "Sat Sep 07 2002 13:29:50 GMT+0800 (Malaysia Time)",
          "salary": 11249
        },
        {
          "id": 1011,
          "employeeId": "1f4d687a-86d2-47d8-b11c-54f8a90d6cbd",
          "firstname": "Sargent",
          "lastname": "Conley",
          "dateJoined": "Fri Jul 27 2001 11:39:22 GMT+0800 (Malaysia Time)",
          "salary": 8040
        },
        {
          "id": 1012,
          "employeeId": "e01864b6-0e66-452a-9cfa-77b38ae871a2",
          "firstname": "Cynthia",
          "lastname": "Castaneda",
          "dateJoined": "Tue Mar 21 2017 03:28:58 GMT+0800 (Malaysia Time)",
          "salary": 9427
        },
        {
          "id": 1013,
          "employeeId": "68d9b90a-275b-4e6e-9115-560ab2989867",
          "firstname": "Natalia",
          "lastname": "Burks",
          "dateJoined": "Mon May 29 2006 15:14:04 GMT+0800 (Malaysia Time)",
          "salary": 5928
        },
        {
          "id": 1014,
          "employeeId": "e636a83a-7a8e-43d5-99da-93cfbd9d2ea5",
          "firstname": "Sharron",
          "lastname": "Austin",
          "dateJoined": "Mon Feb 09 1981 21:02:47 GMT+0730 (Malaysia Time)",
          "salary": 9794
        },
        {
          "id": 1015,
          "employeeId": "734131db-7059-4609-b79d-ddba1e8ec137",
          "firstname": "Houston",
          "lastname": "Booth",
          "dateJoined": "Tue Oct 16 2007 03:40:28 GMT+0800 (Malaysia Time)",
          "salary": 5983
        },
        {
          "id": 1016,
          "employeeId": "47ef498e-236b-4e15-9a6a-519b3a9e8424",
          "firstname": "Lindsey",
          "lastname": "Guzman",
          "dateJoined": "Sat Oct 27 1973 08:52:45 GMT+0730 (Malaysia Time)",
          "salary": 10291
        },
        {
          "id": 1017,
          "employeeId": "e5c84741-ae24-462b-936c-29484aa0b9db",
          "firstname": "Russo",
          "lastname": "Cabrera",
          "dateJoined": "Mon Apr 29 2002 10:48:37 GMT+0800 (Malaysia Time)",
          "salary": 10693
        },
        {
          "id": 1018,
          "employeeId": "7b38fb59-6eec-4aa3-bcbf-dda8c40212c3",
          "firstname": "Lowe",
          "lastname": "Talley",
          "dateJoined": "Fri Oct 27 2017 02:58:25 GMT+0800 (Malaysia Time)",
          "salary": 6451
        },
        {
          "id": 1019,
          "employeeId": "6d1ebcc0-a1b9-494c-8e84-9438f6ef621f",
          "firstname": "Lina",
          "lastname": "White",
          "dateJoined": "Sat Aug 04 2018 10:04:20 GMT+0800 (Malaysia Time)",
          "salary": 8740
        },
        {
          "id": 1020,
          "employeeId": "f3a6d231-34bd-4052-b95c-41e7c6e98a3d",
          "firstname": "Kristie",
          "lastname": "Roberts",
          "dateJoined": "Wed Jan 23 1974 02:09:22 GMT+0730 (Malaysia Time)",
          "salary": 5418
        },
        {
          "id": 1021,
          "employeeId": "fd7aabdf-72d4-4450-993d-50184f3200d8",
          "firstname": "Hilary",
          "lastname": "Shields",
          "dateJoined": "Thu Mar 13 1980 14:18:38 GMT+0730 (Malaysia Time)",
          "salary": 6641
        },
        {
          "id": 1022,
          "employeeId": "056ab441-6887-4e8e-9695-db210bc1dd71",
          "firstname": "Evelyn",
          "lastname": "Mason",
          "dateJoined": "Tue Mar 08 2005 06:12:19 GMT+0800 (Malaysia Time)",
          "salary": 6885
        }
      ]

    return (
        <Table columns={columns} data={data} />
    )
}

export default SortingTableComponent;