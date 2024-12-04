export const mockTripData = {
  trip_title: '제주 여행',
  trip_description: '제주의 아름다움을 만끽하세요.',
  trip_price: 120000,
  trip_start: '2024-12-10',
  trip_end: '2024-12-15',
  tripImageUrls: [new File([], 'trip1.jpg'), new File([], 'photo2.jpg')],
  schedual_day: [
    {
      scheduleDay: 1,
      activities: [
        {
          activityTime: '09:00',
          activityTitle: '호텔 체크인',
          activityContent: '서울 시내의 호텔에 체크인',
          activityExpense: 0,
        },
        {
          activityTime: '10:30',
          activityTitle: '경복궁 방문',
          activityContent: '서울의 대표적인 고궁인 경복궁을 관광',
          activityExpense: 20000,
        },
      ],
    },
    {
      scheduleDay: 2,
      activities: [
        {
          activityTime: '08:00',
          activityTitle: '한강 자전거 타기',
          activityContent:
            '한강에서 자전거를 타며 서울의 아름다운 풍경을 즐기기',
          activityExpense: 15000,
        },
        {
          activityTime: '12:00',
          activityTitle: '서울타워 방문',
          activityContent: '서울타워에서 서울의 전경을 즐기기',
          activityExpense: 10000,
        },
      ],
    },
  ],
}
