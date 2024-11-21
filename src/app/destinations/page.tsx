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

export default function TravelDestinationSearch() {
  const destinations = [
    { name: '제주도', type: '국내', rating: 4.5, image: '/placeholder.svg' },
    { name: '도쿄', type: '아시아', rating: 4.7, image: '/placeholder.svg' },
    { name: '파리', type: '유럽', rating: 4.6, image: '/placeholder.svg' },
    { name: '뉴욕', type: '북미', rating: 4.4, image: '/placeholder.svg' },
    {
      name: '시드니',
      type: '오세아니아',
      rating: 4.3,
      image: '/placeholder.svg',
    },
    { name: '방콕', type: '아시아', rating: 4.2, image: '/placeholder.svg' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">여행지 탐색</h1>
        <p className="text-xl text-gray-600 mb-8">
          당신의 다음 모험을 찾아보세요
        </p>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 pr-4 py-6 text-lg rounded-full shadow-lg"
            placeholder="어디로 여행을 떠나고 싶으신가요?"
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
          <TabsTrigger value="beach">해변</TabsTrigger>
          <TabsTrigger value="mountain">산</TabsTrigger>
          <TabsTrigger value="city">도시</TabsTrigger>
          <TabsTrigger value="countryside">시골</TabsTrigger>
          <TabsTrigger value="island">섬</TabsTrigger>
        </TabsList>
      </Tabs>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">인기 여행지</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <Card key={index} className="overflow-hidden">
              <img
                src={dest.image}
                alt={`${dest.name} 이미지`}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{dest.name}</CardTitle>
                  <Badge variant="secondary">{dest.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-600">{dest.type}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                  <span className="text-sm font-semibold">{dest.rating}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">자세히 보기</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">추천 여행 경험</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>제주도 올레길 트레킹</CardTitle>
            </CardHeader>
            <CardContent>
              <p>아름다운 해안선을 따라 걸으며 제주의 자연을 만끽하세요.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">더 알아보기</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>도쿄 미식 여행</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                미슐랭 스타 레스토랑부터 길거리 음식까지, 도쿄의 맛을
                즐겨보세요.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">더 알아보기</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
