import { Response, Request } from 'express';
import User from '../model/user.model'

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

  PostUser = (req: Request, res: Response): void => {
    console.log("controler action post")
    let user = new User(req.body);
    user.save((err, users) => {
      if (err) res.status(500).send(err);
      else res.send(users)
    })
  }

  UpdateUser = (req: Request, res: Response): void => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
      if (err) res.status(500).send(err);
      else res.send("update done")
    })
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