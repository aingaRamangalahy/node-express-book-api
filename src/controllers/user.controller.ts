import { Response, Request } from 'express';
import User from '../model/user.model';
import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;
const hashPassword = async (user: any) => {
  if (!user.password) throw user.invalidate('password', 'password is required')
  if (user.password.length < 12) throw user.invalidate('password', 'password must be\
  at least 12 characters')
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
}

class UserController {

  GetUsers = (req: Request, res: Response): void => {
    User.find((err, users) => {
      if (err) res.status(500).send(err);
      else res.send(users)
    })
  }

  /*with pagination /pUsers?page=1&size=5*/
  GetPaginatedUser = (req: Request, res: Response): void => {
    let p: number = parseInt(req.query.page || 1);
    let s: number = parseInt(req.query.size || 5);
    User.paginate(
      {},
      { page: p, limit: s },
      (err, users) => {
        if (err) res.status(500).send(err);
        else res.send(users)
      })
  }

  PostUser = async (req: Request, res: Response) => {
    console.log("controler action post")
    let user = await new User(req.body);
    console.log('user created')
    await hashPassword(user);
    user.save((err, user: any) => {
      if (err) res.status(500).send(err);
      else res.json({message: 'user created', username: user.username})
    })
  }

  UpdateUser = async (req: Request, res: Response, change: any) => {
    // User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    //   if (err) res.status(500).send(err);
    //   else res.send("update done")
    // })
    let user = User.findOne(req.body.username);
    res.json( {data: user} )
    // Object.keys(change).forEach(key => { user[key] = change[key] })
    // if (change.password) await hashPassword(user)
    // user.save((err, user) => {
    //   if (err) res.status(500).send(err)
    //   else res.send(user)
    // })
  }

  GetUserById = (req: Request, res: Response): void => {
    User.findById(req.params.id, (err, user) => {
      if (err) res.status(500).send(err);
      else res.send(user)
    })
  }

  DeleteUser = (req: Request, res: Response): void => {
    User.findByIdAndDelete(req.params.id, (err, user) => {
      if (err) res.status(500).send(err);
      else res.send("Delete done")
    })
  }

  /*with pagination /search?kw=abc&page=1&size=5*/
  SearchUser = (req: Request, res: Response): void => {
    let p: number = parseInt(req.query.page || 1);
    let s: number = parseInt(req.query.size || 5);
    let kw: string = req.query.kw || "";
    User.paginate(
      {
        title: {
          $regex: ".*(?i)" + kw + ".*"
        }
      },
      { page: p, limit: s },
      (err, users) => {
        if (err) res.status(500).send(err);
        else res.send(users)
      })
  }

}

const userController = new UserController();

export default userController;