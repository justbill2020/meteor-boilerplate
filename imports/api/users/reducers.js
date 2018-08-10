import { Users } from '/imports/db'

Users.addReducers({
  email: {
    body: {
      emails: 1
    },
    reduce (userEmail) {
      return userEmail.emails[0].address
    }
  }
})