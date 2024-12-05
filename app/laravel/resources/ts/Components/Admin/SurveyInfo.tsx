import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";

const SurveyInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name">名前</Label>
        <Input id="name" value="山田 太郎" readOnly />
      </div>

      <div>
        <Label htmlFor="fp_name">FPの名前</Label>
        <Input id="fp_name" value="佐藤 花子" readOnly />
      </div>

      <div>
        <Label htmlFor="interview_date">面談日</Label>
        <Input id="interview_date" value="2023-01-15" readOnly />
      </div>

      <div>
        <Label htmlFor="interview_time">面談時間</Label>
        <Input id="interview_time" value="10:00" readOnly />
      </div>

      <div>
        <Label htmlFor="interview_location">面談場所</Label>
        <Input id="interview_location" value="東京都千代田区" readOnly />
      </div>

      <div>
        <Label htmlFor="residence_area">居住エリア</Label>
        <Input id="residence_area" value="東京都" readOnly />
      </div>

      <div>
        <Label htmlFor="phone_number">電話番号</Label>
        <Input id="phone_number" value="09012345678" readOnly />
      </div>

      <div>
        <Label htmlFor="interview_count">面談回数</Label>
        <Input id="interview_count" value="1" readOnly />
      </div>

      <div>
        <Label htmlFor="interview_evaluation">面談評価</Label>
        <Input id="interview_evaluation" value="5" readOnly />
      </div>

      <div>
        <Label htmlFor="explanation_clarity">説明の明確さ</Label>
        <Textarea
          id="explanation_clarity"
          className="min-h-[100px]"
          value="説明が非常に明確で理解しやすかった。"
          readOnly
        />
      </div>

      <div>
        <Label htmlFor="fp_attitude">FPの態度</Label>
        <Textarea
          id="fp_attitude"
          className="min-h-[100px]"
          value="非常に親切で丁寧な対応だった。"
          readOnly
        />
      </div>

      <div>
        <Label htmlFor="reason_for_fp_att">FPの態度の理由</Label>
        <Textarea
          id="reason_for_fp_att"
          className="min-h-[100px]"
          value="顧客のニーズをしっかりと理解しようとしていた。"
          readOnly
        />
      </div>

      <div>
        <Label htmlFor="reaction_to_questions">質問への反応</Label>
        <Textarea
          id="reaction_to_questions"
          className="min-h-[100px]"
          value="質問に対して迅速かつ的確に回答してくれた。"
          readOnly
        />
      </div>

      <div>
        <Label htmlFor="topics_discussed">話し合ったトピック</Label>
        <Textarea
          id="topics_discussed"
          className="min-h-[100px]"
          value="保険の種類とその利点について。"
          readOnly
        />
      </div>

      <div>
        <Label htmlFor="purpose_of_insurance">保険の目的</Label>
        <Textarea
          id="purpose_of_insurance"
          className="min-h-[100px]"
          value="将来のリスクに備えるため。"
          readOnly
        />
      </div>

      <div>
        <Label htmlFor="expectations_for_next_meeting">次回面談への期待</Label>
        <Textarea
          id="expectations_for_next_meeting"
          className="min-h-[100px]"
          value="より具体的なプランの提案を期待。"
          readOnly
        />
      </div>

      <div>
        <Label htmlFor="thoughts_on_guarantee_and_payment">保証と支払いに関する考え</Label>
        <Textarea
          id="thoughts_on_guarantee_and_payment"
          className="min-h-[100px]"
          value="保証内容が充実していることを確認したい。"
          readOnly
        />
      </div>

      <div>
        <Label htmlFor="is_next_meeting_decided">次回面談は決定済みか</Label>
        <Input id="is_next_meeting_decided" value="はい" readOnly />
      </div>

      <div>
        <Label htmlFor="info_wanted_next_time">次回に欲しい情報</Label>
        <Textarea
          id="info_wanted_next_time"
          className="min-h-[100px]"
          value="具体的な保険プランの詳細。"
          readOnly
        />
      </div>

      <div>
        <Label htmlFor="overall_impression_and_improvements">全体的な印象と改善点</Label>
        <Textarea
          id="overall_impression_and_improvements"
          className="min-h-[100px]"
          value="全体的に満足しているが、もう少し時間をかけて説明してほしい。"
          readOnly
        />
      </div>

      <div>
        <Label htmlFor="wish_to_change_fp">FPを変更したいか</Label>
        <Input id="wish_to_change_fp" value="いいえ" readOnly />
      </div>
    </div>
  );
};

export default SurveyInfo;