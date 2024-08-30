import { ConnectionPool } from "mssql";


export class AuthModel{
  constructor(private db: ConnectionPool){}

  public async getUser(username: string, password: string){
    try{
      const query = `
      SELECT * FROM sUsuario WHERE usuario=@username AND pass=@password`;
      const result: any = await this.db.request()
        .input('username', username)
        .input('password', password)
        .query(query);
      return result.recordset;
    }catch(err){
      console.log(err);
      throw err;
    }
  }
}