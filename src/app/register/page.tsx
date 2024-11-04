"use client";
import React, {useEffect, useState} from "react";
import SignInform from "@/components/register/SignInform"
import Otpform from "@/components/register/OtpForm"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast";


export default function page() {

  const router = useRouter()
  const { data: session, status } = useSession()

  
  const [pageState, setPageState] = useState<boolean>(true);
  const [userData, setUserData] = useState<Record<string, string> | null>(null)
  const [userResendData, setUserReSendData] = useState<any>(null)

  useEffect(()=>{
  if (status === "authenticated" && session?.user) {
      toast("You are already logged in, redirecting to home...", {
        icon: '❌',
      });
    router.push("/")
  }
}, [session, router, status]);
  

  const handleData = (para :any) =>{
    if(para){
      setUserData(para)
    }
   setPageState(false)
  }

  const resendData =(para:any) =>{
    if(para){
      setUserReSendData(para)
    }
  }
  return(
    pageState ? <SignInform handleData={handleData} resendData={resendData} /> :
    <Otpform userData={userData} userResendData={userResendData}  handleData={handleData}/>
  );
}
