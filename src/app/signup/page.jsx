'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

export default function Component() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const [nickname, setNickname] = useState("")

  const onEmailHandler = (event) => setEmail(event.currentTarget.value)
  const onPasswordHandler = (event) => setPassword(event.currentTarget.value)
  const onPasswordCheckHandler = (event) => setPasswordCheck(event.currentTarget.value)
  const onNicknameHandler = (event) => setNickname(event.currentTarget.value)

  const onSubmitHandler = (event) => {
    event.preventDefault()

    if (password !== passwordCheck) {
      return alert("비밀번호와 비밀번호 확인 칸이 같지 않습니다.")
    }

    const body = {
      email: email,
      password: password,
      nickname: nickname,
    }

    // Submit logic here
    route.push("/");
  }

  const route = useRouter();
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
                id="email"
                name="email"
                placeholder="이메일"
                required
                type="email"
                value={email}
                onChange={onEmailHandler}
              />
            </div>
            <div>
              <Input
                className="h-12 rounded-md bg-gray-100 px-4"
                id="password"
                name="password"
                placeholder="비밀번호"
                required
                type="password"
                value={password}
                onChange={onPasswordHandler}
              />
            </div>
            <div>
              <Input
                className="h-12 rounded-md bg-gray-100 px-4"
                id="password-check"
                name="password-check"
                placeholder="비밀번호 확인"
                required
                type="password"
                value={passwordCheck}
                onChange={onPasswordCheckHandler}
              />
            </div>
            <div>
              <Input
                className="h-12 rounded-md bg-gray-100 px-4"
                id="nickname"
                name="nickname"
                placeholder="닉네임"
                required
                type="text"
                value={nickname}
                onChange={onNicknameHandler}
              />
            </div>
          </div>
          <Button
            className="h-12 w-full rounded-full bg-blue-500 font-semibold text-white hover:bg-blue-600"
            type="submit"
          >
            회원가입
          </Button>
        </form>
      </div>
    </div>
  )
}