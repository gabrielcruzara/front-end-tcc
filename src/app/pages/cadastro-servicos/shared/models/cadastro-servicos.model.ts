export interface IListaServicos {
    identificadorServico: number;
    email: string;
    nomeServico: string;
    custoServico: number;
    valorCobrado: number;
}

export interface IExeucaoServico {
    idHistoricoServico: number;
    nomeServico: string;
    custoServico: number;
    valorCobrado: number;
    quantidade: number;
    horaInicio: string;
    observacao: string;
}

export interface IServicosConcluidos {
    identificadorHistoricoServico: number;
    identificadorServico: number;
    nomeServico: string;
    quantidade: number;
    custoServico: number;
    valorCobrado: number;
    observacao: string;
    horaInicio: string;
    horaFinal: string;
}