import { Meteor } from 'meteor/meteor'
import ReactDOM from 'react-dom'
import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker'

import {routes, onAuthChange} from '/imports/client/routes/routes'
import '/imports/startup/simple-schema-configuration'
import '/imports/db/links'
import '/imports/db/linksInversed'
import { httpsRedirect } from '/imports/api/https-redirect'

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  const currentPagePrivacy = Session.get('currentPagePrivacy')
  onAuthChange(isAuthenticated, currentPagePrivacy)
})

Meteor.startup(() => {
  httpsRedirect()
  ReactDOM.render(routes, document.getElementById('app'))
})