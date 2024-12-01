'use client';
import React, { useState, useEffect } from 'react';
import { Bell, History, Menu, Plane, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { auth } = useAuth();
    const route = useRouter();

    // 최신 auth 값을 확인하기 위한 useEffect
    useEffect(() => {
        if (isOpen) {
            console.log('Sidebar opened. Current auth state:', auth); // 슬라이드바가 열릴 때 auth 값 출력
        }
    }, [isOpen, auth]); // isOpen과 auth 상태 변경 시 실행

    const toggleSide = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header className="border-b">
                <div className="flex items-center justify-between h-16 w-full px-6">
                    <div className="flex items-center gap-4 pl-6">
                        <Plane className="h-6 w-6" onClick={() => route.push('/')} />
                        <h1 className="font-bold text-xl">Travel Maker : 여행을 더 쉽게</h1>
                    </div>

                    <div className="flex items-center gap-4 ">
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
                    <nav className="flex-1 overflow-y-auto">
                        <div className="flex flex-col p-4">
                            {auth.isLoggedIn ? (
                                <>
                                    <Button
                                        variant="ghost"
                                        className="justify-start h-11"
                                        onClick={() => route.push('/profile')}
                                    >
                                        프로필
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="justify-start h-11"
                                        onClick={() => route.push('/history')}
                                    >
                                        예약 내역
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="justify-start h-11"
                                        onClick={() => route.push('/favorite')}
                                    >
                                        즐겨찾기
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="justify-start h-11"
                                        onClick={() => route.push('/review')}
                                    >
                                        나의 리뷰
                                    </Button>
                                    {auth.role === 'GUIDE' && ( // GUIDE 역할만 접근 가능
                                        <>
                                            <Button
                                                variant="ghost"
                                                className="justify-start h-11"
                                                onClick={() => route.push('/trips/register')}
                                            >
                                                상품 등록
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="justify-start h-11"
                                                onClick={() => route.push('/product/edit')}
                                            >
                                                상품 수정
                                            </Button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <p className="text-muted-foreground">로그인 후 이용 가능합니다.</p>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};
