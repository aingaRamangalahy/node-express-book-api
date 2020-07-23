//function to check user is authentified as admin

import { Application } from "express";
import passport from 'passport';
import localStrategy from 'passport-local';
import jwt from 'jsonwebtoken';

const Strategy = localStrategy.Strategy
const jwtSecret = process.env.SESSION_SECRET || 'mark it zero'
const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass'
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' }
const authenticate = passport.authenticate('local', { session: false })


class Auth {

  constructor() {
    
  }
  setAuthStrategies () {
    passport.use(this.adminStrategy())
  }

  adminStrategy () {
    return new Strategy(function (username, password, cb) {
      const isAdmin = username === 'admin' || 'ainga' && password === adminPassword
      if (isAdmin) return cb(null, { username: 'admin' })
      cb(null, false)
    })
  }

  async ensureAdmin (req: any, res: any, next: any) {
    const jwtString = req.headers.authorization || req.cookies.jwt
    const payload: any =  await this.verify(jwtString) // toDo : create interface for payload
    if (payload.username === 'admin') return next()
    const err: any = new Error('Unauthorized') // toDo: create interface with statusCode that implements Error
    err.statusCode = 401
    next(err)
  }

  async login (req: any, res: any, next: any) {
    const token = await this.sign({ username: req.user.username })
    res.cookie('jwt', token, { httpOnly: true })
    res.json({ success: true, token: token })
  }

  async sign (payload: Object) {
    const token = await jwt.sign(
      payload, 
      jwtSecret, { 
        algorithm: 'HS256', 
        expiresIn: '30d' 
      })
    return token
  }

  
  async verify (jwtString = '') {
    jwtString = jwtString.replace(/^Bearer /i, '')
    try {
      const payload = await jwt.verify(jwtString, jwtSecret)
      return payload
    } catch (err) {
      err.statusCode = 401
      throw err
    }
  }

}
const auth = new Auth();

export default auth;