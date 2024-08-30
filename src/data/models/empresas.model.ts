import { ConnectionPool, query } from "mssql";

export class EmpresasModel {
  constructor(private db: ConnectionPool){}
  public async getAllEmpresas(){
    try{
      const query = `SELECT idEmpresa, claveEmpresa, nombreEmpresa, activo
      FROM cEmpresa;`;
      const result: any = await this.db.request().query(query);
      return result.recordset;
    }catch(error){
      throw error;
    }
  }

  public async addEmpresa(alias: string, empresaName: string, active: boolean){
    try {
      const query = `
      INSERT INTO cEmpresa(claveEmpresa, nombreEmpresa, activo)
      VALUES(@alias, @empresaName, @active);`;
      const result: any = await this.db.request()
        .input('alias',alias)
        .input('empresaName', empresaName)
        .input('active', active)
        .query(query);

      return result.rowsAffected;
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  public async updateEmpresa(id: number, alias: string, empresaName: string, active: boolean){
    try {
      const query =`
      UPDATE cEmpresa SET claveEmpresa=@alias,
      nombreEmpresa=@empresaName, activo=@active WHERE idEmpresa=@id`;
      const result: any = await this.db.request()
        .input('alias',alias)
        .input('empresaName', empresaName)
        .input('active', active)
        .input('id',id)
        .query(query);
      
      return result.rowsAffected;
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  public async deleteEmpresa(id: number) {
    try {
      const query = `DELETE FROM cEmpresa WHERE idEmpresa=@id`;
      const result: any = await this.db.request().input('id',id).query(query);
      return result.rowsAffected; 
    } catch(err){
      console.log(err);
      throw err;
    }
  }
}