'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Pencil, Star, X, Check } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface PostDetailResponse {
    status: number;
    data: {
        postId: number;
        postTitle: string;
        postContent: string;
        userId: number;
        postImageUrls: string[];
        imageBlobUrls?: string[];
        isFavorite: boolean;
        favorite?: boolean;
    };
    message: string;
}

interface Comment {
    commentId: number;
    userId: number;
    postId: number;
    userNickname: string;
    commentContent: string;
    createdAt: string;
}

const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date);
};

const getAvatarFallback = (nickname: string): string => {
    return nickname.slice(0, 2);
};

export default function PostDetailPage() {
    const { postId } = useParams();
    const { auth } = useAuth();
    const [post, setPost] = useState<PostDetailResponse['data'] | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [commentInput, setCommentInput] = useState('');
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [editedImage, setEditedImage] = useState<File | null>(null);

    useEffect(() => {
        if (!postId || !auth.token) return;
    
        const fetchPostDetail = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/post/check/${postId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`게시글 데이터를 가져오는 데 실패했습니다: ${response.status}`);
                }
    
                const result: PostDetailResponse = await response.json();
                const data = result.data;
                console.log("API 응답 데이터:", result.data);
                const imageUrls: string[] = data.postImageUrls ?? [];
    
                const imageBlobUrls = await Promise.all(
                    imageUrls.map((url: string) => {
                        const imageName = url.split('/').pop();
                        return imageName ? fetchPostImage(data.postId, imageName, auth.token) : null;
                    })
                );
    
                const safeImageBlobUrls = imageBlobUrls.filter((url): url is string => url !== null);
    
                // 즐겨찾기 상태 동적으로 설정
                setPost({
                    ...data,
                    isFavorite: result.data.favorite ?? false, // 서버에서 받은 favorite 값 설정
                    imageBlobUrls: safeImageBlobUrls,
                });
            } catch (err) {
                console.error("Error during fetch:", err);
                setError(err instanceof Error ? err.message : "알 수 없는 에러 발생");
            } finally {
                setLoading(false);
            }
        };
    
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/post/${postId}/getComment`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
    
                if (!response.ok) {
                    if (response.status === 404) {
                        setComments([]);
                        return;
                    }
                    throw new Error(`댓글 데이터를 가져오는 데 실패했습니다: ${response.status}`);
                }
    
                const result = await response.json();
                const data: Comment[] = result.data || [];
                setComments(data);
            } catch (err) {
                console.error("Error during fetch comments:", err);
                setComments([]);
            }
        };
    
        fetchPostDetail();
        fetchComments();
    }, [postId, auth.token, triggerFetch]);
    
    const fetchPostImage = async (postId: number, imageName: string, token: string): Promise<string | null> => {
        try {
            const imageResponse = await fetch(`/api/post/check/${postId}/image/${imageName}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!imageResponse.ok) {
                throw new Error(`이미지를 가져오는 데 실패했습니다: ${imageResponse.statusText}`);
            }

            const blob = await imageResponse.blob();
            return URL.createObjectURL(blob);
        } catch (err) {
            console.error("Error fetching image:", err);
            return null;
        }
    };

    const toggleFavorite = async () => {
        if (!post) return;
    
        const updatedIsFavorite = !post.isFavorite; // 상태 반전
    
        try {
            const endpoint = updatedIsFavorite
                ? `/api/post/${postId}/favorite`
                : `/api/post/${postId}/unfavorite`;
    
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },  
            });
    
            if (!response.ok) {
                throw new Error(`즐겨찾기 처리에 실패했습니다: ${response.status}`);
            }
    
            // 상태 업데이트
            setPost((prev) => prev ? { ...prev, isFavorite: updatedIsFavorite } : null);
        } catch (err) {
            console.error("Error toggling favorite:", err);
        }
    };

    const handleAddComment = async () => {
        if (!commentInput.trim()) return;

        try {
            const response = await fetch(`/api/post/${postId}/addComment`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify({ commentContent: commentInput }),
            });

            if (!response.ok) {
                throw new Error(`댓글 추가에 실패했습니다: ${response.status}`);
            }

            setCommentInput('');
            setTriggerFetch((prev) => !prev);
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    const handleEdit = () => {
        if (post) {
            setEditedTitle(post.postTitle);
            setEditedContent(post.postContent);
            setIsEditing(true);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedImage(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setEditedImage(e.target.files[0]);
        }
    };

    const handleSaveEdit = async () => {
        if (!post || !postId) return;
    
        const formData = new FormData();
        formData.append('postTitle', editedTitle);
        formData.append('postContent', editedContent);
    
        // 새 이미지 업로드
        if (editedImage) {
            formData.append('postImages', editedImage);
        }
    
        try {
            const response = await fetch(`/api/post/update/${postId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${auth.token}`, // FormData에선 Content-Type 자동 설정
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`게시글 수정에 실패했습니다: ${response.status}`);
            }
    
            const updatedPost = await response.json();
    
            // 서버에서 반환한 데이터로 상태를 갱신
            setPost(updatedPost.data);
            setIsEditing(false);
            setTriggerFetch((prev) => !prev); // 필요 시 댓글 목록 재로드
        } catch (err) {
            console.error("Error updating post:", err);
        }
    };
    

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {error}</div>;
    if (!post) return <div>게시글 데이터를 불러올 수 없습니다.</div>;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            <Card className="max-w-3xl mx-auto relative">
                <div className="absolute top-4 right-4 flex space-x-2">
                    {isEditing ? (
                        <>
                            <Button variant="outline" size="icon" onClick={handleSaveEdit}>
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={handleCancelEdit}>
                                <X className="h-4 w-4" />
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline" size="icon" onClick={handleEdit}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                    )}
                    <Button variant="outline" size="icon" onClick={toggleFavorite}>
                        <Star
                            className={`h-4 w-4 ${
                                post.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                            }`}
                        />
                    </Button>
                </div>

                <CardContent className="p-6">
                    {isEditing ? (
                        <>
                            <Input
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className="text-2xl font-bold mb-4"
                            />
                            <Textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className="mb-4"
                                rows={5}
                            />
                            <Input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="mb-4"
                            />
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold mb-4">{post.postTitle}</h1>
                            <p className="text-gray-700 mb-4">{post.postContent}</p>
                        </>
                    )}
                    <div className="relative w-full h-64 mb-6 bg-gray-200 rounded-lg overflow-hidden">
                        {post.imageBlobUrls && post.imageBlobUrls.length > 0 && (
                            <Image
                                src={post.imageBlobUrls[0]}
                                alt={post.postTitle}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        )}
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-6">댓글</h2>
                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div key={comment.commentId} className="flex items-start gap-3">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback>
                                            {getAvatarFallback(comment.userNickname)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold">{comment.userNickname}</span>
                                            <span className="text-sm text-gray-500">
                                                {formatDate(comment.createdAt)}
                                            </span>
                                        </div>
                                        <p className="text-gray-700">{comment.commentContent}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex items-start gap-3">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>
                                    {getAvatarFallback(auth.nickname || '익명')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 flex gap-2">
                                <Input
                                    placeholder="댓글을 입력하세요..."
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    className="flex-1"
                                />
                                <Button size="icon" className="shrink-0" onClick={handleAddComment}>
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

