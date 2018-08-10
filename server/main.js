import { Meteor } from 'meteor/meteor'
import {initialize} from 'meteor/herteby:graphical-grapher'



import '/imports/startup/simple-schema-configuration'

import '/imports/api/server'

import '/imports/db/links'
import '/imports/db/linksInversed'
import '/imports/api/reducers'

import '/imports/db/queries'
import '/imports/api/exposures'

import '/imports/fixtures'

Meteor.startup(() => {
  if (Meteor.isDevelopment) {
    initialize(); // exposes a method "grapher_live", used by the React Component
  }
});
