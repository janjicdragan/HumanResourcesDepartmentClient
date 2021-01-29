import React, { useContext } from "react";
import Employee from "./Employee";
import { AppContext } from "./Context";

function EmployeeList() {
  const { token, employees, setEmployees, isLoading } = useContext(AppContext);

  const handleDelete = async (id) => {
    const deleteRequest = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
      },
    };

    await fetch("https://localhost:44321/api/employees/" + id, deleteRequest)
      .then((resp) => resp.json())
      .then((data) => setEmployees(data))
      .catch((er) =>
        alert("Error occrured during delete process: " + er.message)
      );
  };

  return (
    <section>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <section>
          {token ? (
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>First and Last Name</th>
                  <th>Role</th>
                  <th>Year of Employment</th>
                  <th>Birth Year</th>
                  <th>Organizational Unit</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <Employee employees={employees} handleDelete={handleDelete} />
            </table>
          ) : (
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>First and Last Name</th>
                  <th>Role</th>
                  <th>Year of Employment</th>
                  <th>Organizational Unit</th>
                </tr>
              </thead>
              <Employee employees={employees} />
            </table>
          )}
        </section>
      )}
    </section>
  );
}

export default EmployeeList;
