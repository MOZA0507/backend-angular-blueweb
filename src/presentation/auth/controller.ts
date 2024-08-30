import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { CustomError } from '../../domain/errors/custom.error';


export class AuthController {

  constructor(private authService: AuthService){}

  private handleError = (error: unknown, res: Response) =>{
    if(error instanceof CustomError){
      return res.status(error.statusCode).json({error:error.message});
    }
    return res.status(500).json({error: 'Internal Server Error'});
  }

  loginUser = (req: Request, res: Response) => {
    this.authService.login(req.body.username, req.body.password)
      .then((data) =>res.json(data))
      .catch(err => this.handleError(err, res));
  }
}