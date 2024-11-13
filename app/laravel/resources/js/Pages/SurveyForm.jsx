import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { surveySchema } from "@/lib/validation";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useToast } from "@/Components/ui/use-toast";
import StarRating from "./StarRating";
import CheckboxGroup from "./CheckboxGroup";
import StepIndicator from "./StepIndicator";

const TOTAL_STEPS = 4;

const topicsDiscussedOptions = [
  { label: "保険の基礎知識", value: "insurance_basics" },
  { label: "必要保障額の試算", value: "coverage_calculation" },
  { label: "商品の詳細説明", value: "product_details" },
  { label: "保険料のシミュレーション", value: "premium_simulation" },
  { label: "契約手続きの説明", value: "contract_procedure" },
];

const purposeOptions = [
  { label: "死亡保障", value: "death_coverage" },
  { label: "医療保障", value: "medical_coverage" },
  { label: "がん保障", value: "cancer_coverage" },
  { label: "介護保障", value: "nursing_coverage" },
  { label: "貯蓄目的", value: "savings" },
];

const expectationsOptions = [
  { label: "具体的な商品提案", value: "product_proposal" },
  { label: "保障内容の詳細説明", value: "coverage_details" },
  { label: "保険料の見直し", value: "premium_review" },
  { label: "契約手続き", value: "contract_procedure" },
];

const SurveyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      timestamp: new Date(),
      interview_count: 0,
      interview_evaluation: 3,
      explanation_clarity: 3,
      fp_attitude: 3,
      topics_discussed: [],
      purpose_of_insurance: [],
      expectations_for_next_meeting: [],
      is_next_meeting_decided: false,
      wish_to_change_fp: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    toast({
      title: "アンケート送信完了",
      description: "ご協力ありがとうございました。",
    });
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {currentStep === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">基本情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">氏名</Label>
              <Input
                id="name"
                {...form.register("name")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fp_name">担当ファイナンシャルプランナー氏名</Label>
              <Input
                id="fp_name"
                {...form.register("fp_name")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interview_date">面談日</Label>
              <Input
                id="interview_date"
                type="date"
                {...form.register("interview_date")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interview_time">面談時間</Label>
              <Input
                id="interview_time"
                type="time"
                {...form.register("interview_time")}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">面談評価</h2>
          <div className="space-y-8">
            <StarRating
              label="面談の総合評価"
              value={form.watch("interview_evaluation")}
              onChange={(value) => form.setValue("interview_evaluation", value)}
            />
            <StarRating
              label="説明のわかりやすさ"
              value={form.watch("explanation_clarity")}
              onChange={(value) => form.setValue("explanation_clarity", value)}
            />
            <StarRating
              label="担当者の態度"
              value={form.watch("fp_attitude")}
              onChange={(value) => form.setValue("fp_attitude", value)}
            />
            <div className="space-y-2">
              <Label htmlFor="reason_for_fp_att">担当者の態度について選択した理由</Label>
              <Textarea
                id="reason_for_fp_att"
                {...form.register("reason_for_fp_att")}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">面談内容</h2>
          <div className="space-y-8">
            <CheckboxGroup
              label="面談内容で話されたこと"
              options={topicsDiscussedOptions}
              selected={form.watch("topics_discussed")}
              onChange={(values) => form.setValue("topics_discussed", values)}
            />
            <CheckboxGroup
              label="保険を検討している目的"
              options={purposeOptions}
              selected={form.watch("purpose_of_insurance")}
              onChange={(values) => form.setValue("purpose_of_insurance", values)}
            />
            <div className="space-y-2">
              <Label htmlFor="thoughts_on_guarantee_and_payment">
                保証内容と月々の支払に対する考え
              </Label>
              <Textarea
                id="thoughts_on_guarantee_and_payment"
                {...form.register("thoughts_on_guarantee_and_payment")}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">次回面談について</h2>
          <div className="space-y-8">
            <CheckboxGroup
              label="次回面談で特に期待すること"
              options={expectationsOptions}
              selected={form.watch("expectations_for_next_meeting")}
              onChange={(values) =>
                form.setValue("expectations_for_next_meeting", values)
              }
            />
            <div className="space-y-2">
              <Label htmlFor="info_wanted_next_time">
                次回面談で特に知りたい情報・質問
              </Label>
              <Textarea
                id="info_wanted_next_time"
                {...form.register("info_wanted_next_time")}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overall_impression_and_improvements">
                面談全体についての感想や改善点
              </Label>
              <Textarea
                id="overall_impression_and_improvements"
                {...form.register("overall_impression_and_improvements")}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6">
        {currentStep > 1 && (
          <Button type="button" variant="outline" onClick={prevStep}>
            前へ
          </Button>
        )}
        {currentStep < TOTAL_STEPS ? (
          <Button type="button" onClick={nextStep} className="ml-auto">
            次へ
          </Button>
        ) : (
          <Button type="submit" className="ml-auto">
            送信
          </Button>
        )}
      </div>
    </form>
  );
};

export default SurveyForm;