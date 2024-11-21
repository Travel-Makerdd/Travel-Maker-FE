import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Search } from 'lucide-react'

export default function TravelPackageSearch() {
  const destinations = [
    {
      name: '제주 올레길 트레킹 패키지',
      type: '모험',
      rating: 4.5,
      image: '/placeholder.svg',
    },
    {
      name: '도쿄 미식 여행 디럭스',
      type: '럭셔리',
      rating: 4.7,
      image: '/placeholder.svg',
    },
    {
      name: '파리 로맨스 허니문 스페셜',
      type: '허니문',
      rating: 4.6,
      image: '/placeholder.svg',
    },
    {
      name: '뉴욕 패밀리 펀 어드벤처',
      type: '가족여행',
      rating: 4.4,
      image: '/placeholder.svg',
    },
    {
      name: '시드니 서퍼 파라다이스',
      type: '모험',
      rating: 4.3,
      image: '/placeholder.svg',
    },
    {
      name: '방콕 버짓 익스플로러',
      type: '저가',
      rating: 4.2,
      image: '/placeholder.svg',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">여행상품 탐색</h1>
        <p className="text-xl text-gray-600 mb-8">
          당신의 완벽한 여행 패키지를 찾아보세요
        </p>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 pr-4 py-6 text-lg rounded-full shadow-lg"
            placeholder="어떤 여행 패키지를 찾고 계신가요?"
            type="search"
          />
          <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6 py-2">
            검색
          </Button>
        </div>
      </header>

      <Tabs defaultValue="all" className="mb-12">
        <TabsList className="justify-center">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="honeymoon">허니문</TabsTrigger>
          <TabsTrigger value="family">가족여행</TabsTrigger>
          <TabsTrigger value="adventure">모험</TabsTrigger>
          <TabsTrigger value="luxury">럭셔리</TabsTrigger>
          <TabsTrigger value="budget">저가</TabsTrigger>
        </TabsList>
      </Tabs>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">인기 여행상품</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((pack, index) => (
            <Card key={index} className="overflow-hidden">
              <img
                src={pack.image}
                alt={`${pack.name} 이미지`}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{pack.name}</CardTitle>
                  <Badge variant="secondary">{pack.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-600">{pack.type}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                  <span className="text-sm font-semibold">{pack.rating}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">상세 정보</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">특별 여행 패키지</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>제주 에코 어드벤처 패키지</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                제주의 아름다운 자연을 체험하는 친환경 여행 패키지. 올레길
                트레킹, 해녀 문화 체험, 유기농 음식 투어를 포함합니다.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">패키지 상세보기</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>도쿄 테크노 타임워프 투어</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                미래와 과거가 공존하는 도쿄를 경험하세요. 최첨단 기술 전시회,
                레트로 게임 카페, 로봇 레스토랑 등을 포함한 독특한 패키지입니다.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">패키지 상세보기</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
