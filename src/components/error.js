import React from 'react';
import { navigate } from "@reach/router"

export default function ErrorPage({ error, onClose }) {

  if (!error) {
    navigate('/');
    return false;
  }

  return (
    <div>
      <h3>Error</h3>
      <h3>{error.title}</h3>
      <h4>{error.message}</h4>
      <h4>Server status : {error.status}</h4>
      {/* <div>
        <p>{error}</p>
      </div> */}
      <div className="close-error">
        <button onClick={onClose}>Back</button>
      </div>
    </div>
  )
}