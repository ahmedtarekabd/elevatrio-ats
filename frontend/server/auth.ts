import axio from '@/lib/axios'
import { LoginSchema } from '@/schema/authentication'
import {
  type NextAuthOptions,
  type DefaultSession,
  getServerSession,
  User,
} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string
    user: {
      id: string
      email: string
      name: string
      role: string
    } & DefaultSession['user']
  }
  interface User {
    user: {
      id: string
      email: string
      name: string
      role: string
    }
    accessToken: string
  }
  interface JWT {
    user: {
      id: string
      email: string
      name: string
      role: string
    } & DefaultSession['user']
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const validCredentials = LoginSchema.safeParse(credentials)

        if (!validCredentials.success) {
          throw new Error('Invalid credentials ' + validCredentials.error)
        }
        const { email, password } = validCredentials.data

        // Receive access_token & user from your database
        const res = await axio.post(
          '/auth/login',
          {
            email: email,
            password: password,
          },
          {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
          },
        )

        if (res.status !== 200) {
          throw new Error('Invalid credentials')
        }

        return {
          accessToken: res.data.access_token,
          user: res.data.user,
          id: res.data.user.id,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      const user = token.user as User['user']
      const access_token = token.accessToken

      return {
        ...session,
        accessToken: access_token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      }
    },
    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl) ? url : baseUrl
    // },
  },
  // secret: process.env.NEXTAUTH_SECRET!,
  // debug: process.env.NODE_ENV === 'development',
}

export const getServerAuthSession = () => getServerSession(authOptions)
