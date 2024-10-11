import React from 'react';
import { useNavigate } from 'react-router-dom';
import CouponForm from '@/Components/CouponForm';
import { addCoupon } from '@/Utils/couponUtils';

const CreateCoupon = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    addCoupon(formData);
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">新規クーポン登録</h1>
      <CouponForm onSubmit={handleSubmit} onCancel={() => navigate('/')} />
    </div>
  );
};

export default CreateCoupon;