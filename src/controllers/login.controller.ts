import { Response, Request } from 'express';

class LoginController {

  Login = (req: Request, res: Response): void => {
    res.json({ success: true , message: 'hello admin'})
  }

}

const loginController = new LoginController();

export default loginController;