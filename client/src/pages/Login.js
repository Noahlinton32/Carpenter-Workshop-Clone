
import logo from "../components/Navbar/images/CSLogo.png";
import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
    
    const [Login, setLogin] = useState({ username: "", password: "" });
    useEffect (() => {
      getLogin();
    }, []);
        // Functions
        const getLogin = async (e) => {
          e.preventDefault();
          //get login info
          try {
            const res = await axios.post("http://localhost:3000/login", {
              username: Login.username,
              password: Login.password,
            });
        
            if (res.data.success) {
              console.log(Login.username);
              console.log(Login.password);
              console.log("Login successful:", res.data.message);
              // successful login
            } else {
              console.log(Login.username);
              console.log(Login.password);
              console.log("Login failed:", res.data.message);
              // login failure
            }
          } catch (error) {
            console.error("Error during login:", error);
          }
        };
  const handleChange = (e) => {
    setLogin({ ...Login, [e.target.name]: e.target.value });
  };
  return (
    <div className="login-formParent">
      <div className="login-page">
        <form className="login-form" onSubmit={getLogin}>
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