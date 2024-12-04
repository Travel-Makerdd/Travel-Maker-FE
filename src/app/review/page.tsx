'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/app/context/AuthContext'

interface Review {
  reviewId: number
  tripId: number
  userId: number
  tripTitle: string
  reviewRating: number
  reviewContent: string
  updatedAt: string
}

export default function ReviewsPage() {
  const { auth } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const fetchReviews = async () => {
      if (!auth.token) {
        return
      }

      try {
        const response = await fetch(`/api/review/checkAll`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })

        const result = await response.json()
        if (result.status === 200) {
          setReviews(result.data)
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    fetchReviews()
  }, [auth.token])

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
          <Card key={review.reviewId} className="overflow-hidden">
            <CardHeader className="space-y-2">
              <RatingStars rating={review.reviewRating} />
              <h2 className="font-semibold text-xl">{review.tripTitle}</h2>
              <p className="text-sm text-muted-foreground">
                {review.reviewContent}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{review.userId}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{review.userId}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
