import React, { useState, useContext } from "react";
import { AppContext } from "./Context";

function FilterForm() {
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const { setFilter, token } = useContext(AppContext);

  const handleFilter = (e) => {
    e.preventDefault();
    setFilter({ minSalary: minSalary, maxSalary: maxSalary });
  };

  const handleCancel = () => {
    setMinSalary("");
    setMaxSalary("");
    setFilter(null);
  };

  return (
    <div>
      {token ? (
        <form onSubmit={handleFilter} className="filterForm">
          <h4>Filter workers by salary:</h4>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="minSalary">Minimum salary:</label>
                <input
                  type="number"
                  id="minSalary"
                  placeholder="Enter minimum salary"
                  className="form-control"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="maxSalary">Maximum salary:</label>
                <input
                  type="number"
                  id="maxSalary"
                  placeholder="Enter maximum salary"
                  className="form-control"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="filterButtons">
                <button
                  type="submit"
                  className="btn btn-outline-warning filterBtn"
                >
                  Filter
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger filterBtn"
                  onClick={() => handleCancel()}
                >
                  Cancel filter
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default FilterForm;
