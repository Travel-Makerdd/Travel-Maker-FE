'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CalendarIcon, Pencil, Trash2 } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import ActivityForm from './activity-form'
import TripInfo from './trip-info'
import TripInfo2 from './trip-info-2'
import { TripData } from './trip-type'
import { mockTripData } from './mock-trip-data'
import TripSchedule from './trip-schedule'
import { differenceInDays } from 'date-fns'

const SchedulePage = () => {
  const [tripData, setTripData] = useState<TripData>({
    trip_title: '',
    trip_description: '',
    trip_price: 0,
    trip_start: '',
    trip_end: '',
    tripImageUrls: [],
    schedual_day: [],
  })

  useEffect(() => {
    // trip_start와 trip_end가 모두 있을 때만 실행
    if (tripData.trip_start && tripData.trip_end) {
      const startDate = new Date(tripData.trip_start)
      const endDate = new Date(tripData.trip_end)

      // 시작일이 종료일보다 늦은 경우 처리하지 않음
      if (startDate > endDate) return

      // 여행 일수 계산 (종료일 포함)
      const daysDiff = differenceInDays(endDate, startDate) + 1

      // 일차별 빈 일정 생성
      const newScheduleDays = Array.from({ length: daysDiff }, (_, index) => ({
        scheduleDay: index + 1,
        activities: [],
      }))

      setTripData((prev) => ({
        ...prev,
        schedual_day: newScheduleDays,
      }))
    } else if (!tripData.trip_start || !tripData.trip_end) {
      // Check if either date is missing
      setTripData((prev) => ({
        ...prev,
        schedual_day: [], // Reset schedual_day to empty array
      }))
    }
  }, [tripData.trip_start, tripData.trip_end])

  return (
    <>
      <Button onClick={() => console.log(tripData)}>데이터 조회</Button>

      <TripInfo2 tripData={tripData} setTripData={setTripData} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <TripSchedule tripData={tripData} setTripData={setTripData} />
          <ActivityForm tripData={tripData} setTripData={setTripData} />
        </div>
      </main>
    </>
  )
}

export default SchedulePage
