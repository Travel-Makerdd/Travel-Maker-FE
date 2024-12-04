'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface FavoritePost {
  postfavoriteId: number;
  postId: number;
  postTitle: string;
  postContent: string;
}

export default function FavoritePostsPage() {
  const { auth } = useAuth();
  const [favoritePosts, setFavoritePosts] = useState<FavoritePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoritePosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/post/getFavorite', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`
          }
        });

        if (!response.ok) {
          throw new Error('즐겨찾기 게시글을 불러오는데 실패했습니다.');
        }

        const result = await response.json();
        setFavoritePosts(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (auth.token) {
      fetchFavoritePosts();
    }
  }, [auth.token]);

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">즐겨찾기한 게시글</h1>
      {favoritePosts.length === 0 ? (
        <p className="text-center py-10">즐겨찾기한 게시글이 없습니다.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favoritePosts.map((post) => (
            <Card key={post.postfavoriteId}>
              <CardHeader>
                <CardTitle>{post.postTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  {post.postContent.length > 100
                    ? `${post.postContent.slice(0, 100)}...`
                    : post.postContent}
                </p>
                {/* 수정된 라우트 */}
                <Link href={`/community/${post.postId}`} passHref>
                  <Button variant="outline">자세히 보기</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
