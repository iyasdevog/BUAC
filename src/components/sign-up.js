import React from "react";
import logo from "./../logo.png";

const signup = () => {
  return (
    <React.Fragment>
      <header className="header">
        <img src={logo} className="header-logo" alt="logo" />
        <h1 className="primary-header">Bustanul Uloom Arabic college</h1>
        <form action="#" className="form">
          <input type="text" placeholder="Name" className="input" required />
          <input
            type="email"
            placeholder="Username or Email id"
            className="input"
            required
          />
          <input type="text" placeholder="contact" className="input"></input>
          {/* <input type="password" placeholder="password" className="input" />
          <input
            type="password"
            placeholder="confirm password"
            className="input"
          /> */}
          <textarea placeholder="Address" className="input"></textarea>

          {/* <div className="btn-box">
            <button className="btn ">Login</button>
            <button className="btn btn-signup ">signup</button>
          </div> */}
        </form>
      </header>
    </React.Fragment>
  );
};

export default signup;
