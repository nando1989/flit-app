import { IAddress } from '@/models/address';

export interface IEmployees {
  id?: string;
  isActive: boolean;
  photoUrl: string;
  name: string;
  email: string;
  hireDate: Date;
  document: string;
  address: IAddress;
}
