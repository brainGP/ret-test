"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { User } from "@/types/Users";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface UserModalProps {
  user: User;
  onClose: () => void;
  onSave: (users: User) => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState<User>(user);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (field: keyof User, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <ScrollArea>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
          <div className="flex flex-row justify-between m-4">
            <h2 className="text-xl font-bold mb-4">{"Edit User"}</h2>
            <Button
              className="bg-white shadow-none hover:bg-gray/10"
              onClick={onClose}
            >
              <Image
                src={`/icons/xicon.svg`}
                height={24}
                width={24}
                alt="icons"
              />
            </Button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(formData);
            }}
          >
            <div className="mb-4">
              <label className="block">Нэр</label>
              <input
                className="w-full p-2 border  rounded"
                type="text"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block">Имэйл</label>
              <input
                className="w-full p-2 border rounded"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="mb-4 relative">
              <Label className="block mb-1">Нууц үг</Label>
              <input
                className="w-full p-2 border rounded pr-10"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter your password"
                disabled={!!user._id}
              />

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPassword(!showPassword);
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset right-4 top-7 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <Image
                  src={
                    showPassword ? "/icons/eyeOpen.svg" : "/icons/eyeClose.svg"
                  }
                  alt={showPassword ? "Hide password" : "Show password"}
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <div className="mb-4 flex items-center space-x-4">
              <Switch
                id="isAdmin"
                checked={formData.isAdmin}
                onCheckedChange={(checked) => handleChange("isAdmin", checked)}
              />
              <Label htmlFor="isAdmin">Админ эрхтэй эсэх</Label>
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                className="border text-gray shadow-none hover:text-gray/80 bg-white hover:bg-transparent"
                onClick={onClose}
              >
                Хаах
              </Button>
              <Button type="submit" className=" shadow-none text-white">
                Хадгалах
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ScrollArea>
  );
};

export default UserModal;
