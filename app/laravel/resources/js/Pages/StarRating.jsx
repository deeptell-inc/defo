import { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({ value, onChange, label }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hover || value)
                  ? "text-secondary fill-secondary"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default StarRating;