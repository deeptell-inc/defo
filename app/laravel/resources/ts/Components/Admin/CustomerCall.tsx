import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

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

const CustomerCall = () => {
  // CSVアップロード用の状態
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  // サーバから取得した顧客データ（Bの形式）を保持する状態
  const [customers, setCustomers] = useState<Customer[]>([]);

  // APIから顧客データを取得するGETリクエスト
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/customer_call/import_csv/"
      );
      setCustomers(response.data);
    } catch (error) {
      console.error("顧客データの取得に失敗しました：", error);
    }
  };

  // コンポーネントの初回レンダリング時にデータを取得
  useEffect(() => {
    fetchCustomers();
  }, []);

  // ファイル選択ハンドラ
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  // CSVファイルアップロード用POSTリクエスト
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
      // API側からは { message: "〇〇件のデータをインポートしました。", data: [...] } の形式を想定
      setMessage(response.data.message);
      // 返却された最新のデータがある場合はそれをセット
      if (response.data.data) {
        setCustomers(response.data.data);
      } else {
        // ない場合は再取得
        fetchCustomers();
      }
    } catch (error) {
      console.error("CSVインポート中にエラーが発生しました：", error);
      setMessage("CSVインポート中にエラーが発生しました");
    }
  };

  return (
    <div className="space-y-6">
      {/* CSVインポートセクション */}
      <div>
        <h2 className="text-xl font-bold mb-4">CSV インポート (Customer Call)</h2>
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

      {/* 顧客データテーブル */}
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
            {customers && customers.length > 0 ? (
              customers.map((cust) => (
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
    </div>
  );
};

export default CustomerCall;
