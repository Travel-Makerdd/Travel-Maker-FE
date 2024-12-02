'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';

interface Comment {
    id: number;
    user: string;
    content: string;
    createdAt: string;
}

interface Post {
    postId: number;
    postTitle: string;
    postContent: string;
    postImageUrl: string;
    comments: Comment[];
}

const MOCK_POST: Post = {
    postId: 1,
    postTitle: "제주도에서의 아름다운 일출",
    postContent: "제주도 성산일출봉에서 맞이한 감동적인 일출 장면입니다. 이른 아침부터 일어나 힘들게 올라갔지만, 그 경치는 정말 끝내줬어요!",
    postImageUrl: "/placeholder.svg",
    comments: [
        { id: 1, user: "남궁민", content: "정말 멋지네요!", createdAt: "10분 전" },
        { id: 2, user: "박지현", content: "여기 꼭 가봐야겠어요!", createdAt: "20분 전" },
    ],
};

export default function PostDetailPage({ params }: { params: Promise<{ postId: string }> }) {
    const { postId } = use(params); // Promise로부터 postId 언래핑
    const [post, setPost] = useState<Post | null>(null);
    const [newComment, setNewComment] = useState<string>(''); // 댓글 입력값
    /*
    // 댓글 추가 핸들러
    const handleAddComment = async () => {
        if (!newComment.trim()) return alert("댓글을 입력하세요!");

        try {
            // 서버로 POST 요청 보내기
            const response = await fetch(`/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: newComment,
                    user: '현재 사용자', // 여기에 현재 로그인된 사용자 이름을 추가하세요
                }),
            });

            if (!response.ok) {
                throw new Error('댓글 추가 실패');
            }

            const addedComment: Comment = await response.json();

            // 상태를 업데이트하여 새 댓글 추가
            setPost((prevPost) => {
                if (!prevPost) return null;
                return {
                    ...prevPost,
                    comments: [...prevPost.comments, addedComment],
                };
            });

            setNewComment(''); // 입력창 초기화
        } catch (error) {
            console.error(error);
            alert("댓글 추가 중 오류가 발생했습니다.");
        }
    };
    */

    useEffect(() => {
        if (postId) {
            setPost(MOCK_POST); // Mock 데이터 로드
        }
    }, [postId]);

    if (!post) return <div>로딩 중...</div>;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">{post.postTitle}</h1>
                    <div className="relative w-full h-64 bg-gray-200 mb-4">
                        <Image src={post.postImageUrl} alt={post.postTitle} fill className="object-cover" />
                    </div>
                    <p className="text-gray-700">{post.postContent}</p>
                </div>

                {/* 댓글 섹션 */}
                <div className="border-t px-6 py-4">
                    <h2 className="text-lg font-bold mb-4">댓글</h2>
                    <div className="space-y-4">
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                                <div>
                                    <div className="text-sm font-bold">{comment.user}</div>
                                    <div className="text-sm text-gray-500">{comment.createdAt}</div>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 댓글 입력 섹션 */}
                <div className="border-t px-6 py-4 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 border rounded-lg text-sm"
                        placeholder="댓글을 입력하세요..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        /*onClick={handleAddComment}*/
                    >
                        등록
                    </button>
                </div>
            </div>
        </div>
    );
}
