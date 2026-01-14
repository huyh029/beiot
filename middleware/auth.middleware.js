const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('VERIFY SECRET =', process.env.JWT_SECRET);
  console.log('SERVER TIME =', Math.floor(Date.now() / 1000));

  if (!authHeader) {
    return res.status(401).json({ message: 'Missing token' });
  }

  // authHeader = "Bearer xxx.yyy.zzz"
  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      clockTolerance: 60
    });

    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (err) {
    console.error('JWT ERROR:', err.name, err.message);
    return res.status(401).json({
      message: 'Invalid or expired token',
      error: err.message
    });
  }
};
