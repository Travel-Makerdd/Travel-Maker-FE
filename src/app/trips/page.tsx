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
import { Badge } from '@/components/ui/badge'
import { MapPin, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const { auth } = useAuth()
  const [destinations, setDestinations] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({}) // To store fetched image URLs

  useEffect(() => {
    const fetchTrips = async () => {
      if (!auth.token) {
        // console.error('No authentication token found. Please log in.')
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/trip/checkAll', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        const result = await response.json()
        if (result.status === 200) {
          setDestinations(result.data)
          // Fetch images for each trip
          result.data.forEach(async (pack: Trip) => {
            if (pack.tripImageUrls[0]) {
              const imageResponse = await fetch(pack.tripImageUrls[0], {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${auth.token}`,
                },
              })
              if (imageResponse.ok) {
                const imageBlob = await imageResponse.blob()
                const imageUrl = URL.createObjectURL(imageBlob)
                setImageUrls((prev) => ({ ...prev, [pack.tripId]: imageUrl }))
              } else {
                console.error(
                  'Failed to fetch image:',
                  imageResponse.statusText,
                )
              }
            }
          })
        }
      } catch (error) {
        console.error('Error fetching trip data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [auth.token])

  if (loading) {
    return <div>Loading...</div>
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
                src={imageUrls[pack.tripId] || '/images/placeholder.svg'} // Use fetched image or fallback to placeholder
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
                <Button
                  onClick={() => {
                    router.push(`/trips/${pack.tripId}`)
                  }}
                  className="w-full"
                >
                  상세 정보
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default TravelPackageSearch
