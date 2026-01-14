const authService = require('../services/auth.service');

/**
 * REGISTER
 */
exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({
      message: err.message || 'Register failed'
    });
  }
};

/**
 * LOGIN
 */
exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(401).json({
      message: err.message || 'Login failed'
    });
  }
};
