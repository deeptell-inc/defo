import { motion, AnimatePresence } from 'framer-motion';
import { Merchant } from '@/types/process';

interface MerchantTableProps {
  merchants: Merchant[];
}

export const MerchantTable = ({ merchants }: MerchantTableProps) => {
  return (
    <div className="w-full overflow-x-auto bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full min-w-max">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">取引先名</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">担当者名</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">進捗状況</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence mode="wait">
            {merchants.map((merchant) => (
              <motion.tr
                key={merchant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900">{merchant.merchantName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{merchant.referredPersonName}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {merchant.progress}
                  </span>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};