import React from 'react';
import '../styles/detail.css';
import { Redirect, Link } from "@reach/router"

export default function DetailPage({ offerUser, oId, token, fetchOrders, offerOrder }) {

  if (!token || !offerUser || !oId) {
    return (<Redirect noThrow to="/login"></Redirect>)
  }


  if (!offerOrder) {
    fetchOrders(oId);
  }

  let data = offerUser.result.find(entry => {
    return entry._id === oId;
  });



  return (
    <div className="detail-page-wrapper">
      <div className="detail-page">
        <table className="detail-table">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Seats left</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.from}</td>
              <td>{data.to}</td>
              <td>{data.date}</td>
              <td>{data.time}</td>
              <td>{data.price}</td>
              <td align="center">{data.seats}</td>
            </tr>
          </tbody>
        </table>

        <h4>{offerOrder && offerOrder.count ? 'This offer has been taken by ' + offerOrder.count + ' user(s)' : ''}</h4>

        {offerOrder && offerOrder.count ? <OrdersTable offerOrder={offerOrder} /> : ''}

        <Link to='/'><button>Back</button></Link>
      </div>
    </div>
  )
}

function OrdersTable({ offerOrder }) {
  return (
    <table className="detail-table">
      <thead>
        <tr>
          <th>User</th>
          <th>taking seats</th>
        </tr>
      </thead>
      <tbody>
        {offerOrder.result.map(order => {
          return (
            <tr key={order.id}>
              <td>{order.user.username}</td>
              <td align='center'>{order.seats}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}