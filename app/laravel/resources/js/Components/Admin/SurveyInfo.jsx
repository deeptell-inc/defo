import React from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";

const SurveyInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="site">サイト名</Label>
        <Input id="site" value="moppy" readOnly />
      </div>

      <div>
        <Label htmlFor="survey">家計相談アンケート</Label>
        <Textarea
          id="survey"
          className="min-h-[100px]"
          value="電気や水道の請求額をちゃんと把握していない。子どもの学校や習い事の費用だけでやりくりの会話が飛んでいく。おNISAとIDeCo(なぜこの新しい制度なんだろう)。保険を活用した将来のアドバイスが欲しい。定年後や老後のことを考えると、お金が足りるか不安になる点全てについてもっと勉強したいけど、どこから手をつけていいかわからない"
          readOnly
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label>過去5年以内に、病気やケガで7日以上の入院、又は手術を受けたことがありますか？</Label>
          <Input value="ない" readOnly />
        </div>
        <div>
          <Label>その他、家計相談で気になる事はございますか？</Label>
          <Input value="" readOnly />
        </div>
      </div>
    </div>
  );
};

export default SurveyInfo;