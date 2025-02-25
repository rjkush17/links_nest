"use client"
import useGET from "@/hooks/useGET"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useParams } from "next/navigation";



export default function NestPage() {

  const { isError, isLoading, data, fetchGET } = useGET();
  const params = useParams();


  useEffect(() => {
    fetchGET(`nest/${params.nestID}`)
  }, [])

  return (
    <h1>Nesting edit page</h1>
  )
}
