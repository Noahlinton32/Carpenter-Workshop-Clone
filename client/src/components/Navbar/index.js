import React from 'react'
import {Nav , NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from "./NavbarElements";
import Logo from './images/CSLogo.png'
import { AuthContext } from '../../authContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <>
    <Nav>
    <NavLink to="/dashboard">
            Home
        </NavLink>
        <Bars />
        <NavMenu>
            <NavLink to="/students" activeStyle>Students</NavLink>

            <NavLink to="/accidents" activeStyle>Accidents</NavLink>

            <NavLink to="/incidents" activeStyle>Incidents</NavLink>

            <NavLink to="/referrals" activeStyle>Referrals</NavLink>

            <NavLink to="/profile" activeStyle>Profile</NavLink>
        </NavMenu>
        <NavBtn>
        <NavBtnLink to="/" onClick={handleLogout}>Log Out</NavBtnLink>
        </NavBtn>
    </Nav>
    </>
  )
}

export default Navbar;