import { createStore } from "redux"
import reducers from "../reducers"
// import devToolsEnhancer from 'remote-redux-devtools'

const store = () => createStore(
  reducers,
  // devToolsEnhancer()  
)
export default store 