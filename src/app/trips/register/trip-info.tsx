'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useForm } from 'react-hook-form'

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

const TripInfo = () => {
  const form = useForm<TripData>()

  const onSubmit = (data: TripData) => {
    // Handle form submission
    console.log(data)
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">여행 패키지 등록</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="trip_title"
                render={() => (
                  <FormItem>
                    <FormLabel>상품명</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="여행 패키지 이름"
                        {...form.register('trip_title')}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="trip_description"
                render={() => (
                  <FormItem>
                    <FormLabel>설명</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="여행 패키지에 대한 설명을 입력하세요."
                        className="min-h-[100px]"
                        {...form.register('trip_description')}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="trip_price"
                render={() => (
                  <FormItem>
                    <FormLabel>가격</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="가격을 입력하세요"
                        {...form.register('trip_price')}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="trip_start"
                render={() => (
                  <FormItem>
                    <FormLabel>시작일</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {form.watch('trip_start')
                              ? format(
                                  new Date(form.watch('trip_start')),
                                  'PPP',
                                  {
                                    locale: ko,
                                  },
                                )
                              : '날짜 선택'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              form.watch('trip_start')
                                ? new Date(form.watch('trip_start'))
                                : undefined
                            }
                            onSelect={(date) =>
                              form.setValue(
                                'trip_start',
                                date?.toISOString() || '',
                              )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="trip_end"
                render={() => (
                  <FormItem>
                    <FormLabel>종료일</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {form.watch('trip_end')
                              ? format(
                                  new Date(form.watch('trip_end')),
                                  'PPP',
                                  {
                                    locale: ko,
                                  },
                                )
                              : '날짜 선택'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              form.watch('trip_end')
                                ? new Date(form.watch('trip_end'))
                                : undefined
                            }
                            onSelect={(date) =>
                              form.setValue(
                                'trip_end',
                                date?.toISOString() || '',
                              )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="tripImageUrls"
                render={() => (
                  <FormItem>
                    <FormLabel>이미지 URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="이미지 URL을 입력하세요"
                        {...form.register('tripImageUrls')}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                저장하기
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default TripInfo
