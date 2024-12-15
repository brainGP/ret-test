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
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { LoadingError } from "@/components/LoadingError";
import { Product } from "@/types/Product";
interface ApiResponse {
  message: string;
  data: Product[];
}

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
      toast.error("Бүх хэсгийг бөглөх шаардлагатай.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Нууц үг дор хаяж 6 тэмдэгттэй байх ёстой.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Нууц үг таарахгүй байна.");
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Имэйлийн формат буруу байна.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post<ApiResponse>(
        "http://localhost:3001/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      toast.success(response.data.message);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      router.push("/login");
    } catch (err) {
      const message =
        (err as AxiosError<ApiResponse>)?.response?.data?.message ||
        "Ямар нэг зүйл буруу болсон. Дахин оролдоно уу.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 relative">
      <LoadingError isLoading={loading} />

      <Card className="w-[90%] max-w-md p-6 sm:p-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Бүртгүүлэх</CardTitle>
          <CardDescription className="text-sm text-center text-gray-500">
            Имэйлээр шинэ бүртгэл үүсгэнэ үү.
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
          <p className="text-end text-sm mt-4 text-gray-600">
            <Link href="/login" className="text-blue-600 hover:underline">
              Бүртгэлтэй
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
