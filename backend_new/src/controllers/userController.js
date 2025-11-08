const { User } = require('../models');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) return res.status(400).send('Email already exists');
    const usernameExists = await User.findOne({ where: { username } });
    if (usernameExists) return res.status(400).send('Username already exists');
    await User.create({ username, email, password });
    res.send('User registered successfully');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).send('User not found');
    if (user.password !== password) return res.status(401).send('Incorrect password');
    res.send('Login successful');
  } catch (err) {
    res.status(500).send('Error logging in');
  }
};
