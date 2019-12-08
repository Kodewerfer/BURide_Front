import React from 'react';
import './App.css';

import { Router, navigate } from "@reach/router"


import LogSignPage from './components/logSign';
import ListPage from './components/list';
import DetailPage from './components/detail';
import ErrorPage from './components/error';

import URLconfig from './config/URLconfig';



export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      onGoingError: 0,
      currentToken: window.localStorage.getItem('BURToken') || false,
      currentUser: "NaN"
    }
  }

  // *Post, /login
  handleLogin(logInfo) {
    // const history = useHistory();
    const fetchAddr = URLconfig.USER_ADDRESS + "/login";

    fetch(fetchAddr, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logInfo)
    })
      .then((result) => {

        if (result.status === 200) {
          return result.json();
        }

        throw { title: "login unsuccessful", message: result.message, status: result.status };

      })
      .then((res) => {
        window.localStorage.setItem('BURToken', res.token);
        this.setState({
          currentToken: res.token,
          currentUser: logInfo.username
        });

        navigate('/list');

      })
      // .then()
      .catch((error) => {
        this.errorHandler(error)
      });
  }
  // *Post, /login/signup
  handleSignUp(logInfo) {
    // const history = useHistory();
    const fetchAddr = URLconfig.USER_ADDRESS + "/signup";

    fetch(fetchAddr, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logInfo)
    })
      .then((result) => {

        if (result.status === 200) {
          return result.json();
        }

        // this.errorHandler({ message: "create user unsuccessful", status: result.status });
        // return false;
        throw { title: "signup unsuccessful", message: result.message, status: result.status };

      })
      .then((res) => {
        this.handleLogin(logInfo);
      })
      // .then()
      .catch((error) => {
        this.errorHandler(error)
      });
  }
  handleSignOut() {
    window.localStorage.removeItem('BURToken');
    this.setState({
      currentToken: 0,
      currentUser: "NaN"
    });
  }
  // handle all error in the app.
  errorHandler(error) {
    this.setState({
      onGoingError: error
    })
    // console.log(error);
    navigate('/error');
  }
  clearError() {
    this.setState({
      onGoingError: 0
    });

    // window.history.back();
    navigate('/');
  }

  render() {
    return (
      <div className="body-wrapper">

        <PageHeader token={this.state.currentToken} username={this.state.currentUser} onSignOut={() => this.handleSignOut()} />

        <Router>

          <ListPage default path="/list" token={window.localStorage['BURToken']} />

          <LogSignPage path="/login" onLogin={(logInfo) => { this.handleLogin(logInfo) }} onSignUp={(logInfo) => { this.handleSignUp(logInfo) }} />

          <DetailPage path="/detail" />

          <ErrorPage path="error" error={this.state.onGoingError} onClose={() => this.clearError()} />


        </Router>
      </div>
    )
  }
}


function PageHeader(props) {
  return (
    <div>
      {props.token ? (<div><span>{props.username}, Welcome!  </span><button onClick={props.onSignOut}>Logout</button></div>) : ""}
    </div>
  )
}