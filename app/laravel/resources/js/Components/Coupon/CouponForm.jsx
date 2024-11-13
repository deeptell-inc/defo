import React, { useState, useEffect } from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { Switch } from '@/Components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { generateCouponCode } from '@/Utils/CouponUtils'; 
import axios from 'axios';

const CouponForm = ({ coupon, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    code: '',
    price: 0,
    isNew: false,
    status: 'unused',
  });

  useEffect(() => {
    if (coupon) {
      setFormData(coupon);
    }
  }, [coupon]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleGenerateCode = () => {
    setFormData(prev => ({ ...prev, code: generateCouponCode() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/coupons', formData); // APIエンドポイントにPOSTリクエスト
      console.log('クーポンが作成されました:', response.data);
      // フォームをリセットしたり、成功メッセージを表示したりする処理を追加
    } catch (error) {
      console.error('クーポンの作成に失敗しました:', error);
      // エラー処理を追加
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="クーポンタイトル"
        required
      />
      <Textarea
        name="details"
        value={formData.details}
        onChange={handleChange}
        placeholder="クーポン詳細"
        required
      />
      <div className="flex space-x-2">
        <Input
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="クーポンコード"
          required
        />
        <Button type="button" onClick={handleGenerateCode}>
          生成
        </Button>
      </div>
      <Input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="支払い金額"
        required
      />
      <div className="flex items-center space-x-2">
        <Switch
          name="isNew"
          checked={formData.isNew}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isNew: checked }))}
        />
        <label>新規クーポン</label>
      </div>
      <Select
        name="status"
        value={formData.status}
        onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="ステータスを選択" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="unused">未使用</SelectItem>
          <SelectItem value="reserved">予約済</SelectItem>
          <SelectItem value="used">使用済</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>キャンセル</Button>
        <Button type="submit">保存</Button>
      </div>
    </form>
  );
};

export default CouponForm;
