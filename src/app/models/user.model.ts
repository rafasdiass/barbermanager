export interface User {
  _id?: string;
  id?: string;
  idCompanys?: Array<string>;
  name?: string;
  email: string;
  password?: string;
  address?: string; // Adicione a propriedade 'address' aqui
  phone?: string;
  admin?: boolean;
  employee?: boolean;
}
