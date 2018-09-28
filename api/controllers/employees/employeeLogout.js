const jwt = require('jsonwebtoken');

const keys = require('../../../config/keys');

const employeeLogout = (req, res) => {
  // pull the restaurant ID off the token in the headers
  const { restaurant, membership } = jwt.verify(
    req.headers.authorization.slice(7),
    keys.secretOrKey
  );

  // remove all user information from the payload
  const payload = {
    restaurant,
    membership,
    user: { name: 'Please login' },
    id: null, // ! What's with this id?
    pin: '',
    role: {
      admin: false,
      manager: false
    }
  };

  // sign a new token with the new payload
  const token = `Bearer ${jwt.sign(payload, keys.secretOrKey)}`;

  // send back the token
  res.status(200).json({ token });
};

module.exports = { employeeLogout };
