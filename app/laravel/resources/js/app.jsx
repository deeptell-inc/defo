import '../css/app.css';
import '../css/index.css';
import './bootstrap';

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

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

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
                <Route path="*" element={<Index />} />
            </Routes>
          </BrowserRouter>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
