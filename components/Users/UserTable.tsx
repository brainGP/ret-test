import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserActions } from "./UserActions";
import { User } from "@/types/Users";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface UserTableProps {
  user: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  user = [],
  onEdit,
  onDelete,
}) => {
  return (
    <ScrollArea className="w-screen xl:w-full overflow-x-auto rounded-md border">
      <div className="min-w-[1200px]">
        <Table>
          <TableCaption>Бүх жагсаалт.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">#</TableHead>
              <TableHead className="w-[300px]">Username</TableHead>
              <TableHead className="w-[300px]">Email</TableHead>
              <TableHead className="w-[300px]">Admin</TableHead>
              <TableHead className="w-[300px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user && user.length > 0 ? (
              user.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell className="text-center font-medium">
                    {index + 1}.
                  </TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <div className="flex w-[150px] items-center justify-center font-semibold border border-green-300 rounded-full py-1 bg-white text-green-400">
                        Админ
                      </div>
                    ) : (
                      <div className="flex w-[150px] items-center justify-center font-semibold border border-slate-400 rounded-full py-1 bg-white text-slate-600">
                        Хэрэглэгч
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <UserActions
                      user={user}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No users available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default UserTable;
