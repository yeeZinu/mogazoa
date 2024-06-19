import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useSessionCheck = (initialSession: Session | null, onSessionChange: (session: Session | null) => void) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && initialSession !== session) {
      onSessionChange(session);
    }
  }, [session, initialSession, status, onSessionChange]);
};
