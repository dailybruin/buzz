import React from "react";
import "./Copied.css";

export class Copied extends React.Component {
  render() {
    return (
      <div className="copied">
        <p>Text copied to clipboard. Paste away!</p>
        <img alt="Party parrot" src="http://cultofthepartyparrot.com/parrots/parrot.gif" />
      </div>
    );
  }
}