import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import CategoryFilter from "@/Components/CategoryFilter";
import CouponCard from "@/Components/CouponCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Command, CommandInput } from "@/Components/ui/command";
import { Coupon } from "@/types/coupon";

const CouponList = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("http://localhost/api/coupon");
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  const filteredCoupons = coupons.filter((coupon) => {
    return coupon.coupon_title.includes(searchQuery);
  });

  const newCustomerCoupons = filteredCoupons.filter(
    (coupon) => coupon.is_new_customer
  );
  const existingCustomerCoupons = filteredCoupons.filter(
    (coupon) => !coupon.is_new_customer
  );

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <div className="text-center py-8">
            <h1 className="text-3xl font-bold mb-4">
              お得なクーポンで素敵なお店を見つけよう
            </h1>
            <p className="text-gray-600 mb-6">
              お店で使える、お得なクーポンを多数ご用意しています
            </p>
            <Command className="rounded-lg border shadow-md max-w-2xl mx-auto">
              <CommandInput
                placeholder="クーポンやお店を検索..."
                value={searchQuery}
                onValueChange={(value) => setSearchQuery(value)}
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
      <button onClick={() => {
        navigate('/survey/user')
      }} className="fixed bottom-4 right-4 bg-primary text-white w-48 h-48 rounded-full shadow-lg hover:bg-primary/90 transition-colors flex items-center justify-center">
        アンケートに回答して<br/>お得なクーポンをゲット
      </button>
    </div>
  );
};
export default CouponList;
