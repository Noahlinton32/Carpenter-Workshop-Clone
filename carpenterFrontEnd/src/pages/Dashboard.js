import React from 'react'
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
const Dashboard = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
        <GlobalStyle/>



    </div>
  )
}

export default Dashboard;