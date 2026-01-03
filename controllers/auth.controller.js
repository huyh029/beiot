const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Register controller error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    console.error('Login controller error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login
};