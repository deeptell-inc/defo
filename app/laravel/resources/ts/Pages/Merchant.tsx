import MerchantRegistrationForm from "@/Components/MerchantRegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              加盟店登録
            </h1>
            <p className="mt-2 text-gray-600">
              サービス向上のため、面談についてのご意見をお聞かせください。
            </p>
          </div>
          <MerchantRegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
