import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logIn } from '@/lib/api';
import { useAuth } from '@/context/authcontext';
import { toast } from 'react-toastify';

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);

    try {
        const response = await logIn({ email, password });
        login(response.data.data, response.data.token);
        router.push('/');
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Login failed");
    } finally {
        setIsLoading(false);
    }
  };

  const handleOAuthLogin = () => {
    setIsLoading(true);

    const loggedInUser = {
        id: Date.now(),
        name: "OAuth User",
        username: "oauthuser",
        joinDate: new Date().toISOString()
    };
    localStorage.setItem('user', JSON.stringify(loggedInUser));

    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-2 text-xl font-semibold mb-6">
                <svg
                    className="h-8 w-8 text-orange-500"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M84.4 93.8V119h23.7V77H84.4v16.8zm-15.5-31.5l14-20 20.3 14.1-14 20-20.3-14.1zm-18.4-19l6.3-23.7 23 6-6.3 23.7-23-6zm32-41l-24 5.2 5 23.1 24-5.2-5-23.1zm-32.5 73.5l24.4-4.8-4.8-24.4-24.4 4.8 4.8 24.4z"
                        fill="currentColor"
                    />
                </svg>
                <span>stackoverflow</span>
            </div>
            
            <Card className="w-full shadow-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-semibold tracking-tight">Log in to your account</CardTitle>
                    <CardDescription className="text-sm">Enter your email and password to access Stack Overflow</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 gap-4">
                        <Button onClick={handleOAuthLogin} disabled={isLoading} variant="outline" className="w-full flex items-center justify-center space-x-2 bg-transparent text-sm">
                        <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                            <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                            <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                            <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21538 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                        </svg>
                        <span>Log in with Google</span>
                        </Button>
                        <Button onClick={handleOAuthLogin} disabled={isLoading} variant="outline" className="w-full flex items-center justify-center space-x-2 bg-transparent text-sm">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            <span>Log in with GitHub</span>
                        </Button>
                    </div>
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <form onSubmit={handleLogin} className="grid gap-4">
                        <div className="grid gap-2 text-left">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="grid gap-2 text-left">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">
                            {isLoading ? "Logging in..." : "Log in"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pt-0 text-center text-sm mt-4">
                    <Link href="#" className="text-blue-600 hover:text-blue-500">
                        Forgot your password?
                    </Link>
                    <div className="text-gray-600">
                        Don't have an account? <Link href="/signup" className="text-blue-600 hover:text-blue-500 ml-1">Sign up</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
