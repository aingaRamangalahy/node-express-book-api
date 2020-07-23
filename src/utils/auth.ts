//function to check user is authentified as admin

import { Application } from "express";
import passport from 'passport';
import expressSession from 'express-session';
import localStrategy from 'passport-local';

const Strategy = localStrategy.Strategy
const sessionSecret = process.env.SESSION_SECRET || 'mark it zero'
const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass'


class Auth {
  constructor() {
    
  }
  setAuthStrategies () {
    passport.use(this.adminStrategy())
    //passport serialization/deserialization (identity function => return its arguments)
    passport.serializeUser((user, cb) => cb(null, user))
    passport.deserializeUser((user, cb) => cb(null, user))
  }

  setAuthMiddleware (app: Application) {
    app.use(this.session())
    app.use(passport.initialize())
    app.use(passport.session())
  }

  session() {
    return expressSession({
        secret: sessionSecret, // so we can sign cookies
        resave: false,
        saveUninitialized: false
    })
  }

  adminStrategy () {
    return new Strategy(function (username, password, cb) {
      const isAdmin = username === 'admin' || 'ainga' && password === adminPassword
      if (isAdmin) return cb(null, { username: 'admin' })
      cb(null, false)
    })
  }

  ensureAdmin (req: any, res: any, next: any) {
    const isAdmin = req.user && req.user.username === 'admin'
    if (isAdmin) return next()
    res.status(401).json({ error: 'Unauthorized' })
  }

}
const auth = new Auth();

export default auth;