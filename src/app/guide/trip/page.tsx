import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plane, Plus } from 'lucide-react'

export default function TravelMakerForm() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">상품 등록</h2>
        <Button variant="secondary" className="ml-auto">
          등록하기
        </Button>
      </div>

      <Card className="p-6 bg-gray-50">
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="productName">상품명 :</Label>
            <Input id="productName" className="bg-gray-200" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="period">기간 :</Label>
            <Input id="period" className="bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="description">상세설명 :</Label>
              <Textarea id="description" className="h-[200px] bg-gray-200" />
            </div>

            <div className="space-y-2">
              <Label>이미지 업로드</Label>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
                  >
                    <Plus className="w-8 h-8 text-gray-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}
