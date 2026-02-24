import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu, School, Store } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import {
  useLoginUserMutation,
  useLogoutUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User Logged Out");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 bg-white dark:bg-[#020817] border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center px-6 h-full">
        <div className="flex items-center gap-2">
          <School size={30} />
          <Link to="/">
            <h1 className="font-extrabold text-2xl">E-Learning</h1>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shacn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="My-Learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}

          <DarkMode />
        </div>
      </div>

      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-Learning</h1>
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full  hover:bg-gray-200"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="ml-4 font-bold">
            <Link to="/">E-Learning</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4 ml-8">
          <Link to="/my-learning">My-Laerning</Link>
          <Link to="/profile">Edit Profile</Link>
          <button onClick={logoutHandler} className="text-left">Log out</button>
        </nav>
        {user?.role === "instructor" && (
          <div className="mt-6 px-6">
            <Button
              type="submit"
              onClick={() => navigate("/admin/dashboard")}
              className="w-full"
            >
              Dashboard
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
