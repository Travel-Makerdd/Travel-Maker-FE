'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { StarIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext' // Import useAuth hook

interface Reservation {
  reservationId: number
  tripId: number
  tripTitle: string
  tripDescription: string
  userId: number
  tripPrice: number
  startDate: string
  endDate: string
}

export default function HistoryPage() {
  const { auth } = useAuth() // Get auth token from context
  const [reservations, setReservations] = useState<Reservation[]>([]) // State to hold reservations with type
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<number | null>(
    null,
  )
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewContent, setReviewContent] = useState('')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)

  useEffect(() => {
    const fetchReservations = async () => {
      if (!auth.token) {
        return
      }

      try {
        const response = await fetch('/api/reservation/checkAll', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })

        const result = await response.json()
        if (result.status === 200) {
          setReservations(result.data) // Set the fetched reservations
        }
      } catch (error) {
        console.error('Error fetching reservations:', error)
      }
    }

    fetchReservations()
  }, [auth.token])

  useEffect(() => {
    // 컴포넌트가 마운트될 때 현재 날짜를 설정
    setCurrentDate(new Date())
  }, [])

  const handleCancelClick = (id: number) => {
    setSelectedReservation(id)
    setIsModalOpen(true)
  }

  const handleConfirmCancel = async () => {
    if (!auth.token || selectedReservation === null) {
      return // Ensure token and reservation ID are available
    }

    try {
      const response = await fetch(
        `/api/reservation/delete/${selectedReservation}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      )

      const result = await response.json()
      if (result.status === 200) {
        setIsModalOpen(false) // Close the cancel confirmation modal
        setSelectedReservation(null) // Clear the selected reservation
        setIsDialogOpen(true) // Open success dialog
      }
    } catch (error) {
      console.error('Error canceling reservation:', error)
    }
  }

  const handleReviewClick = (id: number) => {
    setSelectedReservation(id)
    setIsReviewModalOpen(true)
  }

  const handleReviewSubmit = async () => {
    if (!auth.token || selectedReservation === null) {
      return // Ensure token and reservation ID are available
    }

    const reviewData = {
      tripId: selectedReservation, // Assuming selectedReservation is the tripId
      reviewRating,
      reviewContent,
    }

    try {
      const response = await fetch('/api/review/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(reviewData),
      })

      const result = await response.json()
      if (result.status === 201) {
        setIsReviewDialogOpen(true) // Open success dialog
      }
    } catch (error) {
      console.error('Error submitting review:', error)
    }

    // Reset review form
    setIsReviewModalOpen(false)
    setSelectedReservation(null)
    setReviewRating(0)
    setReviewContent('')
  }

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description
    return `${description.substring(0, maxLength)}...`
  }

  const isDatePassed = (endDate: string) => {
    const tripEndDate = new Date(
      endDate.replace('년', '').replace('월', '-').replace('일', ''),
    )
    return currentDate > tripEndDate
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h2 className="text-xl font-semibold mb-6">예약 목록</h2>
      <p className="text-sm text-gray-500 mb-4">
        현재 날짜:{' '}
        {currentDate.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      <div className="space-y-4">
        {reservations.length === 0 ? (
          <div className="text-center text-gray-500">
            예약된 여행 상품이 없습니다.
          </div>
        ) : (
          reservations.map((reservation) => {
            const isPastTrip = isDatePassed(reservation.endDate)
            return (
              <div
                key={reservation.reservationId}
                className={`${
                  isPastTrip ? 'bg-gray-700' : 'bg-blue-500'
                } text-white rounded-lg p-6 space-y-4`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      {reservation.tripTitle}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-sm">
                        • 출발일: {reservation.startDate}
                      </p>
                      <p className="text-sm">• 도착일: {reservation.endDate}</p>
                    </div>
                    <p className="text-sm max-w-xl">
                      {truncateDescription(reservation.tripDescription, 50)}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <div>
                      <div className="text-sm">상품 금액</div>
                      <div className="text-2xl font-semibold">
                        ${reservation.tripPrice.toLocaleString()}
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() =>
                        isPastTrip
                          ? handleReviewClick(reservation.reservationId)
                          : handleCancelClick(reservation.reservationId)
                      }
                    >
                      {isPastTrip ? '리뷰 작성' : '예약 취소'}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              정말 취소 하시겠습니까?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">여행 취소 안내</h4>
              <p className="text-sm text-muted-foreground">
                고객님의 소중한 결정을 존중합니다.
                <br />
                아래의 취소 규정을 확인해 주시기 바랍니다.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm">
                1. 출발 30일 전까지 취소: 예약금 전액 환불
              </p>
              <p className="text-sm">
                2. 출발 15일 전까지 취소: 전체 금액의 50%가 환불
              </p>
              <p className="text-sm">3. 출발 7일 이내 취소: 환불 불가</p>
            </div>
            <p className="text-sm text-muted-foreground">
              신중한 결정으로 더 나은 선택을 하세요.
              <br />
              여행 취소에 대한 도움이 필요하시면 언제든지 문의 해 주세요.
              고객님의 상황을 충분히 고려하여 최선을 다하겠습니다.
            </p>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 sm:flex-none"
            >
              이전으로
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmCancel}
              className="flex-1 sm:flex-none"
            >
              예약 취소
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              리뷰 작성
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">평점</h4>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= reviewRating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    onClick={() => setReviewRating(star)}
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">리뷰 내용</h4>
              <Textarea
                placeholder="여행 경험을 자세히 들려주세요."
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsReviewModalOpen(false)}
              className="flex-1 sm:flex-none"
            >
              취소
            </Button>
            <Button
              variant="default"
              onClick={handleReviewSubmit}
              className="flex-1 sm:flex-none"
            >
              리뷰 제출
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              예약 취소
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm">예약이 취소되었습니다.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              리뷰 작성 완료
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm">리뷰가 작성되었습니다.</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReviewDialogOpen(false)}
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
