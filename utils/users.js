let users = [];

const userJoin = (id, username, room) => {
  // console.log(id);
  const user = { id, username, room };
  users.push(user);
  return user;
};

const curUser = (id) => {
  // find each user in users, and return the user that has the id passed in
  return users.find((user) => user.id === id);
};

const getCurrentOnlineUser = () => {
  console.log(users);
  return users;
};

module.exports = {
  userJoin,
  curUser,
  getCurrentOnlineUser,
};
