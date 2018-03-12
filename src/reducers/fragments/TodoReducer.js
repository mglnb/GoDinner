import * as TodoActions from '../../actions/ActionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case TodoActions.ADD_TODO:
      return [
        ...state,
        action.payload.value
      ]
    case TodoActions.REMOVE_TODO:


      return
    default:
      return state
  }
}