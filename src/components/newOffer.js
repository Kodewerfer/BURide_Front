import React from 'react';

import { navigate, Redirect, Link } from "@reach/router";

export default function NewOffer(props) {

  if (!props.token) {
    return (<Redirect noThrow to="/login"></Redirect>)
  }

  return (
    <div className="create-offer">
      <form onSubmit={(event) => this.handleSubmit(event)}>

        <h2>Offer a ride</h2>

        <div className="newoffer-items">
          <label htmlFor="fromAddr">From : </label>
          <input id="fromAddr" type="text" required value="" />
        </div>

        <div className="form-operations">
          <input type="submit" value="Submit" />
          <button>Back</button>
        </div>

      </form>
    </div>
  )
}