"use client";
import { Button } from "@/components/ui/button";
import usePOST from "@/hooks/usePOST";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import toast from "react-hot-toast";

function createNest() {

  const { isError, isLoading, data, fetchPOST } = usePOST();
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (data?.nestID) {  // Check if data and nestID exist
      router.push(`/edit/${data.nestID}`);
    }
  }, [data, router]);

  const handleNest = () => {
    fetchPOST("nest", session?.user)
      .then(() => {

        toast.success("new Tree Created")
     }
      )
      .catch(() => {
        isError &&
          toast.error(isError.message)
      });
  };

  return (
    <>
      {isLoading ?
        <Button disabled>Creating Tree ... </Button>
        :
        <Button onClick={handleNest} >Create New Tree</Button>
      }
    </>
  )
}

export default createNest;
