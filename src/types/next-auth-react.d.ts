declare module 'next-auth/react' {
  export function signIn(provider?: string, options?: any, authorizationParams?: any): Promise<any>;
  export function signOut(options?: any): Promise<any>;
  export function useSession(options?: any): any;
  export function getSession(options?: any): Promise<any>;
  export function getProviders(): Promise<any>;
  export function getCsrfToken(context?: any): Promise<string>;
  export const SessionProvider: any;
}

declare module 'next-auth' {
  export default function NextAuth(options: any): any;
  export const getServerSession: any;
}

declare module 'next-auth/providers/credentials' {
  export default function Credentials(options: any): any;
}

