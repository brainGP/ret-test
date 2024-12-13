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
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/auth/register", {
        username,
        email,
        password,
      });

      router.push("/login");
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[90%] max-w-md p-6 sm:p-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription className="text-sm text-center text-gray-500">
            Create a new account with your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
              className="p-3"
            />
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
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
              className="p-3"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
          <Separator />
          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
