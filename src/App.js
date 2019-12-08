import React from 'react';
import './App.css';

import { Router, Link, Redirect, redirectTo, navigate } from "@reach/router"


import LogInPage from './components/logIn';
import ListPage from './components/list';
import DetailPage from './components/detail';
import ErrorPage from './components/error';

import URLconfig from './config/URLconfig';



export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentToken: window.localStorage['BURToken'],
      currentUser: "NaN"
    }
  }

  // Post, /login
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

        return this.errorHandler({ message: "login unsuccessful, server stauts " + result.status });

      })
      .then((res) => {
        window.localStorage['BURToken'] = res;
        this.setState({
          currentToken: res,
          currentUser: logInfo.username
        });

        navigate('/list');

      })
      // .then()
      .catch((error) => {
        this.errorHandler(error)
      });
  }
  // handle all error in the app.
  errorHandler(error) {
    this.setState({
      errorMessage: error.message
    })
    console.log(error);
  }

  render() {
    return (
      <Router>

        <ListPage default path="/list" token={window.localStorage['BURToken']} />

        <LogInPage path="/login" onLogin={(logInfo) => { this.handleLogin(logInfo) }} />

        <DetailPage path="/detail" />


      </Router>
    )
  }
}