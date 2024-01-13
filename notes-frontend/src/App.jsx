import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";

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

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm onSubmit={handleLogin} />} />
      </Routes>
    </>
  );
}

export default App;
