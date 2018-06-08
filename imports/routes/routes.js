import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { Session } from 'meteor/session'

import Signup from '/imports/ui/framework/Signup'
import Dashboard from '/imports/ui/framework/dash/Dashboard'
import NotFound from '/imports/ui/framework/NotFound'
import Login from '/imports/ui/framework/Login'

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth'
  const isAuthenticatedPage = currentPagePrivacy === 'auth'

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard')
  }
  if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/')
  }
}
export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState)
}
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length-1]
  Session.set('currentPagePrivacy', lastRoute.privacy)
}
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth"/>
      <Route path="/signup" component={Signup} privacy="unauth"/>
      <Route path="/dashboard" component={Dashboard} privacy="auth"/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
)