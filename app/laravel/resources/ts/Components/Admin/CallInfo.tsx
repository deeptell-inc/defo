import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";

const CallInfo = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div>
          <Label>電話連絡ステータス</Label>
          <Input value="OK" readOnly />
        </div>
        <div>
          <Label>確認電話可能数</Label>
          <Input value="0" readOnly />
        </div>
        <div>
          <Label>毎週電話連絡日時</Label>
          <Input type="date" value="2024-09-27" readOnly />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">電話連絡</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日時</TableHead>
              <TableHead>電話状況</TableHead>
              <TableHead>ショートメッセージ送配信済</TableHead>
              <TableHead>確認電話担当</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2024-09-27 17:30</TableCell>
              <TableCell>OK</TableCell>
              <TableCell>-</TableCell>
              <TableCell>三島</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CallInfo;