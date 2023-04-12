'use strict';

require('dotenv').config();
const { users } = require('../models/index.js');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

async function bearer(request, response, next){
  try {
    if (!request.headers.authorization){ 
      next('Invalid Login');
    }

    const token = request.headers.authorization.split(' ').pop();
    let payload = jwt.verify(token, SECRET)
    const validateUser = await users.findOne({ where: {username: payload.username} });
    if (validateUser){
      next();
    } else {
      response.status(403).send('Invalid Token')
    }
    
  } catch (e) {
    console.error(e);
    response.status(403).send('Invalid Login');
  }
}

module.exports = bearer;