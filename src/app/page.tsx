'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, History, Menu, Plane, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const MainPage = () => {
const route = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Plane className="h-6 w-6" />
            <h1 className="font-bold text-xl">Travel Maker : 여행을 더 쉽게</h1>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5" />
            <History className="h-5 w-5" />
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 w-full"
                placeholder="어느 나라로 여행을 떠나시나요?"
              />
            </div>

            <nav className="flex gap-4 mb-8 overflow-x-auto pb-2">
              {[
                '전체',
                '국내',
                '일본',
                '중국',
                '몽골',
                '베트남',
                '스위스',
                '체코',
                '태국',
              ].map((item) => (
                <Button
                  key={item}
                  variant={item === '전체' ? 'default' : 'ghost'}
                  className="rounded-full"
                >
                  {item}
                </Button>
              ))}
            </nav>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4">요즘 핫한 여행지</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    alt: 'Mongolia landscape',
                    src: '/placeholder.svg?height=200&width=400',
                  },
                  {
                    alt: 'Street scene',
                    src: '/placeholder.svg?height=200&width=400',
                  },
                  {
                    alt: 'Temple view',
                    src: '/placeholder.svg?height=200&width=400',
                  },
                  {
                    alt: 'Waterfront city',
                    src: '/placeholder.svg?height=200&width=400',
                  },
                ].map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={400}
                      height={200}
                      className="w-full object-cover h-48"
                    />
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4">최신 여행 동행</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    date: '11.10~11.12',
                    title: '오사카 부돈 동행 구해요!',
                    user: '김정은',
                    age: '20대 여자',
                  },
                  {
                    date: '12.10~12.15',
                    title: '도쿄 동행 찾아요',
                    user: '남궁민',
                    age: '20대 여자',
                  },
                  {
                    date: '11.25~11.30',
                    title: '맛집 탐방 같이 하실 분!',
                    user: '도건우',
                    age: '30대 남자',
                  },
                  {
                    date: '10.25~10.27',
                    title: '상하이 쇼핑 메이트 구해요',
                    user: '김소래',
                    age: '20대 여자',
                  },
                ].map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">
                        {item.date}
                      </p>
                      <p className="font-medium my-2">{item.title}</p>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{item.user[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {item.user} {item.age}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-4">최신 여행 포스트</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: '베트남 여행 시 주의점',
                    desc: '여행 가기 전 꼭 확인...',
                    user: '김소정',
                    age: '20대 여자',
                  },
                  {
                    title: '일본 갈 만한 곳 추천 해주세요!',
                    desc: '오사카 갈만한 곳 추...',
                    user: '이상건',
                    age: '20대 남자',
                  },
                  {
                    title: '별레 물멍을 매 대처법',
                    desc: '별레 물멍을 매 호텔에...',
                    user: '최현정',
                    age: '40대 여자',
                  },
                  {
                    title: '여행 경비 절묘',
                    desc: '몽골 5박 6일 경비 알...',
                    user: '이현민',
                    age: '50대 남자',
                  },
                ].map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {item.desc}
                      </p>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{item.user[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {item.user} {item.age}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <div className="hidden lg:flex lg:flex-col lg:w-72 gap-6">
            <Card>
              <CardContent className="p-4">
                <h2 className="font-bold text-xl mb-4">로그인</h2>
                <form className="space-y-4">
                  <Input placeholder="이메일" type="email" />
                  <Input placeholder="비밀번호" type="password" />
                  <Button className="w-full">로그인</Button>
                </form>
                <div className="mt-4 text-center text-sm">
                  <Link href="/signup" className="text-primary hover:underline">
                    회원가입
                  </Link>
                  {' | '}
                  <Link href="#" className="text-primary hover:underline">
                    비밀번호 찾기
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h2 className="font-bold text-xl mb-2">맛집 찾으세요?</h2>
                <p className="text-muted-foreground mb-4">
                  Travel Maker 가입하고
                  <br />
                  최신 여행 포스트를 확인하세요!
                </p>
                <Button className="w-full" onClick={() => route.push("/signup")}>회원가입</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h2 className="font-bold text-xl mb-2">광고</h2>
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Advertisement"
                  width={300}
                  height={200}
                  className="w-full object-cover"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  여행 상품 특별 할인 중!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MainPage
