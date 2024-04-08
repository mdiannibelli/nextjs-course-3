import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters";
/* Login w/ Github */
import GithubProvider from "next-auth/providers/github"
/* Login w/ Google */
import Google from "next-auth/providers/google";
/* Login  */
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/auth-actions";

export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter( prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    Google({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email", placeholder: "usuario@email.com"},
        password: {label: "Contraseña", type: "text"},
      },
      async authorize(credentials, req) {
        const user = await signInEmailPassword(credentials!.email, credentials!.password)
        if(user) {
          return user
        } else {
          return null;
        }
      }
    })
  ],

  //Estableciendo estrategia de sesion manejada por jason web tocken
  session: {
    strategy: 'jwt'
  },

  // Funciones post autentificación
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      //console.log({user})
      //! Al retornar falso arrojo un error al iniciar sesion, evito el log-in
      //! Esto nos servirá para bloquear usuarios en caso que queramos
      /* if(user.id === 'clun2v1770000h8jh3953wo8q') {
        return false;
      } */
      return true;
    },
    async jwt({token, user, account, profile}) {
      //? console.log({token})
      // Buscamos de la tabla usuario el usuario que coincida con el token email
      const dbUser = await prisma.user.findUnique({where: {email: token.email!}})

      // Si el usuario no esta activo => otra forma de banear el usuario pero desde la base de datos
      if(!dbUser?.isActive) {
        throw Error('Usuario no activo');
      }

      // Agregar datos al token como el roles
      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-id';

      return token;
    },
    async session({session, token, user}) {
      // Sesión modificada
      //? Si la sesión tiene un usuario
      if(session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      return session;
    }
    
  }
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};