import React from 'react';

import { Redirect, Link } from "@reach/router";

export default function NewOffer({ onSubmit, token }) {

  let [From, setFrom] = React.useState(' ');
  let [To, setTo] = React.useState(' ');
  let [Date, setDate] = React.useState(' ');
  let [Time, setTime] = React.useState(' ');
  let [Seats, setSeats] = React.useState(1);
  let [price, setPrice] = React.useState(15);

  if (!token) {
    return (<Redirect noThrow to="/login"></Redirect>)
  }

  return (
    <div className="create-offer">
      <form onSubmit={(event) => {
        event.preventDefault();

        let paylod = {
          from: From,
          to: To,
          date: Date,
          time: Time,
          seats: Seats,
        }
        onSubmit(paylod);
      }}>

        <h2>Offer a ride</h2>

        <div className="newoffer-items">
          <label htmlFor="fromAddr">From : </label>
          <input id="fromAddr" type="text" required value={From} onChange={ev => setFrom(ev.target.value)} />
          <label htmlFor="toAddr">To : </label>
          <input id="toAddr" type="text" required value={To} onChange={ev => setTo(ev.target.value)} />
        </div>

        <div className="newoffer-items">
          <label htmlFor="rideDate">Date : </label>
          <input id="rideDate" type="date" required value={Date} onChange={ev => setDate(ev.target.value)} />
        </div>

        <div className="newoffer-items">
          <label htmlFor="rideTime">Time : </label>
          <input id="rideTime" type="time" required value={Time} onChange={ev => setTime(ev.target.value)} />
        </div>

        <div className="newoffer-items">
          <label htmlFor="rideSeats">Seats : </label>
          <input id="rideSeats" type="number" required value={Seats} onChange={ev => setSeats(ev.target.value)} />
        </div>

        <div className="newoffer-items">
          <label htmlFor="ridePrice">Price per seat : </label>
          <input id="ridePrice" type="number" required value={price} onChange={ev => setPrice(ev.target.value)} />
        </div>

        <div className="form-operations">
          <input type="submit" value="Submit" />
          <Link to='/'><button>Back</button></Link>
        </div>

      </form>
    </div>
  )
}