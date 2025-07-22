export type Shipment = {
  id: string;
  shipping_company: string;
  tracking_code: string;
  order_date: string;
  store: string;
  products?: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  order?: {
    id: string;
    fulfillment_status?: string;
    payment_status?: string;
    transaction_id?: string;
  };
};
