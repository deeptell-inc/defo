import React from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

const CouponCard = ({ coupon }) => {
  const statusColor = {
    unused: 'bg-green-500',
    reserved: 'bg-yellow-500',
    used: 'bg-gray-500',
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <img src={coupon.image} alt={coupon.title} className="w-full h-48 object-cover rounded-t-lg" />
        <CardTitle className="mt-2">{coupon.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{coupon.details}</p>
        <p className="font-semibold">コード: {coupon.code}</p>
        <p>支払い金額: ¥{coupon.price.toLocaleString()}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge variant="outline" className={statusColor[coupon.status]}>
          {coupon.status === 'unused' ? '未使用' : coupon.status === 'reserved' ? '予約済' : '使用済'}
        </Badge>
        {coupon.isNew && <Badge className="bg-blue-500">新規</Badge>}
      </CardFooter>
    </Card>
  );
};

export default CouponCard;