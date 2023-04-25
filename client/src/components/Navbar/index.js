import React from 'react'
import {Nav , NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from "./NavbarElements";
import Logo from './images/CSLogo.png'

const Navbar = () => {
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
            <NavBtnLink to="/">Log Out</NavBtnLink>
        </NavBtn>
    </Nav>
    </>
  )
}

export default Navbar;