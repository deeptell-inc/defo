import { useState } from 'react';
import { ProcessSteps } from '@/Components/ProcessSteps';
import { MerchantTable } from '@/Components/MerchantTable';
import { PROCESS_STEPS } from '@/types/process';

// モックデータ
const MOCK_MERCHANTS = [
  { id: '1', merchantName: '株式会社ABC', referredPersonName: '山田太郎', progress: '問い合わせ済' },
  { id: '2', merchantName: '株式会社DEF', referredPersonName: '鈴木一郎', progress: '確認電話済' },
  { id: '3', merchantName: '株式会社GHI', referredPersonName: '佐藤花子', progress: 'FPアテンド済' },
];

const Process = () => {
  const [activeStep, setActiveStep] = useState(PROCESS_STEPS[0].id);
  
  // 実際のアプリケーションではAPIから取得する
  const filteredMerchants = MOCK_MERCHANTS.filter(
    merchant => merchant.progress === PROCESS_STEPS.find(step => step.id === activeStep)?.label
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">プロセス管理ダッシュボード</h1>
          <p className="text-gray-600">取引先のプロセスを効率的に管理・追跡</p>
        </div>
        
        <ProcessSteps
          steps={PROCESS_STEPS}
          activeStep={activeStep}
          onStepClick={setActiveStep}
        />
        
        <MerchantTable merchants={filteredMerchants} />
      </div>
    </div>
  );
};

export default Process;