"use client";

import React, { useState, FormEvent } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { POST } from "@/apis/axios";
import { Product } from "@/types/Product";
import Image from "next/image";

interface Data {
  username: string;
  email: string;
  password: string;
}

interface ApiResponse {
  message: string;
  data: Product[];
}

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showsPassword, setShowsPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data: Data = {
      username,
      email,
      password,
    };

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
      await POST({
        route: `/api/auth/register`,
        body: data,
      });
      toast.success("Амжилттай бүртгэгдлээ");

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
    <div className="flex h-screen">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-6">
        <Image
          src="/retevis.png"
          alt="Retevis Logo"
          width={300}
          height={100}
          priority
          className="mb-6"
        />
        <Card className="w-full max-w-md border-none shadow-none">
          <CardHeader>
            <CardDescription className="text-sm text-center text-gray-500">
              Имэйлээр шинэ бүртгэл үүсгэнэ үү.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <Input
                type="text"
                placeholder="Нэр"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="p-4 py-6 bg-slate-100 border rounded-lg shadow-none focus:bg-white focus:border transition duration-300"
              />
              <Input
                type="email"
                placeholder="Цахим хаяг"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="p-4 py-6 bg-slate-100 border rounded-lg shadow-none focus:bg-white focus:border transition duration-300"
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Нууц үг"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="p-4 py-6 bg-slate-100 border rounded-lg shadow-none hover:bg-white focus:border transition duration-300 pr-12"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPassword(!showPassword);
                  }}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <Image
                    src={
                      showPassword
                        ? "/icons/eyeOpen.svg"
                        : "/icons/eyeClose.svg"
                    }
                    alt={showPassword ? "Hide password" : "Show password"}
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <div className="relative">
                <Input
                  type={showsPassword ? "text" : "password"}
                  placeholder="Нууц үг давтах"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="p-4 py-6 bg-slate-100 border rounded-lg shadow-none focus:bg-white focus:border transition duration-300 pr-12"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowsPassword(!showsPassword);
                  }}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <Image
                    src={
                      showsPassword
                        ? "/icons/eyeOpen.svg"
                        : "/icons/eyeClose.svg"
                    }
                    alt={showsPassword ? "Hide password" : "Show password"}
                    width={24}
                    height={24}
                  />
                </button>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
            <Separator />
            <div className="flex flex-row justify-between text-sm mt-4 text-gray">
              <p>text</p>
              <Link href={`/login`} className="text-sky-600 hover:underline">
                Бүртгэлтэй
              </Link>
            </div>
          </CardContent>
        </Card>
        <p className="mt-6 text-gray-500 text-sm">
          <span>EN | MN</span>
        </p>
      </div>

      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/Auth.png"
          alt="Auth Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
};

export default Signup;
