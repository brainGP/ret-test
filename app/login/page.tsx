"use client";
import React, { useState, FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { saveUserData } from "@/lib/authHelper";
import Image from "next/image";
import { LoadingWait } from "@/components/LoadingWait";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auth/login`,
        { email, password }
      );
      toast.success("Амжилттай нэвтэрлээ");
      saveUserData(response.data);

      if (response.data.isAdmin) {
        router.push("/admin");
        router.refresh();
        return;
      }
      if (!email || !password) {
        toast.error("Бүх хэсгийг бөглөх шаардлагатай.");
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      toast.error("Гэнэтийн алдаа гарлаа. Дахин оролдоно уу");
      if (err instanceof AxiosError && err.response) {
        toast.error("Имэйл эсвэл нууц үг буруу байна.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
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
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4 text-black">
              <Input
                type="email"
                placeholder="Имэйл хаяг"
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
              <Button
                type="submit"
                className={`w-full text-white p-4 py-6 ${loading}`}
                disabled={loading}
              >
                {loading ? (
                  <LoadingWait isLoading={loading} error={error} />
                ) : (
                  "Үргэлжлүүлэх"
                )}
              </Button>
            </form>
            <Separator />
            <div className="flex flex-row justify-between text-sm mt-4 text-gray">
              <p>Аль хэдийн хаягтай юу? </p>
              <Link href={`/register`} className="text-sky-600 hover:underline">
                Бүртгүүлэх
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

export default Login;
