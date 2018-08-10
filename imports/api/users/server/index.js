import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
import SimpleSchema from 'simpl-schema'
import {Roles} from 'meteor/alanning:roles'
import UserGroups from '/imports/db/users/enums/groups'
import UserRoles from '/imports/db/users/enums/roles'

import './methods'

const getName = (user) => {
  let profile = user.profile || {name: user.emails[0].address}
  let {name} = profile
  return name
}

export const validateNewUser = (user) => {
  const email = user.emails[0].address

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({email})

  return true
}

if (Meteor.isServer) {
  Meteor.publish('invites',function (){
    if (!this.userId) {
      this.stop()
    } 
    return Meteor.users.find({},{
      fields: { 
        _id:1,
        username:1, 
        emails:1, 
        profile:1 
      }
    })
  })
  Accounts.validateNewUser(validateNewUser)
  Accounts.urls.enrollAccount = (token) =>{
    return Meteor.absoluteUrl(`enroll/${token}`)
  }
  Accounts.urls.resetPassword = (token) =>{
    return Meteor.absoluteUrl(`reset-password/${token}`)
  }
  Accounts.emailTemplates.from = "MES CPQ <MES.CPQ.no.reply@gmail.com>"
  Accounts.emailTemplates.siteName = "MES CPQ"
  Accounts.emailTemplates.enrollAccount.subject = (user) => {
    return `Welcome to MES CPQ, ${getName(user)}`;
  };
  Accounts.emailTemplates.enrollAccount.text = (user, url) => {
    return `${getName(user)},\n\n`
      + 'You have been added as a user for the MES CPQ!'
      + ' To activate your account, simply click the link below:\n\n'
      + url;
  };
  Accounts.emailTemplates.resetPassword.subject = (user) => {
    return `Requested Password Reset, ${getName(user)}`;
  };
  Accounts.emailTemplates.resetPassword.text = (user, url) => {
    return `${getName(user)},\n\n`
      + 'A password reset has been requested for this user!'
      + ' To reset your password, simply click the link below:\n\n'
      + url
      + '\n\n If you did not request a password reset please disregard this email.'

  };

  if (Meteor.users.find({}).count() === 0) {
    let name = "Bill Martin"
    let email = "william_martin4@comcast.com"
    let profile = {name}
    let userId = Accounts.createUser({email,profile})
    Roles.addUsersToRoles(userId, UserRoles.enums.SUPER, UserGroups.enums.ALL)
    Accounts.sendEnrollmentEmail(userId)
  }
}