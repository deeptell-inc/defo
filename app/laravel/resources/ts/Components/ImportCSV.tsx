// ImportCSV.jsx
import React, { useState } from "react";
import axios from "axios";

const ImportCSV = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // ファイル選択時の処理
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // アップロード処理
  const onFileUpload = async () => {

    if (!file) {
      setMessage("ファイルが選択されていません。");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/import-csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("インポートに成功しました。");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Excel/CSV インポート</h2>
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={onFileChange}
      />
      <button onClick={onFileUpload}>アップロード</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImportCSV;
