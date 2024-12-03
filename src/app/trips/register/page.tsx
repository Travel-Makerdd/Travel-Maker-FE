'use client'

import React from 'react'
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
import { useForm } from 'react-hook-form'
import { CalendarIcon, Pencil, Trash2 } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const SchedulePage = () => {
  const form = useForm()

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">제주도 여행 패키지</h2>

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

          <div>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">일정 수정</h2>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-6">
                    <FormField
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>일정 제목</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="일정 제목을 입력하세요"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>일정 설명</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="일정에 대한 설명을 입력하세요"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>위치</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="일정 위치를 입력하세요"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>날짜</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    'w-full justify-start text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value
                                    ? format(field.value, 'PPP', { locale: ko })
                                    : '날짜를 선택하세요'}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>시작 시간</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>종료 시간</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>예상 경비</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5">$</span>
                              <Input
                                className="pl-7"
                                type="number"
                                placeholder="0"
                                {...field}
                              />
                            </div>
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
        </div>
      </main>
    </>
  )
}

export default SchedulePage
