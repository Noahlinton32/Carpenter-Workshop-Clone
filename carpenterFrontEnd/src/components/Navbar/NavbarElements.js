import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import {FaBars} from "react-icons/fa";

export const Nav = styled.nav`
    background: #cc5c29;
    height: 80px;
    display: flex; 
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 100000;
`
export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        color: #15cdfc;
    }
`

export const Bars = styled(FaBars)`
    display: none;
    color: #fff;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }

`
export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;

    @media screen and (max-width: 768px) {
        display: none;
    }

`

export const NavBtn = styled.nav`
    display:flex;
    height: 50%;
    align-tems: center;
    margin-top: 1%;
    margin-right: 0px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`
export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #cc5c29;
    padding: 10px, 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`
;
