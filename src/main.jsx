import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import MyState from './context/data/myState.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <MyState>
      <App />
    </MyState>
    </Provider>
  </BrowserRouter>,
)
