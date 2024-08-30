import { SucursalesModel } from "../../data";
import { CustomError } from "../../domain/errors/custom.error";


export class SucursalesService {
  constructor(private sucursalesModel: SucursalesModel){}

  public async getSucursales() {
    const result = await this.sucursalesModel.getAllSucursales();
    return result;
  }

  public async addSucursal(sucursal: any){
    const {idEmpresa, sucursalName, city, state, active} = sucursal;
    const result = await this.sucursalesModel.addSucursal(idEmpresa, sucursalName, city, state, active);
    if(result[0] < 1){
      throw CustomError.badRequest('No se pudo generar el registro de la sucursal');
    }
    return 'Se agrego correctamente la sucursal';
  }

  public async updateSucursal(sucursal: any){
    const {idSucursal, idEmpresa, sucursalName, city, state, active} = sucursal;
    const result = await this.sucursalesModel.updateSucursal(idSucursal,idEmpresa,
      sucursalName,city,state,active);
    if(result[0] < 1){
      throw CustomError.notFound('Sucursal con este id no fue encontrado');
    }
    return 'Sucursal modificada correctamente';
  }

  public async deleteSucursal(id:number) {
    const result = await this.sucursalesModel.deleteSucursal(id);
    if(result[0] < 1) {
      throw CustomError.notFound('Id de la sucursal no se encontro');
    }
    return 'Se elimino correctamente la sucursal';
  }
}