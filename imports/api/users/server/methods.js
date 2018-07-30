import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Email } from 'meteor/email'
import { check } from 'meteor/check'

import SimpleSchema from 'simpl-schema'

Meteor.methods ({
  'u.new' (email, name) {
    let profile = {name}
    let userId = Accounts.createUser({email,profile})
    Accounts.sendEnrollmentEmail(userId)
  },
  'u.reinvite'(_id, email){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }
    new SimpleSchema({
      _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
      },
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({_id, email})

    let test = Accounts.findUserByEmail(email)
    if (test._id !== _id){
      throw new Meteor.Error('not-authorized')
    }
    Accounts.sendEnrollmentEmail(_id)

  },
  'u.reset'(_id, email){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }
    new SimpleSchema({
      _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
      },
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({_id, email})

    let test = Accounts.findUserByEmail(email)
    if (test._id !== _id){
      throw new Meteor.Error('not-authorized')
    }
    Accounts.sendResetPasswordEmail(_id)

  },
  'u.updateProfile' (updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }
      
    new SimpleSchema({
      name: {
        type: String,
        min: 1
      }
    }).validate(updates)
    let _id = this.userId

    Meteor.users.update( {_id}, {$set: {"profile.name":updates.name}})
  },
  'u.updateUser' (_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }
      
    new SimpleSchema({
      _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
      },
      email: {
        type: String,
        min: 1,
        label: 'Either Name or Email',
        optional: true,
        custom: function(){
          let shouldBeRequired = !this.field('name').isSet

          if (shouldBeRequired) {
            if (!this.isSet || this.value === null || this.value === "") return 'required'
          }
        }
      },
      name: {
        type: String,
        min: 1,
        label: 'Either Name or Email',
        optional: true,
        custom: function(){
          let shouldBeRequired = !this.field('email').isSet

          if (shouldBeRequired) {
            if (!this.isSet || this.value === null || this.value === "") return 'required'
          }
        }
      }
    }).validate({_id, ...updates})

    let {name, email} = updates

    if (name) {
      Meteor.users.update( {_id}, {$set: {
        "profile.name":name
      }})
    }
    if (email) {
      Meteor.users.update( {_id}, {$set: {
        "emails.0.address":email, 
        "emails.0.verified":false
      }})
      Accounts.sendEnrollmentEmail(_id)
    }
  },
  'sendIssueToGitHub'({body, subject, from}) {
    check([from, subject, body], [String])

    this.unblock()

    Email.send({
      to: 'mes-cpq-issues@fire.fundersclub.com',
      from, 
      subject,
      text: body
    })
  }
})