import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Heart, ChevronRight, Package } from 'lucide-react'

// This would typically come from an API or state management store
const favoritePackages = [
  {
    id: 1,
    title: '제주 에코 어드벤처 패키지',
    description: '제주의 자연을 만끽하는 5일 코스',
  },
  {
    id: 2,
    title: '도쿄 테크노 타임워프 투어',
    description: '과거와 미래가 공존하는 도쿄 7일 여행',
  },
  {
    id: 3,
    title: '파리 로맨스 허니문 스페셜',
    description: '낭만 가득한 파리 6일 신혼여행',
  },
  {
    id: 4,
    title: '뉴욕 패밀리 펀 어드벤처',
    description: '온 가족이 즐기는 뉴욕 8일 여행',
  },
  {
    id: 5,
    title: '방콕 버짓 익스플로러',
    description: '알뜰하게 즐기는 방콕 5일 여행',
  },
  // ... more packages
]

export default function TravelFavorites() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Heart className="text-red-500" />내 여행상품 즐겨찾기
        </h1>
        <Button variant="outline">모든 상품 보기</Button>
      </header>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <ul>
          {favoritePackages.map((pack, index) => (
            <React.Fragment key={pack.id}>
              <li>
                <Link
                  href={`/travel-package/${pack.id}`}
                  className="block py-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                        <Package className="text-blue-500" size={20} />
                        {pack.title}
                      </h2>
                      <p className="text-gray-600">{pack.description}</p>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                </Link>
              </li>
              {index < favoritePackages.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
