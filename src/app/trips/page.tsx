'use client'

import React, { useEffect, useState } from 'react'
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
import { useAuth } from '../context/AuthContext'

interface Trip {
  tripId: number
  tripTitle: string
  tripDescription: string
  tripImageUrls: string[]
  tripPrice: number
  startDate: string
  endDate: string
  schedules: any // Adjust type as necessary
}

const TravelPackageSearch = () => {
  const { auth } = useAuth()
  const [destinations, setDestinations] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('/api/trip/checkAll', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        const result = await response.json()
        if (result.status === 200) {
          setDestinations(result.data)
        }
      } catch (error) {
        console.error('Error fetching trip data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  if (loading) {
    return <div>Loading...</div> // Show a loading state while fetching data
  }

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

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">인기 여행상품</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((pack) => (
            <Card key={pack.tripId} className="overflow-hidden">
              <img
                src={pack.tripImageUrls[0] || '/placeholder.svg'} // Fallback image
                alt={`${pack.tripTitle} 이미지`}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{pack.tripTitle}</CardTitle>
                  <Badge variant="secondary">{pack.tripPrice} 원</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {pack.startDate} - {pack.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{pack.tripDescription}</p>
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

export default TravelPackageSearch
