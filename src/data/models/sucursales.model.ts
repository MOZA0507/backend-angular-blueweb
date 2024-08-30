import { ConnectionPool, query } from 'mssql';


export class SucursalesModel {
  constructor(private db: ConnectionPool){}
  public async getAllSucursales(){
    try {
      const query = `
      SELECT s.idSucursal,s.nombreSucursal, s.ciudad,
      s.estado, s.activo, s.idEmpresa, e.claveEmpresa, e.nombreEmpresa
      FROM cSucursal s INNER JOIN cEmpresa e on s.idEmpresa = e.idEmpresa;`;
      const result: any = await this.db.request().query(query);
      return result.recordset;
    } catch(err){
      console.log(err);
      throw err;
    }
  }

  public async addSucursal(idEmpresa: number, sucursalName: string,
    city: string, state: string, active: boolean){
      try {
        const query = `INSERT INTO cSucursal (idEmpresa, nombreSucursal, ciudad, estado, activo)
        VALUES (@idEmpresa, @sucursalName, @city, @state, @active);`;
        const result = await this.db.request()
          .input('idEmpresa',idEmpresa)
          .input('sucursalName',sucursalName)
          .input('city', city)
          .input('state',state)
          .input('active', active)
          .query(query);

          return result.rowsAffected;
      } catch(err){
        console.log(err);
        throw err;
      }
  }

  public async updateSucursal(idSucursal:number, idEmpresa: number, sucursalName: string,
    city: string, state: string, active: boolean){
      try {
        const query = `UPDATE cSucursal SET idEmpresa=@idEmpresa, nombreSucursal=@sucursalName,
        ciudad=@city, estado=@state, activo=@active WHERE idSucursal=@idSucursal;`;
        const result = await this.db.request()
          .input('idEmpresa', idEmpresa)
          .input('sucursalName', sucursalName)
          .input('city',city)
          .input('state',state)
          .input('active',active)
          .input('idSucursal', idSucursal)
          .query(query);

        return result.rowsAffected;
      }catch(err){
        console.log(err);
        throw err;
      }
  }

  public async deleteSucursal(id: number) {
    try {
      const query = `DELETE FROM cSucursal WHERE idSucursal=@id`;
      const result: any = await this.db.request().input('id',id).query(query);
      return result.rowsAffected; 
    } catch(err){
      console.log(err);
      throw err;
    }
  }

}