import { Delivery, DriverDelivery } from '../types';

export const supplierDeliveries: Delivery[] = [
  {
    _id: 'del_001',
    partyName: 'Agarwal Cement Traders',
    address: '132 Industrial Road, Nagpur',
    material: '40 bags Cement',
    quantity: '40',
    expectedDate: '2025-06-17',
    expectedTime: '11:30 AM',
  },
  {
    _id: 'del_002',
    partyName: 'Universal Bricks',
    address: 'Plot 45, Wadi Layout',
    material: '3000 Bricks',
    quantity: '3000',
    expectedDate: '2025-06-18',
    expectedTime: '2:00 PM',
  },
];

export const driverDeliveries: DriverDelivery[] = [
  {
    _id: '1',
    pname: 'Singh Distributors',
    material: 'Bricks',
    quantity: '4000',
    expectedDeliveryDate: '2025-06-17',
    address: 'A-12, Old Town Rd, Indore',
  },
];
