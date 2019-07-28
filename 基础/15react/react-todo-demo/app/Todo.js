import React from "react";
import {
    Component
} from "react";
class Todo extends Component {
    constructor() {
        super();
        this.state = {todos:[
            {id:1,txt:'吃饭饭',finish:true},
            {id:2,txt:'打豆豆',finish:false},
            {id:2,txt:'写代码',finish:false},
        ]};
    }
    render() {
        return (
            <div>
                <h1>todos</h1>
                <div className="main">
                    <div className="todos">
                        <div className="new">
                            <input type="text" autoFocus placeholder="what needs to be done?" onKeyUp={this.handleAdd.bind(this)}/>
                        </div>
                        <ul className="list">
                        { this.state.todos.length?  this.state.todos.map((todo,i)=>{
                                return (
                                    <li className={todo.finish?'finish':''} key={i}>
                                    <span className="icon iconfont" onClick={this.handleComplete.bind(this,todo,i)}>&#xe6a2;</span>
                                    <span className="txt">{todo.txt}</span>
                                    <span className="icon iconfont" onClick={this.handleDelete.bind(this,todo,i)}>&#xe641;</span>
                                    </li>
                                );
                            }):<li>暂无数据</li>}
                        </ul>
                        <div className="data">
                            <span className="sum">合计:{this.state.todos.length}</span>
                            <span className="fsum">已完成：{this.state.todos.filter(todo=>todo.finish).length}</span>
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

    
    handleComplete(todo,i) {
         console.log(todo,i);
         if (todo.finish) {
             return;
         }
         todo.finish = true;
         const {todos} = this.state;
         this.setState({todos});
    }
    handleDelete(todo,i) {
        const {todos} = this.state;
        todos.splice(i,1);
        this.setState({todos});
        console.log(todo,i);

    }
    handleAdd(e) {
        const keyCode = e.keyCode;
        const target = e.target;
        if (keyCode === 13) {
            const val = target.value.trim();
            let todo = {txt:val,finish:false};
            const {todos} = this.state;
            todo.id = todos.length;
            todos.push(todo);
            this.setState(todos);
            target.value = '';
        }
    }
}

export default Todo;