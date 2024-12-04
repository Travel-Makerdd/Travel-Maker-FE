import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { TripData } from './trip-type'

type TripInfoProps = {
  tripData: TripData
  setTripData: (data: TripData) => void
}

const TripInfo2: React.FC<TripInfoProps> = ({ tripData, setTripData }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div className="col-span-1">
          <Label htmlFor="productName">상품명</Label>
          <Input
            id="productName"
            placeholder="여행 패키지 이름"
            value={tripData.trip_title}
            onChange={(e) =>
              setTripData({ ...tripData, trip_title: e.target.value })
            }
          />
        </div>
        <div className="w-full flex justify-center col-span-1">
          <div>
            <Label htmlFor="startDate">시작일</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {tripData.trip_start
                    ? new Date(tripData.trip_start).toLocaleDateString()
                    : '날짜 선택'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    tripData.trip_start
                      ? new Date(tripData.trip_start)
                      : undefined
                  }
                  onSelect={(date) =>
                    setTripData({
                      ...tripData,
                      trip_start: date?.toISOString() || '',
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="ml-4">
            <Label htmlFor="endDate">종료일</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {tripData.trip_end
                    ? new Date(tripData.trip_end).toLocaleDateString()
                    : '날짜 선택'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    tripData.trip_end ? new Date(tripData.trip_end) : undefined
                  }
                  onSelect={(date) =>
                    setTripData({
                      ...tripData,
                      trip_end: date?.toISOString() || '',
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="col-span-1">
          <Textarea
            placeholder="여행 패키지에 대한 설명을 입력하세요."
            value={tripData.trip_description}
            onChange={(e) =>
              setTripData({ ...tripData, trip_description: e.target.value })
            }
          />
        </div>
        <div className="col-span-1">
          <Input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                const files = Array.from(e.target.files)
                setTripData({ ...tripData, tripImageUrls: files })
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TripInfo2
