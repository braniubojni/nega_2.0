export const selectLoggedInUser = ({ auth: { loggedInUser } }) => loggedInUser;
export const selectUserRole = ({ auth: { isAdmin } }) => isAdmin;
