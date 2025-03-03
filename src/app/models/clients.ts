export interface Client {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  zipCode?: string;
  email: string;
  paymentMethod: 'online' | 'onSite';
  cgu: boolean;
  pub?: boolean;
  rights?: boolean;
  response_id?: string;
}
