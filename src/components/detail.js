import React from 'react';
import { Redirect, Link } from "@reach/router"

export default function DetailPage({ oId, token }) {

  if (!token) {
    return (<Redirect noThrow to="/login"></Redirect>)
  }


  return (
    <div className="detail-page-wrapper">
      <div className="detail-page"></div>
    </div>
  )
}