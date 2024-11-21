'use client'
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

export default function ProfilePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [introduction, setIntroduction] = useState<string>('');
  const [preferredDestination, setPreferredDestination] = useState<string | null>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

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
  {/* 서버 요청 로직.. UI완성 후 로직 구현 예정 */}
  /*
  const handleSubmit = async () => {
    const data = {
      introduction: introduction || "저는 맛집 투어를 좋아해요",
      preferredDestination,
      travelStyles: selectedTags.map(tag => {
        const style = travelStyles.find(t => t.id === tag);
        return style?.label || tag;
      }),
    };

    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('프로필이 성공적으로 업데이트되었습니다.');
      } else {
        alert('프로필 업데이트 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('서버와의 통신 중 문제가 발생했습니다.');
    }
  }; */

  return (
    <div className="flex min-h-screen bg-background">
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">프로필</h2>

        <div className="space-y-8">
          {/* User Info */}
          <div className="bg-muted p-4 rounded-lg space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">이름</label>
              <Input value="도건우" disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">이메일</label>
              <Input value="doge@example.com" disabled />
            </div>
          </div>

          {/* Introduction */}
          <div className="space-y-2">
            <label className="text-sm font-medium">한줄 소개</label>
            <Textarea
              placeholder="저는 맛집 투어를 좋아해요"
              className="resize-none h-24"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </div>

          {/* Preferred Destination */}
          <div className="space-y-2">
            <label className="text-sm font-medium">선호 여행지</label>
            <Select onValueChange={setPreferredDestination}>
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
                  variant={selectedTags.includes(style.id) ? "default" : "outline"}
                  onClick={() => toggleTag(style.id)}
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
          <Button /*onClick={handleSubmit}*/ variant="default">
            프로필 수정
          </Button>
        </div>
      </main>
    </div>
  )
}
