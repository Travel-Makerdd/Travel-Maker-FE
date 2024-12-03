'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface FormData {
  title: string
  content: string
  images: string[]
}

export default function CreatePostPage() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    images: []
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 폼 데이터 생성
    const submitData = new FormData()
    submitData.append('title', formData.title)
    submitData.append('content', formData.content)
    formData.images.forEach((image, index) => {
      submitData.append(`image${index}`, image)
    })

    // TODO: 실제 API 호출 구현
    console.log('Form submitted:', submitData)
    
    // 폼 초기화
    setFormData({ title: '', content: '', images: [] })
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-8">게시글 등록</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">제목:</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="제목을 입력하세요"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>이미지</Label>
              <div className="grid grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <label className="relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:bg-muted/80 transition-colors flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                    multiple
                  />
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="내용을 입력하세요"
                className="min-h-[300px]"
              />
            </div>

            <Button type="submit" className="w-full">
              등록하기
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

