"use server";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import Logout from "@/utils/Logout";

export async function Navbar() {
  const session = await auth();



  return (
    <Menubar className="px-8 py-8 ">
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
            {session?.user ?
              <>
                <Link href="/profile">
                  <p className="font-semibold text-lg">Profile</p>
                </Link>
                <Logout />
              </>
              :
              <>
                <Link href="/register">
                  <Button>Sign Up</Button>
                </Link>
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              </>

            }
          </MenubarMenu>
        </div>
      </div>
    </Menubar>
  );
}
