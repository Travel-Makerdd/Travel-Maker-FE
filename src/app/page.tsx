'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, CloudCog, History, Menu, Plane, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AdImage from '../../public/image/winter-city.webp'
import { useAuth } from './context/AuthContext'
import { useState } from 'react'
import Osaka from '../../public/image/477571-Osaka.webp'
import Tokyo from '../../public/image/tokyo.jpg'
import Hoian from '../../public/image/hoian.webp'
import Sanghae from '../../public/image/sanghae.jpg'
const MainPage = () => {
  const route = useRouter();
  const { auth, login, logout } = useAuth();
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 로그인 요청
      const response = await fetch('/api/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, userPassword }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('전체 응답 데이터:', result);

        if (result.data) {
          const { nickname, token } = result.data;
          console.log('닉네임:', nickname);
          console.log('토큰:', token);

          // 프로필 확인 요청
          try {
            const profileResponse = await fetch('/api/profile/check', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // 로그인에서 받은 토큰 사용
              },
            });

            if (profileResponse.ok) {
              const profileResult = await profileResponse.json();
              console.log('프로필 응답 데이터:', profileResult);

              if (profileResult.status === 200 && profileResult.data) {
                const { profileRole } = profileResult.data; // role 가져오기
                console.log('사용자 역할:', profileRole);

                // 최종 로그인 처리
                login(userEmail, nickname, token, profileRole);
              } else {
                console.error('프로필 데이터가 유효하지 않습니다:', profileResult);
                setErrorMessage('사용자 역할을 확인할 수 없습니다.');
              }
            } else {
              const profileError = await profileResponse.json();
              console.error('프로필 확인 실패:', profileError);
              setErrorMessage('프로필 확인 중 문제가 발생했습니다.');
            }
          } catch (profileError) {
            console.error('프로필 요청 실패:', profileError);
            setErrorMessage('프로필 요청 중 오류가 발생했습니다.');
          }
        } else {
          console.error('응답 데이터에 "data" 필드가 없습니다:', result);
          setErrorMessage('로그인 응답이 유효하지 않습니다.');
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || '로그인 실패');
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
      setErrorMessage('로그인 중 오류가 발생했습니다.');
    }
  };



  const handleLogout = () => {
    logout();
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-background justify-between h-16 pl-12">

      <main className="container py-6">
        <div className="flex gap-6">
        <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Button 
                className="w-full bg-black hover:bg-blue-600 text-white" 
                onClick={() => route.push("/destinations")}
              >
                여행지 바로가기
              </Button>
              <Button 
                className="w-full bg-black hover:bg-blue-600 text-white" 
                onClick={() => route.push("/trips")}
              >
                여행상품 바로가기
              </Button>
              <Button 
                className="w-full bg-black hover:bg-blue-600 text-white" 
                onClick={() => route.push("/community")}
              >
                커뮤니티 바로가기
              </Button>
            </div>
            <section className="mb-8">
  <h2 className="text-lg font-bold mb-4">요즘 핫한 여행지</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[
      {
        alt: '오사카 풍경',
        src: Osaka,
      },
      {
        alt: '도쿄 풍경',
        src: Tokyo,
      },
      {
        alt: '호이안 풍경',
        src: Hoian,
      },
      {
        alt: '상하이 풍경',
        src: Sanghae,
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
              <h2 className="text-lg font-bold mb-4">최신 여행 상품을 한눈에!</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    date: '12.10~12.12',
                    title: '오사카 알차고 재밌는 여행!',
                    user: '김정은',
                    age: '(오사카 지리빠삭 GUIDE)',
                  },
                  {
                    date: '12.10~12.15',
                    title: '도쿄 : 과거와 현대의 만남 자유로운 여행!',
                    user: '남궁민',
                    age: '(도쿄 현지인급 GUIDE)',
                  },
                  {
                    date: '12.25~12.30',
                    title: '교토&나라 탐방 같이 즐겨요!',
                    user: '도건우',
                    age: '(이제막스타트업여행사)',
                  },
                  {
                    date: '12.25~12.27',
                    title: '동방명주 상해 쇼핑 여행 모집합니다~',
                    user: '이상건',
                    age: '(가이드경험적은여행사)',
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
                    desc: '여행 가기 전 꼭 확인해야할 것이 있습니다. 첫번째...',
                    user: '김타이거',
                    age: '20대 여자',
                  },
                  {
                    title: '일본 갈 만한 곳 추천 해주세요!',
                    desc: '오사카가 괜찮을까요 도쿄가 괜찮을까요? 일본어는 잘 못...',
                    user: 'Brabo Lee',
                    age: '20대 남자',
                  },
                  {
                    title: '벌레 물렸을 때 대처법',
                    desc: '동남아시아 가서 벌레 물렸을 때 호텔에 버물리...',
                    user: '최현정',
                    age: '40대 여자',
                  },
                  {
                    title: '여행 경비 절약',
                    desc: '몽골 5박 6일 경비 알뜰하게 다녀온 후기 알려드립니다 그 전에 구독과 좋아...',
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
                {auth.isLoggedIn ? (
                  <div className="space-y-4">
                    <h2 className="font-bold text-xl mb-4">
                      {auth.nickname}님, 안녕하세요!
                    </h2>
                    <Button className="w-full" variant="outline" onClick={handleLogout}>
                      로그아웃
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h2 className="font-bold text-xl mb-4">로그인</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <Input
                        placeholder="이메일"
                        type="email"
                        value={userEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Input
                        placeholder="비밀번호"
                        type="password"
                        value={userPassword}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button className="w-full hover:bg-blue-600" type="submit">
                        로그인
                      </Button>
                    </form>
                    {errorMessage && (
                      <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                    )}
                    <p className="text-sm mt-4 text-muted-foreground">
                      아직 회원이 아니신가요?{' '}
                      <Link href="/signUp" className="text-blue-500 hover:underline">
                        회원가입
                      </Link>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h2 className="font-bold text-xl mb-2">광고</h2>
                <Image
                  src={AdImage}
                  alt="Advertisement"
                  width={300}
                  height={200}
                  className="w-full object-cover"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  캐나다 여행 상품 특별 할인 중!
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
