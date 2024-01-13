import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import NotesList from "./components/NotesList";
import NavBarComp from "./components/NavBarComp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState({
    username: "",
    password: "",
  });

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
      </Routes>
    </>
  );
}

export default App;