import React from "react";
import { Component } from "react";
const greeterJoson = require("./greeter.json");
class Greeter extends Component {
  render() {
    return (
      <div className="box">
        <h2 className="red">{greeterJoson.title}</h2>
        <p>{greeterJoson.txt}</p>
      </div>
    );
  }
}

export default Greeter;
