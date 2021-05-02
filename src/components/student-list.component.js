import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import StudentTableRow from "./StudentTableRow";

export default class StudentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/students")
      .then((res) => {
        this.setState({
          student: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  Datatable = () => {
    return this.state.student.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />;
    });
  };

  render() {
    return (
      <div className="table-wrapper">
        <h1>Student List</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>RollNo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.Datatable()}</tbody>
        </Table>
      </div>
    );
  }
}
