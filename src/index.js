import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker, {unregister} from './registerServiceWorker'
// import { Provider } from 'react-redux'
// import App from './containers/App'
// import storeConfig from './store'
// import './index.scss'

// const store = storeConfig()


// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
ReactDOM.render(<div>Falae</div>, document.getElementById('root'))
// console.log('register')
registerServiceWorker()
