export type ProcessStep = {
  id: string;
  label: string;
  description: string;
};

export type Merchant = {
  id: string;
  merchantName: string;
  referredPersonName: string;
  progress: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  { id: 'inquiry', label: '問い合わせ済', description: '初期問い合わせが完了' },
  { id: 'phone_confirmed', label: '確認電話済', description: '電話での初期確認完了' },
  { id: 'fp_attended', label: 'FPアテンド済', description: 'FPによる対応完了' },
  { id: 'schedule_adjusted', label: '日程調整済', description: '面談日程の調整完了' },
  { id: 'first_meeting', label: '初回面談', description: '初回面談実施済' },
  { id: 'multiple_meetings', label: '複数面談', description: '追加面談実施中' },
  { id: 'contracted', label: '契約済', description: '契約締結完了' },
];