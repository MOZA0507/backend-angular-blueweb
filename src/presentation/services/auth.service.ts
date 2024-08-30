import { ConnectionPool } from "mssql";
import { JwtAdapter } from "../../config/jwt.adapter";
import { CustomError } from "../../domain/errors/custom.error";
import { AuthModel } from "../../data";


export class AuthService {
  constructor(private authModel: AuthModel){}

  public async login(username: string, password: string) {
    try{
      const [existUser] = await this.authModel.getUser(username, password);
      if(!existUser){
        throw CustomError.unauthorized('Usuario o contraseña erroneos!!');
      }

      const token = await JwtAdapter.generateToken({username: username});
      if(!token) throw CustomError.internalServer('Error generando token!!');
      return{
        id: existUser.idUsuario,
        user: existUser.usuario,
        name: existUser.nombreCompleto,
        email: existUser.correo,
        phone: existUser.telefono,
        token: token
      };

    } catch(err){
      if(err instanceof CustomError){
        throw err;
      }
      throw CustomError.internalServer(`${err}`);
    }

  }
}