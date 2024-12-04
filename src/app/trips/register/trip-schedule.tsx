import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Pencil, Trash2 } from 'lucide-react'
import { TripData, Activity } from './trip-type'
import ActivityEditForm from './activity-edit-form'

interface TripScheduleProps {
  tripData: TripData
  setTripData: React.Dispatch<React.SetStateAction<TripData>>
}

const TripSchedule = ({ tripData, setTripData }: TripScheduleProps) => {
  const [editingActivity, setEditingActivity] = useState<{
    activity: Activity
    dayIndex: number
    activityIndex: number
  } | null>(null)

  const handleDeleteActivity = (dayIndex: number, activityIndex: number) => {
    setTripData((prev) => {
      const updatedDays = prev.schedual_day.map((day, index) => {
        if (index === dayIndex) {
          return {
            ...day,
            activities: day.activities.filter(
              (_, aIndex) => aIndex !== activityIndex,
            ),
          }
        }
        return day // Return unchanged day
      })
      return {
        ...prev,
        schedual_day: updatedDays,
      }
    })
  }

  return (
    <div className="space-y-6">
      {tripData.schedual_day.length === 0 ? ( // Check if schedual_day is empty
        <Card>
          <CardContent className="p-4">
            <div className="text-center text-gray-500">
              시작일과 종료일을 선택해주세요
            </div>
          </CardContent>
        </Card>
      ) : (
        tripData.schedual_day.map((daySchedule, dayIndex) => (
          <div key={dayIndex}>
            <h3 className="text-lg font-semibold mb-4">
              {daySchedule.scheduleDay}일차
            </h3>
            <div className="space-y-4">
              {daySchedule.activities.length === 0 ? (
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center text-gray-500">
                      일정이 없습니다
                    </div>
                  </CardContent>
                </Card>
              ) : (
                daySchedule.activities.map((activity, activityIndex) => (
                  <Card key={activityIndex}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-lg font-medium">
                            {activity.activityTime}
                          </div>
                          <div className="font-semibold">
                            {activity.activityTitle}
                          </div>
                          <div className="text-sm text-gray-500">
                            {activity.activityContent}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setEditingActivity({
                                activity,
                                dayIndex,
                                activityIndex,
                              })
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleDeleteActivity(dayIndex, activityIndex)
                            } // Call delete function
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        ))
      )}

      {editingActivity && (
        <ActivityEditForm
          tripData={tripData}
          setTripData={setTripData}
          activity={editingActivity.activity}
          dayIndex={editingActivity.dayIndex}
          activityIndex={editingActivity.activityIndex}
          isOpen={!!editingActivity}
          onClose={() => setEditingActivity(null)}
        />
      )}
    </div>
  )
}

export default TripSchedule
