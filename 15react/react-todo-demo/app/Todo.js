import React from "react";
import {
    Component
} from "react";
class Todo extends Component {
    render() {
        return (
            <div>
                <h1>todos</h1>
                <div className="main">
                    <div className="todos">
                        <div className="new">
                            <input type="text" autoFocus placeholder="what needs to be done?"/>
                        </div>
                        <ul className="list">
                            <li>
                                <span className="icon iconfont">&#xe6a2;</span>
                                <span className="txt">写代码</span>
                                <span className="icon iconfont">&#xe641;</span>
                            </li>
                            <li className="finish">
                                <span className="icon iconfont">&#xe6a2;</span>
                                <span className="txt">写代码</span>
                                <span className="icon iconfont">&#xe641;</span>
                            </li>
                            <li>
                                <span className="icon iconfont">&#xe6a2;</span>
                                <span className="txt">写代码</span>
                                <span className="icon iconfont">&#xe641;</span>
                            </li>
                        </ul>
                        <div className="data">
                            <span className="sum">合计:100</span>
                            <span className="fsum">已完成：10</span>
                        </div>
                    </div>
                </div>
                <footer>
                    <p>持之以恒，贵在坚持，路遥知马力，滴水穿石</p>
                    <p>熙熙攘攘，纷纷扰扰</p>
                </footer>
            </div>
        )
    };
}

export default Todo;