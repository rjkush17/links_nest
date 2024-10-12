"use client";
import React, {useState} from "react";
import SignInform from "@/components/register/SignInform"
import Otpform from "@/components/register/OtpForm"

export default function page() {
  const [pageState, setPageState] = useState<boolean>(true);
  const [userData, setUserData] = useState<Record<string, string> | null>(null)

  const handleData = (para :any) =>{
    if(para){
      setUserData(para)
    }
   setPageState(false)
  }
  return(
    pageState ? <SignInform handleData={handleData} /> :
    <Otpform userData={userData} />
  );
}
