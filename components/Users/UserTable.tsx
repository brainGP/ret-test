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
  users: User[];
  onEdit: (users: User) => void;
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  console.log("enenii daraah", users);

  return (
    <ScrollArea className="w-screen whitespace-nowrap rounded-md border">
      <div className="min-w-[1000px]">
        <Table>
          <TableCaption>Бүх жагсаалт.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">#</TableHead>
              <TableHead className="w-[150px]">Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>isAdmin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell className="text-center font-medium">
                    {index + 1}.
                  </TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password || "N/A"}</TableCell>
                  <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
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
                <TableCell colSpan={5} className="text-center">
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
