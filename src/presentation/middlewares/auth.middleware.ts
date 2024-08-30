import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { error } from "console";


export class AuthMiddleware {
  static async  validateJWT(req: Request, res: Response, next: NextFunction){
    const authorization = req.header('Authorization');
    if(!authorization) return res.status(401).json({error: 'No se proveyo un token'});
    if(!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'Bearer token no valido'});
    const token = authorization.split(' ').at(1) || '';

    try {

      const payload = await JwtAdapter.validateToken<{username: string}>(token);
      if(!payload) return res.status(401).json({error: 'Token no valido'});
      const user = payload.username;
      if (!user) return res.status(401).json({error:'Invalid token user'});
      req.body.user = user;

      next();


    } catch(err) {
      console.log(err);
      res.status(500).json({error: 'Internal Server error'});
    }

  }
}