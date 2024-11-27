import { Heart, Star, Bell, HelpCircle, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

export default function TravelBookingDetail() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Airplane logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <h1 className="text-xl font-bold">Travel Maker : 여행을 더 쉽게</h1>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6" />
            <HelpCircle className="w-6 h-6" />
            <Menu className="w-6 h-6" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8">여행 예약</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Travel destination"
              width={600}
              height={400}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <button className="absolute top-4 left-4 p-2 bg-white/80 rounded-full">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Tag
                </span>
                <button>
                  <Star className="w-6 h-6" />
                </button>
              </div>
              <h1 className="text-2xl font-bold">
                뜨거운 태양과 함께 태평양의 지평선 너머로, Welcome to 사이판
              </h1>
              <div className="text-3xl font-bold">
                <span className="text-lg">$</span>4,000
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">2024. 12. 01 ~ 2024. 12. 05</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">시작일</p>
                  <p className="font-medium">2024.12.01</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">종료일</p>
                  <p className="font-medium">2024.12.05</p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gray-900 text-white py-6">
              예약하기
            </Button>

            <p className="text-gray-600 text-sm">
              자연의 신비로움과 태평양의 아름다움이 넘치는 신비의 섬 사이판.
              뜨거운 태양의 열기가 주는 영양과 밤바다의 경이로움을 만끽해보세요.
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              title: '만족스러운 맛집 탐방',
              description: '지역의 유명한 맛집을 탐방하는 패키지',
              author: '남궁민',
              date: '2024년 9월',
            },
            {
              title: '취향 저격 여행',
              description: '평화로운 자연을 만끽할 수 있는 패키지',
              author: '김정은',
              date: '2022년 12월',
            },
            {
              title: '청편 없는 숙소',
              description: '별네들이 가득해 잠을 잘 수 없음',
              author: '도건우',
              date: '2023년 6월',
            },
          ].map((review, index) => (
            <Card key={index} className="p-6">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4" />
                ))}
              </div>
              <h3 className="font-bold mb-2">{review.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{review.description}</p>
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt={review.author}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{review.author}</p>
                  <p className="text-sm text-gray-600">{review.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
