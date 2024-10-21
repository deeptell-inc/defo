import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import CouponCard from '@/Components/Coupon/CouponCard';
import SearchBar from '@/Components/Coupon/SearchBar';
import { mockCoupons } from '@/mock/mockCoupons';
import { Button, Modal, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCoupons = mockCoupons.filter((coupon) =>
      coupon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
 
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <div className="container mx-auto px-4 py-8">
                          <h1 className="text-3xl font-bold mb-6">クーポン一覧</h1> {/* remove extra space */}
                          
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <SearchBar onSearch={setSearchQuery} />
                            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => {
                                router.push('./')
                            }}>
                              新規追加 
                            </Button>
                          </Box>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCoupons.map((coupon) => (
                              <CouponCard key={coupon.id} coupon={coupon} />
                            ))}
                          </div> {/* remove extra space */}
                        </div> {/* remove extra space */}
                    </div>
                </div>
            </div>
        </>
    );
}
