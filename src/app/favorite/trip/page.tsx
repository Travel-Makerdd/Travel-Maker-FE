'use client'

import { Box, ChevronRight, Heart } from 'lucide-react'
import Link from 'next/link'

const FavoritesPage = () => {
  const favorite_history = [
    {
      id: 1,
      post_title: '제주 에코 어드벤처 패키지',
      post_content: '제주의 자연을 만끽하는 5일 코스'
    },
    {
      id: 2,
      post_title: '도쿄 테크노 타임워프 투어',
      post_content: '과거와 미래가 공존하는 도쿄 7일 여행'
    },
    {
      id: 3,
      post_title: '파리 로맨스 허니문 스페셜',
      post_content: '낭만 가득한 파리 6일 신혼여행'
    },
    {
      id: 4,
      post_title: '뉴욕 패밀리 펀 어드벤처',
      post_content: '온 가족이 즐기는 뉴욕 8일 여행'
    },
    {
      id: 5,
      post_title: '방콕 버킷 익스플로러',
      post_content: '알뜰하게 즐기는 방콕 5일 여행'
    }
  ]

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Heart className="w-6 h-6 text-red-500" />
        <h1 className="text-2xl font-bold">내 여행상품 즐겨찾기</h1>
      </div>

      <div className="space-y-4">
        {favorite_history.map((favorite) => (
          <Link
            href={`/products/${favorite.id}`}
            key={favorite.id}
            className="block"
          >
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors border">
              <Box className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-lg leading-tight mb-1">
                  {favorite.post_title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {favorite.post_content}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage