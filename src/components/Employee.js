import React, { useContext } from "react";
import { AppContext } from "./Context";

function Employee({ employees, handleDelete }) {
  const { token } = useContext(AppContext);

  return employees.map((employee) => {
    return (
      <tbody>
        {token ? (
          <tr key={employee.id}>
            <td>{employee.firstAndLastName}</td>
            <td>{employee.role}</td>
            <td>{employee.employmentYear}</td>
            <td>{employee.birthYear}</td>
            <td>{employee.organizationalUnit.name}</td>
            <td>{employee.salary}</td>
            <td>
              <button
                onClick={() => handleDelete(employee.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ) : (
          <tr key={employee.id}>
            <td>{employee.firstAndLastName}</td>
            <td>{employee.role}</td>
            <td>{employee.employmentYear}</td>
            <td>{employee.organizationalUnit.name}</td>
          </tr>
        )}
      </tbody>
    );
  });
}

export default Employee;
