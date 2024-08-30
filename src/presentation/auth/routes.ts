import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { AuthModel, MSSQLDatabase } from "../../data";



export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const db = MSSQLDatabase.getInstance();
    const pool = db.getConnection();
    const authModel = new AuthModel(pool);
    const authService = new AuthService(authModel);
    const controller = new AuthController(authService);

    router.post('/login', controller.loginUser);
    return router;
  }
}