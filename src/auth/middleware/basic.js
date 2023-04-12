'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

async function basic(req, res, next){

  if (!req.headers.authorization) { return _authError(); }

  // let basic = req.headers.authorization;
  // let [username, pass] = base64.decode(basic).split(':');
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'am9objpmb28=']
  let encodedString = basicHeaderParts.pop();  // am9objpmb28=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); 

  try {
    req.user = await users.authenticateBasic(username, password)
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

}

module.exports = basic;