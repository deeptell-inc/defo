let coupons = [];

export const getCoupons = () => coupons;

export const addCoupon = (coupon) => {
  const newCoupon = { ...coupon, id: Date.now().toString() };
  coupons = [...coupons, newCoupon];
  return newCoupon;
};

export const updateCoupon = (updatedCoupon) => {
  coupons = coupons.map(coupon => 
    coupon.id === updatedCoupon.id ? updatedCoupon : coupon
  );
  return updatedCoupon;
};

export const deleteCoupon = (id) => {
  coupons = coupons.filter(coupon => coupon.id !== id);
};

export const generateCouponCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
