'use client'
import React, { useState } from 'react'
import { Bell, History, Menu, Plane, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSide = () => {
        setIsOpen(!isOpen)
    }

    const route = useRouter();
    return (
        <>
            <header className="border-b">
                <div className="flex items-center justify-between h-16 w-full px-6">
                    <div className="flex items-center gap-4 pl-6">
                        <Plane className="h-6 w-6" onClick={() => route.push("/")} />
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
                                <AvatarFallback></AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold">testUser 님</div>
                            </div>
                        </div>
                    </div>
                    <nav className="flex-1 overflow-y-auto">
                        <div className="flex flex-col p-4">
                            <Button variant="ghost" className="justify-start h-11" onClick={() => route.push("/profile")}>
                                프로필
                            </Button>
                            <Button variant="ghost" className="justify-start h-11">
                                예약 내역
                            </Button>
                            <Button variant="ghost" className="justify-start h-11" onClick={() => route.push("/favorite")}>
                                즐겨찾기
                            </Button>
                            <Button variant="ghost" className="justify-start h-11">
                                나의 리뷰
                            </Button>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}