const { User } = require("../models");
const { createSecretToken } = require("../util/SecretToken");

module.exports = {
  signup,
  login,
  // getUser,
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

    return res.json({
      message: "User logged in successfully!",
      success: true,
      token,
      username,
    });
  } catch (err) {
    console.log(err);
  }
}

// async function getUser(req, res) {
//   const { username } = req.params;
//   console.log(username);
//   try {
//     const user = await User.findOne({ where: { username }, 
//     include: ["wishlistLists"],
//     attributes: {
//       exclude: ["password"],
//     }
//    });
//     return res.json(user);
//   } catch (err) {
//     console.log(err);
//   }
// }