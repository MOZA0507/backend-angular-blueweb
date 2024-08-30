import { Router } from "express";
import { EmpresasRoutes } from "./empresas/routes";
import { AuthRoutes } from "./auth/routes";
import { SucursalesRouter } from "./sucursales/routes";


export class AppRoutes {
  static get routes(): Router{
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/empresas', EmpresasRoutes.routes);
    router.use('/api/sucursales', SucursalesRouter.routes);
    return router;
  }
}