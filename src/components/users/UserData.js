import React, { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const USER_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";

class UserDataClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: [],
      searchedData: [],
      searchInput: "",
    };
  }
  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsersWithFetchAPI = () => {
    this.setState({ ...this.state, isFetching: true });
    fetch(USER_SERVICE_URL)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ data: result, isFetching: false });
        this.setState({ searchedData: this.state.data });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ ...this.state, isFetching: false });
      });
  };
  fetchUsers = this.fetchUsersWithFetchAPI;

  handleChange = (event) => {
    this.setState({ searchInput: event.target.value }, () => {
      this.globalSearch();
    });
  };

  globalSearch = () => {
    let { searchInput } = this.state;

    let filteredData = this.state.data.filter((value) => {
      return (
        value.name
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        value.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.username
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    });

    if (searchInput.length < 1) {
      this.setState({ searchedData: this.state.data });
    } else {
      this.setState({ searchedData: filteredData });
    }
  };

  render() {
    console.log(this.state.data);
    return (
      <div style={{ padding: 20 }}>
        <TextField onChange={this.handleChange} />
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Website</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.searchedData.map((user) => {
                return (
                  <TableRow
                    key={user.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.username}</TableCell>
                    <TableCell align="right">{user.phone}</TableCell>
                    <TableCell align="right">{user.website}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default UserDataClass;
