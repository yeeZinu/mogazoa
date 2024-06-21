import { useMutation } from "@tanstack/react-query";
import { UpdateProfileRequest } from "@/types/global";

export const useUpdateProfile = (token: string) => {
  const updateProfileMutation = useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(JSON.stringify(error));
      }

      return res.json();
    },
  });

  return { updateProfileMutation };
};
