import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
import SimpleSchema from 'simpl-schema'

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
  Accounts.validateNewUser(validateNewUser)
  Accounts.config({
    sendVerificationEmail: true,
    restrictCreationByEmailDomain: (email)=>{
      // return (!!email.match(/(@subdomain\.domain\.com|@domain\.com)(\n|$)/gi))
      return true
    }
  })
  Accounts.validateLoginAttempt(function(options) {
    /* options:
        type            (String)    The service name, such as "password" or "twitter".
        allowed         (Boolean)   Whether this login is allowed and will be successful.
        error           (Error)     When allowed is false, the exception describing why the login failed.
        user            (Object)    When it is known which user was attempting to login, the Meteor user object.
        connection      (Object)    The connection object the request came in on.
        methodName      (String)    The name of the Meteor method being used to login.
        methodArguments (Array)     An array of the arguments passed to the login method
    */
let {allowed, user} = options
    // If the login has failed, just return false.
    if (!allowed) {
        return false;
    }

    // Check the user's email is verified. If users may have multiple 
    // email addresses (or no email address) you'd need to do something
    // more complex.
    if (user.emails[0].verified === true) {
        return true;
    } else {
        throw new Meteor.Error('email-not-verified', 'You must verify your email address before you can log in');
    }

});
}