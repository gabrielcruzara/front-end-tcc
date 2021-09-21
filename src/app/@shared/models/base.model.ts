export interface IBaseModel<T> {
  sucesso: boolean;
  mensagem: IEnumModel;
  dados: T;
  resultadoValidacao: any;
}

export interface IEnumModel {
  codigo: number;
  nome: string;
  descricao: string;
}
