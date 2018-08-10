import { Meteor } from 'meteor/meteor'

import { getSample } from '/imports/db/queries'

getSample.expose({
  firewall(userId, params) {
    let {_id, postId} = params
    params._id = _id || postId
    if (!userId ) {
      // you can throw exceptions if he's not allowed access to this query
      throw new Meteor.Error('not-allowed')
    }
    // the firewall can either: throw exception or modify params

  }
})