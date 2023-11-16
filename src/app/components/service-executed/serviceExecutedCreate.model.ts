export interface ServiceExecutedCreate {
  _id?: string;
  id?: string;
  idCompanys?: string;
  idServices?: Array<string>;
  idClients?: string;
  idUsers?: string;
  paymentMethod?: string;
  paymentDate?: Date;
  serviceDate?: Date;
}
