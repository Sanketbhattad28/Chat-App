const host = "http://localhost:5000";

const registerRoute = `${host}/api/auth/register`;
const loginRoute = `${host}/api/auth/login`;
const setAvatarRoute = `${host}/api/auth/setAvatar`;
const getAllUsers = `${host}/api/auth/getUsers`;
const sendMessageRoute = `${host}/api/messages/addmsg`;
const getAllMessageRoute = `${host}/api/messages/getmsg`;

module.exports = {
  host,
  registerRoute,
  loginRoute,
  setAvatarRoute,
  getAllUsers,
  sendMessageRoute,
  getAllMessageRoute,
};
