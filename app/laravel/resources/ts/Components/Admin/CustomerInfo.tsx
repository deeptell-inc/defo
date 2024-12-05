import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export const userData = [
  {
    id: 1,
    name: "山田 太郎",
    email: "yamada@example.com",
    status: "アクティブ",
    gender: "男性",
    account: "taro_yamada",
    age: "30～34歳",
    prefecture: "東京都",
    city: "千代田区",
    address: "永田町1-7",
    building: "国会議事堂1F",
    phone: "09012345678",
    createdAt: "2023-01-15 10:00:00",
  },
  {
    id: 2,
    name: "鈴木 花子",
    email: "suzuki@example.com",
    status: "非アクティブ",
    gender: "女性",
    account: "hanako_suzuki",
    age: "25～29歳",
    prefecture: "大阪府",
    city: "北区",
    address: "梅田3-4",
    building: "グランフロント大阪南館",
    phone: "08098765432",
    createdAt: "2023-02-20 14:30:00",
  },
];


const UserTable = () => {
  return (
    <table className="w-full bg-white shadow rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-6 py-4 text-left">名前</th>
          <th className="px-6 py-4 text-left">メール</th>
          <th className="px-6 py-4 text-left">ステータス</th>
          <th className="px-6 py-4 text-left">性別</th>
          <th className="px-6 py-4 text-left">アカウント名</th>
          <th className="px-6 py-4 text-left">年齢</th>
          <th className="px-6 py-4 text-left">都道府県</th>
          <th className="px-6 py-4 text-left">市区</th>
          <th className="px-6 py-4 text-left">住所</th>
          <th className="px-6 py-4 text-left">建物名</th>
          <th className="px-6 py-4 text-left">携帯番号</th>
          <th className="px-6 py-4 text-left">登録日</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((user) => (
          <tr key={user.id} className="border-t">
            <td className="px-6 py-4">{user.name}</td>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4">{user.status}</td>
            <td className="px-6 py-4">{user.gender}</td>
            <td className="px-6 py-4">{user.account}</td>
            <td className="px-6 py-4">{user.age}</td>
            <td className="px-6 py-4">{user.prefecture}</td>
            <td className="px-6 py-4">{user.city}</td>
            <td className="px-6 py-4">{user.address}</td>
            <td className="px-6 py-4">{user.building}</td>
            <td className="px-6 py-4">{user.phone}</td>
            <td className="px-6 py-4">{user.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};



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

      <UserTable />
    </div>
  );
};

export default CustomerInfo;