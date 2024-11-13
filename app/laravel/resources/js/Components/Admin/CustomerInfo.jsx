import React from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

const CustomerInfo = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="record-number">レコード番号</Label>
          <Input id="record-number" value="3247" readOnly />
        </div>
        <div>
          <Label htmlFor="date">日時</Label>
          <Input id="date" type="datetime-local" value="2024-09-27T17:00" readOnly />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <Label htmlFor="gender">性別</Label>
          <Input id="gender" value="女性" readOnly />
        </div>
        <div>
          <Label htmlFor="account">アカウント名</Label>
          <Input id="account" value="miki" readOnly />
        </div>
        <div>
          <Label htmlFor="age">年齢</Label>
          <Input id="age" value="45～49歳" readOnly />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="prefecture">お住まいの都道府県</Label>
          <Input id="prefecture" value="愛知県" readOnly />
        </div>
        <div>
          <Label htmlFor="city">住所（市区）</Label>
          <Input id="city" value="大府市" readOnly />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="address">住所（町名、番地）</Label>
          <Input id="address" value="追分町1-24" readOnly />
        </div>
        <div>
          <Label htmlFor="building">住所（建物名、部屋番号等）</Label>
          <Input id="building" value="なし" readOnly />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="phone">携帯番号</Label>
          <Input id="phone" value="09034227898" readOnly />
        </div>
        <div>
          <Label htmlFor="email">メールアドレス</Label>
          <Input id="email" value="sho_miki_take@yahoo.co.jp" readOnly />
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;