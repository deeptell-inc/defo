export type ProcessStep = typeof PROCESS_STEPS[number];

export type Merchant = {
  id: string;
  merchantName: string;
  referredPersonName: string;
  progress: string;
};

export const PROCESS_STEPS = [
  { id: 'confirmation_possible', label: '確認電話可能', description: '' },
  { id: 're_call', label: '再架電', description: '' },
  { id: 'phone_confirmed', label: '確認電話通過', description: '' },
  { id: 'fp_not_assigned', label: 'FP未振り', description: '' },
  { id: 'fp_inquiry', label: 'FP照会中', description: '' },
  { id: 'chat_group_pending', label: 'チャットグループ未', description: '' },
  { id: 'fp_assigned_no_schedule', label: 'FP振り済日程未定', description: '' },
  { id: 'fp_scheduled_monthly', label: 'FP日時確定/月間', description: '' },
  { id: 'execution_monthly', label: '実行/月間', description: '' },
  { id: 'fp_scheduled_today', label: 'FP日時確定/当日', description: '' },
  { id: 'execution_today', label: '実行/当日', description: '' },
  { id: 'execution_confirmation', label: '実行確認用', description: '' },
] as const;
