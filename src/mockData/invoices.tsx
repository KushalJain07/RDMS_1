import { Invoice } from '../types';

export const invoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2023-001',
    customerName: 'Ramesh Kumar',
    amount: 25000,
    date: '2023-12-01',
    status: 'Paid'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2023-002',
    customerName: 'Sneha Jain',
    amount: 18500,
    date: '2023-12-05',
    status: 'Pending'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2023-003',
    customerName: 'Rajeev Mehta',
    amount: 32000,
    date: '2023-12-10',
    status: 'Processing'
  }
];