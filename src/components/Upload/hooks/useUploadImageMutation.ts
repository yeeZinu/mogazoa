import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import HttpClient from "@/utils/httpClient";

const useUploadImageMutation = () => {
  const { data: session } = useSession();
  const httpClient = new HttpClient(process.env.NEXT_PUBLIC_BASE_URL || "");
  const accessToken = session?.accessToken;

  return useMutation({
    mutationFn: async (image: Blob) => {
      const formData = new FormData();
      formData.append("image", image);
      const response = await httpClient.post<{ url: string }>(
        "/images/upload",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
        formData,
      );
      return response.url;
    },
  });
};

export default useUploadImageMutation;
