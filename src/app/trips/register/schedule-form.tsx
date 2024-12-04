import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

const ScheduleForm = () => {
  const form = useForm()

  return (
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
                      <Input placeholder="일정 제목을 입력하세요" {...field} />
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
                      <Input placeholder="일정 위치를 입력하세요" {...field} />
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
  )
}

export default ScheduleForm
