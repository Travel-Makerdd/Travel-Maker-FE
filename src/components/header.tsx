'use client';
import React, { useState, useEffect } from 'react';
import { Bell, History, Menu, Plane, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { auth, logout } = useAuth(); // logout 함수로 로그인 상태 초기화
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            console.log('Sidebar opened. Current auth state:', auth);
        }
    }, [isOpen, auth]);

    const toggleSide = () => {
        setIsOpen(!isOpen);
    };

    const handleWithdraw = async () => {
        if (!auth.token) return;

        const confirmWithdraw = confirm('정말로 회원 탈퇴하시겠습니까?');
        if (!confirmWithdraw) return;

        try {
            const response = await fetch('/api/withdraw', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`회원 탈퇴에 실패했습니다: ${response.status}`);
            }

            alert('회원 탈퇴가 완료되었습니다.');
            logout(); // auth 상태 초기화
            router.push('/'); // 메인 페이지로 이동
        } catch (err) {
            console.error('Error during withdrawal:', err);
            alert('회원 탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <>
            <header className="border-b">
                <div className="flex items-center justify-between h-16 w-full px-6">
                    <div className="flex items-center gap-4 pl-6">
                        <Plane className="h-6 w-6" onClick={() => router.push('/')} />
                        <h1 className="font-bold text-xl">Travel Maker : 여행을 더 쉽게</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Bell className="h-5 w-10" />
                        <History className="h-5 w-5" />
                        <Button variant="ghost" size="icon" className="mr-0" onClick={toggleSide}>
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={toggleSide}
                    aria-hidden="true"
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-60 bg-background border-l shadow-lg transform transition-transform duration-200 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b">
                        <div className="flex items-center justify-between mb-4">
                            <Button variant="ghost" size="icon" onClick={toggleSide}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback />
                            </Avatar>
                            <div>
                                {auth.isLoggedIn ? (
                                    <div>
                                        <p>안녕하세요, {auth.nickname}님!</p>
                                    </div>
                                ) : (
                                    <p>로그인하세요</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <nav className="flex-1 overflow-y-auto flex flex-col p-4">
                        {auth.isLoggedIn ? (
                            <>
                                <Button
                                    variant="ghost"
                                    className="justify-start h-11"
                                    onClick={() => router.push('/profile')}
                                >
                                    프로필
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="justify-start h-11"
                                    onClick={() => router.push('/history')}
                                >
                                    예약 내역
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="justify-start h-11"
                                    onClick={() => router.push('/favorite/trip')}
                                >
                                    여행상품 즐겨찾기
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="justify-start h-11"
                                    onClick={() => router.push('/favorite/post')}
                                >
                                    게시글 즐겨찾기
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="justify-start h-11"
                                    onClick={() => router.push('/review')}
                                >
                                    나의 리뷰
                                </Button>
                                {auth.role === 'GUIDE' && (
                                    <>
                                        <Button
                                            variant="ghost"
                                            className="justify-start h-11"
                                            onClick={() => router.push('/trips/register')}
                                        >
                                            상품 등록
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="justify-start h-11"
                                            onClick={() => router.push('/product/edit')}
                                        >
                                            상품 수정
                                        </Button>
                                    </>
                                )}
                                {/* 회원탈퇴 버튼 */}
                                <div className="mt-auto">
                                    <Button
                                        variant="ghost"
                                        className="justify-start h-11 text-gray-300"
                                        onClick={handleWithdraw}
                                    >
                                        회원탈퇴
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p className="text-muted-foreground">로그인 후 이용 가능합니다.</p>
                        )}
                    </nav>

                </div>
            </div>
        </>
    );
};
