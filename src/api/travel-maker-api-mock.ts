// User Registration
export const signUp = (data: {
  userEmail: string
  userPassword: string
  confirmPassword: string
  userNickName: string
  userRole: string
}) => {
  return {
    status: 201,
    data: null,
    message: '사용자 등록에 성공했습니다.',
  }
}

// User Withdrawal
export const withdraw = (data: { userEmail: string }) => {
  return {
    status: 200,
    message: '회원탈퇴가 완료되었습니다',
  }
}

// User Login
export const signIn = (data: { userEmail: string; userPassword: string }) => {
  return {
    status: 200,
    data: 'mock_token', // Simulated token
    message: '로그인에 성공했습니다.',
  }
}

// Update Profile
export const updateProfile = (data: {
  profileName: string
  profileBio: string
  profileRole: string
  profileStyle: string
  profileFavorite: string
}) => {
  return {
    status: 200,
    data: null,
    message: '프로필이 성공적으로 업데이트되었습니다.',
  }
}

// Check Profile
export const checkProfile = () => {
  return {
    status: 200,
    data: {
      userId: 1,
      profileName: '김정은',
      profileRole: 'TRAVELER',
      profileBio: '맛집 탐방을 좋아해요!',
      profileStyle: '계획적',
      profileFavorite: '도쿄',
    },
    message: '프로필 조회에 성공했습니다.',
  }
}

// Create Trip
export const createTrip = (data: {
  trip_title: string
  trip_description: string
  trip_price: number
  trip_start: string
  trip_end: string
  tripImageUrls: string[]
  schedual_day: any[] // Define the structure as needed
}) => {
  return {
    message: '여행상품이 성공적으로 등록되었습니다.',
  }
}

// Get All Trips
export const getAllTrips = () => {
  return [
    {
      trip_id: 1,
      user_id: 1,
      trip_title: 'Paris Getaway',
      trip_description: 'A romantic trip to Paris',
      trip_price: 1200.0,
      trip_start: '2024-10-01',
      trip_end: '2024-10-10',
    },
    // Add more mock trips as needed
  ]
}

// Get Trip Details
export const getTripDetails = (tripId: number) => {
  return {
    schedual_day: [
      {
        activity: [
          {
            acivity_time: '09:00',
            acivity_title: '호텔 체크인',
            activity_content: '~~~',
            activity_expense: 36000,
          },
          {
            acivity_time: '10:30',
            acivity_title: '관광지 A 방문',
            activity_content: '~~~',
            activity_expense: 36000,
          },
        ],
      },
    ],
  }
}

// Get Schedule by Trip ID
export const getScheduleByTripId = (tripId: number) => {
  return {
    status: 200,
    data: {
      '1': [
        {
          scheduleId: 1,
          tripTitle: '서울 3박 4일 여행',
          scheduleDay: 1,
          activities: [
            {
              activityTime: '09:00',
              activityTitle: '호텔 체크인',
              activityExpense: 0.0,
              activityContent: '서울 시내의 호텔에 체크인',
            },
            {
              activityTime: '10:30',
              activityTitle: '경복궁 방문',
              activityExpense: 20000.0,
              activityContent: '서울의 대표적인 고궁인 경복궁을 관광',
            },
          ],
        },
      ],
      '2': [
        {
          scheduleId: 2,
          tripTitle: '서울 3박 4일 여행',
          scheduleDay: 2,
          activities: [
            {
              activityTime: '08:00',
              activityTitle: '한강 자전거 타기',
              activityExpense: 15000.0,
              activityContent:
                '한강에서 자전거를 타며 서울의 아름다운 풍경을 즐기기',
            },
            {
              activityTime: '12:00',
              activityTitle: '서울타워 방문',
              activityExpense: 10000.0,
              activityContent: '서울타워에서 서울의 전경을 즐기기',
            },
          ],
        },
      ],
    },
    message: '여행 일정 일차별 조회 성공',
  }
}

// Add Trip to Favorites
export const addTripToFavorites = (
  tripId: number,
  data: { user_id: number },
) => {
  return {
    message: '여행상품 즐겨찾기에 추가되었습니다.',
  }
}

// Remove Trip from Favorites
export const removeTripFromFavorites = (
  tripId: number,
  data: { user_id: number },
) => {
  return {
    message: 'Trip successfully removed from favorites.',
  }
}

