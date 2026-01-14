const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

/**
 * REGISTER
 */
exports.register = async ({ name, email, password }) => {
  // 1. Check email tồn tại
  const [rows] = await db.query(
    'SELECT id FROM users WHERE email = ?',
    [email]
  );

  if (rows.length > 0) {
    throw new Error('Email already exists');
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert user
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );

  return {
    message: 'Register success',
    user: {
      id: result.insertId,
      name,
      email
    }
  };
};

/**
 * LOGIN
 */
exports.login = async ({ email, password }) => {
  // 1. Lấy user
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (rows.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = rows[0];

  // 2. Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // 3. Tạo JWT
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  return {
    message: 'Login success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};
