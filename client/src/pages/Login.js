import logo from "../components/Navbar/images/CSLogo.png";
import axios from "axios";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { useState } from "react";
const Login = () => {
  const { login: loginUser } = useContext(AuthContext);
  const [Login, setLogin] = useState({ username: "", password: "" });
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    getLogin();
  };

  const getLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        username: Login.username,
        password: Login.password,
      });

      if (res.data.success) {
        console.log("Login successful:", res.data.message);
        loginUser(res.data);
        setRedirectToDashboard(true);
      } else {
        console.log("Login failed:", res.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  if (redirectToDashboard) {
    return <Navigate to="/dashboard" />;
  }

  const handleChange = (e) => {
    setLogin({ ...Login, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-formParent">
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <img src={logo} className="login-logo" alt="carpetner logo" />
          <br />
          <div className="login-border">
            <p className="login-text">Student Access Management Portal (SAMP)</p>
            <input
              type="text"
              placeholder="Employee ID"
              className="login-username"
              id="userName"
              name="username"
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              className="login-password"
              id="password"
              name="password"
              onChange={handleChange}
            />
            <br />
            <input type="submit" className="login-submit" defaultValue="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;