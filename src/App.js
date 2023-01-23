import { useEffect, useState } from "react";
import "./variables.scss";
import { Footer } from "./views/Footer/Footer";
import { MyForm } from "./views/Form/Form";
import { Header } from "./views/Header/Header";
import { Hero } from "./views/Hero/Hero";
import { Users } from "./views/Users/Users";

function App() {
  const [token, setToken] = useState(null);
  const [tokenError, setTokenError] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [positions, setPositions] = useState([]);
  const [noMoreUsers, setNoMoreUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token && !tokenError) {
      getUsers();
      positions.length === 0 && getPosition();
    }
    if (tokenError) {
      setToken(null);
      tokenError(null);
    }
  }, [token, tokenError]);

  const getToken = () => {
    setIsLoading(true);
    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setToken(data.token);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function getUsers() {
    fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=5`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setUsers([...data.users]);
        setPage((page) => page + 1);
        if (data.total_pages === page) setNoMoreUsers(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setTokenError(error);
        console.log(error);
      });
  }
  function addUsers() {
    setIsLoading(true);
    fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=5`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.total_pages === page) setNoMoreUsers(true);
        setUsers((users) => [...users, ...data.users]);
        setIsLoading(false);
      })
      .catch((error) => {
        setTokenError(error);
        console.log(error);
      });
  }

  function getPosition(token) {
    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/positions", {
      method: "GET",
      headers: { Token: token },
    })
      .then((res) => res.json())
      .then((data) => setPositions(data.positions));
  }

  return (
    <div className="App">
      <Header token={token} getUsers={getUsers} getToken={getToken} />
      <Hero getToken={getToken} />
      {token && (
        <Users
          isLoading={isLoading}
          users={users}
          addUsers={addUsers}
          noMoreUsers={noMoreUsers}
        />
      )}
      {<MyForm token={token} positions={positions} getUsers={getUsers} />}
      <Footer />
    </div>
  );
}

export default App;
