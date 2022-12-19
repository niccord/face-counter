const jwt = require('jsonwebtoken');
const adminList = process.env.ADMIN_LIST.split(',');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, 'thisismyveryspecialsecretkey', (err, user) => {
    if (err) return res.sendStatus(401)
    req.user = user
    req.user.isAdmin = adminList.includes(user.username)
    next()
  })
}

function formatdate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  return "" + year +
      (month < 10 ? "0" + month : month) +
      (day < 10 ? "0" + day : day) +
      (hh < 10 ? "0" + hh : hh) +
      (mm < 10 ? "0" + mm : mm) +
      (ss < 10 ? "0" + ss : ss);
}

module.exports = {
  authenticateToken,
  formatdate,
  adminList,
};