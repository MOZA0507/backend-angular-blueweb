import sql, { ConnectionPool } from 'mssql';

interface Options {
  user: string;
  password:string;
  database: string;
  server: string;
};

export class MSSQLDatabase {

  private static instance: MSSQLDatabase;
  private pool: ConnectionPool|null = null;

  private constructor(){}

  public static getInstance(): MSSQLDatabase{
    if(!MSSQLDatabase.instance){
      MSSQLDatabase.instance = new MSSQLDatabase();
    }
    return MSSQLDatabase.instance;
  }
  public async connect(options: Options){
    const {user, password, database, server} = options;
    const dbConfig = {
      user: user,
      password: password,
      database: database,
      server: server,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 3000
      },
      options: {
        encrypt: false,
        trustServerCertificate: true,
        trustedConnection: true,  
      },
    };

    try{
      if(!this.pool){
        this.pool = await sql.connect(dbConfig);
        console.log('Conexion exitosa');
      }
      return this.pool;
    }catch(error){
      console.log('Error al conectarse a la base de datos');
      throw error;
    }
  }

  public getConnection(): ConnectionPool {
    if(!this.pool){
      throw new Error('No hay conexion, se debe llamar al .connect() primero');
    }
    return this.pool;
  }
}