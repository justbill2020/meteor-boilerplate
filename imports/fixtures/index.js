import {Meteor} from 'meteor/meteor'
import {Samples, Users} from '/imports/db'
import {samples} from './mongo'
import {users} from './users'

const runFixtures = function () {
  if (Users.find().count()==0){
    users.forEach(user => {
      Users.insert({...user})
    })
  }
  if (Samples.find().count() == 0) {
    samples.forEach(sample => { 
      if (Samples.findOne({_id: sample._id})==undefined) {
        Samples.insert({...sample})
      }
    });
  }
}

if (Meteor.isDevelopment) {
  runFixtures();
}