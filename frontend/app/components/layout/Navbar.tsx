import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center w-full flex-col ">
      <div className="bg-linear-to-r from-emerald-400 to-emerald-500 w-full py-2 px-12  flex items-center justify-between ">
        <img
          src="https://cdn.prod.website-files.com/651149b4877f98f4d7cf8a6d/65114b385362c9652f934014_green_horizontal.webp"
          alt="logo"
          className="h-10 w-40 grayscale brightness-0 invert"
        />

        <div>
          <Button variant="link" className="">
            <Link to="/nutritionist-search" className="text-blue-600 flex flex-row items-center gap-2">
              Nutritionist Search
              <FaExternalLinkAlt />
            </Link>
          </Button>
          <Button variant="link" className="">
            <Link to="/pending-appointment-requests" className="text-blue-600 flex flex-row items-center gap-2">
              Pending Appointment Requests
              <FaExternalLinkAlt />
            </Link>
          </Button>
        </div>

        <p className="flex items-center text-white">
          Are you a nutrium professional? Get to know our software
          <Link to="https://nutrium.com/" target="_blank" className="ml-2">
            <FaArrowRight />
          </Link>
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="mr-5 flex-shrink-0 min-w-10 size-10">
              <AvatarImage src="https://cdn-icons-png.flaticon.com/512/18831/18831913.png" alt="@user-avatar" />
              <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
