import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Pencil, Trash2 } from 'lucide-react'
import { TripData } from './trip-type'

interface TripScheduleProps {
  tripData: TripData
}

const TripSchedule = ({ tripData }: TripScheduleProps) => {
  return (
    <div className="space-y-6">
      {tripData.schedual_day.map((daySchedule, dayIndex) => (
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
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
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
      ))}
    </div>
  )
}

export default TripSchedule
