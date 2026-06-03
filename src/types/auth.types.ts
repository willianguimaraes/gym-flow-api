export interface RegisterDTO {
  nome:     string;
  usuario:  string;
  email:    string;
  senha:    string;
  celular?: string;
  altura?:  number;
  peso?:    number;
}

export interface LoginDTO {
  usuario: string;
  senha:   string;
}

export interface JwtPayload {
  id:      number;
  usuario: string;
  email:   string;
}