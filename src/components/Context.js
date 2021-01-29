import React, { useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [token, setToken] = useState(null);
  const [filter, setFilter] = useState(null);

  const getEmployees = async () => {
    let request = {};
    let url = "";

    if (!filter) {
      url = "https://localhost:44321/api/employees/";
      request = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
    }

    if (filter) {
      url = "https://localhost:44321/api/employeesfilter";
      request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access_token,
        },
        body: filter.stringify(),
      };
    }

    await fetch(url, request)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
      })
      .catch((e) => alert("Error occured during fetching data: " + e.message));

    setLoading(false);
  };

  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      setToken(userToken);
    } else {
      setToken(null);
    }
  };

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const deleteToken = () => {
    const tokenString = sessionStorage.getItem("token");
    if (tokenString) {
      sessionStorage.removeItem("token");
      setToken(null);
    }
  };

  useEffect(() => {
    getToken();
  }, [employees]);

  useEffect(() => {
    getEmployees();
  }, [filter, token]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        employees,
        setEmployees,
        token,
        saveToken,
        deleteToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
