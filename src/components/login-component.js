import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

// 将登录页输入的信息存成state，再将state以JSON的形式传给后端
const LoginComponent = (props) => {
  let { setCurrentUser } = props;
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    AuthService.login(email, password)
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        window.alert(
          "Login successfully, you are now redirected to the profile page."
        );
        setCurrentUser(AuthService.getCurrentUser());
        navigate("/profile", { replace: true });
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <h3>LOGIN</h3>
      <br />
      <div>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <button onClick={handleLogin} className="btn btn-primary btn-block">
            <span>Login</span>
          </button>
          <Link
            to="/register"
            style={{ marginLeft: "10rem" }}
            className="btn btn-primary btn-block"
          >
            <span>register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
