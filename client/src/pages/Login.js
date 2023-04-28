import logo from "../components/Navbar/images/CSLogo.png";
import axios from "axios";
import { useContext,  } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, useAuth } from "../authContext";
import { useState } from "react";
import styled, {createGlobalStyle, css} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html{
    height: 100%;

  }

  body{
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to top, #d1913c, #ffd194);
    background-attachment: fixed;
    height: 100%;
    margin: 0;
    color: 555;
  }
`
const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
` 

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  height: 100%;
  padding: 0 20px;
  padding-bottom: 2%;

`
const StyledForm = styled.form`
  width: 100%;
  max-width: 1000px;
  padding: 40px; 
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
`

const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles}

`
const StyledTextArea = styled.textarea`

`

const StyledButton = styled.button`
  display: block;
  background-color: #D1913C;
  color: #fff;
  font-size: .9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  boz-sizing: border-box;

`

const styledFieldset = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  
  legend{
    padding: 0 10px;
  }

  label{
    padding-right: 20px;
  }

  input{
    margin-right: 10px;
  }
  `
const StyledError = styled.div`
  color: red;
  font-weight: 800;
  margin: 0 0 40px 0;
`






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
    <>
    <GlobalStyle/>
    <div className="login-formParent">
      <StyledFormWrapper>
        <StyledForm className="login-form" onSubmit={handleSubmit}>
          
          <img src={logo} className="login-logo" alt="carpetner logo" style={{width: '100%', maxWidth:'850px'}}/>
          <br />
          <div className="login-border">
            <p className="login-text">Student Access Management Portal (SAMP)</p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <label htmlFor="userName">Username: </label>
            <StyledInput
              type="text"
              placeholder="Employee ID"
              className="login-username"
              id="userName"
              name="username"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="password">Password: </label>
            <StyledInput
              type="password"
              placeholder="Password"
              className="login-password"
              id="password"
              name="password"
              onChange={handleChange}
            />
            <br />
            <StyledButton type="submit" defaultValue="Login" style={{margin: 'auto', width: '15%', minWidth:'100px'}}>Log in</StyledButton> 
          </div>
        </StyledForm>
      </StyledFormWrapper>
    </div>
    </>
  );
};

export default Login;