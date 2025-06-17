export interface Delivery {
  _id: string;
  partyName: string;
  address: string;
  material: string;
  quantity: string;
  expectedDate: string;
  expectedTime: string;
}

export interface DriverDelivery {
  _id: string;
  pname: string;
  address: string;
  material: string;
  quantity: string;
  expectedDeliveryDate: string;
}

export interface Truck {
  id: string;
  number: string;
  driverName: string;
  status: string;
}

export * from './customers';
export * from './invoices';
