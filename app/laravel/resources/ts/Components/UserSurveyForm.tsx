import * as React from "react"; // Added React import to fix lint errors
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// surveySchema は日本語のエラーメッセージを含むように @/lib/validation で更新されていることを前提とします
// surveySchema が interview_date に Date オブジェクトを期待していると仮定します
import { surveySchema, type SurveyFormData } from "@/lib/validation";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label"; // カスタムコンポーネント用に Label を保持
import { Textarea } from "@/Components/ui/textarea";
import { useToast } from "@/Components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import CheckboxGroup from "./CheckboxGroup";
import StepIndicator from "./StepIndicator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"; // Card コンポーネントをインポート
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form"; // Form コンポーネントをインポート

const TOTAL_STEPS = 4;

// オプションは変更なし
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

// 各ステップのバリデーション用フィールドを定義
const stepFields: Record<number, (keyof SurveyFormData)[]> = {
  1: ["name", "fp_name", "interview_date", "interview_time"],
  2: ["interview_evaluation", "explanation_clarity", "fp_attitude", "reason_for_fp_att"],
  3: ["topics_discussed", "purpose_of_insurance", "thoughts_on_guarantee_and_payment"],
  4: ["expectations_for_next_meeting", "info_wanted_next_time", "overall_impression_and_improvements"], // ステップ4のフィールドは最終送信時にバリデーション
};


const UserSurveyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<SurveyFormData>({
    // surveySchema が @/lib/validation で日本語のエラーメッセージを提供することを確認
    resolver: zodResolver(surveySchema),
    mode: "onChange", // UX向上のため変更時にバリデーション
    defaultValues: {
      timestamp: new Date(),
      name: "", // 制御された入力のためにデフォルトの空文字列を追加
      fp_name: "",
      // interview_date のスキーマが Date を期待する場合、デフォルト値を undefined に変更
      interview_date: undefined,
      interview_time: "", // time input は string で動作するため "" のまま
      interview_count: 0,
      interview_evaluation: 3,
      explanation_clarity: 3,
      fp_attitude: 3,
      reason_for_fp_att: "",
      topics_discussed: [],
      purpose_of_insurance: [],
      thoughts_on_guarantee_and_payment: "",
      expectations_for_next_meeting: [],
      info_wanted_next_time: "",
      overall_impression_and_improvements: "",
      is_next_meeting_decided: false,
      wish_to_change_fp: false,
    },
  });

  const onSubmit = (data: SurveyFormData) => {
    console.log("Form Submitted:", data);
    // API呼び出しをシミュレート
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        toast({
            title: "アンケート送信完了",
            description: "ご協力ありがとうございました。",
        });
        navigate("/complete");
    });
  };

  // バリデーションをトリガーして次のステップに進む関数
  const nextStep = async () => {
    const fieldsToValidate = stepFields[currentStep];
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    } else {
      // 現在のステップでエラーのある最初のフィールドを見つけてフォーカスする
      const firstErrorField = fieldsToValidate.find(field => form.formState.errors[field]);
      if (firstErrorField) {
          // StarRating や CheckboxGroup のようなカスタムコンポーネントは直接フォーカスできない場合がある
          // その場合は、関連する Label や最初の input 要素にフォーカスを試みるなどの工夫が必要になる可能性がある
          // ここでは react-hook-form の setFocus をそのまま使用
          form.setFocus(firstErrorField);
      }
      toast({
        title: "入力エラー",
        description: "現在のステップに入力エラーがあります。ご確認ください。",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    // shadcn/ui の Form コンポーネントを使用してコンテキストとバリデーション処理を行う
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Step 1: 基本情報 */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>氏名</FormLabel>
                      <FormControl>
                        <Input placeholder="山田 太郎" {...field} />
                      </FormControl>
                      {/* FormMessage は shadcn/ui でデフォルトで text-destructive を使用しますが、
                          必要に応じて明示的に追加します。 */}
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fp_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>担当ファイナンシャルプランナー氏名</FormLabel>
                      <FormControl>
                        <Input placeholder="佐藤 花子" {...field} />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interview_date"
                  render={({ field }) => {
                    // Helper to format Date to 'YYYY-MM-DD' string for input value
                    const formatDateForInput = (date: Date | undefined | null): string => {
                      if (date instanceof Date && !isNaN(date.getTime())) {
                        // To ensure the date displayed matches the local date selected,
                        // adjust for timezone offset before converting to ISO string.
                        const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
                        return adjustedDate.toISOString().split('T')[0];
                      }
                      return ''; // Return empty string for undefined, null, or invalid Date
                    };

                    // Helper to parse 'YYYY-MM-DD' string from input to Date object (or undefined) for form state
                    const parseDateFromInput = (dateString: string): Date | undefined => {
                      if (!dateString) return undefined; // Handle empty input
                      // Standard `new Date('YYYY-MM-DD')` parses as UTC midnight.
                      // To treat the input as local date consistently, construct Date using local year, month, day.
                      const parts = dateString.split('-');
                      if (parts.length === 3) {
                          const year = parseInt(parts[0], 10);
                          const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
                          const day = parseInt(parts[2], 10);
                          // Check if parts form a valid date number combination before creating Date object
                          if (year > 0 && month >= 0 && month <= 11 && day > 0 && day <= 31) {
                              const date = new Date(year, month, day);
                              // Final check: ensure the created date object is valid and matches the input parts
                              // This catches invalid dates like Feb 30th.
                              if (!isNaN(date.getTime()) &&
                                  date.getFullYear() === year &&
                                  date.getMonth() === month &&
                                  date.getDate() === day) {
                                  return date;
                              }
                          }
                      }
                      // Return undefined if parsing fails or string is invalid/incomplete
                      // Zod validation will catch this if the field is required
                      return undefined;
                    };

                    return (
                      <FormItem>
                        <FormLabel>面談日</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            // Use the formatted string for the input's value
                            value={formatDateForInput(field.value)}
                            // Parse the input string back to Date (or undefined) on change
                            onChange={(e) => field.onChange(parseDateFromInput(e.target.value))}
                            onBlur={field.onBlur} // Keep standard RHF handlers
                            ref={field.ref}
                            name={field.name}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="interview_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>面談時間</FormLabel>
                      <FormControl>
                        {/* Input type="time" works with string values */}
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: 面談評価 */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>面談評価</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
               <FormField
                  control={form.control}
                  name="interview_evaluation"
                  render={({ field }) => (
                    <FormItem>
                      {/* StarRating には FormLabel が組み込まれていない */}
                      <Label className="text-sm font-medium">面談の総合評価</Label>
                      <FormControl>
                         <StarRating
                            value={field.value}
                            onChange={field.onChange}
                          />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
               <FormField
                  control={form.control}
                  name="explanation_clarity"
                  render={({ field }) => (
                    <FormItem>
                       <Label className="text-sm font-medium">説明のわかりやすさ</Label>
                       <FormControl>
                          <StarRating
                            value={field.value}
                            onChange={field.onChange}
                          />
                       </FormControl>
                       <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
               <FormField
                  control={form.control}
                  name="fp_attitude"
                  render={({ field }) => (
                    <FormItem>
                       <Label className="text-sm font-medium">担当者の態度</Label>
                       <FormControl>
                          <StarRating
                            value={field.value}
                            onChange={field.onChange}
                          />
                       </FormControl>
                       <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="reason_for_fp_att"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>担当者の態度について選択した理由</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="例：丁寧な言葉遣いで好感が持てた、質問に的確に答えてくれた等"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* Step 3: 面談内容 */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>面談内容</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
               <FormField
                  control={form.control}
                  name="topics_discussed"
                  render={({ field }) => (
                    <FormItem>
                       <Label className="text-sm font-medium">面談内容で話されたこと (複数選択可)</Label>
                       <FormControl>
                          <CheckboxGroup
                            options={topicsDiscussedOptions}
                            selected={field.value}
                            onChange={field.onChange}
                          />
                       </FormControl>
                       <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
               <FormField
                  control={form.control}
                  name="purpose_of_insurance"
                  render={({ field }) => (
                    <FormItem>
                       <Label className="text-sm font-medium">保険を検討している目的 (複数選択可)</Label>
                       <FormControl>
                          <CheckboxGroup
                            options={purposeOptions}
                            selected={field.value}
                            onChange={field.onChange}
                          />
                       </FormControl>
                       <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="thoughts_on_guarantee_and_payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>保証内容と月々の支払に対する考え</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="例：保障は手厚くしたいが、支払いは月1万円以内に抑えたい等"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* Step 4: 次回面談について */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>次回面談について</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
               <FormField
                  control={form.control}
                  name="expectations_for_next_meeting"
                  render={({ field }) => (
                    <FormItem>
                       <Label className="text-sm font-medium">次回面談で特に期待すること (複数選択可)</Label>
                       <FormControl>
                          <CheckboxGroup
                            options={expectationsOptions}
                            selected={field.value}
                            onChange={field.onChange}
                          />
                       </FormControl>
                       <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="info_wanted_next_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>次回面談で特に知りたい情報・質問</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="例：学資保険について詳しく聞きたい、老後資金のシミュレーションをしてほしい等"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="overall_impression_and_improvements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>面談全体についての感想や改善点</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="例：全体的に満足しているが、もう少し資料が分かりやすいと良かった等"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* ナビゲーションボタン */}
        <div className="flex justify-between pt-6">
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              前へ
            </Button>
          )}
          {/* 次へ/送信ボタンを右に寄せるためのスペーサー */}
          <div className="flex-grow"></div>
          {currentStep < TOTAL_STEPS ? (
            <Button type="button" onClick={nextStep} className="text-white">
              次へ
            </Button>
          ) : (
            // 最終送信ボタン - type="submit" が form.handleSubmit をトリガー
            <Button type="submit" className="text-white" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "送信中..." : "送信"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default UserSurveyForm;
