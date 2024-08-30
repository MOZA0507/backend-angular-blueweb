import { envs } from "./config/envs";
import { MSSQLDatabase } from "./data";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async()=>{
  await main();
})();

async function main() {

  const dbInstance = MSSQLDatabase.getInstance();
  await dbInstance.connect({
    user: envs.USER,
    password: envs.PASS,
    server: envs.SERVER,
    database: envs.DB
  });
  
  const server = new Server({
    port: 3000,
    routes: AppRoutes.routes,
  });

  server.start();
}