import { Router } from "express";
import { EmpresasController } from "./controller";
import { EmpresasService } from '../services/empresas.service';
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { EmpresasModel, MSSQLDatabase } from "../../data";


export class EmpresasRoutes{
  static get routes(): Router{

    const router = Router();
    const db = MSSQLDatabase.getInstance();
    const pool = db.getConnection();
    const empresasModel = new EmpresasModel(pool);
    const empresasService = new EmpresasService(empresasModel);
    const controller = new EmpresasController(empresasService);

    //Definir rutas de empresas
    router.get('/',[AuthMiddleware.validateJWT], controller.getEmpresas);
    router.post('/', [AuthMiddleware.validateJWT], controller.addEmpresa);
    router.put('/', [AuthMiddleware.validateJWT], controller.editEmpresa);
    router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteEmpresa);

    return router;
  }
}