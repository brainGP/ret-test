"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { User } from "@/types/Users";

interface UserModalProps {
  user: User;
  onClose: () => void;
  onSave: (users: User) => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState<User>(user);

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
            <h2 className="text-xl font-bold mb-4">
              {user._id ? "Edit User" : "Add User"}
            </h2>
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
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block">Имэйл</label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block">Нууц үг</label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block">Админ эрхтэй эсэх</label>
              <input
                type="checkbox"
                checked={formData.isAdmin}
                onChange={(e) => handleChange("isAdmin", e.target.checked)}
              />
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
