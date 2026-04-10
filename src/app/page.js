"use client";

import { useQuery } from "@tanstack/react-query";
import { getTestData } from "../services/testApi";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["test"],
    queryFn: getTestData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error connecting backend</p>;

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-600">
        {data.message}
      </h1>
    </div>
  );
}