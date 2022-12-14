import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
// import { PokemonApp } from './PokemonApp'
import { store } from './store/store'
import { TodoApp } from './TodoApp'
// import App from './App'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoApp/>
    </Provider>
  </React.StrictMode>
)
