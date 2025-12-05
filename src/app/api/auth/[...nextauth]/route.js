import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        console.log("Google Sign In Attempt:", { email: user.email, name: user.name });
        try {
          await dbConnect();
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            console.log("Creating new user from Google...");
            const newUser = new User({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: "google",
            });
            await newUser.save();
            console.log("New user created successfully.");
          } else {
             console.log("User already exists.");
          }
          return true;
        } catch (err) {
          console.error("Error in Google Sign In:", err);
          return false;
        }
      }
      return true; // Credentials provider
    },
    async jwt({ token, user }) {
        // Persist the user id to the token right after signin
        if (user) {
            token.id = user._id ? user._id.toString() : user.id;
            token.isAdmin = user.isAdmin;
        }
        return token;
    },
    async session({ session, token }) {
        // Send properties to the client, like an access_token and user id from a provider.
        if (token) {
            session.user.id = token.id;
            session.user.isAdmin = token.isAdmin;
        }
        return session;
    },
  },
  session: {
      strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
