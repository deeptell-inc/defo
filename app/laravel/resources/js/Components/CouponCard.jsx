import { Calendar, MapPin, Phone, Globe, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const CouponCard = ({
  id,
  image_path,
  coupon_title,
  discount_type,
  discount_value,
  end_date,
  address,
  is_new_customer,
  minimum_purchase,
}) => {
  const formatDiscount = () => {
    switch (discount_type) {
      case "percentage":
        return `${discount_value}%OFF`;
      case "fixed":
        return `${discount_value.toLocaleString()}円OFF`;
      case "free":
        return "無料";
      default:
        return "";
    }
  };

  return (
    <Link to={`/store/${id}`}>
      <div className="coupon-card bg-white rounded-lg overflow-hidden shadow">
        <div className="relative">
          <img
            src={image_path}
            alt={coupon_title}
            className="w-full h-48 object-cover"
          />
          {is_new_customer && (
            <span className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              新規限定
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{coupon_title}</h3>
          <p className="text-primary text-xl font-bold mb-2">{formatDiscount()}</p>
          {minimum_purchase > 0 && (
            <p className="text-sm text-gray-600 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              {minimum_purchase.toLocaleString()}円以上のご利用で
            </p>
          )}
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{end_date}まで</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{address}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CouponCard;