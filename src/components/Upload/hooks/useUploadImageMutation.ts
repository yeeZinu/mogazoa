import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import HttpClient from "@/utils/httpClient";

const useUploadImageMutation = () => {
  const session = useSession();
  const httpClient = new HttpClient(process.env.NEXT_PUBLIC_BASE_URL || "");
  const accessToken = session.data?.accessToken;

  return useMutation({
    mutationFn: async (image: Blob) => {
      const formData = new FormData();
      formData.append("image", image);
      const response = await httpClient.post<{ url: string }, FormData>("images/upload", {
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });
      return response.url;
    },
  });
};

export default useUploadImageMutation;
