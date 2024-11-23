import '../css/app.css';
import '../css/index.css';
import './bootstrap';
import axios from 'axios';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import CouponCreate from './Pages/CouponCreate';
import Index from "./Pages/Index";
import StoreDetail from "./Pages/StoreDetail";
import Admin from "./Pages/Admin";
import Survey from "./Pages/Survey";

axios.defaults.baseURL = '/api';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// CSRFトークンの設定（必要に応じて）
const token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
          <BrowserRouter>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/store/:id" element={<StoreDetail />} />
                <Route path="/survey" element={<Survey />} />
                {/* <Route path="/coupon/create" element={<CouponCreate />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/customers" element={<Admin.Customers />} />
                <Route path="/admin/coupons" element={<Admin.Coupons.CouponList />} />
                <Route path="/admin/coupons/create" element={<Admin.Coupons.CouponCreate />} /> */}
            </Routes>
          </BrowserRouter>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
