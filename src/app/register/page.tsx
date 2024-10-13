"use client";
import React, {useState} from "react";
import SignInform from "@/components/register/SignInform"
import Otpform from "@/components/register/OtpForm"



export default function page() {
  const [pageState, setPageState] = useState<boolean>(true);
  const [userData, setUserData] = useState<Record<string, string> | null>(null)
  const [userResendData, setUserReSendData] = useState<any>(null)

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
