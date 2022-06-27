import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

function UserDataFunction() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://jsonplaceholder.typicode.com/users");
      setData(result.data);
      setFilter(result.data);
    };
    fetchData();
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredRows = data.filter((row) => {
      return row.name
        .toString()
        .toLowerCase()
        .includes(searchedVal.toString().toLowerCase());
    });
    if (searchedVal.length < 1) {
      setFilter(data);
    } else {
      setFilter(filteredRows);
    }
  };

  return (
    <div>
      <div>
        <TextField onChange={(e) => requestSearch(e.target.value)} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filter.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell align="right">{item.phone}</TableCell>
                <TableCell align="right">{item.website}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default UserDataFunction;
