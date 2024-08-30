import { EmpresasModel } from '../../data/models/empresas.model';
import { CustomError } from '../../domain/errors/custom.error';


export class EmpresasService {
  constructor(private empresasModel:EmpresasModel){}

  public async getEmpresas() {
    const result = await this.empresasModel.getAllEmpresas();
    console.log(result);
    return result;
  }

  public async addEmpresa(empresa: any){
    const {alias, empresaName, active} = empresa;
    const result = await this.empresasModel.addEmpresa(alias, empresaName, active);
    if(result[0] < 1){
      throw CustomError.badRequest('No se registro correctamente la empresa');
    } else {
      return 'La empresa se agrego correctamente';
    }
  }

  public async editEmpresa(empresa: any){
    const {id,alias,empresaName,active} = empresa;
    const result = await this.empresasModel.updateEmpresa(id,alias,empresaName,active);
    if(result[0] < 1) {
      throw CustomError.notFound('No se encontro una empresa con ese id');
    }
    return 'Se modifico correctamente la empresa';
  }

  public async deleteEmpresa(id:number) {
    const result = await this.empresasModel.deleteEmpresa(id);
    if(result[0] < 1) {
      throw CustomError.notFound('Id de la empresa no se encontro');
    }
    return 'Se elimino correctamente la empresa';
  }
}