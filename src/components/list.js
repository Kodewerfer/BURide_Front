import React from 'react';
import { Redirect, Link } from "@reach/router"

import '../styles/list.css';

export default function ListPage({ listData, token, uname, onOrder, onDeleteOrder, onDeleteOffer }) {

  if (!token) {
    return (<Redirect noThrow to="/login"></Redirect>)
  }

  if (!listData) {
    return '';
  }

  const { offerUser, offersOther, orders } = listData;

  return (
    <div className="list-page">
      <div className="list-inner">

        <div className="list-title">
          <h2>Your Orders</h2>
        </div>

        <table className="order-list list-wrapper">
          <thead>
            <OrderHeader />
          </thead>
          <tbody>
            {orders ? orders.result.map(entry =>
              <OrderItem key={entry._id} data={entry} uname={uname} onDeleteOrder={onDeleteOrder} />
            ) : <tr></tr>}
          </tbody>
        </table>

        <div className="list-title">
          <h2>Offers</h2>
          <Link to="/newOffer"><button className="new-offer">Offer A New Ride</button></Link>
        </div>

        <table className="offer-list list-wrapper">
          <thead>
            <OfferHeader />
          </thead>
          <tbody>
            {offerUser ? offerUser.result.map(entry =>
              <OfferItem key={entry._id} data={entry} uname={uname} onOrder={onOrder} onDeleteOffer={onDeleteOffer} />
            ) : <tr></tr>}
            {offersOther ? offersOther.result.map(entry =>
              <OfferItem key={entry._id} data={entry} uname={uname} onOrder={onOrder} onDeleteOffer={onDeleteOffer} />
            ) : <tr></tr>}
          </tbody>
        </table>

      </div>
    </div>
  )
}

function OfferHeader() {
  return (
    <tr className="list-item list-header">
      <td>From</td>
      <td>To</td>
      <td>Date</td>
      <td>Time</td>
      <td>Seats</td>
      <td>Post by</td>
    </tr>
  )
}

function OfferItem({ data, uname, onOrder, onDeleteOffer }) {

  if (!data.user) {
    return 'Offer data corrupted';
  }
  return (
    <tr className="list-item">
      <td>{data.from}</td>
      <td>{data.to}</td>
      <td>{data.date}</td>
      <td>{data.time}</td>
      <td align="center">{data.seats}</td>
      <td>{data.user.username === uname ? 'YOU' : data.user.username}</td>
      <td> <OfferItemOperation data={data} uname={uname} onDeleteOffer={onDeleteOffer} onOrder={onOrder} /></td>
    </tr>
  )
}

function OfferItemOperation({ data, uname, onDeleteOffer, onOrder }) {

  let [isOrdering, setOrdering] = React.useState(false);
  let [seatsTaking, setSeats] = React.useState(1);

  let button = null;

  if (data.user.username === uname) {
    button = (
      <div className="list-op-own list-op-btns">
        <button onClick={() => onDeleteOffer(data._id)}>Delete</button>
        <span> | </span>
        <Link to={'/detail' + data._id}><button>View</button></Link>
      </div>
    );
  } else {

    if (!isOrdering) {
      button = (<button onClick={() => setOrdering(true)}>Take this offer</button>);
    } else {
      return (
        <div className="list-op-others list-op-btns">
          <label>
            Seats:
            <input type="number" value={seatsTaking} onChange={(ev) => setSeats(ev.target.value)} />
          </label>
          <button onClick={() => onOrder(data._id, seatsTaking)}>Take</button>
        </div>
      )
    }

  }

  return button;
}

function OrderHeader() {
  return (
    <tr className="list-item list-header">
      <td>From</td>
      <td>To</td>
      <td>Date</td>
      <td>Time</td>
      <td>Seats ordered</td>
    </tr>
  )
}

function OrderItem({ data, onDeleteOrder }) {
  if (!data.offer) {
    return 'Order data corrupted';
  }
  return (
    <tr className="list-item">
      <td>{data.offer.from}</td>
      <td>{data.offer.to}</td>
      <td>{data.offer.date}</td>
      <td>{data.offer.time}</td>
      <td align="center">{data.seats}</td>
      <td align="center"><button onClick={() => onDeleteOrder(data._id)}>Delete</button></td>
    </tr>
  )
}