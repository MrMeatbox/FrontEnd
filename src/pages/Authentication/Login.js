import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import Links from "../../helpers/Links";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios.post(Links.Login, data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        history.push("/");
      }
    });
  };
  return (
    <section className="login">
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text" placeholder="(Ex. John123...)"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password" placeholder="Your Password..."
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <div className="btnContainer">
      <button onClick={login}> Login </button>
      </div>
    </div>
    </section>
  );
}

export default Login;