// Get All Favorite Trips
export const getAllFavoriteTrips = () => {
  return [
    {
      trip_favorite_id: 1,
      trip_id: 1,
      trip_title: 'Paris Getaway',
      trip_description: 'A romantic trip to Paris',
      trip_price: 1200.0,
      trip_start: '2024-10-01',
      trip_end: '2024-10-10',
    },
    // Add more mock favorite trips as needed
  ]
}

// Create Reservation
export const createReservation = (data: {
  trip_id: number
  user_id: number
}) => {
  return {
    message: '예약이 성공적으로 생성되었습니다.',
  }
}

// Get All Reservations
export const getAllReservations = () => {
  return {
    status: 200,
    data: [
      {
        reservationId: 2,
        tripId: 2,
        tripTitle: '서울 3박 4일 여행',
        tripDescription:
          '서울에서 3박 4일 동안 즐길 수 있는 관광 명소와 맛집을 포함한 여행 상품입니다.',
        userId: 1,
        tripPrice: 500000.0,
        startDate: '2024-12-01T00:00:00.000+00:00',
        endDate: '2024-12-04T00:00:00.000+00:00',
      },
    ],
    message: '예약 목록 조회 성공',
  }
}

// Delete Reservation
export const deleteReservation = (
  reservationId: number,
  data: { trip_id: number; user_id: number },
) => {
  return {
    message: '예약이 성공적으로 삭제되었습니다.',
  }
}

// Create Post
export const createPost = (data: {
  postTitle: string
  postContent: string
  postImageUrls: string[]
}) => {
  return {
    status: 201,
    data: null,
    message: '게시글이 성공적으로 생성되었습니다.',
  }
}

// Update Post
export const updatePost = (
  postId: number,
  data: { postTitle: string; postContent: string; postImageUrls: string[] },
) => {
  return {
    message: '게시글이 성공적으로 업데이트되었습니다.',
  }
}

// Get Post Details
export const getPostDetails = (postId: number) => {
  return {
    post_id: 1,
    user_id: 1,
    post_title: 'Paris Trip Experience',
    post_content:
      'Had an amazing time visiting the Eiffel Tower and Louvre Museum!',
    post_images: [
      {
        post_image_id: 1,
        post_image_url: 'https://example.com/images/paris1.jpg',
      },
    ],
  }
}

// Get All Posts
export const getAllPosts = (page: number, size: number) => {
  return {
    status: 200,
    data: {
      posts: [
        {
          postId: 1,
          postTitle: '여행에서 찍은 멋진 사진들',
          postContentPreview: '지난 주말 다녀온 여행에서의 추억을 남깁니다!',
          postImageUrl: 'https://example.com/images/photo1.jpg',
          commentCount: 0,
          favoriteCount: 1,
        },
      ],
      totalPages: 1,
      totalElements: 3,
      currentPage: page,
    },
    message: '게시글 목록 조회에 성공했습니다.',
  }
}

// Add Comment to Post
export const addCommentToPost = (
  postId: number,
  data: { commentContent: string },
) => {
  return {
    status: 201,
    data: null,
    message: '댓글이 성공적으로 추가되었습니다.',
  }
}

// Get Comments for Post
export const getCommentsForPost = (postId: number) => {
  return {
    status: 200,
    data: [
      {
        commentId: 1,
        userId: 4,
        postId: 7,
        userNickname: '정은123',
        commentContent: '멋져요!',
        createdAt: '2024-11-21T16:09:05.467439',
      },
    ],
    message: '댓글 조회에 성공했습니다.',
  }
}

// Create Review
export const createReview = (data: {
  user_id: number
  trip_id: number
  review_rating: number
  review_content: string
}) => {
  return {
    message: '리뷰가 성공적으로 작성되었습니다.',
  }
}

// Get All Reviews
export const getAllReviews = () => {
  return {
    status: 200,
    data: [
      {
        review_id: 1,
        user: {
          user_id: 101,
          user_email: 'mailto:user1@example.com',
        },
        trip: {
          trip_id: 1001,
          trip_title: '유럽 여행',
        },
        review_rating: 5,
        review_content: '아주 좋았어요!',
      },
    ],
  }
}
