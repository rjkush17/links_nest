"use client";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { logout } from "@/utils/authActions";
import toast from "react-hot-toast";
import Link from "next/link";

const handleLogOut = () => {
  try {
    logout();
    toast.success("Succesfully Logout");
  } catch (error) {
    toast.error("Error while logout");
  }
};

export function Navbar() {
  return (
    <Menubar className="px-16 py-8 ">
      <div className="flex justify-between items-center w-full">
        <div>
          <MenubarMenu>
          <Link href="/">

            <h1 className="text-3xl font-bold">Link Nest</h1>
            </Link>

            
          </MenubarMenu>
        </div>

        <div className="ml-auto flex gap-4 items-center">
          <MenubarMenu>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
            <Link href="/login">
              <Button>login</Button>
            </Link>

            <Link href="/profile">
              <p className="font-semibold text-lg">Profile</p>
            </Link>

            <Button onClick={handleLogOut}>Logout</Button>
          </MenubarMenu>
        </div>
      </div>
    </Menubar>
  );
}
