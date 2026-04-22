export const questions = [
  {
    id: 1,
    votes: -4,
    answers: 0,
    title: "How can I block user with middleware?",
    content: `I am trying to create a complete user login form in NextJS and I want to block the user to go to other pages without a login process before. So online i found that one of the most complete solution could be the use of a middleware but i don't know how it doesn't work.

**Middleware code:**

\`\`\`javascript
// middleware.ts (position: root)
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    console.log("[middleware] No token on", pathname, "-> redirect to /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    console.log("[middleware] Invalid token on", pathname, "->", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/settings",
  ]
}
\`\`\`

What I'm expecting is that when the user tries to access protected routes without being authenticated, they should be redirected to the login page. However, the middleware doesn't seem to be working as expected.`,
    tags: ["node.js", "forms", "authentication", "next.js", "middleware"],
    author: "Aledi5",
    authorInitial: "A",
    authorColor: "#e1ecf4",
    reputation: "",
    timeAgo: "asked 3 days ago",
    isBookmarked: false,
    hasAccepted: false,
    answersList: [
      {
        id: 1,
        content: `The issue you're experiencing is likely due to the middleware configuration and how NextJS handles redirects. Here are a few things to check:

**1. Middleware File Location**
Make sure your \`middleware.ts\` file is in the correct location - it should be in the root of your project (same level as \`pages\` or \`app\` directory).

**2. Import Statements**
You're missing some important imports in your middleware:

\`\`\`javascript
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
\`\`\`

**3. Updated Middleware Code**

\`\`\`javascript
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    console.log("[middleware] No token found, redirecting to login");
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(token, secret);
    console.log("[middleware] Token verified for user:", payload.sub);
    return NextResponse.next();
  } catch (error) {
    console.log("[middleware] Token verification failed:", error);
    // Clear the invalid token
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('authToken');
    return response;
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/settings/:path*'
  ]
}
\`\`\`

**Key Changes:**
- Added proper imports
- Redirect to \`/login\` instead of \`/\`
- Clear invalid tokens from cookies
- Simplified matcher patterns
- Better error handling

This should resolve your middleware issues.`,
        author: "John Doe",
        authorInitial: "JD",
        timeAgo: "answerd 2 days ago"
      },
      {
        id: 2,
        content: `Another approach you might consider is using NextAuth.js which handles authentication middleware automatically:

**Installation**
\`\`\`bash
npm install next-auth
\`\`\`

**Configuration**
Create \`pages/api/auth/[...nextauth].js\`:

\`\`\`javascript
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // ... your auth logic
    })
  ]
})
\`\`\`

**Middleware with NextAuth**
\`\`\`javascript
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*']
}
\`\`\`

This approach is more robust and handles many edge cases automatically.`,
        author: "Felix Rodriguez",
        authorInitial: "FR",
        timeAgo: "answerd 1 day ago"
      }
    ]
  },
  {
    id: 2,
    votes: 0,
    answers: 1,
    hasAccepted: true,
    title: "Template specialization inside a template class using class template parameters",
    content: `template<typename TypA, typename TypX> struct MyClass {  using TypAlias = TypA<TypX>; // error: 'TypA' is not a template [-Wtemplate-body]  }; MyClass is very often specialized like ...\n\nHow do I fix this issue inside my template structure where TypAlias expects a complete type but receives a template type?`,
    tags: ["c++", "templates"],
    author: "Felix.leg",
    authorInitial: "F",
    authorColor: "#f48024",
    reputation: "799",
    timeAgo: "asked 11 mins ago",
    isBookmarked: false,
    answersList: [
      {
        id: 1,
        content: `You should pass the template template parameter properly using the \`template<...>\` syntax inside your class definition.
        
\`\`\`cpp
template<template<typename> class TypA, typename TypX> 
struct MyClass {  
  using TypAlias = TypA<TypX>; 
};
\`\`\`
This lets the compiler know that \`TypA\` is a template that expects a type parameter.`,
        author: "cpp_guru",
        authorInitial: "C",
        timeAgo: "answerd 5 mins ago"
      }
    ]
  },
  {
    id: 3,
    votes: 0,
    answers: 0,
    hasAccepted: false,
    title: "Mouse Cursor in 16-bit Assembly (NASM) Overwrites Screen Content in VGA Mode 0x12",
    content: "I'm developing a PS/2 mouse driver in 16-bit assembly (NASM) for a custom operating system running in VGA mode 0x12 (640x480, 16 colors). The driver initializes the mouse, handles mouse events, and I am noticing that my cursor permanently overwrites screen pixels whenever it moves.\n\nCode snippet:\n```nasm\nmov ax, 0\nint 0x33\n```\nWhat's the right way to backup pixel data?",
    tags: ["assembly", "operating-system", "driver", "osdev"],
    author: "PR0X",
    authorInitial: "P",
    authorColor: "#0074cc",
    reputation: "1k",
    timeAgo: "asked 2 mins ago",
    isBookmarked: false,
    answersList: [
      {
        id: 1,
        content: `In VGA mode 0x12, you don't actually overwrite memory if you use XOR drawing for the cursor.
        
Instead of directly replacing pixels, XOR the cursor bitmap with the screen memory. When the cursor moves, XOR it again at the same location to restore the original background perfectly before drawing it at the new location!`,
        author: "RetroDev",
        authorInitial: "R",
        timeAgo: "answerd 1 min ago"
      }
    ]
  },
  {
    id: 4,
    votes: 0,
    answers: 0,
    hasAccepted: false,
    title: "call:fail action: private-web3-wallet-v2-o pen-wallet-connect, error: Pairing error: Subscribe error: Timed out waiting for 60000 ms /what it means",
    content: "Can't connect my web3 wallet with a dApp. A message pops: Accounts must be CAIP-10 compliant The error message reads: call:fail action: private-web3-wallet-v2-o pen-wallet-connect, error: Pairing error. And it happens every time I attempt payload signing.",
    tags: ["web3", "wallet", "blockchain"],
    author: "CryptoUser",
    authorInitial: "C",
    authorColor: "#888",
    reputation: "15",
    timeAgo: "asked 25 mins ago",
    isBookmarked: false,
    answersList: [
      {
        id: 1,
        content: `CAIP-10 refers to the Chain Agnostic Improvement Proposal. Most likely your WalletConnect configuration isn't formatting account strings properly. 
        
Ensure your account strings follow this format: \`eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb\`. You're likely just passing the raw hex address instead of prefixing it with the namespace and chain reference.`,
        author: "Web3Master",
        authorInitial: "W",
        timeAgo: "answerd 12 mins ago"
      }
    ]
  }
];

export const answersData = [
  {
    id: 1,
    votes: 0,
    isAccepted: false,
    content: "If you want to protect your routes using middleware in Next.js...",
    author: {
      name: "JohnDoe",
      initial: "J",
      color: "#0a95ff"
    }
  }
];
