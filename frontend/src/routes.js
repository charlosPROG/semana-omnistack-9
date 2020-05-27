import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dash from './pages/Dashboard'
import New from './pages/New'

export default function Routes() {
   return (
      <BrowserRouter>
         <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dash} />
            <Route exact path="/new" component={New} />
         </Switch>
      </BrowserRouter>
   )
}