import { useInfiniteQuery } from "@tanstack/react-query";
import { FolloweesList, FollowersList } from "@/types/global";

const getFollowList = async (userId: number, followState: string, pageParam: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}/${followState}?cursor=${pageParam}`);

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  return res.json();
};

export function useFollowers(userId: number) {
  return useInfiniteQuery({
    queryKey: ["followers", userId],
    queryFn: async ({ pageParam }) => getFollowList(userId, "followers", pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (data): FolloweesList[] => data.pages.flatMap((page) => page.list).flat(),
  });
}

export function useFollowees(userId: number) {
  return useInfiniteQuery({
    queryKey: ["followees", userId],
    queryFn: async ({ pageParam }) => getFollowList(userId, "followees", pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (data): FollowersList[] => data.pages.flatMap((page) => page.list).flat(),
  });
}
