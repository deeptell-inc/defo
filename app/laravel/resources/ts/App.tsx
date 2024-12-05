import { Toaster } from "@/Components/ui/toaster";
import { Toaster as Sonner } from "@/Components/ui/sonner";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CouponList from "./Pages/CouponList";
import CouponStoreDetail from "./Pages/CouponStoreDetail";
import FpSurveyForm from "./Pages/FpSurveyForm";
import UserSurveyForm from "./Pages/UserSurveyForm";
import Merchant from "./Pages/Merchant";
import Complete from './Pages/Complete';
import Admin from "./Pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CouponList />} />
          <Route path="/store/:id" element={<CouponStoreDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/survey/user" element={<UserSurveyForm />} />
          <Route path="/survey/fp" element={<FpSurveyForm />} />
          <Route path="/merchant" element={<Merchant />} />
          <Route path="/complete" element={<Complete />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;