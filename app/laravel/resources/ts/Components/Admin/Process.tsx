import React, { useState, useEffect } from 'react';
import { ProcessSteps } from '@/Components/ProcessSteps';
import { PROCESS_STEPS } from '@/types/process';
import axios from 'axios';

// Define the Customer type based on the Django model
interface Customer {
  id: number;
  date_time: string | null;
  customer_number: number | null;
  company_code: string | null;
  last_name: string | null;
  first_name: string | null;
  gender: string | null;
  desired_call_time: string | null;
  memo: string | null;
  phone_status: string | null;
  fp_status: string | null;
  meeting_status: string | null;
  prefecture: string | null;
  cellphone: string | null;
  remarks: string | null;
}


const Process = () => {
  const [activeStep, setActiveStep] = useState(PROCESS_STEPS[0].id);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/customer_call/import_csv/");
      setCustomers(response.data);
    } catch (error) {
      console.error("顧客データの取得に失敗しました：", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const onFileUpload = async () => {
    if (!file) {
      setMessage("ファイルが選択されていません。");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:9000/api/customer_call/import_csv/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      if (response.data.data) {
        setCustomers(response.data.data);
      } else {
        fetchCustomers();
      }
    } catch (error) {
      console.error("CSVインポート中にエラーが発生しました：", error);
      setMessage("CSVインポート中にエラーが発生しました");
    }
  };

  const filteredCustomers = customers.filter(
    customer => customer.fp_status === PROCESS_STEPS.find(step => step.id === activeStep)?.label
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">プロセス管理ダッシュボード</h1>
          <p className="text-gray-600">顧客のプロセスを効率的に管理・追跡</p>
        </div>
        
        <ProcessSteps
          steps={[
            { id: 'confirmation_possible', label: '確認電話可能', description: '' },
            { id: 're_call', label: '再架電', description: '' },
            { id: 'phone_confirmed', label: '確認電話通過', description: '' },
            { id: 'fp_not_assigned', label: 'FP未振り', description: '' },
            { id: 'fp_inquiry', label: 'FP照会中', description: '' },
            { id: 'chat_group_pending', label: 'チャットグループ未', description: '' },
            { id: 'fp_assigned_no_schedule', label: 'FP振り済日程未定', description: '' },
            { id: 'fp_scheduled_monthly', label: 'FP日時確定/月間', description: '' },
            { id: 'execution_monthly', label: '実行/月間', description: '' },
            { id: 'fp_scheduled_today', label: 'FP日時確定/当日', description: '' },
            { id: 'execution_today', label: '実行/当日', description: '' },
            { id: 'execution_confirmation', label: '実行確認用', description: '' },
          ]}
          activeStep={activeStep}
          onStepClick={setActiveStep}
        />
        
        <div className="relative overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">日時</th>
                <th className="px-4 py-2">顧客番号</th>
                <th className="px-4 py-2">企業コード</th>
                <th className="px-4 py-2">苗字</th>
                <th className="px-4 py-2">名前</th>
                <th className="px-4 py-2">性別</th>
                <th className="px-4 py-2">確認電話希望日時</th>
                <th className="px-4 py-2">メモ</th>
                <th className="px-4 py-2">電話連絡ステータス</th>
                <th className="px-4 py-2">FPステータス</th>
                <th className="px-4 py-2">面談ステータス</th>
                <th className="px-4 py-2">都道府県</th>
                <th className="px-4 py-2">携帯番号</th>
                <th className="px-4 py-2">備考欄</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers && filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="border-t">
                    <td className="px-4 py-2">{cust.id}</td>
                    <td className="px-4 py-2">{cust.date_time}</td>
                    <td className="px-4 py-2">{cust.customer_number}</td>
                    <td className="px-4 py-2">{cust.company_code}</td>
                    <td className="px-4 py-2">{cust.last_name}</td>
                    <td className="px-4 py-2">{cust.first_name}</td>
                    <td className="px-4 py-2">{cust.gender}</td>
                    <td className="px-4 py-2">{cust.desired_call_time}</td>
                    <td className="px-4 py-2">{cust.memo}</td>
                    <td className="px-4 py-2">{cust.phone_status}</td>
                    <td className="px-4 py-2">{cust.fp_status}</td>
                    <td className="px-4 py-2">{cust.meeting_status}</td>
                    <td className="px-4 py-2">{cust.prefecture}</td>
                    <td className="px-4 py-2">{cust.cellphone}</td>
                    <td className="px-4 py-2">{cust.remarks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2" colSpan={15}>
                    データがありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* CSVインポートセクション */}
        <div>
          <h2 className="text-xl font-bold mb-4">CSV インポート (Process)</h2>
          <div className="flex items-center space-x-4">
            <input type="file" accept=".csv" onChange={onFileChange} />
            <button
              onClick={onFileUpload}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              アップロード
            </button>
          </div>
          {message && <p className="mt-2 text-green-600">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Process;