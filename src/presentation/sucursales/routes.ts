import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { MSSQLDatabase, SucursalesModel } from "../../data";
import { SucursalesService } from "../services/sucursales.service";
import { SucursalesController } from "./controller";

export class SucursalesRouter {
  static get routes(): Router {
    const router = Router();
    const db = MSSQLDatabase.getInstance();
    const pool = db.getConnection();
    const sucursalesModel = new SucursalesModel(pool);
    const sucursalesService = new SucursalesService(sucursalesModel);
    const controller = new SucursalesController(sucursalesService);

    router.get('/', [AuthMiddleware.validateJWT], controller.getSucursales);
    router.post('/', [AuthMiddleware.validateJWT], controller.addSucursal);
    router.put('/', [AuthMiddleware.validateJWT], controller.updateSucursal);
    router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteSucursal);

    return router;
  }
}