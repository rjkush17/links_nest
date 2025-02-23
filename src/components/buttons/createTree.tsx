"use client";
import { Button } from "@/components/ui/button";
import usePOST from "@/hooks/usePOST";
import toast from "react-hot-toast";

function createNest() {
  
  const handleNest = () =>{
    usePOST("nest",)
  }

  return (
  <>
    <Button onclick={()=>handleNest}></Button> 
  </>
  )
}

export default createnest-
