export interface Merchant {
  name: string;
  address: string;
  phone: string;
  referral_fee: number;
}

export interface Coupon {
  id: string;
  merchant_id: string;
  image_path: string;
  is_new_customer: boolean;
  coupon_title: string;
  coupon_description: string;
  contact_info: string;
  website_urls: string[];
  start_date: string;
  end_date: string;
  now_usage: number;
  address: string;
  discount_type: 'percentage' | 'fixed' | 'free';
  discount_value: number;
  code: string;
  minimum_purchase: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  redemption_type: 'online' | 'offline';
  merchant: Merchant;
}