import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Typography, Box } from '@mui/material';
import CouponCard from './CouponCard';
import CouponForm from './CouponForm';
import SearchBar from './SearchBar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('/api/coupons');
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const handleAddCoupon = async (newCoupon) => {
    try {
      await axios.post('/api/coupons', newCoupon);
      fetchCoupons();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding coupon:', error);
    }
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleUpdateCoupon = async (updatedCoupon) => {
    try {
      await axios.put(`/api/coupons/${updatedCoupon.id}`, updatedCoupon);
      fetchCoupons();
      setIsModalOpen(false);
      setEditingCoupon(null);
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await axios.delete(`/api/coupons/${id}`);
      fetchCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredCoupons = coupons.filter((coupon) => {
    return coupon.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        クーポン一覧
      </Typography>
      <SearchBar onSearch={handleSearch} />
      <div className="flex justify-end mt-4">
        <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
          クーポンを追加
        </Button>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="coupon-modal-title"
        aria-describedby="coupon-modal-description"
      >
        <Box sx={style}>
          <Typography id="coupon-modal-title" variant="h6" component="h2">
            {editingCoupon ? 'クーポンの編集' : 'クーポンの追加'}
          </Typography>
          <CouponForm
            coupon={editingCoupon}
            onSubmit={editingCoupon ? handleUpdateCoupon : handleAddCoupon}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingCoupon(null);
            }}
          />
        </Box>
      </Modal>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredCoupons.map((coupon) => (
          <li key={coupon.id}>
            <CouponCard
              coupon={coupon}
              onEdit={() => handleEditCoupon(coupon)}
              onDelete={() => handleDeleteCoupon(coupon.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CouponList;
