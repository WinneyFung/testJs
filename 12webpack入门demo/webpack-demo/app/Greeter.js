import React from "react";
import { Component } from "react";
const greeterJoson = require("./greeter.json");
class Greeter extends Component {
  render() {
    return (
      <div>
        <h2 className="red">{greeterJoson.greeterTxt}</h2>
      </div>
    );
  }
}

export default Greeter;
