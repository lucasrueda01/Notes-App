import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import NotesList from "./components/NotesList";
import NavBarComp from "./components/NavBarComp";
import AddForm from "./components/AddForm";

function App() {
  //////////////Login session persist///////////
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  });

  const [loggedUser, setLoggedUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedUser");
    return storedUser ? JSON.parse(storedUser) : { username: "", password: "" };
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
  }, [loggedUser]);
  /////////////////////////////////////////////

  const handleLogin = (user, password) => {
    setIsLoggedIn(true);
    setLoggedUser({
      username: user,
      password: password,
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLoggedUser({
      username: "",
      password: "",
    });
  };

  return (
    <>
      {isLoggedIn ? <NavBarComp user={loggedUser} /> : <></>}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<LoginForm onSubmit={handleLogin} onMount={logout} />}
        />
        <Route path="/home" element={<NotesList />} />
        <Route path="/add" element={<AddForm />} />
      </Routes>
    </>
  );
}

export default App;
