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

const MerchantRegistrationForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      referral_fee: "",
      notes: "",
    },
  });

  const onSubmit = (data: SurveyFormData) => {
    console.log(data);
    toast({
      title: "登録完了",
      description: "加盟店の登録が完了しました。",
    });
    navigate("/complete");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">加盟店登録</h2>
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
            <Label htmlFor="address">住所</Label>
            <Input
              id="address"
              {...form.register("address")}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">電話番号</Label>
            <Input
              id="phone"
              {...form.register("phone")}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="referral_fee">紹介料</Label>
            <Input
              id="referral_fee"
              {...form.register("referral_fee")}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">備考</Label>
            <Textarea
              id="notes"
              {...form.register("notes")}
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-6">
        <Button type="submit" className="ml-auto text-white" onClick={() => {
            navigate("/complete");
        }}>
          登録
        </Button>
      </div>
    </form>
  );
};

export default MerchantRegistrationForm;
