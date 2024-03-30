import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center font-bold hover:text-orange-600 px-3 gap-2">
          <CircleUserRound className="text-orange-500" />
          {user?.email}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link
              to="/user-profile"
              className="font-bold hover:text-orange-500"
            >
              User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              onClick={() => logout()}
              className="font-bold flex flex-1 bg-orange-500"
            >
              Log Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UsernameMenu;
