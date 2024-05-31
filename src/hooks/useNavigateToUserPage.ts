import { useRouter } from "next/router";

const useNavigateToUserPage = (currentUserId: string) => {
  const router = useRouter();

  const navigateToUserPage = (userId: string) => {
    if (userId === currentUserId) {
      router.push("/userpage/mypage");
    } else {
      router.push(`/userpage/otherpage?userId=${userId}`);
    }
  };

  return navigateToUserPage;
};

export default useNavigateToUserPage;
