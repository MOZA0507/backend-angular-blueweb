import { Request, Response } from "express";
import { EmpresasService } from '../services/empresas.service';
import { CustomError } from "../../domain/errors/custom.error";


export class EmpresasController {
  constructor(private empresasService: EmpresasService){}

  private handleError = (error: unknown, res: Response) =>{
    if(error instanceof CustomError){
      console.log(error.statusCode);
      return res.status(error.statusCode).json({error:error.message});
    }
    return res.status(500).json({error: 'Internal Server Error'});
  }

  getEmpresas = (req: Request, res: Response) =>{
    this.empresasService.getEmpresas()
      .then((data) => res.json(data))
      .catch(err => this.handleError(err,res));
  }

  addEmpresa = (req: Request, res: Response) => {
    this.empresasService.addEmpresa(req.body)
      .then((data) => res.status(201).json({message:data}))
      .catch(err => this.handleError(err, res));
  }

  editEmpresa = (req: Request, res: Response) => {
    this.empresasService.editEmpresa(req.body)
      .then((data) => res.json({message:data}))
      .catch(err => this.handleError(err,res));
  }

  deleteEmpresa = (req: Request, res: Response) => {
    const id: number = +req.params.id
    this.empresasService.deleteEmpresa(id)
      .then((data) => res.json({message: data}))
      .catch(err => this.handleError(err,res));
  }
}