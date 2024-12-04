"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

type Destination = {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  destinationLocation: string;
  destinationImageUrl: string[];
  imageBlobUrl?: string;
};

export default function TravelDestinationSearch() {
  const { auth } = useAuth();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const route = useRouter();
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/destination/checkAll", {
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
        const destinationsWithImages: Destination[] = data.data;

        const updatedDestinations = await Promise.all(
          destinationsWithImages.map(async (destination) => {
            const imageName = destination.destinationImageUrl[0].split("/").pop();
            const imageResponse = await fetch(
              `/api/destination/check/${destination.destinationId}/image/${imageName}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${auth.token}`,
                },
              }
            );

            if (!imageResponse.ok) {
              throw new Error(
                `이미지를 가져오는 데 실패했습니다: ${imageResponse.statusText}`
              );
            }

            const blob = await imageResponse.blob();
            const blobUrl = URL.createObjectURL(blob);

            return {
              ...destination,
              imageBlobUrl: blobUrl,
            };
          })
        );

        setDestinations(updatedDestinations);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [auth.token]);

  if (loading) {
    return <p className="text-center py-8">로딩 중...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">에러 발생: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">여행지 탐색</h1>
        <div className="flex gap-2">
          <Input
            placeholder="어디로 여행을 떠나고 싶으신가요?"
            type="search"
            className="flex-grow"
          />
          <Button>검색</Button>
        </div>
      </header>

      <Tabs className="mb-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="mountin" className="flex-1">산</TabsTrigger>
          <TabsTrigger value="beach" className="flex-1">바다</TabsTrigger>
        </TabsList>
      </Tabs>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Card
            key={destination.destinationId}
            className="flex flex-col h-full"
          >
            {destination.imageBlobUrl && (
              <div className="w-full h-48 overflow-hidden rounded-t-lg">
                <img
                  src={destination.imageBlobUrl}
                  alt={destination.destinationName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader className="flex-grow">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl font-bold">
                  {destination.destinationName}
                </CardTitle>
                <Badge className="px-2 py-1 text-xs whitespace-nowrap">
                  {destination.destinationLocation}
                </Badge>
              </div>
              <CardContent className="text-sm text-gray-600 mt-2">
                {destination.destinationDescription}
              </CardContent>
            </CardHeader>
            <CardFooter>
              <Button
                className="w-full" onClick={() =>
                  route.push(`/destinations/${destination.destinationId}`)}> 자세히 보기 </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}

