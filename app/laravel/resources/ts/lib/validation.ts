import { z } from "zod";

export const surveySchema = z.object({
  timestamp: z.date(),
  name: z.string().min(1, "氏名を入力してください"),
  fp_name: z.string().min(1, "担当者名を入力してください"),
  interview_date: z.date(),
  interview_time: z.string(),
  interview_location: z.string().min(1, "面談場所を入力してください"),
  residence_area: z.string().min(1, "お住まいの地域を入力してください"),
  phone_number: z.string().regex(/^[0-9-]+$/, "正しい電話番号を入力してください"),
  interview_count: z.number().min(0),
  interview_evaluation: z.number().min(1).max(5),
  explanation_clarity: z.number().min(1).max(5),
  fp_attitude: z.number().min(1).max(5),
  reason_for_fp_att: z.string(),
  reaction_to_questions: z.string(),
  topics_discussed: z.array(z.string()),
  purpose_of_insurance: z.array(z.string()),
  expectations_for_next_meeting: z.array(z.string()),
  thoughts_on_guarantee_and_payment: z.string(),
  is_next_meeting_decided: z.boolean(),
  info_wanted_next_time: z.string(),
  overall_impression_and_improvements: z.string(),
  wish_to_change_fp: z.boolean(),
});

export type SurveyFormData = z.infer<typeof surveySchema>;