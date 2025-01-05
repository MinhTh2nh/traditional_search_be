const jwt = require('jsonwebtoken');

const secretKey = 'my-secret-key';
const payload = {
  userId: 999,
  username: 'NghiaNgo'
};

const token = jwt.sign(payload, secretKey);
console.log(token);