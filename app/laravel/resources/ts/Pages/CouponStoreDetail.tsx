import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Calendar, MapPin, Phone, Clock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify"; // Importing toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing toastify CSS

const StoreDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // クーポン使用済みフラグと表示状態管理
  const [isCouponUsed, setIsCouponUsed] = useState(false);
  const [showCouponCode, setShowCouponCode] = useState(false);

  // 店舗データ（実際のアプリではAPIから取得）
  const storeData = {
    id: "1",
    name: "レストランA",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    discount: "ディナー10%OFF",
    validUntil: "2024年3月31日",
    location: "東京都渋谷区",
    phone: "03-1234-5678",
    hours: "11:00-22:00",
    description:
      "当店自慢の料理をお得にお楽しみいただけます。素材にこだわり、心を込めて調理した料理の数々をぜひご堪能ください。",
    howToUse: "ご注文時にクーポンをご提示ください。",
    terms: [
      "他のクーポンとの併用不可",
      "ディナータイム（17:00以降）のみ有効",
      "お一人様1回限り有効",
    ],
    couponCode: "ABC123", // クーポンコード
  };

  // クーポンを使用する処理
  const handleUseCoupon = () => {
    setIsCouponUsed(true);
    setShowCouponCode(true);
  };

  // クーポン確認処理
  const handleConfirmCoupon = () => {
    setShowCouponCode(false);
    toast.success("クーポンコードが確認されました！"); // Using toast instead of alert
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={storeData.image}
              alt={storeData.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">{storeData.name}</h1>
              <div className="bg-primary/10 p-4 rounded-lg mb-6">
                <p className="text-primary text-2xl font-bold">
                  {storeData.discount}
                </p>
                <div className="flex items-center mt-2 text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{storeData.validUntil}まで</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{storeData.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{storeData.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{storeData.hours}</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">店舗紹介</h2>
                <p className="text-gray-600">{storeData.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">クーポン利用方法</h2>
                <p className="text-gray-600">{storeData.howToUse}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">利用条件</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {storeData.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                {isCouponUsed ? (
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                    disabled
                  >
                    クーポン使用済み
                  </button>
                ) : (
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-lg"
                    onClick={handleUseCoupon}
                  >
                    クーポンを使用する
                  </button>
                )}
              </div>

              {showCouponCode && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-800 mb-4">
                    クーポンコード: <strong>{storeData.couponCode}</strong>
                  </p>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-lg"
                    onClick={handleConfirmCoupon}
                  >
                    確認
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default StoreDetail;
