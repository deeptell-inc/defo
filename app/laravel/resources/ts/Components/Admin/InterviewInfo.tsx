import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";

const InterviewInfo = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div>
          <Label>面談ステータス</Label>
          <Input value="" readOnly />
        </div>
        <div>
          <Label>初回面談決定日</Label>
          <Input value="" readOnly />
        </div>
        <div>
          <Label>FP日時確定</Label>
          <Input value="0" readOnly />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">次回面談予定</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>次回面談予定日</TableHead>
              <TableHead>面談結果</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* データがない場合は空のテーブル */}
          </TableBody>
        </Table>
      </div>

      <div>
        <Label>その他コメント</Label>
        <Input value="" readOnly />
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div>
          <Label>AG新規有無</Label>
          <Input value="" readOnly />
        </div>
        <div>
          <Label>AG新規終 1回目</Label>
          <Input value="" readOnly />
        </div>
        <div>
          <Label>AG新規終 2回目</Label>
          <Input value="" readOnly />
        </div>
        <div>
          <Label>モッピー新規有無</Label>
          <Input value="" readOnly />
        </div>
        <div>
          <Label>紹介された別 報酬</Label>
          <Input value="" readOnly />
        </div>
      </div>
    </div>
  );
};

export default InterviewInfo;