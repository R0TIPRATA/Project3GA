const { User } = require("../models");
const { createSecretToken } = require("../util/SecretToken");

module.exports = {
  signup,
  login,
  getUser,
  logout,
  loggedIn,
};

async function signup(req, res) {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ username, password });
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
};

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.json({ message: "Incorrect username/password!" });
    }
    const validPassword = await user.validPassword(password);
    if (!validPassword) {
      return res.json({ message: "Incorrect username/password!" });
    }
    const token = createSecretToken(user.uuid);

    return res.cookie('access_token', token, { domain: 'wishlist-backend-l4t6.onrender.com', httpOnly:false, path: "/", secure: true, sameSite: 'none' }).cookie('username', username, { domain: 'wishlist-backend-l4t6.onrender.com', httpOnly:false, path: "/", secure: true, sameSite: 'none' }).json({
      // message: "User logged in successfully!",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
}

async function loggedIn(req, res) {
  const username = req.cookies.username;
  const loggedInStatus = req.cookies.username ? true : false;
  return res.json({
    username,
    loggedInStatus,
    message: loggedInStatus ? "Logged in successfully!" : null,
  });
}

async function logout(req, res) {
  res.clearCookie("access_token", { domain: 'wishlist-backend-l4t6.onrender.com', httpOnly:false, path: "/", secure: true, sameSite: 'none' }).clearCookie("username", { domain: 'wishlist-backend-l4t6.onrender.com', httpOnly:false, path: "/", secure: true, sameSite: 'none' });
  return res.json({ message: "User logged out successfully!" });
}

async function getUser(req, res) {
  const { username } = req.params;
  console.log(username);
  try {
    const user = await User.findOne({ where: { username }, 
    include: ["wishlistLists"],
    attributes: {
      exclude: ["password"],
    }
   });
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
}