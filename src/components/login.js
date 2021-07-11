import React from "react";
import logo from "./../logo.png";

const login = () => {
  return (
    <React.Fragment>
      <header className="header">
        <img src={logo} className="header-logo" alt="logo" />
        <h1 className="primary-header">Bustanul Uloom Arabic college</h1>
        <form action="#" className="form">
          <input
            type="email"
            placeholder="Username or Email id"
            className="input"
            required
          />
          <input
            type="password"
            placeholder="password"
            className="input"
            required
          />
          <div className="btn-box">
            <button className="btn ">sign-up</button>
            <button className="btn btn-login">Login</button>
          </div>
        </form>
      </header>
    </React.Fragment>
  );
};

export default login;
