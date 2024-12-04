'use client'

import { useEffect, useState } from 'react'
import { Box, ChevronRight, Heart } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext'
import { FavoriteTrip } from './trip-type'

const FavoritesPage = () => {
  const { auth } = useAuth()
  const [favoriteHistory, setFavoriteHistory] = useState<FavoriteTrip[]>([])

  useEffect(() => {
    const fetchFavoriteTrips = async () => {
      if (!auth.token) {
        return
      }

      try {
        const response = await fetch('/api/trip/favorite/checkAll', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })

        const result = await response.json()
        if (result.status === 200) {
          setFavoriteHistory(result.data)
        }
      } catch (error) {
        console.error('Error fetching favorite trips:', error)
      }
    }

    fetchFavoriteTrips()
  }, [auth.token])

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Heart className="w-6 h-6 text-red-500" />
        <h1 className="text-2xl font-bold">내 여행상품 즐겨찾기</h1>
      </div>

      <div className="space-y-4">
        {favoriteHistory.map((favorite) => (
          <Link
            href={`/trips/${favorite.tripId}`}
            key={favorite.tripFavoriteId}
            className="block"
          >
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors border">
              <Box className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-lg leading-tight mb-1">
                  {favorite.tripTitle}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {favorite.tripDescription}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage
