type TripSchedule = {
  activity: {
    acivity_time: string
    acivity_title: string
    activity_content: string
    activity_expense: number
  }[]
}

type TripData = {
  trip_title: string
  trip_description: string
  trip_price: number
  trip_start: string // ISO date string
  trip_end: string // ISO date string
  tripImageUrls: File[]
  schedual_day: TripSchedule[]
}

export type { TripData, TripSchedule }
