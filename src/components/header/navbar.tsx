import {
  Menubar,
  MenubarMenu,
  MenubarItem,
  MenubarContent,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <Menubar className="px-16 py-8 ">
      <div className="flex justify-between items-center w-full">
        <div>
          <MenubarMenu>
            <h1 className="text-3xl font-bold">Link Nest</h1>
          </MenubarMenu>
        </div>

        <div className="ml-auto flex gap-4 items-center">
          <MenubarMenu>
            <Button>Sign Up</Button>
            <Button>login</Button>
            <p className="font-semibold text-lg">Profile</p>
            <Button>Logout</Button>
          </MenubarMenu>
        </div>
      </div>
    </Menubar>
  );
}
