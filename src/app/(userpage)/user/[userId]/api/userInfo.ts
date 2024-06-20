// export const followPostDelete = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/follow`, {
//     method: isfollow ? "DELETE" : "POST",
//     headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
//     body: JSON.stringify({ userId: Number(userId) }),
//   });

//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData.message || "Something went wrong");
//   }

//   const data = await res.json();
//   console.log("API response data:", data); // 응답 데이터 로그 출력
//   return data;
// };

// import { useMutation } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import HttpClient from "@/utils/httpClient";

// export const useFollowMutation = () => {
//   const session = useSession();
//   const httpClient = new HttpClient(process.env.NEXT_PUBLIC_BASE_URL || "");
//   const accessToken = session.data?.accessToken;

//   return useMutation({
//     mutationFn: async (image: Blob) => {
//       const formData = new FormData();
//       formData.append("image", image);
//       const response = await httpClient.post<{ url: string }, FormData>("images/upload", {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         body: formData,
//       });
//       return response.url;
//     },
//   });
// };
