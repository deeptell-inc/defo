import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // BrowserRouter をインポート
import { CssBaseline } from '@mui/material'; // CssBaseline をインポート
import CouponCreate from './Pages/CouponCreate';

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
              <Route path="/" element={<App {...props} />} />
              <Route path="/coupon/create" element={<CouponCreate />} />
            </Routes>
          </BrowserRouter>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
