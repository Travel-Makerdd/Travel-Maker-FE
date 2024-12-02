'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MessageSquare, Star, Bell, HelpCircle, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'

interface Post {
    postId: number
    postTitle: string
    postContentPreview: string
    postImageUrl: string
    commentCount: number
    favoriteCount: number
}

interface PostsResponse {
    status: number
    data: {
        posts: Post[]
        totalPages: number
        totalElements: number
        currentPage: number
    }
    message: string
}

const MOCK_POSTS: Post[] = [
    {
        postId: 1,
        postTitle: "제주도에서의 아름다운 일출",
        postContentPreview: "제주도 성산일출봉에서 맞이한 감동적인 일출 장면입니다. 이른 아침부터 일어나 힘들게 올라갔지만, 그 경치는 정말 끝내줬어요!",
        postImageUrl: "/placeholder.svg?height=400&width=600",
        commentCount: 15,
        favoriteCount: 32
    },
    {
        postId: 2,
        postTitle: "서울 야경 구경하기",
        postContentPreview: "남산 타워에서 바라본 서울의 야경은 정말 환상적이었어요. 도시의 불빛들이 만들어내는 풍경이 마치 별자리 같았죠.",
        postImageUrl: "/placeholder.svg?height=400&width=600",
        commentCount: 8,
        favoriteCount: 24
    },
    {
        postId: 3,
        postTitle: "부산 해운대 비치 여행",
        postContentPreview: "부산 해운대에서의 즐거운 시간! 모래사장을 걸으며 시원한 바다 바람을 맞으니 정말 상쾌했어요. 근처 맛집 투어도 잊지 않았죠.",
        postImageUrl: "/placeholder.svg?height=400&width=600",
        commentCount: 21,
        favoriteCount: 45
    }
];

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const route = useRouter();
    const { auth } = useAuth();
    useEffect(() => {
        // 실제 API 연동 시 이 부분을 주석 해제하고 사용하세요
        // const fetchPosts = async () => {
        //   try {
        //     const response = await fetch('/api/posts')
        //     const data: PostsResponse = await response.json()
        //     setPosts(data.data.posts)
        //   } catch (error) {
        //     console.error('Failed to fetch posts:', error)
        //   }
        // }
        // fetchPosts()

        // 가짜 데이터 사용
        setPosts(MOCK_POSTS);
    }, [])

    const handleCreatePostClick = () => {
        if (!auth.isLoggedIn) {
            alert("로그인이 필요합니다.");
        } else {
            route.push("/community/createpost"); // 게시글 등록 페이지로 이동
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">커뮤니티</h2>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleCreatePostClick}>
                        + 게시글 등록
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Link key={post.postId} href={`/community/${post.postId}`}>
                            <div className="border rounded-lg overflow-hidden bg-white cursor-pointer hover:shadow-lg transition-shadow duration-300">
                                <div className="relative h-64">
                                    <Image
                                        src={post.postImageUrl}
                                        alt={post.postTitle}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-2">{post.postTitle}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {post.postContentPreview}
                                    </p>
                                    <div className="flex items-center gap-4 text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <MessageSquare className="w-4 h-4" />
                                            <span>{post.commentCount}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4" />
                                            <span>{post.favoriteCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    )
}

