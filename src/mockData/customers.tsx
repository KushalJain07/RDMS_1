import { Customer } from '../types';

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    company: 'Kumar Logistics Pvt. Ltd.',
    contact: '+91 9876543210',
    sites: [
      { id: '1', address: 'Plot 23, Transport Nagar, Nagpur' },
      { id: '2', address: 'Warehouse 7, Industrial Zone, Pune' },
    ],
  },
  {
    id: '2',
    name: 'Sneha Jain',
    company: 'Jain Transport Services',
    contact: '+91 9123456789',
    sites: [
      { id: '1', address: 'Jain Hub, Sector 15, Mumbai' },
    ],
  },
  {
    id: '3',
    name: 'Rajeev Mehta',
    company: 'Mehta Cargo Movers',
    contact: '+91 9988776655',
    sites: [],
  },
];