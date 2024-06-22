export declare module "next-auth" {
  interface User {
    accessToken: string;
    id: number;
    redirect?: string;
  }
  interface Session {
    accessToken: string;
    user: { id: number };
  }
}
export declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string;

    user: { id: number };
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export declare global {
  interface Window {
    Kakao: any;
  }
}
