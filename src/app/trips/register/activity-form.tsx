import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { TripData } from './trip-type'

interface ActivityFormProps {
  tripData: TripData
  setTripData: React.Dispatch<React.SetStateAction<TripData>>
}

const ActivityForm = ({ tripData, setTripData }: ActivityFormProps) => {
  const [selectedDay, setSelectedDay] = useState(1)
  const [activityTime, setActivityTime] = useState('')
  const [activityTitle, setActivityTitle] = useState('')
  const [activityContent, setActivityContent] = useState('')
  const [activityExpense, setActivityExpense] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newActivity = {
      activityTime,
      activityTitle,
      activityContent,
      activityExpense,
    }

    setTripData((prev) => {
      const updatedDays = prev.schedual_day.map((day) =>
        day.scheduleDay === selectedDay
          ? {
              ...day,
              activities: [...day.activities, newActivity].sort((a, b) =>
                a.activityTime.localeCompare(b.activityTime),
              ),
            }
          : day,
      )

      // Calculate total activity expenses
      const totalActivityExpense = updatedDays.reduce((total, day) => {
        return (
          total +
          day.activities.reduce((dayTotal, activity) => {
            return dayTotal + activity.activityExpense
          }, 0)
        )
      }, 0)

      return {
        ...prev,
        schedual_day: updatedDays,
        trip_price: totalActivityExpense, // Update trip_price immediately
      }
    })

    // Reset form
    setActivityTime('')
    setActivityTitle('')
    setActivityContent('')
    setActivityExpense(0)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>일차 선택</Label>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          {tripData.schedual_day.map((day) => (
            <option key={day.scheduleDay} value={day.scheduleDay}>
              {day.scheduleDay}일차
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>시간</Label>
        <Input
          type="time"
          value={activityTime}
          onChange={(e) => setActivityTime(e.target.value)}
          required
        />
      </div>

      <div>
        <Label>제목</Label>
        <Input
          value={activityTitle}
          onChange={(e) => setActivityTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <Label>내용</Label>
        <Textarea
          value={activityContent}
          onChange={(e) => setActivityContent(e.target.value)}
          required
        />
      </div>

      <div>
        <Label>예상 경비</Label>
        <Input
          type="number"
          value={activityExpense}
          onChange={(e) => setActivityExpense(Number(e.target.value))}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        추가하기
      </Button>
    </form>
  )
}

export default ActivityForm
