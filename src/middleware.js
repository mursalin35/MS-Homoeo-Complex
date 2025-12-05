import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
      "/dashboard/:path*", 
      "/add-product", 
      "/manage-products",
      "/profile" // Add other protected routes here
  ],
};
