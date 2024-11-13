import React from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";

const FPInfo = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div>
          <Label>FPステータス</Label>
          <Input value="" readOnly />
        </div>
        <div>
          <Label>FP未振り件数</Label>
          <Input value="1" readOnly />
        </div>
        <div>
          <Label>LINEグループ未</Label>
          <Input value="0" readOnly />
        </div>
      </div>

      <div>
        <Label>担当FP名</Label>
        <Input value="" readOnly />
      </div>

      <div>
        <Label>サイト別</Label>
        <Input value="" readOnly />
      </div>

      <div>
        <h3 className="font-semibold mb-4">FP紹介一覧</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>紹介日</TableHead>
              <TableHead>紹介先FP名</TableHead>
              <TableHead>紹介先FP会社名</TableHead>
              <TableHead>紹介先FP電話番号</TableHead>
              <TableHead>当社担当者</TableHead>
              <TableHead>紹介履歴</TableHead>
              <TableHead>複数紹介日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* データがない場合は空のテーブル */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FPInfo;