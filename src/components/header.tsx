import React from 'react';
import { Bell, History, Menu, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button';

export const Header = () => {
    return (
        <header className="border-b">
            <div className="flex items-center justify-between h-16 w-full px-6">
                <div className="flex items-center gap-4">
                    <Plane className="h-6 w-6" />
                    <h1 className="font-bold text-xl">Travel Maker : 여행을 더 쉽게</h1>
                </div>

                <div className="flex items-center gap-4">
                    <Bell className="h-5 w-10" />
                    <History className="h-5 w-5" />
                    <Button variant="ghost" size="icon" className="mr-0">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
};