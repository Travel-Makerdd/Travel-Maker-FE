"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type DestinationDetail = {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  destinationLocation: string;
  destinationImageUrl: string[];
  imageBlobUrl?: string;
};

export default function DestinationDetailPage() {
  const { destinationId } = useParams();
  const { auth } = useAuth();

  const [destination, setDestination] = useState<DestinationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!destinationId || !auth.token) return;

    const fetchDestinationDetail = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/destination/check/${destinationId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();

        const imageName = data.data.destinationImageUrl[0]?.split("/").pop();
        if (!imageName) {
          throw new Error("이미지 URL이 잘못되었습니다.");
        }

        const imageResponse = await fetch(
          `/api/destination/check/${data.data.destinationId}/image/${imageName}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        if (!imageResponse.ok) {
          throw new Error("이미지를 가져오는 데 실패했습니다.");
        }

        const blob = await imageResponse.blob();
        const blobUrl = URL.createObjectURL(blob);

        setDestination({
          ...data.data,
          imageBlobUrl: blobUrl,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationDetail();
  }, [destinationId, auth.token]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600 text-center">에러 발생: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {destination && (
        <Card className="w-full max-w-4xl mx-auto overflow-hidden">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-bold mb-2">{destination.destinationName}</CardTitle>
              <Badge className="px-3 py-1 text-sm">{destination.destinationLocation}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {destination.imageBlobUrl ? (
              <div className="w-full h-96 mb-6 overflow-hidden rounded-lg">
                <img
                  src={destination.imageBlobUrl}
                  alt={destination.destinationName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-96 mb-6 bg-gray-200 flex items-center justify-center rounded-lg">
                <p className="text-gray-500">이미지를 로드할 수 없습니다.</p>
              </div>
            )}
            <p className="text-lg mb-4 leading-relaxed">{destination.destinationDescription}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

