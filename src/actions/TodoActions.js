import * as TodoActions from './ActionTypes'

export const addTodo = (value) => ({
  type: TodoActions.ADD_TODO,
  payload: {
    value
  }
})

export const removeTodo = value => ({
  type: TodoActions.REMOVE_TODO,
  payload: {
    value
  }
})
