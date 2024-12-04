import {
  signUp as mockSignUp,
  withdraw as mockWithdraw,
  signIn as mockSignIn,
  updateProfile as mockUpdateProfile,
  checkProfile as mockCheckProfile,
  createTrip as mockCreateTrip,
  getAllTrips as mockGetAllTrips,
  getTripDetails as mockGetTripDetails,
  getScheduleByTripId as mockGetScheduleByTripId,
  addTripToFavorites as mockAddTripToFavorites,
  removeTripFromFavorites as mockRemoveTripFromFavorites,
  getAllFavoriteTrips as mockGetAllFavoriteTrips,
  createReservation as mockCreateReservation,
  getAllReservations as mockGetAllReservations,
  deleteReservation as mockDeleteReservation,
  createPost as mockCreatePost,
  updatePost as mockUpdatePost,
  getPostDetails as mockGetPostDetails,
  getAllPosts as mockGetAllPosts,
  addCommentToPost as mockAddCommentToPost,
  getCommentsForPost as mockGetCommentsForPost,
  createReview as mockCreateReview,
  getAllReviews as mockGetAllReviews,
} from './travel-maker-api-mock'

import {
  signUp as prodSignUp,
  withdraw as prodWithdraw,
  signIn as prodSignIn,
  updateProfile as prodUpdateProfile,
  checkProfile as prodCheckProfile,
  createTrip as prodCreateTrip,
  getAllTrips as prodGetAllTrips,
  getTripDetails as prodGetTripDetails,
  getScheduleByTripId as prodGetScheduleByTripId,
  addTripToFavorites as prodAddTripToFavorites,
  removeTripFromFavorites as prodRemoveTripFromFavorites,
  getAllFavoriteTrips as prodGetAllFavoriteTrips,
  createReservation as prodCreateReservation,
  getAllReservations as prodGetAllReservations,
  deleteReservation as prodDeleteReservation,
  createPost as prodCreatePost,
  updatePost as prodUpdatePost,
  getPostDetails as prodGetPostDetails,
  getAllPosts as prodGetAllPosts,
  addCommentToPost as prodAddCommentToPost,
  getCommentsForPost as prodGetCommentsForPost,
  createReview as prodCreateReview,
  getAllReviews as prodGetAllReviews,
} from './travel-maker-api-prod'

/**
 * 테스트 모드 여부.
 */
const IS_TEST_MODE = false

// Unified API functions
export const signUp = (data: {
  userEmail: string
  userPassword: string
  confirmPassword: string
  userNickName: string
  userRole: string
}) => {
  return IS_TEST_MODE ? mockSignUp(data) : prodSignUp(data)
}

export const withdraw = (data: { userEmail: string }) => {
  return IS_TEST_MODE ? mockWithdraw(data) : prodWithdraw(data)
}

export const signIn = (data: { userEmail: string; userPassword: string }) => {
  return IS_TEST_MODE ? mockSignIn(data) : prodSignIn(data)
}

export const updateProfile = (data: {
  profileName: string
  profileBio: string
  profileRole: string
  profileStyle: string
  profileFavorite: string
}) => {
  return IS_TEST_MODE ? mockUpdateProfile(data) : prodUpdateProfile(data)
}

export const checkProfile = () => {
  return IS_TEST_MODE ? mockCheckProfile() : prodCheckProfile()
}

export const createTrip = (data: {
  trip_title: string
  trip_description: string
  trip_price: number
  trip_start: string
  trip_end: string
  tripImageUrls: File[]
  schedual_day: any[]
}) => {
  return IS_TEST_MODE ? mockCreateTrip(data) : prodCreateTrip(data)
}

export const getAllTrips = () => {
  return IS_TEST_MODE ? mockGetAllTrips() : prodGetAllTrips()
}

export const getTripDetails = (tripId: number) => {
  return IS_TEST_MODE ? mockGetTripDetails(tripId) : prodGetTripDetails(tripId)
}

export const getScheduleByTripId = (tripId: number) => {
  return IS_TEST_MODE
    ? mockGetScheduleByTripId(tripId)
    : prodGetScheduleByTripId(tripId)
}

export const addTripToFavorites = (
  tripId: number,
  data: { user_id: number },
) => {
  return IS_TEST_MODE
    ? mockAddTripToFavorites(tripId, data)
    : prodAddTripToFavorites(tripId, data)
}

export const removeTripFromFavorites = (
  tripId: number,
  data: { user_id: number },
) => {
  return IS_TEST_MODE
    ? mockRemoveTripFromFavorites(tripId, data)
    : prodRemoveTripFromFavorites(tripId, data)
}

export const getAllFavoriteTrips = () => {
  return IS_TEST_MODE ? mockGetAllFavoriteTrips() : prodGetAllFavoriteTrips()
}

export const createReservation = (data: {
  trip_id: number
  user_id: number
}) => {
  return IS_TEST_MODE
    ? mockCreateReservation(data)
    : prodCreateReservation(data)
}

export const getAllReservations = () => {
  return IS_TEST_MODE ? mockGetAllReservations() : prodGetAllReservations()
}

export const deleteReservation = (
  reservationId: number,
  data: { trip_id: number; user_id: number },
) => {
  return IS_TEST_MODE
    ? mockDeleteReservation(reservationId, data)
    : prodDeleteReservation(reservationId, data)
}

export const createPost = (data: {
  postTitle: string
  postContent: string
  postImageUrls: string[]
}) => {
  return IS_TEST_MODE ? mockCreatePost(data) : prodCreatePost(data)
}

export const updatePost = (
  postId: number,
  data: { postTitle: string; postContent: string; postImageUrls: string[] },
) => {
  return IS_TEST_MODE
    ? mockUpdatePost(postId, data)
    : prodUpdatePost(postId, data)
}

export const getPostDetails = (postId: number) => {
  return IS_TEST_MODE ? mockGetPostDetails(postId) : prodGetPostDetails(postId)
}

export const getAllPosts = (page: number, size: number) => {
  return IS_TEST_MODE
    ? mockGetAllPosts(page, size)
    : prodGetAllPosts(page, size)
}

export const addCommentToPost = (
  postId: number,
  data: { commentContent: string },
) => {
  return IS_TEST_MODE
    ? mockAddCommentToPost(postId, data)
    : prodAddCommentToPost(postId, data)
}

export const getCommentsForPost = (postId: number) => {
  return IS_TEST_MODE
    ? mockGetCommentsForPost(postId)
    : prodGetCommentsForPost(postId)
}

export const createReview = (data: {
  user_id: number
  trip_id: number
  review_rating: number
  review_content: string
}) => {
  return IS_TEST_MODE ? mockCreateReview(data) : prodCreateReview(data)
}

export const getAllReviews = () => {
  return IS_TEST_MODE ? mockGetAllReviews() : prodGetAllReviews()
}
