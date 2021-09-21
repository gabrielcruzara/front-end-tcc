export interface IPerfilUsuarioModel {
  //permissoes: IPermissoes[];
  token: IJwtToken;
  //dadosUsuario: IDadosUsuario;
}

export interface IJwtToken {
  accessToken: string;
  created: string;
  expiration: string;
  refreshToken: string;
}
// export interface IDadosUsuario {
//   login: string;
//   nome: string;
//   nrCodigo: string;
//   grupo: string;
//   cpf: string;
// }

// export interface IPermissoes {
//   id: number;
//   descricao: string;
//   temAcesso: boolean;
// }
