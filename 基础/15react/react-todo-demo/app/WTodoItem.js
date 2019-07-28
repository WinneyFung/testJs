import React from "react";
import {
    Component
} from "react"; 
class WTodoItem extends Component {
    render() {
      return (
        <li>
            <span className="icon iconfont" onClick="handleComplete">&#xe6a2;</span>
            <span className="txt">写代码</span>
            <span className="icon iconfont" onClick="handleDelete">&#xe641;</span>
        </li>
      )
    }

     handleComplete(props) {
         
    }
    handleDelete(props) {

    }
    
}