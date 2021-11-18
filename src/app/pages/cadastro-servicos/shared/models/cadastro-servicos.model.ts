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