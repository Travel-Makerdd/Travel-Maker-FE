'use client'
import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useAuth } from '../context/AuthContext'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type UserRole = 'TRAVELER' | 'GUIDE'

export default function ProfilePage() {
  const [profileStyle, setProfileStyle] = useState<string | null>(null);
  const [profileBio, setProfileBio] = useState<string>('');
  const [profileFavorite, setProfileFavorite] = useState<string | null>(null);
  const [profileRole, setProfileRole] = useState<UserRole>('TRAVELER');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({ title: '', description: '' });
  const { auth, login } = useAuth();

  const travelStyles = [
    { id: 'hotel', label: '호캉스' },
    { id: 'food', label: '맛집 투어' },
    { id: 'surfing', label: '서핑' },
    { id: 'shopping', label: '쇼핑' },
    { id: 'hiking', label: '등산' },
    { id: 'photography', label: '사진 촬영' },
    { id: 'history', label: '역사 탐방' },
    { id: 'camping', label: '캠핑' },
    { id: 'snorkeling', label: '스노클링' },
    { id: 'festival', label: '지역 축제 참여' },
    { id: 'spa', label: '자연 휴식' },
    { id: 'roadtrip', label: '로드 트립' },
    { id: 'art', label: '예술활동 감상' },
    { id: 'adventure', label: '액티비티 스포츠' }
  ];

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    console.log('fetchProfileData called');
    if (!auth.token) {
      console.error('토큰이 없습니다. 로그인 상태를 확인하세요.');
      return;
    }
  
    try {
      const response = await fetch('/api/profile/check', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        }
      });
  
      const result = await response.json(); // 서버에서 받은 데이터 파싱
  
      if (result.status === 200) {
        const { data } = result;
        // 받아온 데이터로 상태 업데이트
        setProfileRole(data.profileRole || 'TRAVELER');
        setProfileBio(data.profileBio || '');
        setProfileFavorite(data.profileFavorite || null);
        setProfileStyle(data.profileStyle || null);
      } else {
        console.error('프로필 데이터를 가져오는 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleSubmit = async () => {
    const data = {
        profileRole,
        profileBio: profileBio || "저는 맛집 투어를 좋아해요",
        profileFavorite,
        profileStyle: profileStyle,
    };

    try {
        const response = await fetch('/api/profile/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();

            setDialogMessage({
                title: "프로필 업데이트 성공",
                description: "프로필이 성공적으로 업데이트되었습니다."
            });

            fetchProfileData();
            login(auth.email, auth.nickname, auth.token, profileRole);

            console.log('Auth Updated:', {
              isLoggedIn: auth.isLoggedIn,
              email: auth.email,
              nickname: auth.nickname,
              token: auth.token,
              role: profileRole,
            });
        } else {
            setDialogMessage({
                title: "프로필 업데이트 실패",
                description: "프로필 업데이트 중 문제가 발생했습니다."
            });
        }
        setIsDialogOpen(true);
    } catch (error) {
        console.error('Error updating profile:', error);
        setDialogMessage({
            title: "서버 오류",
            description: "서버와의 통신 중 문제가 발생했습니다."
        });
        setIsDialogOpen(true);
    }
};

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative">
      {/* Current Profile Information - Moved to top-left */}
      {/*<div className="absolute left-4 top-4 w-1/4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>현재 프로필 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>역할:</strong> {profileRole}</p>
            <p><strong>소개:</strong> {profileBio || '소개가 없습니다.'}</p>
            <p><strong>선호 여행지:</strong> {profileFavorite || '선택되지 않음'}</p>
            <p><strong>여행 스타일:</strong> {profileStyle ? travelStyles.find(style => style.id === profileStyle)?.label : '선택되지 않음'}</p>
          </CardContent>
        </Card>
      </div>*/}
  
      <main className="w-full max-w-2xl p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">프로필</h2>
          <div className="space-x-2">
            <Button
              variant={profileRole === 'TRAVELER' ? "default" : "outline"}
              onClick={() => setProfileRole('TRAVELER')}
            >
              TRAVELER
            </Button>
            <Button
              variant={profileRole === 'GUIDE' ? "default" : "outline"}
              onClick={() => setProfileRole('GUIDE')}
            >
              GUIDE
            </Button>
          </div>
        </div>
  
        <div className="space-y-8">
          {/* User Info */}
          <div className="bg-muted p-4 rounded-lg space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">이름</label>
              <Input value={auth.nickname} disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">이메일</label>
              <Input value={auth.email} disabled />
            </div>
          </div>
  
          {/* Introduction */}
          <div className="space-y-2">
            <label className="text-sm font-medium">한줄 소개</label>
            <Textarea
              placeholder="저는 맛집 투어를 좋아해요"
              className="resize-none h-24"
              value={profileBio}
              onChange={(e) => setProfileBio(e.target.value)}
            />
          </div>
  
          {/* Preferred Destination */}
          <div className="space-y-2">
            <label className="text-sm font-medium">선호 여행지</label>
            <Select onValueChange={setProfileFavorite} value={profileFavorite || undefined}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seoul">서울</SelectItem>
                <SelectItem value="busan">부산</SelectItem>
                <SelectItem value="tokyo">도쿄</SelectItem>
                <SelectItem value="osaka">오사카</SelectItem>
                <SelectItem value="shanghai">상해</SelectItem>
                <SelectItem value="taiwan">대만</SelectItem>
                <SelectItem value="hongkong">홍콩</SelectItem>
                <SelectItem value="newyork">뉴욕</SelectItem>
                <SelectItem value="california">캘리포니아</SelectItem>
                <SelectItem value="sydney">시드니</SelectItem>
                <SelectItem value="singapore">싱가포르</SelectItem>
                <SelectItem value="bangkok">방콕</SelectItem>
              </SelectContent>
            </Select>
          </div>
  
          {/* Travel Style */}
          <div className="space-y-2">
            <label className="text-sm font-medium">여행 스타일</label>
            <div className="flex flex-wrap gap-2">
              {travelStyles.map((style) => (
                <Button
                  key={style.id}
                  variant={profileStyle === style.id ? "default" : "outline"}
                  onClick={() => setProfileStyle(style.id)}
                  className="rounded-full text-sm px-3 py-1 h-auto"
                >
                  {style.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
  
        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSubmit} variant="default">
            프로필 수정
          </Button>
        </div>
      </main>
  
      {/* 대화 상자 부분도 이전과 동일 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMessage.title}</DialogTitle>
            <DialogDescription>{dialogMessage.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

}