'use client'

import React, { useState } from 'react'
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

const SchedulePage = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="col-span-1">
            <Label htmlFor="productName">상품명</Label>
            <Input id="productName" placeholder="여행 패키지 이름" />
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
                    {startDate ? startDate.toLocaleDateString() : '날짜 선택'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => setStartDate(date)}
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
                    {endDate ? endDate.toLocaleDateString() : '날짜 선택'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => setEndDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="col-span-1">
            <Textarea placeholder="여행 패키지에 대한 설명을 입력하세요." />
          </div>
          <div className="col-span-1">
            <Input type="file" />
          </div>
        </div>
      </div>

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
