import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, useAuth0 } from "@auth0/auth0-react";
import { CircleUser } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileOptionsProps {
  user?: User | undefined;
}

const ProfileOptions = ({ user }: ProfileOptionsProps) => {
  const { logout } = useAuth0();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          {user ? (
            <img
              className="rounded-full"
              src={user.picture}
              alt={user.name}
            ></img>
          ) : (
            <CircleUser className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            logout({
              logoutParams: { returnTo: import.meta.env.VITE_AUTH0_LOGOUT_URI },
            })
          }
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileOptions;
