'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MessageSquare, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'

interface Post {
    postId: number
    postTitle: string
    postContentPreview: string
    postImageUrls: string[] // 서버로부터 받은 이미지 URL 배열
    commentCount: number
    favoriteCount: number
    imageBlobUrls?: string[] // Blob으로 변환한 이미지 URL 배열
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

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const { auth } = useAuth()
    const router = useRouter()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // 게시글 데이터 가져오기
                const response = await fetch('/api/post', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.token}`,
                    },
                })

                if (!response.ok) {
                    throw new Error("게시글 데이터를 가져오는 데 실패했습니다.")
                }

                const result: PostsResponse = await response.json()

                // 이미지 요청 로직
                const postsWithImages = await Promise.all(
                    result.data.posts.map(async (post) => {
                        if (!post.postImageUrls || post.postImageUrls.length === 0) {
                            return post // 이미지 URL이 없는 경우 원본 반환
                        }

                        try {
                            const imageBlobUrls = await Promise.all(
                                post.postImageUrls.map(async (url) => {
                                    const imageName = url.split('/').pop()
                                    const imageResponse = await fetch(
                                        `/api/post/check/${post.postId}/image/${imageName}`,
                                        {
                                            method: 'GET',
                                            headers: {
                                                Authorization: `Bearer ${auth.token}`,
                                            },
                                        }
                                    )

                                    if (!imageResponse.ok) {
                                        throw new Error(`이미지를 가져오는 데 실패했습니다: ${imageResponse.statusText}`)
                                    }

                                    const blob = await imageResponse.blob()
                                    return URL.createObjectURL(blob)
                                })
                            )

                            return {
                                ...post,
                                imageBlobUrls,
                            }
                        } catch (err) {
                            console.error(err)
                            return {
                                ...post,
                                imageBlobUrls: [], // 실패 시 빈 배열 처리
                            }
                        }
                    })
                )

                setPosts(postsWithImages)
            } catch (err) {
                console.error(err)
            }
        }

        fetchPosts()
    }, [auth.token])

    const handleCreatePostClick = () => {
        if (!auth.isLoggedIn) {
            alert("로그인이 필요합니다.")
        } else {
            router.push("/community/createpost")
        }
    }

    return (
        <div className="min-h-screen bg-background">
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
                                {post.imageBlobUrls && post.imageBlobUrls.length > 0 && (
                                    <div className="relative h-64">
                                        <Image
                                            src={post.imageBlobUrls[0]} // 첫 번째 이미지만 표시
                                            alt={post.postTitle}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
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
