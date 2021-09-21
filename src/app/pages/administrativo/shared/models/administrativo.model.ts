export interface IMatriculas {
  matriculas: IMatricula[];
}

export interface IMatricula {
  id: string;
  matricula: string;
}

export interface ICedulaCInput {
  matricula: number;
  mes: number;
  ano: number;
  parcela: number;
}
