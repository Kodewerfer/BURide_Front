import React from 'react';
import { navigate, Redirect } from "@reach/router"

export default class ListPage extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    // if (!this.props.token) {
    //   navigate('/login');
    //   // redirectTo('/login');
    // }
  }


  render() {

    if (!this.props.token) {
      return (<Redirect noThrow to="/login"></Redirect>)
    }

    return "list  " + this.props.token
  }
}