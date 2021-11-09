export interface IPerfilUsuarioModel {
  token: IJwtToken;
  dadosUsuario: IDadosUsuario;
}

export interface IJwtToken {
  accessToken: string;
  created: string;
  expiration: string;
  refreshToken: string;
}
export interface IDadosUsuario {
  email: string;
  nome: string;
  id: number
}

