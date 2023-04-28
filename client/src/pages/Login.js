import logo from "../components/Navbar/images/CSLogo.png";
import axios from "axios";
import { useContext,  } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, useAuth } from "../authContext";
import { useState } from "react";
const Login = () => {
  // Get the login function from the authentication context
  const { login: loginUser } = useContext(AuthContext);
  const auth = useAuth();
  // State to store the login form data
  const [Login, setLogin] = useState({ username: "", password: "" });
  // State to control whether the user should be redirected to the dashboard
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  // The handleSubmit function is necessary because it acts as a wrapper around
  // the getLogin function, which makes the API call to authenticate the user.
  // By calling handleSubmit on form submission, we can prevent the default
  // form submission behavior, which would cause a page reload and disrupt the
  // user experience. Instead, we can call getLogin directly to perform the
  // authentication process without causing any disruption to the user.
  const [errorMessage, setErrorMessage] = useState("");
  const getLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        username: Login.username,
        password: Login.password,
      });
      console.log("Response from server:", res.data);
      if (res.data.success) {
        if (res.data.user.isActive) { // Check if the user is active
          loginUser(res.data);
          setRedirectToDashboard(true);
        } else {
          // Set an error message if the user is not active
          setErrorMessage("Your account is not active, please contact your system administrator.");
        }
      } else {
        setErrorMessage("Login failed"); // Set an error message if the login failed
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
    // Handler for input changes in the login form
    const handleChange = (e) => {
      setLogin({ ...Login, [e.target.name]: e.target.value });
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    getLogin();
  };
  
  if (redirectToDashboard) {
    return <Navigate to={auth.user.isAdmin ? "/admin" : "/dashboard"} />;
  }
  // Render the login form
  return (
    <div className="login-formParent">
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          
          <img src={logo} className="login-logo" alt="carpetner logo" />
          <br />
          <div className="login-border">
            <p className="login-text">Student Access Management Portal (SAMP)</p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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