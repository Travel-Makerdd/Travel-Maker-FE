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
import TripRegisterForm from './form'
import TripInfo from './trip-info'
import TripInfo2 from './trip-info-2'
import { TripData } from './trip-type'

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
    console.log(tripData)
  }, [tripData])

  return (
    <>
      {/* 여행상품 기본 정보 */}
      {/* <TripInfo /> */}
      <TripInfo2 tripData={tripData} setTripData={setTripData} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">1일차</h3>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-lg font-medium">09:00</div>
                          <div className="font-semibold">
                            제주 올레길 트레킹
                          </div>
                          <div className="text-sm text-gray-500">
                            아름다운 해안선을 따라 걷기
                          </div>
                          <div className="text-sm text-gray-500">
                            제주 서귀포시
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

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-lg font-medium">18:00</div>
                          <div className="font-semibold">흑돼지 맛집 방문</div>
                          <div className="text-sm text-gray-500">
                            제주 흑돼지 비비큐 체험
                          </div>
                          <div className="text-sm text-gray-500">맛집 이름</div>
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
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">2일차</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-lg font-medium">09:00</div>
                        <div className="font-semibold">한라산 등반</div>
                        <div className="text-sm text-gray-500">
                          한라산 정상 등반 및 경관 감상
                        </div>
                        <div className="text-sm text-gray-500">
                          한라산국립공원
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
              </div>
            </div>
          </div>

          <TripRegisterForm />
        </div>
      </main>
    </>
  )
}

export default SchedulePage
