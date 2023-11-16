export interface Cost {
  _id?: string;
  idCompany: string;
  value: number | null;
  description: string;
  costDate: Date;
}
