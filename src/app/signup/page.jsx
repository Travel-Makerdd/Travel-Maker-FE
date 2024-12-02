'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

export default function Component() {
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userNickname, setUserNickname] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onUserEmailHandler = (event) => setUserEmail(event.currentTarget.value)
  const onUserPasswordHandler = (event) => setUserPassword(event.currentTarget.value)
  const onConfirmPasswordHandler = (event) => setConfirmPassword(event.currentTarget.value)
  const onUserNicknameHandler = (event) => setUserNickname(event.currentTarget.value)

  const onSubmitHandler = async (event) => {
    console.log("onSubmitHandler 호출됨"); 
    event.preventDefault()

    if (userPassword !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인 칸이 같지 않습니다.")
      return
    }

    const body = {
      userEmail: userEmail,
      userPassword: userPassword,
      confirmPassword: confirmPassword,
      userNickname: userNickname,
    }

    try {
      setIsLoading(true)
      const response = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      // 응답 상태 확인
      if (!response.ok) {
        const errorData = await response.json()
        alert(`회원가입에 실패했습니다: ${errorData.message || "알 수 없는 에러"}`)
        return
      }

      const data = await response.json()

      // 회원가입 성공 처리
      if (data.status === 201) {
        alert("회원가입이 완료되었습니다!")
        route.push("/")
      } else {
        alert(`회원가입에 실패했습니다: ${data.message || "알 수 없는 에러"}`)
      }
    } catch (error) {
      console.error("회원가입 요청 중 오류 발생:", error)
      alert("회원가입 요청 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const route = useRouter()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <svg
              className="h-12 w-12 text-blue-500"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Travel Maker : 여행을 더 쉽게</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Input
                className="h-12 rounded-md bg-gray-100 px-4"
                id="userEmail"
                name="userEmail"
                placeholder="이메일"
                required
                type="email"
                value={userEmail}
                onChange={onUserEmailHandler}
              />
            </div>
            <div>
              <Input
                className="h-12 rounded-md bg-gray-100 px-4"
                id="userPassword"
                name="userPassword"
                placeholder="비밀번호"
                required
                type="password"
                value={userPassword}
                onChange={onUserPasswordHandler}
              />
            </div>
            <div>
              <Input
                className="h-12 rounded-md bg-gray-100 px-4"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="비밀번호 확인"
                required
                type="password"
                value={confirmPassword}
                onChange={onConfirmPasswordHandler}
              />
            </div>
            <div>
              <Input
                className="h-12 rounded-md bg-gray-100 px-4"
                id="userNickname"
                name="userNickname"
                placeholder="닉네임"
                required
                type="text"
                value={userNickname}
                onChange={onUserNicknameHandler}
              />
            </div>
          </div>
          <Button
            className={`h-12 w-full rounded-full font-semibold text-white ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "처리 중..." : "회원가입"}
          </Button>
        </form>
      </div>
    </div>
  )
}
