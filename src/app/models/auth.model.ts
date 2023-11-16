import { User } from './user.model';

export interface AuthModel {
  user: {
    email: string;
    name: string;
    id: string;
    idCopmanys: Array<string>;
    admin?: string;
  };
  token: string;
  refreshToken: string;
}
