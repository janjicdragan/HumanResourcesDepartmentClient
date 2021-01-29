import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./Context";

function AddForm() {
  const [organizationUnits, setOrganizationUnits] = useState([]);
  const [unit, setUnit] = useState("");
  const [role, setRole] = useState("");
  const [firstAndLastName, setFirstAndLastName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [employmentYear, setEmploymentYear] = useState("");
  const [salary, setSalary] = useState("");

  const { isAdded, setIsAdded, token } = useContext(AppContext);

  const getOrganizationUnits = async () => {
    await fetch("https://localhost:44321/api/organizationalunits")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setOrganizationUnits(data);
      })
      .catch((er) => {
        alert("An error has occured during fetching data: " + er.message);
        setOrganizationUnits([]);
      });
  };

  const handleChange = (value) => {
    setUnit(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
      },
      body: JSON.stringify({
        OrganizationalUnitId: unit,
        Role: role,
        FirstAndLastName: firstAndLastName,
        BirthYear: birthYear,
        EmploymentYear: employmentYear,
        Salary: salary,
      }),
    };

    await fetch("https://localhost:44321/api/employees", request)
      .then((res) => {
        if (res.status === 201) {
          setIsAdded(!isAdded);
          setUnit("");
          setRole("");
          setFirstAndLastName("");
          setBirthYear("");
          setEmploymentYear("");
          setSalary("");
        }
      })
      .catch((er) =>
        alert("An error has occured during adding procces: " + er.message)
      );
  };

  const handleCancel = () => {
    setUnit("");
    setRole("");
    setFirstAndLastName("");
    setBirthYear("");
    setEmploymentYear("");
    setSalary("");
  };

  useEffect(() => {
    getOrganizationUnits();
  }, []);

  return (
    <div>
      {token ? (
        <form onSubmit={handleSubmit} className="filterForm">
          <h3>Add a new employee:</h3>
          <div className="form-group">
            <label htmlFor="orgUnit">Organizational unit:</label>
            <select
              id="addUnit"
              className="form-select"
              onChange={(e) => handleChange(e.target.value)}
            >
              {organizationUnits.map((unit) => {
                return (
                  <option value={unit.id} key={unit.id}>
                    {unit.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              placeholder="Enter role:"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstAndLastName">First and last name:</label>
            <input
              type="text"
              id="firstAndLastName"
              placeholder="Enter first and last name:"
              className="form-control"
              value={firstAndLastName}
              onChange={(e) => setFirstAndLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthYear">Birth year:</label>
            <input
              type="number"
              id="birthYear"
              placeholder="Enter birth year:"
              className="form-control"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="employmentYear">Employment year:</label>
            <input
              type="number"
              id="employmentYear"
              placeholder="Enter year of employment:"
              className="form-control"
              value={employmentYear}
              onChange={(e) => setEmploymentYear(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary:</label>
            <input
              type="number"
              id="salary"
              placeholder="Enter salary"
              className="form-control"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-outline-success">
              Add
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default AddForm;
