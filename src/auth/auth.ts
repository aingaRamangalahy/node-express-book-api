import passport from 'passport';
import localStrategy from 'passport-local';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../model/user.model';
import bcrypt from 'bcrypt'

const Strategy = localStrategy.Strategy
const jwtSecret = process.env.SESSION_SECRET || 'mark it zero'
const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass'
const jwtOpts: SignOptions = { algorithm: 'HS256', expiresIn: '30d' } ;


class Auth {
  public authenticate = passport.authenticate('local', { session: false })

  constructor() {
    
  }
  setAuthStrategies  = () => {
    passport.use(this.adminStrategy())
  }

  adminStrategy = () => {
    return new Strategy(async function (username, password, cb) {
      const isAdmin = username === 'admin' || 'ainga' && password === adminPassword
      if (isAdmin) return cb(null, { username: 'admin' })
      try {
        const user: any = await User.findOne({ username })
        if (!user) return cb(null, false)
        const isUser = await bcrypt.compare(password, user.password)
        if (isUser) return cb(null, { username: user.username })
      } catch (err) { }

      cb(null, false)
    })
  }

  ensureAdmin = async (req: any, res: any, next: any) => {
    const jwtString = req.headers.authorization || req.cookies.jwt
    const payload: any =  await this.verify(jwtString) // toDo : create interface for payload
    if (payload.username === 'admin') return next()
    const err: any = new Error('Unauthorized') // toDo: create interface with statusCode that implements Error
    err.statusCode = 401
    next(err)
  }

   login = async (req: any, res: any, next: any) => {
    const token = await this.sign({ username: req.user.username })
    res.cookie('jwt', token, { httpOnly: true })
    res.json({ success: true, token: token })
  }

   sign = async(payload: Object) => {
    const token = await jwt.sign(payload, jwtSecret, jwtOpts)
    console.log(token)
    return token
  }

  
  verify = async (jwtString = '') => {
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