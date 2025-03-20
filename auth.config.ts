import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        return isLoggedIn; // Redirect unauthenticated users
      }

      if (isLoggedIn) {
        return nextUrl.origin + '/dashboard'; // Redirect logged-in users
      }

      return true; // Allow access
    },
  },
  providers: [], // Add authentication providers here (e.g., Google, GitHub)
} satisfies NextAuthConfig;
