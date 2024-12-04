type Activity = {
  activityTime: string // Time of the activity
  activityTitle: string // Title of the activity
  activityContent: string // Description of the activity
  activityExpense: number // Expense for the activity
}

type TripSchedule = {
  scheduleDay: number // Day of the schedule
  activities: Activity[] // List of activities for the day
}

type TripData = {
  trip_title: string // Title of the trip
  trip_description: string // Description of the trip
  trip_price: number // Price of the trip
  trip_start: string // ISO date string for start date
  trip_end: string // ISO date string for end date
  tripImageUrls: File[] // Array of image files
  schedual_day: TripSchedule[] // Array of scheduled days
}

export type { TripData, TripSchedule, Activity }
