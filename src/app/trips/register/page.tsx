'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface Activity {
  acivity_time: string
  acivity_title: string
  activity_content: string
  activity_expense: number
}

interface ScheduleDay {
  activity: Activity[]
}

interface TripFormData {
  trip_title: string
  trip_description: string
  trip_price: number
  trip_start: string
  trip_end: string
  tripImage: File | null // 단일 파일
  schedual_day: ScheduleDay[]
}

export default function CreateTripPage() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<TripFormData>({
    defaultValues: {
      schedual_day: [{ activity: [{ acivity_time: '', acivity_title: '', activity_content: '', activity_expense: 0 }] }]
    }
  })

  const { fields: scheduleDayFields, append: appendScheduleDay, remove: removeScheduleDay } = useFieldArray({
    control,
    name: 'schedual_day'
  })

  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const onSubmit = async (data: TripFormData) => {
    // FormData 생성
    const formData = new FormData()
    formData.append('trip_title', data.trip_title)
    formData.append('trip_description', data.trip_description)
    formData.append('trip_price', data.trip_price.toString())
    formData.append('trip_start', data.trip_start)
    formData.append('trip_end', data.trip_end)

    // 단일 파일 추가
    if (selectedImage) {
      formData.append('tripImage', selectedImage)
    }

    // 일정 데이터 추가
    formData.append('schedual_day', JSON.stringify(data.schedual_day))

    try {
      const response = await fetch('/api/trip/create', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        console.log('여행 상품이 성공적으로 등록되었습니다.')
      } else {
        console.error('여행 상품 등록 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('서버 요청 중 오류가 발생했습니다:', error)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0])
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">여행 상품 등록</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="trip_title">여행 제목</Label>
            <Input id="trip_title" {...register('trip_title', { required: '여행 제목은 필수입니다' })} />
            {errors.trip_title && <p className="text-red-500 text-sm mt-1">{errors.trip_title.message}</p>}
          </div>
          <div>
            <Label htmlFor="trip_description">여행 설명</Label>
            <Textarea id="trip_description" {...register('trip_description', { required: '여행 설명은 필수입니다' })} />
            {errors.trip_description && <p className="text-red-500 text-sm mt-1">{errors.trip_description.message}</p>}
          </div>
          <div>
            <Label htmlFor="trip_price">가격</Label>
            <Input type="number" id="trip_price" {...register('trip_price', { required: '가격은 필수입니다', min: 0 })} />
            {errors.trip_price && <p className="text-red-500 text-sm mt-1">{errors.trip_price.message}</p>}
          </div>
          <div>
            <Label htmlFor="trip_start">시작 날짜</Label>
            <Input type="date" id="trip_start" {...register('trip_start', { required: '시작 날짜는 필수입니다' })} />
            {errors.trip_start && <p className="text-red-500 text-sm mt-1">{errors.trip_start.message}</p>}
          </div>
          <div>
            <Label htmlFor="trip_end">종료 날짜</Label>
            <Input type="date" id="trip_end" {...register('trip_end', { required: '종료 날짜는 필수입니다' })} />
            {errors.trip_end && <p className="text-red-500 text-sm mt-1">{errors.trip_end.message}</p>}
          </div>
          <div>
            <Label>이미지 업로드</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {selectedImage && (
              <p className="mt-2 text-sm">{selectedImage.name}</p>
            )}
          </div>
        </div>
        {/* 일정 추가 부분은 기존 코드 유지 */}
        <Button type="submit" className="w-full">여행 상품 등록</Button>
      </form>
    </div>
  )
}
