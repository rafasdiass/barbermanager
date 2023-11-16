import { User } from 'src/app/models/user.model';
import { Client } from '../client/client.model';
import { Servico } from '../servicos/servico.model';

export interface ServiceExecuted {
  id?: string;
  client?: Client;
  services?: Servico[];
  user?: User;
  paymentMethod?: string;
  paymentDate: Date;
  serviceDate: Date;
  value: number;
  createdAt: Date;
}
