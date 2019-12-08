import React from 'react';

// CSS gose here

export default class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    this.props.onLogin({
      username: this.state.uname,
      password: this.state.upass
    })

  }
  render() {
    return (
      <div className="login-wrapper" >
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div className="login-items">
            <label htmlFor="logUName">User name : </label>
            <input id="logUName" type="text" placeholder="aaa@bbb.com" required value={this.state.uname} onChange={(event) => this.handleUname(event)} />
          </div>
          <div className="login-items">
            <label htmlFor="logUPass">Password : </label>
            <input id="logUPass" type="password" value={this.state.upass} required onChange={(event) => this.handleUPass(event)} />
          </div>
          <div className="login-button">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}