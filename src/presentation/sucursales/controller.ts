import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { SucursalesService } from "../services/sucursales.service";


export class SucursalesController {
  constructor(private sucursalesService: SucursalesService){}

  private handleError = (error: unknown, res: Response) =>{
    if(error instanceof CustomError){
      console.log(error.statusCode);
      return res.status(error.statusCode).json({error:error.message});
    }
    return res.status(500).json({error: 'Internal Server Error'});
  }

  getSucursales = (req: Request, res: Response) => {
    this.sucursalesService.getSucursales()
      .then((data) => res.json(data))
      .catch(err => this.handleError(err, res));
  }

  addSucursal = (req: Request, res: Response) => {
    this.sucursalesService.addSucursal(req.body)
      .then((data) => res.status(201).json({message: data}))
      .catch(err => this.handleError(err,res));
  }

  updateSucursal = (req: Request, res: Response) => {
    this.sucursalesService.updateSucursal(req.body)
      .then((data) => res.json({message: data}))
      .catch(err => this.handleError(err, res));
  }

  deleteSucursal = (req: Request, res: Response) => {
    const id = +req.params.id;
    this.sucursalesService.deleteSucursal(id)
      .then((data)=> res.json({message: data}))
      .catch(err => this.handleError(err,res));
  }
}