export declare module "next-auth" {
  interface User {
    accessToken: string;
    redirect?: string;
  }
  interface Session {
    accessToken: string;
  }
}
export declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string;
  }
}
