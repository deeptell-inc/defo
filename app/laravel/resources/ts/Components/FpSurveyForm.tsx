import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { surveySchema, type SurveyFormData } from "@/lib/validation";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useToast } from "@/Components/ui/use-toast";
import { useNavigate } from "react-router-dom";
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

const FpSurveyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<SurveyFormData>({
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

  const onSubmit = (data: SurveyFormData) => {
    console.log(data);
    toast({
      title: "アンケート送信完了",
      description: "ご協力ありがとうございました。",
    });
    navigate("/complete");
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
              <Label htmlFor="company_name">会社名</Label>
              <Input
                id="company_name"
                {...form.register("company_name")}
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
              <Label htmlFor="phone_number">電話番号</Label>
              <Input
                id="phone_number"
                {...form.register("phone_number")}
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
              <Label htmlFor="interview_location">面談場所</Label>
              <Input
                id="interview_location"
                {...form.register("interview_location")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interviewee">面談者</Label>
              <Input
                id="interviewee"
                {...form.register("interviewee")}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">面談内容</h2>
          <div className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="discussion_content">面談内容</Label>
              <Textarea
                id="discussion_content"
                {...form.register("discussion_content")}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interview_feedback">面談フィードバック</Label>
              <Input
                id="interview_feedback"
                type="number"
                {...form.register("interview_feedback")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interview_result">面談結果</Label>
              <Textarea
                id="interview_result"
                {...form.register("interview_result")}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">契約情報</h2>
          <div className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="application_insurance_company">申込保険会社</Label>
              <Textarea
                id="application_insurance_company"
                {...form.register("application_insurance_company")}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="application_product">申込商品</Label>
              <Textarea
                id="application_product"
                {...form.register("application_product")}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contracts">契約</Label>
              <Textarea
                id="contracts"
                {...form.register("contracts")}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ac_total">AC合計</Label>
              <Input
                id="ac_total"
                type="number"
                {...form.register("ac_total")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="first_year_fee">初年度手数料</Label>
              <Input
                id="first_year_fee"
                type="number"
                {...form.register("first_year_fee")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="next_year_fee">次年度手数料</Label>
              <Input
                id="next_year_fee"
                type="number"
                {...form.register("next_year_fee")}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">次回面談について</h2>
          <div className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="has_next_meeting">次回面談の有無</Label>
              <Input
                id="has_next_meeting"
                type="checkbox"
                {...form.register("has_next_meeting")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="next_meeting_scheduled">次回面談の予定</Label>
              <Input
                id="next_meeting_scheduled"
                type="checkbox"
                {...form.register("next_meeting_scheduled")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="next_meeting_date">次回面談日</Label>
              <Input
                id="next_meeting_date"
                type="date"
                {...form.register("next_meeting_date")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="next_meeting_content">次回面談内容</Label>
              <Textarea
                id="next_meeting_content"
                {...form.register("next_meeting_content")}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consideration_content">検討内容</Label>
              <Textarea
                id="consideration_content"
                {...form.register("consideration_content")}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="future_response_content">今後の対応内容</Label>
              <Textarea
                id="future_response_content"
                {...form.register("future_response_content")}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="on_hold_reason">保留理由</Label>
              <Textarea
                id="on_hold_reason"
                {...form.register("on_hold_reason")}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="on_hold_deadline">保留期限</Label>
              <Input
                id="on_hold_deadline"
                type="date"
                {...form.register("on_hold_deadline")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cancellation_reason">解約理由</Label>
              <Textarea
                id="cancellation_reason"
                {...form.register("cancellation_reason")}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="our_representative_name">当社担当者名</Label>
              <Input
                id="our_representative_name"
                {...form.register("our_representative_name")}
                className="w-full"
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
          <Button type="button" onClick={nextStep} className="ml-auto text-white">
            次へ
          </Button>
        ) : (
          <Button type="submit" onClick={() => {
            navigate("/complete");
          }} className="ml-auto text-white">
            送信
          </Button>
        )}
      </div>
    </form>
  );
};

export default FpSurveyForm;
