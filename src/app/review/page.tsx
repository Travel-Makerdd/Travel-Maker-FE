'use client'

import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Review {
  id: number
  title: string
  content: string
  rating: number
  user: {
    name: string
  }
  createdAt: string
}

export default function ReviewsPage() {
  // 서버로부터 받아올 리뷰 데이터 예시
  const reviews: Review[] = [
    {
      id: 1,
      title: '만족스러운 맛집 탐방',
      content: '지역의 유명한 맛집을 탐방하는 패키지',
      rating: 4.5,
      user: {
        name: 'testUser'
      },
      createdAt: '2024년 9월'
    },
    {
      id: 2,
      title: '취향 저격 여행',
      content: '평화로운 자연을 만끽할 수 있는 패키지',
      rating: 5,
      user: {
        name: 'testUser'
      },
      createdAt: '2022년 12월'
    },
    {
      id: 3,
      title: '형편 없는 숙소',
      content: '별레들이 가득해 잠을 잘 수 없음',
      rating: 1.5,
      user: {
        name: 'testUser'
      },
      createdAt: '2023년 6월'
    }
  ]

  const RatingStars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.floor(rating)
          const isHalf = star === Math.ceil(rating) && rating % 1 !== 0
          
          return (
            <Star
              key={star}
              className={`w-5 h-5 ${
                isFilled
                  ? 'text-yellow-400 fill-current'
                  : isHalf
                  ? 'text-yellow-400 fill-[url(#half)]'
                  : 'text-gray-300'
              }`}
            >
              {isHalf && (
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
            </Star>
          )
        })}
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">나의 리뷰</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.id} className="overflow-hidden">
            <CardHeader className="space-y-2">
              <RatingStars rating={review.rating} />
              <h2 className="font-semibold text-xl">{review.title}</h2>
              <p className="text-sm text-muted-foreground">{review.content}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{review.user.name}</span>
                  <span className="text-xs text-muted-foreground">{review.createdAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}