import React from 'react';
import { navigate } from "@reach/router"
// CSS gose here

export default function LogSignPage({ token, onSignUp, onLogin }) {

  let [isLogIn, setLogin] = React.useState(true);
  let [uname, setUname] = React.useState("");
  let [upass, setUpass] = React.useState("");


  if (token) {
    navigate('/');
  }

  return (
    <div className="logsign-wrapper" >
      <h2>{isLogIn ? "Login" : "Signup"}</h2>
      <form onSubmit={(event) => {
        event.preventDefault();

        if (isLogIn) {
          onLogin({
            username: uname,
            password: upass
          });
        } else {
          onSignUp({
            username: uname,
            password: upass
          });
        }
      }}>
        <div className="logsign-items">
          <label htmlFor="logUName">User name : </label>
          <input id="logUName" type="text" placeholder="aaa@bbb.com" required value={uname} onChange={(event) => setUname(event.target.value)} />
        </div>
        <div className="logsign-items">
          <label htmlFor="logUPass">Password : </label>
          <input id="logUPass" type="password" value={upass} required onChange={(event) => setUpass(event.target.value)} />
        </div>
        <div className="logsign-button">
          <input type="submit" value="Submit" />
        </div>
        <div className="logsign-button">
          <input type="button" onClick={() => setLogin(!isLogIn)} value={isLogIn ? "Create new user" : "Already have an account?"} />
        </div>
      </form>
    </div>
  );
}