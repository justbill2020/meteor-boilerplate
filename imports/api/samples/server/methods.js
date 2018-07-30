import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import moment from 'moment'

import {Samples} from '/imports/db'

Meteor.methods({
  'sample.in'(data) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    return Samples.insert({
      ownerId: this.userId,
      ...data,
      createdAt: moment().valueOf()
    })

  },
  'sample.out'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id })

    Samples.remove({ _id, ownerId: this.userId })
  },
  'getSample'(_id){
    return Samples.findOne({_id})
  },
  'sample.diff'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      ownerId: {
        type: String,
        min:1,
        optional: true
      },
      name: {
        type: String,
        min:1,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    })

    Samples.update({
      _id,
    }, {
      $set: {
        ...updates,
        updatedAt: moment().valueOf()
      }
    })

  }
})