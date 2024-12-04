import client from './travel-maker-api-client'

// 유저 등록. (POST /api/signUp)
export const signUp = async (data: {
  userEmail: string
  userPassword: string
  confirmPassword: string
  userNickName: string
  userRole: string
}) => {
  return await client.post('/api/signUp', data)
}

// 유저 탈퇴. (POST /api/withdraw)
export const withdraw = async (data: { userEmail: string }) => {
  return await client.post('/api/withdraw', data)
}

// 유저 로그인. (POST /api/signIn)
export const signIn = async (data: {
  userEmail: string
  userPassword: string
}) => {
  return await client.post('/api/signIn', data)
}

// 프로필 업데이트. (POST /api/profile/update)
export const updateProfile = async (data: {
  profileName: string
  profileBio: string
  profileRole: string
  profileStyle: string
  profileFavorite: string
}) => {
  return await client.post('/api/profile/update', data)
}

// 프로필 조회. (GET /api/profile/check)
export const checkProfile = async () => {
  return await client.get('/api/profile/check')
}

// 여행 생성. (POST /api/trip/create)
export const createTrip = async (data: {
  trip_title: string
  trip_description: string
  trip_price: number
  trip_start: string
  trip_end: string
  tripImageUrls: File[]
  schedual_day: any[]
}) => {
  const formData = new FormData()

  // Append text fields with correct parameter names
  formData.append('tripTitle', data.trip_title)
  formData.append('tripDescription', data.trip_description)
  formData.append('tripPrice', data.trip_price.toString())
  formData.append('tripStart', data.trip_start)
  formData.append('tripEnd', data.trip_end)
  formData.append('schedualDay', JSON.stringify(data.schedual_day))

  // Append files
  data.tripImageUrls.forEach((file) => {
    formData.append('tripImageUrls', file)
  })

  return await client.post('/api/trip/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 모든 여행 조회. (GET /api/trip/checkAll)
export const getAllTrips = async () => {
  return await client.get('/api/trip/checkAll')
}

// 여행 상세 정보 조회. (GET /api/trip/check/{tripId})
export const getTripDetails = async (tripId: number) => {
  return await client.get(`/api/trip/check/${tripId}`)
}

// 여행 일정 조회. (GET /api/schedule/{tripId})
export const getScheduleByTripId = async (tripId: number) => {
  return await client.get(`/api/schedule/${tripId}`)
}

// 여행 즐겨찾기 추가. (POST /api/trip/favorite/add/{tripId})
export const addTripToFavorites = async (
  tripId: number,
  data: { user_id: number },
) => {
  return await client.post(`/api/trip/favorite/add/${tripId}`, data)
}

// 여행 즐겨찾기 제거. (POST /api/trip/favorite/remove/{tripId})
export const removeTripFromFavorites = async (
  tripId: number,
  data: { user_id: number },
) => {
  return await client.post(`/api/trip/favorite/remove/${tripId}`, data)
}

// 모든 즐겨찾기 여행 조회. (GET /api/trip/favorite/checkAll)
export const getAllFavoriteTrips = async () => {
  return await client.get('/api/trip/favorite/checkAll')
}

// 예약 생성. (POST /api/trip/reservation/create)
export const createReservation = async (data: {
  trip_id: number
  user_id: number
}) => {
  return await client.post('/api/trip/reservation/create', data)
}

// 모든 예약 조회. (GET /api/reservation/checkAll)
export const getAllReservations = async () => {
  return await client.get('/api/reservation/checkAll')
}

// 예약 삭제. (POST /api/reservation/delete/{reservationId})
export const deleteReservation = async (
  reservationId: number,
  data: { trip_id: number; user_id: number },
) => {
  return await client.post(`/api/reservation/delete/${reservationId}`, data)
}

// 포스트 생성. (POST /api/post/create)
export const createPost = async (data: {
  postTitle: string
  postContent: string
  postImageUrls: string[]
}) => {
  return await client.post('/api/post/create', data)
}

// 포스트 업데이트. (POST /api/post/update/{postId})
export const updatePost = async (
  postId: number,
  data: {
    postTitle: string
    postContent: string
    postImageUrls: string[]
  },
) => {
  return await client.post(`/api/post/update/${postId}`, data)
}

// 포스트 상세 정보 조회. (GET /api/post/{postId})
export const getPostDetails = async (postId: number) => {
  return await client.get(`/api/post/${postId}`)
}

// 모든 포스트 조회. (GET /api/post?page={page}&size={size})
export const getAllPosts = async (page: number, size: number) => {
  return await client.get(`/api/post?page=${page}&size=${size}`)
}

// 포스트에 댓글 추가. (POST /api/post/{postId}/addComment)
export const addCommentToPost = async (
  postId: number,
  data: { commentContent: string },
) => {
  return await client.post(`/api/post/${postId}/addComment`, data)
}

// 포스트의 댓글 조회. (GET /api/post/{postId}/getComment)
export const getCommentsForPost = async (postId: number) => {
  return await client.get(`/api/post/${postId}/getComment`)
}

// 리뷰 생성. (POST /api/review/create)
export const createReview = async (data: {
  user_id: number
  trip_id: number
  review_rating: number
  review_content: string
}) => {
  return await client.post('/api/review/create', data)
}

// 모든 리뷰 조회. (GET /api/review/checkAll)
export const getAllReviews = async () => {
  return await client.get('/api/review/checkAll')
}
