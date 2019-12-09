import React from 'react';
import { navigate, Redirect, Link } from "@reach/router"

import '../styles/list.css';

export default class ListPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.listData) {
      // return this.props.
    }
  }

  renderOffer = () => {
    // alert('offer');
    const data = this.props.listData.offer;
    let items = [];

    if (!data || !data.count || !data.result) {
      return "No Data";
    }

    items.push(<OfferHeader />);
    data.result.map(entry => {
      items.push(<OfferItem key={entry._id} data={entry} uname={this.props.uname} />)
      // debugger;
    })

    return (
      <table className="offer-list list-wrapper">
        {items}
      </table>
    );
  }
  renderOrder = () => {
    // alert('offer');
    const data = this.props.listData.order;
    let items = [];

    if (!data || !data.count || !data.result) {
      return "No Data";
    }

    items.push(<OrderHeader />);
    data.result.map(entry => {
      items.push(<OrderItem key={entry._id} data={entry} />)
      // debugger;
    })

    return (
      <table className="order-list list-wrapper">
        {items}
      </table>
    );
  }


  render() {

    if (!this.props.token) {
      return (<Redirect noThrow to="/login"></Redirect>)
    }


    return (
      <div className="list-page">
        <div className="list-inner">

          <div className="list-title">
            <h2>Your Orders</h2>
          </div>



          {this.renderOrder()}
          <div className="list-title">
            <h2>Offers</h2>
            <Link to="/newOffer"><button className="new-offer">Offer A New Ride</button></Link>
          </div>

          {this.renderOffer()}


        </div>
      </div>
    )
  }
}

function OfferHeader(props) {
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

function OfferItem(props) {
  return (
    <tr className="list-item">
      <td>{props.data.from}</td>
      <td>{props.data.to}</td>
      <td>{props.data.date}</td>
      <td>{props.data.time}</td>
      <td align="center">{props.data.seats}</td>
      <td>{props.data.user.username === props.uname ? 'YOU' : props.data.user.username}</td>
    </tr>
  )
}

function OrderHeader(props) {
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

function OrderItem(props) {
  return (
    <tr className="list-item">
      <td>{props.data.offer.from}</td>
      <td>{props.data.offer.to}</td>
      <td>{props.data.offer.date}</td>
      <td>{props.data.offer.time}</td>
      <td align="center">{props.data.seats}</td>
      <td align="center"><button>Delete</button></td>
    </tr>
  )
}