import { Button } from "@/components/ui/button";
import { User } from "@/types/Users";

interface UserActionsProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UserActions: React.FC<UserActionsProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex fle-col lg:flex-row space-4">
      <Button
        className="bg-transparent hover:underline hover:bg-transparent shadow-none text-gray px-3 py-1 rounded mr-2"
        onClick={() => onEdit(user)}
      >
        Засварлах
      </Button>
      <Button
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => onDelete(user._id!)}
      >
        Устгах
      </Button>
    </div>
  );
};
