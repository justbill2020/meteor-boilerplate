import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor'

import UserEnums from '/imports/db/users/enums'

export default class Security {
  static allowRoles(userId, allowedRoles) {
    if (!Roles.userIsInRole (userId, allowedRoles)) {
      throw new Meteor.Error('not-authorized')
    }
  }
  static denyRoles(userId, deniedRoles) {    
    if (Roles.userIsInRole (userId, deniedRoles)) {
      throw new Meteor.Error('not-authorized')
    }
  }
  static allowGroups(userId, allowedGroups) {
    let userGroups = Roles.getGroupsForUser(userId)
    
    if (userGroups.includes(UserEnums.Groups.enums.ALL)) return
    
    if (!allowedGroups.some((allowed)=>{
      return userGroups.includes(allowed)
    })) {
      throw new Meteor.Error('not-authorized')
    }
  }

  static denyGroups(userId, deniedGroups) {
    let userGroups = Roles.getGroupsForUser(userId)

    if (userGroups.includes(UserEnums.Groups.enums.ALL)) return

    if (deniedGroups.some((allowed)=>{
      return userGroups.includes(allowed)
    })) {
      throw new Meteor.Error('not-authorized')
    }
  }

  static hasRole(userId, role) {
    return Roles.userIsInRole(userId, role);
  }

  static checkLoggedIn(userId) {
    if (!userId) {
      throw new Meteor.Error('not-authorized', 'You are not authorized');
    }
  }
}