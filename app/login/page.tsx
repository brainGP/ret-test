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
import { toast } from "sonner";
import { saveUserData } from "@/lib/authHelper";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password }
      );
      toast.success("Login successful");
      saveUserData(response.data);

      if (response.data.isAdmin) {
        router.push("/admin");
        router.refresh();
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      let message = "An unexpected error occurred. Please try again.";
      if (err instanceof AxiosError && err.response) {
        message = err.response.data || "Invalid email or password.";
      }

      toast.error(message);
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
              className="p-3"
              aria-label="Email"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="p-3"
              aria-label="Password"
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              aria-label="Login"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <Separator />
          <div className="flex justify-evenly mt-4">
            <Button
              variant="outline"
              size="lg"
              className="bg-neutral-400 hover:bg-gray/20"
              disabled
              aria-disabled="true"
            >
              <FcGoogle className="mr-2" /> Google
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-gray/10 hover:bg-gray/20"
              disabled
              aria-disabled="true"
            >
              <FaGithub className="mr-2" /> GitHub
            </Button>
          </div>
          <div className="text-center text-sm mt-4 text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-sky-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
