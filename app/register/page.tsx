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
import { toast } from "sonner";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      toast.success("Account created successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      router.push("/login");
    } catch (err: any) {
      const message =
        err.response?.data || "Something went wrong. Please try again.";
      toast.error(message);
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
              className="p-3"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="p-3"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="p-3"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
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
