import { IEnumModel } from './enum.model';

export interface IBaseModel<T> {
  sucesso: boolean;
  mensagem: IEnumModel;
  dados: T;
  resultadoValidacao: any;
}
