export interface Site {
  id: string;
  address: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  contact: string;
  sites: Site[];
}