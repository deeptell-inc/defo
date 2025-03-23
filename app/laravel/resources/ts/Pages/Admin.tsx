import { useState } from "react";
import Header from "@/Components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Card, CardContent } from "@/Components/ui/card";
import CustomerInfo from "@/Components/Admin/CustomerInfo";
import SurveyInfo from "@/Components/Admin/SurveyInfo";
import CallInfo from "@/Components/Admin/CallInfo";
import CustomerCall from "@/Components/Admin/CustomerCall";
import InterviewInfo from "@/Components/Admin/InterviewInfo";
import FPInfo from "@/Components/Admin/FPInfo";
import Process from "@/Components/Admin/Process";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("customer-info");

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="w-full">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-6">顧客管理</h1>
            
            <Tabs defaultValue="customer-info" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="customer-call">確認電話可能数</TabsTrigger>
                <TabsTrigger value="customer-info">顧客情報</TabsTrigger>
                <TabsTrigger value="survey">アンケート情報</TabsTrigger>
                <TabsTrigger value="call">電話連絡</TabsTrigger>
                <TabsTrigger value="fp">FP</TabsTrigger>
                <TabsTrigger value="interview">面談</TabsTrigger>
                <TabsTrigger value="process">プロセス管理（Kintone連携）</TabsTrigger>
              </TabsList>

              <TabsContent value="customer-call">
                <CustomerCall />
              </TabsContent>

              <TabsContent value="customer-info">
                <CustomerInfo />
              </TabsContent>

              <TabsContent value="survey">
                <SurveyInfo />
              </TabsContent>

              <TabsContent value="call">
                <CallInfo />
              </TabsContent>

              <TabsContent value="fp">
                <FPInfo />
              </TabsContent>

              <TabsContent value="interview">
                <InterviewInfo />
              </TabsContent>

              <TabsContent value="process">
                <Process />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;