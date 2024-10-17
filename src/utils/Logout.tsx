"use client";
import { handleLogout } from "./authActions";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

function Logout() {
  const handleLogOut = () => {
    try {
      handleLogout();
      toast.success("Succesfully Logout");
    } catch (error) {
      toast.error("Error while logout");
    }
  };
  return <Button onClick={() => handleLogOut()}>Logout</Button>;
}

export default Logout;
