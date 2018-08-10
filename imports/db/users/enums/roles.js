const UsersRolesEnums = {
  SUPER: 'super', // access to everything including add/remove users
  ADMIN: 'admin', // access to all data but not add/remove users
  MANAGER: 'manager', // access to additional aspects based on main role
  USER: 'user' // base level access
}


const UsersRolesImplied = {
  [UsersRolesEnums.SUPER]: [
    UsersRolesEnums.SUPER,
    UsersRolesEnums.ADMIN,
    UsersRolesEnums.MANAGER,
    UsersRolesEnums.USER
  ], // access to everything
  [UsersRolesEnums.ADMIN]:  [
    UsersRolesEnums.ADMIN,
    UsersRolesEnums.MANAGER,
    UsersRolesEnums.USER
  ], // access to all data and add/remove users
  [UsersRolesEnums.MANAGER]:  [
    UsersRolesEnums.MANAGER,
    UsersRolesEnums.USER
  ], // access to additional aspects based on main group
  [UsersRolesEnums.USER]:  [
    UsersRolesEnums.USER
  ], // base level access
}

const UsersRolesLabels = {
  [UsersRolesEnums.SUPER]: 'Super User', // access to everything including add/remove users
  [UsersRolesEnums.ADMIN]: 'Administrator', // access to all data but not add/remove users
  [UsersRolesEnums.MANAGER]: 'Manager', // access to additional aspects based on main role
  [UsersRolesEnums.USER]: 'User' // base level access
}

const UsersRoles = {
  enums: UsersRolesEnums, 
  implied: UsersRolesImplied,
  labels: UsersRolesLabels
}

export default UsersRoles

export {
  UsersRolesEnums,
  UsersRolesLabels,
  UsersRolesImplied
}