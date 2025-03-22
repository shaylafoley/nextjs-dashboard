import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true; // Redirect unauthenticated users
        return false;
      }

      else if (isLoggedIn) {
        return Response.redirect(new URL('dashboard', nextUrl)); // Redirect logged-in users
      }

      return true; // Allow access
    },
  },
  providers: [], // Add authentication providers here (e.g., Google, GitHub)
} satisfies NextAuthConfig;
