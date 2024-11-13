import { useState } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import CategoryFilter from "@/Components/CategoryFilter";
import CouponCard from "@/Components/CouponCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Command, CommandInput } from "@/Components/ui/command";
import axios from 'axios';

const coupons = [
  {
    id: "1",
    merchant_id: "m1",
    image_path: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    is_new_customer: true,
    coupon_title: "ディナーセット",
    coupon_description: "2名様以上でご利用いただける特別ディナーセット",
    contact_info: "03-1234-5678",
    website_urls: ["https://example.com"],
    start_date: "2024-03-01",
    end_date: "2024-03-31",
    now_usage: 45,
    address: "東京都渋谷区",
    discount_type: "percentage",
    discount_value: 20,
    code: "DINNER20",
    minimum_purchase: 5000,
    created_at: "2024-02-01",
    updated_at: "2024-02-01",
    deleted_at: null,
    redemption_type: "offline",
    merchant: {
      name: "サンプルレストラン",
      address: "東京都渋谷区1-1-1",
      phone: "03-1234-5678",
      referral_fee: 500
    }
  },
  {
    id: "2",
    merchant_id: "m2",
    image_path: "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
    is_new_customer: false,
    coupon_title: "ランチセット",
    coupon_description: "平日限定ランチセット",
    contact_info: "03-2345-6789",
    website_urls: ["https://example.com"],
    start_date: "2024-03-01",
    end_date: "2024-03-31",
    now_usage: 30,
    address: "東京都新宿区",
    discount_type: "fixed",
    discount_value: 500,
    code: "LUNCH500",
    minimum_purchase: 0,
    created_at: "2024-02-01",
    updated_at: "2024-02-01",
    deleted_at: null,
    redemption_type: "online",
    merchant: {
      name: "オンラインショップA",
      address: "東京都新宿区2-2-2",
      phone: "03-2345-6789",
      referral_fee: 300
    }
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [searchQuery, setSearchQuery] = useState("");

  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
      fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
      try {
          const response = await axios.get('http://localhost:8000/api/coupons');
          console.log(response)
          setCoupons(response.data);
      } catch (error) {
          console.error('Error fetching coupons:', error);
      }
  };

  const filteredCoupons = coupons
    .filter(coupon => {
      if (selectedCategory === "すべて") return true;
      // カテゴリーフィルタリングのロジックを実装
      return true;
    })
    .filter(coupon => {
      if (!searchQuery) return true;
      return (
        coupon.coupon_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  const newCustomerCoupons = filteredCoupons.filter(
    (coupon) => coupon.is_new_customer
  );
  const existingCustomerCoupons = filteredCoupons.filter(
    (coupon) => !coupon.is_new_customer
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <div className="text-center py-8">
            <h1 className="text-3xl font-bold mb-4">
              お得なクーポンで素敵なお店を見つけよう
            </h1>
            <p className="text-gray-600 mb-6">
              地域のお店で使える、お得なクーポンを多数ご用意しています
            </p>
            <Command className="rounded-lg border shadow-md max-w-2xl mx-auto">
              <CommandInput
                placeholder="クーポンやお店を検索..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
            </Command>
          </div>
          <CategoryFilter onCategoryChange={setSelectedCategory} />
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="all">すべて</TabsTrigger>
              <TabsTrigger value="new">新規限定</TabsTrigger>
              <TabsTrigger value="existing">既存のお客様</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} {...coupon} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="new">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newCustomerCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} {...coupon} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="existing">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {existingCustomerCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} {...coupon} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;