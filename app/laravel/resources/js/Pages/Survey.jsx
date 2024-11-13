import SurveyForm from "./SurveyForm";

const Survey = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container max-w-4xl py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              保険相談アンケート
            </h1>
            <p className="mt-2 text-gray-600">
              サービス向上のため、面談についてのご意見をお聞かせください。
            </p>
          </div>
          <SurveyForm />
        </div>
      </div>
    </div>
  );
};

export default Survey;
