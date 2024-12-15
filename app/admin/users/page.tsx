"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/authHelper";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import Breadcrumb from "@/components/BreadCrumb";
import { LoadingError } from "@/components/LoadingError";
import UserModal from "@/components/Users/UserModal";
import UserTable from "@/components/Users/UserTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "@/types/Users";

function AdminUsersPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isFinalConfirmation, setIsFinalConfirmation] = useState(false);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const accessToken = getCookie("accessToken") as string | undefined;
      if (!accessToken) throw new Error("Unauthorized");

      const response = await axios.get<User[]>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/user`,
        { headers: { token: `Bearer ${accessToken}` } }
      );

      if (response.status === 200) {
        console.log("Fetched users:", response.data);
        setUsers(response.data);
      } else {
        throw new Error("Failed to fetch users.");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    if (!isFinalConfirmation) return;

    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) throw new Error("Unauthorized");

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/user/${id}`,
        { headers: { token: `Bearer ${accessToken}` } }
      );

      if (response.status === 200) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        toast.success("Хэрэглэгчийг амжилттай устгалаа.");
      }
    } catch {
      toast.error("Хэрэглэгчийг устгаж чадсангүй.");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const updateUser = async (user: User) => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) throw new Error("Unauthorized");

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/user/${user._id}`,
        user,
        { headers: { token: `Bearer ${accessToken}` } }
      );

      if (response.status === 200) {
        setUsers((prev) =>
          prev.map((item) => (item._id === user._id ? response.data : item))
        );
        toast.success("Хэрэглэгч амжилттай шинэчилсэн.");
        setEditUser(null);
      }
    } catch {
      toast.error("Хэрэглэгчийг шинэчилж чадсангүй.");
    }
  };

  const addUser = async (user: User) => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) throw new Error("Unauthorized");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/user`,
        user,
        { headers: { token: `Bearer ${accessToken}` } }
      );

      if (response.status === 201) {
        setUsers((prev) => [...prev, response.data]);
        toast.success("Хэрэглэгчийг амжилттай нэмлээ.");
        setNewUser(null);
      }
    } catch {
      toast.error("Хэрэглэгчийг нэмж чадсангүй.");
    }
  };

  const handleEdit = (user: User) => {
    setEditUser(user);
  };

  const handleDelete = (id: string) => {
    setUserToDelete(id);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/login");
    } else {
      fetchUsers();
    }
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center w-full top-0 border-b px-4 md:px-6 mb-8 py-4">
      <div className="container flex flex-col items-centerpy-4 mx-auto max-w-7xl gap-4">
        <div className="flex flex-col sm:flex-row  justify-between ">
          <h1 className="font-semibold text-xl mb-4">
            Админы хэрэглэгчийг хяналтын хэсэг
          </h1>
          <Button
            className="mb-4 text-white"
            onClick={() => setNewUser({} as User)}
          >
            Шинэ хэрэглэгчийг нэмэх
          </Button>
        </div>
        <Breadcrumb />
      </div>
      <div className="container flex flex-col sm:flex-row items-center justify-between py-4 mx-auto max-w-7xl gap-4">
        <ScrollArea className="w-full h-min-96 overflow-auto border border-gray-300 rounded-lg">
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ScrollArea>
      </div>

      <LoadingError isLoading={loading} error={error} />

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Та энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Энэ үйлдлийг буцаах боломжгүй. Та энэ хэрэглэгчийг устгахдаа
              үнэхээр итгэлтэй байна уу?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Цуцлах
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIsFinalConfirmation(true);
                if (userToDelete) {
                  deleteUser(userToDelete);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {editUser && (
        <UserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={updateUser}
        />
      )}

      {newUser && (
        <UserModal
          user={newUser}
          onClose={() => setNewUser(null)}
          onSave={addUser}
        />
      )}
    </div>
  );
}

export default AdminUsersPage;
