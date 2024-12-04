'use client'

import { Heart, Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { usePathname } from 'next/navigation'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from '@/components/ui/dialog'

interface TripData {
  tripId: number
  tripTitle: string
  tripDescription: string
  tripImageUrls: string[]
  tripPrice: number
  startDate: string
  endDate: string
  schedules: any // Adjust type as necessary
}

export default function TravelBooking() {
  const { auth } = useAuth()
  const pathname = usePathname()
  const tripId = pathname.split('/').pop() // Extract tripId from the pathname
  const [tripData, setTripData] = useState<TripData | null>(null)
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({}) // Specify the type for imageUrls
  const [isFavorited, setIsFavorited] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('예약 결과') // Default title
  const [dialogDescription, setDialogDescription] =
    useState('예약이 성공적으로 생성되었습니다.') // Default description

  useEffect(() => {
    const fetchTripData = async () => {
      if (!auth.token) {
        return
      }

      try {
        const response = await fetch(`/api/trip/check/${tripId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        const result = await response.json()
        if (result.status === 200) {
          setTripData(result.data)

          // Fetch images for each trip
          result.data.tripImageUrls.forEach(async (imageUrl: string) => {
            const imageResponse = await fetch(imageUrl, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            })
            if (imageResponse.ok) {
              const imageBlob = await imageResponse.blob()
              const imageUrlBlob = URL.createObjectURL(imageBlob)
              setImageUrls((prev) => ({
                ...prev,
                [tripId as string]: imageUrlBlob,
              }))
            } else {
              console.error('Failed to fetch image:', imageResponse.statusText)
            }
          })
        } else {
          console.error('Failed to fetch trip data:', result.message)
        }
      } catch (error) {
        console.error('Error fetching trip data:', error)
      }
    }

    fetchTripData()
  }, [auth.token, tripId])

  const handleFavoriteToggle = async () => {
    if (!auth.token) {
      return
    }

    const url = isFavorited
      ? `/api/trip/favorite/remove/${tripId}`
      : `/api/trip/favorite/add/${tripId}`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })

      if (response.ok) {
        setIsFavorited(!isFavorited) // Toggle the favorited state
      } else {
        console.error('Failed to update favorite status:', response.statusText)
      }
    } catch (error) {
      console.error('Error updating favorite status:', error)
    }
  }

  const handleReservation = async () => {
    if (!auth.token) {
      return
    }

    try {
      const response = await fetch(`/api/reservation/create/${tripId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })

      const result = await response.json()
      if (result.status === 201) {
        setDialogTitle('예약 성공') // Set title for success
        setDialogDescription('예약이 완료되었습니다.') // Set description for success
        setIsDialogOpen(true)
      } else if (result.status === 409) {
        setDialogTitle('예약 실패') // Set title for failure
        setDialogDescription('이미 예약된 여행 상품입니다.') // Set description for duplicate reservation
        setIsDialogOpen(true) // Open dialog for duplicate reservation
      }
    } catch (error) {
      console.error('Error creating reservation:', error)
    }
  }

  if (!tripData) {
    return <div>Loading...</div> // Show loading state while fetching data
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">여행 예약</h1>

      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="relative flex-shrink-0 md:w-1/2">
          <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden">
            <img
              src={
                tripId && imageUrls[tripId]
                  ? imageUrls[tripId]
                  : '/images/placeholder.svg'
              } // Use fetched image or placeholder
              alt="Travel destination"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="md:w-1/2 space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="rounded-full">
              Tag
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6"
              onClick={handleFavoriteToggle} // Handle favorite toggle
            >
              <Star
                className={`w-6 h-6 ${
                  isFavorited ? 'fill-primary' : 'fill-muted'
                }`}
              />
            </Button>
          </div>

          <h2 className="text-xl leading-tight">{tripData.tripTitle}</h2>

          <div className="flex items-baseline gap-1">
            <span className="text-sm">$</span>
            <span className="text-4xl font-bold">{tripData.tripPrice}</span>
          </div>

          <div className="text-sm text-muted-foreground">
            {tripData.startDate} ~ {tripData.endDate}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">시작일</div>
              <div>{tripData.startDate}</div>
            </div>
            <div>
              <div className="text-muted-foreground">종료일</div>
              <div>{tripData.endDate}</div>
            </div>
          </div>

          <Button
            className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
            onClick={handleReservation} // Call handleReservation on button click
          >
            예약하기
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogTitle>{dialogTitle}</DialogTitle>
              <DialogDescription>{dialogDescription}</DialogDescription>
              <DialogClose>확인</DialogClose>
            </DialogContent>
          </Dialog>

          <Card className="border-dashed">
            <CardContent className="p-4 text-sm text-muted-foreground">
              {tripData.tripDescription}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            rating: 5,
            title: '만족스러운 맛집 탐방',
            description: '지역의 유명한 맛집을 탐방하는 패키지',
            author: '남궁민',
            date: '2024년 9월',
            image: '/images/placeholder.svg',
          },
          {
            rating: 5,
            title: '취향 저격 여행',
            description: '평화로운 자연을 만끽할 수 있는 패키지',
            author: '김정은',
            date: '2022년 12월',
            image: '/images/placeholder.svg',
          },
          {
            rating: 5,
            title: '형편 없는 숙소',
            description: '별레들이 가득해 참을 찿 수 없음',
            author: '도건우',
            date: '2023년 6월',
            image: '/images/placeholder.svg',
          },
        ].map((review, index) => (
          <Card key={index}>
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-primary'
                        : 'fill-muted stroke-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <div>
                <h3 className="font-medium">{review.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {review.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={review.image} alt={review.author} />
                  <AvatarFallback>{review.author[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div>{review.author}</div>
                  <div className="text-muted-foreground">{review.date}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
