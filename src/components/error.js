import React from 'react';

export default function ErrorPage(props) {

  if (!props.error) {
    window.history.back();
    return false;
  }

  return (
    <div>
      <h3>Error</h3>
      <h3>{props.error.title}</h3>
      <h4>{props.error.message}</h4>
      <h4>Server status : {props.error.status}</h4>
      {/* <div>
        <p>{props.error}</p>
      </div> */}
      <div className="close-error">
        <button onClick={props.onClose}>Back</button>
      </div>
    </div>
  )
}