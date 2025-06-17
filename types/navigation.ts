export type RootStackParamList = {
  LoginScreen: undefined;
  TabNavigator: undefined;
  DeliveryDetailsScreen: { deliveryData: any };
};

export type TabParamList = {
  Trucks: undefined;
  Customers: undefined;
  Invoices: undefined;
  AddCustomer: undefined; // Changed from Add_Customer
  AddTruck: undefined;   // Changed from Add_Truck for consistency
};