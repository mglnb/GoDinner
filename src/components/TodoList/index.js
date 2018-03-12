import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as TodoActions from '../..//actions/TodoActions'
import './index.scss'
class TodoList extends Component {
  handleEnter (e) {
    if (e.which === 13 && e.target.value !== '') {
      this.props.addTodo(e.target.value)
      e.target.value = ''
    }
  }

  render () {
    return (
      <div className="todoList">
        <div className="todoList__input">
          <input type="text" onKeyDown={(e) => this.handleEnter(e)} placeholder="What are you going to do tomorrow?" />
        </div>
        <div className="todoList__list">
          <ul>
            {this.props.todos.map(todo => (
              <li>{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ todos }) => ({ todos })
const mapDispatchToProps = dispatch => ({
  addTodo: todo => dispatch(TodoActions.addTodo(todo)),
  removeTodo: todo => dispatch(TodoActions.removeTodo(todo))
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);