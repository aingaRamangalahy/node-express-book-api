import { Response, Request } from 'express';

class MainController {

  Main = (req: Request, res: Response): void => {
    res.send('api not found')
  }

}

const mainController = new MainController();

export default mainController;