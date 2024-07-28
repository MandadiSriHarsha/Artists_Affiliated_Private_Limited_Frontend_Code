import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import HomePage from './components/HomePage'
import AddTransaction from './components/AddTransaction'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/add-transaction" component={AddTransaction} />
    </Switch>
  </BrowserRouter>
)

export default App
