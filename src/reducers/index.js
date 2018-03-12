import { combineReducers } from "redux";
import TodoReducer from './fragments/TodoReducer'
export default combineReducers({
  todos: TodoReducer
})