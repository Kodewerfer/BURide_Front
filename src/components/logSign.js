import React from 'react';

// CSS gose here

export default class LogSignPage extends React.Component {
  constructor(props) {
    super(props);
    // isLogIn: true for login, false for signup.
    this.state = {
      isLogIn: true,
      uname: "",
      upass: ""
    }
  }
  handleUname(event) {
    this.setState({
      uname: event.target.value
    })
  }
  handleUPass(event) {
    this.setState({
      upass: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.isLogIn) {
      this.props.onLogin({
        username: this.state.uname,
        password: this.state.upass
      });
    } else {
      this.props.onSignUp({
        username: this.state.uname,
        password: this.state.upass
      });
    }
  }
  switchAction() {
    this.setState({
      isLogIn: !this.state.isLogIn
    })
  }
  render() {
    return (
      <div className="logsign-wrapper" >
        <h2>{this.state.isLogIn ? "Login" : "Signup"}</h2>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div className="logsign-items">
            <label htmlFor="logUName">User name : </label>
            <input id="logUName" type="text" placeholder="aaa@bbb.com" required value={this.state.uname} onChange={(event) => this.handleUname(event)} />
          </div>
          <div className="logsign-items">
            <label htmlFor="logUPass">Password : </label>
            <input id="logUPass" type="password" value={this.state.upass} required onChange={(event) => this.handleUPass(event)} />
          </div>
          <div className="logsign-button">
            <input type="submit" value="Submit" />
          </div>
          <div className="logsign-button">
            <input type="button" onClick={() => this.switchAction()} value={this.state.isLogIn ? "Create new user" : "Already have an account?"} />
          </div>
        </form>
      </div>
    );
  }
}