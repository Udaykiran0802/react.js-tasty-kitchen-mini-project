import {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Payment from './components/Payment'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'

import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/restaurant/:id"
          component={RestaurantDetails}
        />
        <ProtectedRoute exact path="/payment" component={Payment} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
