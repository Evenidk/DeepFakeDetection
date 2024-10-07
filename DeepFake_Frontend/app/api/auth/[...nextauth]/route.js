import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    // Google Provider Configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Credentials Provider Configuration (Email/Username + Password)
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("No user found with the provided email.");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw new Error("Incorrect password.");
          }

          return user; // If user and password are valid
        } catch (error) {
          console.log("Error: ", error);
          throw new Error("Login failed.");
        }
      },
    }),
  ],

  // Session strategy (using JWT tokens)
  session: {
    strategy: "jwt",
  },

  // Sign-in page configuration
  pages: {
    signIn: "/", // Redirect users to home page for login
  },

  // Callbacks
  callbacks: {
    async signIn({ user, account }) {
      // Handle Google sign-in logic
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            // Create a new user in the database if one doesn't exist
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });

            if (res.ok) {
              return true;
            }
          }
        } catch (error) {
          console.log("Google sign-in error: ", error);
          return false; // Prevent login in case of an error
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // Include user data in the JWT token
      if (user) {
        token.id = user._id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      // Attach the user data from JWT token to the session
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },

  // Secret key
  secret: process.env.NEXTAUTH_SECRET,
};

// Export NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
