import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { TripData, Activity } from './trip-type'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface ActivityEditFormProps {
  tripData: TripData
  setTripData: React.Dispatch<React.SetStateAction<TripData>>
  activity: Activity
  dayIndex: number
  activityIndex: number
  isOpen: boolean
  onClose: () => void
}

const ActivityEditForm = ({
  tripData,
  setTripData,
  activity,
  dayIndex,
  activityIndex,
  isOpen,
  onClose,
}: ActivityEditFormProps) => {
  const [selectedDay, setSelectedDay] = useState(dayIndex + 1)
  const [activityTime, setActivityTime] = useState(activity.activityTime)
  const [activityTitle, setActivityTitle] = useState(activity.activityTitle)
  const [activityContent, setActivityContent] = useState(
    activity.activityContent,
  )
  const [activityExpense, setActivityExpense] = useState(
    activity.activityExpense,
  )

  useEffect(() => {
    setSelectedDay(dayIndex + 1)
    setActivityTime(activity.activityTime)
    setActivityTitle(activity.activityTitle)
    setActivityContent(activity.activityContent)
    setActivityExpense(activity.activityExpense)
  }, [activity, dayIndex])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedActivity = {
      activityTime,
      activityTitle,
      activityContent,
      activityExpense,
    }

    setTripData((prev) => {
      const daysWithoutActivity = prev.schedual_day.map((day, dIndex) => {
        if (dIndex === dayIndex) {
          return {
            ...day,
            activities: day.activities.filter(
              (_, aIndex) => aIndex !== activityIndex,
            ),
          }
        }
        return day
      })

      const updatedDays = daysWithoutActivity.map((day, dIndex) => {
        if (dIndex === selectedDay - 1) {
          return {
            ...day,
            activities: [...day.activities, updatedActivity].sort((a, b) =>
              a.activityTime.localeCompare(b.activityTime),
            ),
          }
        }
        return day
      })

      return { ...prev, schedual_day: updatedDays }
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>일정 수정</DialogTitle>
          <DialogDescription>
            아래 양식을 작성하여 일정을 수정하세요
          </DialogDescription>
        </DialogHeader>
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

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">저장하기</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ActivityEditForm
