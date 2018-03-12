import React, { Component } from 'react'
import TodoList from '../components/TodoList'
import './App.scss'

class App extends Component {
  render () {
    return (
      <div>
        <TodoList ></TodoList>
      </div>
    )
  } 
}

export default App
