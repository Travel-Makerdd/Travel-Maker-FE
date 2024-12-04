'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import ActivityForm from './activity-form'
import TripInfo2 from './trip-info-2'
import { TripData } from './trip-type'
import TripSchedule from './trip-schedule'
import { differenceInDays } from 'date-fns'
import { useAuth } from '@/app/context/AuthContext'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

const SchedulePage = () => {
  const { auth } = useAuth()
  const [tripData, setTripData] = useState<TripData>(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('tripData')
      return savedData
        ? JSON.parse(savedData)
        : {
            trip_title: '',
            trip_description: '',
            trip_price: 0,
            trip_start: '',
            trip_end: '',
            tripImageUrls: [],
            schedual_day: [],
          }
    }
    return {
      trip_title: '',
      trip_description: '',
      trip_price: 0,
      trip_start: '',
      trip_end: '',
      tripImageUrls: [],
      schedual_day: [],
    }
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tripData', JSON.stringify(tripData))
    }
  }, [tripData])

  useEffect(() => {
    if (tripData.trip_start && tripData.trip_end) {
      const startDate = new Date(tripData.trip_start)
      const endDate = new Date(tripData.trip_end)
      if (startDate > endDate) return
      const daysDiff = differenceInDays(endDate, startDate) + 1
      const newScheduleDays = Array.from({ length: daysDiff }, (_, index) => ({
        scheduleDay: index + 1,
        activities: [],
      }))
      setTripData((prev) => ({
        ...prev,
        schedual_day: newScheduleDays,
      }))
    } else if (!tripData.trip_start || !tripData.trip_end) {
      setTripData((prev) => ({
        ...prev,
        schedual_day: [],
      }))
    }
  }, [tripData.trip_start, tripData.trip_end])

  const createTrip = async (data: TripData) => {
    const formData = new FormData()

    const totalActivityExpense = data.schedual_day.reduce((total, day) => {
      return (
        total +
        day.activities.reduce((dayTotal, activity) => {
          return dayTotal + activity.activityExpense
        }, 0)
      )
    }, 0)

    formData.append('tripPrice', totalActivityExpense.toString())

    formData.append('tripTitle', data.trip_title)
    formData.append('tripDescription', data.trip_description)
    formData.append(
      'startDate',
      new Date(data.trip_start).toISOString().split('T')[0],
    )
    formData.append(
      'endDate',
      new Date(data.trip_end).toISOString().split('T')[0],
    )
    formData.append('schedules', JSON.stringify(data.schedual_day))
    data.tripImageUrls.forEach((url) => {
      formData.append('images', url)
    })

    // Log FormData contents
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value)
    }

    const response = await fetch('/api/trip/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      console.error('Failed to create trip:', response.statusText)
    } else {
      const result = await response.json()
      if (result.status === 201) {
        setIsDialogOpen(true)
        setTripData({
          trip_title: '',
          trip_description: '',
          trip_price: 0,
          trip_start: '',
          trip_end: '',
          tripImageUrls: [],
          schedual_day: [],
        })
      }
    }
  }

  return (
    <>
      <div className="flex flex-row gap-2 container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => console.log(auth)}>
          토큰 조회
        </Button>
        <Button variant="outline" onClick={() => console.log(tripData)}>
          데이터 조회
        </Button>
        <Button onClick={() => createTrip(tripData)}>여행상품 등록</Button>
      </div>

      <TripInfo2 tripData={tripData} setTripData={setTripData} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <TripSchedule tripData={tripData} setTripData={setTripData} />
          <ActivityForm tripData={tripData} setTripData={setTripData} />
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              등록 성공
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm">여행 상품 등록이 완료되었습니다.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SchedulePage
