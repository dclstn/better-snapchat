const GUMROAD_API_URL = 'https://api.gumroad.com/v2';

interface GumroadLicense {
  success: true;
  uses: number;
  purchase: {
    seller_id: string;
    product_id: string;
    product_name: string;
    permalink: string;
    product_permalink: string;
    email: string;
    price: number;
    gumroad_fee: number;
    currency: string;
    quantity: number;
    discover_fee_charged: boolean;
    can_contact: boolean;
    referrer: string;
    card: {
      expiry_month: number;
      expiry_year: number;
      type: string;
      visual: string;
    };
    order_number: number;
    sale_id: string;
    sale_timestamp: string;
    purchaser_id: string;
    subscription_id: string;
    variants: string;
    license_key: string;
    is_multiseat_license: boolean;
    ip_country: string;
    recurrence: string;
    is_gift_receiver_purchase: boolean;
    refunded: boolean;
    disputed: boolean;
    dispute_won: boolean;
    id: string;
    created_at: string;
    custom_fields: unknown[];
    chargebacked: boolean;
    subscription_ended_at: string;
    subscription_cancelled_at: string;
    subscription_failed_at: string;
  };
}

interface GumroadLicenseError {
  success: false;
  message: string;
}

export async function verifyGumroadLicense(licenseKey: string): Promise<GumroadLicense | GumroadLicenseError> {
  const url = new URL(`${GUMROAD_API_URL}/licenses/verify`);

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: process.env.GUMROAD_PRODUCT_ID, license_key: licenseKey }),
  });

  return response.json();
}
