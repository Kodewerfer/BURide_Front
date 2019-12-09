import React from 'react';

import { Router, navigate } from "@reach/router"

import LogSignPage from './components/logSign';
import ListPage from './components/list';
import DetailPage from './components/detail';
import ErrorPage from './components/error';
import NewOffer from './components/newOffer';

import URLconfig from './config/URLconfig';



export default class App extends React.Component {
  state = {
    onGoingError: 0,
    currentToken: window.localStorage.getItem('BURToken') || false,
    currentUser: window.localStorage.getItem('BURUser') || false,
    listData: false
  }
  // fetch data of the list only when mounting
  componentDidMount() {
    if (this.state.currentToken && this.state.currentUser) {
      this.fetchOffers();
      this.fetchUserOrders();
    }
  }
  //  handle localStorage, all in one place.
  componentDidUpdate() {

    const token = this.state.currentToken;
    const user = this.state.currentUser

    // afte login
    if (token && user) {
      window.localStorage.setItem('BURToken', token);
      window.localStorage.setItem('BURUser', user);
    }

    // a logout has been proformed
    if (token === false && user === false) {
      window.localStorage.removeItem('BURToken');
      window.localStorage.removeItem('BURUser');
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
        this.setState({
          currentToken: res.token,
          currentUser: logInfo.username
        });

        navigate('/');

        window.location.reload();

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

    this.setState({
      currentToken: false,
      currentUser: false,
      listData: false
    });
  }


  // *Get, /offer
  fetchOffers() {
    // alert("fetch");

    const fetchAddr = URLconfig.OFFER_ADDRESS;

    fetch(fetchAddr, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.currentToken
      },
      // body: JSON.stringify()
    })
      .then(result => {
        if (result.status === 200) {
          return result.json();
        }

        throw { title: "Fail to get offer list", status: result.status, message: result.message }
      })
      .then(res => {

        const oldData = this.state.listData;
        const newData = {
          offer: res
        }

        this.setState({
          listData: { ...oldData, ...newData }
        });
      })
      .catch((error) => {
        this.errorHandler(error)
      });

  }
  // *Get, /order
  fetchUserOrders() {
    const fetchAddr = URLconfig.ORDER_ADDRESS + '/own';

    fetch(fetchAddr, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.currentToken
      },
      // body: JSON.stringify()
    })
      .then(result => {
        if (result.status === 200) {
          return result.json();
        }

        throw { title: "Fail to get order list", status: result.status, message: result.message }
      })
      .then(res => {

        const oldData = this.state.listData;
        const newData = {
          order: res
        }

        this.setState({
          listData: { ...oldData, ...newData }
        })
      })
      .catch((error) => {
        this.errorHandler(error)
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
    window.location.reload();
  }

  render() {
    return (
      <div className="body-wrapper">

        <PageHeader token={this.state.currentToken} username={this.state.currentUser} onSignOut={() => this.handleSignOut()} />

        <Router>

          <ListPage default path="/list" listData={this.state.listData} token={this.state.currentToken} uname={this.state.currentUser} />

          <NewOffer path="/newOffer" token={this.state.currentToken} uname={this.state.currentUser} />

          <LogSignPage path="/login" onLogin={(logInfo) => { this.handleLogin(logInfo) }} onSignUp={(logInfo) => { this.handleSignUp(logInfo) }} token={this.state.currentToken} />

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