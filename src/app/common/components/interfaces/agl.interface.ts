export interface Checkout {
    shipping_address: string;
    total_amount: string;
    cart: {
      quantity: number;
      price_per_unit: number;
      product_id: number;
      product: {
        product_name: string;
        product_image: string;
        product_type: {
          category_name: string;
        };
      };
    };
  }
  
  export interface CheckoutList {
    checkout: Checkout;
  }
  