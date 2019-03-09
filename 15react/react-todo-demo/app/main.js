// const greeter = require("./Greeter.js");
// document.getElementById("root").appendChild(greeter());
// main.js
import React from "react";
import { render } from "react-dom";
import Greeter from "./Greeter";
import Todo from "./Todo";
import "./main.css"; //使用require导入css文件
import "../template/style.css";
render(<Todo />, document.getElementById("root"));
