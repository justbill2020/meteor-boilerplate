import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

import {GraphicalGrapherReact} from 'meteor/herteby:graphical-grapher'

// framework Routes
import Signup from '/imports/client/ui/framework/Signup'
import Enroll from '/imports/client/ui/framework/Enroll'
import Account from '/imports/client/ui/framework/Account'
import Forgot from '/imports/client/ui/framework/Forgot'
import Invites from '/imports/client/ui/framework/Invites'
import Dashboard from '/imports/client/ui/framework/dash/Dashboard'
import NotFound from '/imports/client/ui/framework/NotFound'
import Login from '/imports/client/ui/framework/Login'

// Project Routes

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

export const onEnterEditSteps = (nextState) => {
  Session.set('projectId', nextState.params.projId.toUpperCase())
  Session.set('siteId', nextState.params.siteId)
}

export const onLeaveEditSteps = () => {
}

export const onEnterTechDash = (nextState) => {
  let {projId, siteId} = nextState.params
  Session.set('projectId', projId)
  Session.set('siteId', siteId)
}

export const onLeaveTechDash = () => {
}




export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth"/>

      <Route path="/forgot-password" component={Forgot} privacy="unauth"/>
      <Route path="/enroll/:token" component={Enroll} title="Create Password" privacy="unauth" />
      <Route path="/reset-password/:token" component={Enroll} title="Reset Password" privacy="unauth" />
      
      {/* Uncomment the signup below if you want to allow anyone to sign up */}
      {/* <Route path="/signup" component={Signup} privacy="auth"/> */}
      <Route path="/account" component={Account} privacy="auth"/>
      <Route path="/invites" component={Invites} privacy="auth"/>      

      <Route path="/dashboard" component={Dashboard} privacy="auth"/>

      { !Meteor.isProduction ?
        <Route path="/grapher" component={GraphicalGrapherReact} privacy="auth"/> : 
        undefined
      }

      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
)