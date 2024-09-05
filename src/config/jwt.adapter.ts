import { resolve } from "path";
import jwt from "jsonwebtoken";

//Esto va en los envs vars
const JWT_SEED = 'adgjlzcbmqetuo159';

export class JwtAdapter {
  static async generateToken(payload: any, duration: string = '3h'){
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, {expiresIn: duration},(err, token)=>{
        if (err) return resolve(null);
        resolve(token);
      });
    });
  }

  static async validateToken<T>(token: string): Promise<T|null>{
    return new Promise((resolve) =>{
      jwt.verify(token, JWT_SEED,(err, decoded) =>{
        resolve(decoded as T);
      });
    });
  }
}