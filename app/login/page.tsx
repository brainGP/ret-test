"use client";
import React, { useState, FormEvent } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data || "Something went wrong.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[90%] max-w-md p-6 sm:p-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          <CardDescription className="text-sm text-center text-gray-500">
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              className="p-3"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              className="p-3"
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <Separator />
          <div className="flex justify-evenly mt-4">
            <Button
              variant="outline"
              size="lg"
              className="bg-gray-100 hover:bg-gray-200"
              onClick={() =>
                alert("Login with Google isn\u0027t yet implemented.")
              }
            >
              <FcGoogle className="mr-2" /> Google
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-gray-100 hover:bg-gray-200"
              onClick={() =>
                alert("Login with GitHub isn\u0027t yet implemented.")
              }
            >
              <FaGithub className="mr-2" /> GitHub
            </Button>
          </div>
          <div className="text-center text-sm mt-4 text-gray-600">
            <a>{"Don't have an account?"}</a>

            <Link href="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
