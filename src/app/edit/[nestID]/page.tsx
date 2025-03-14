"use client"
import useGET from "@/hooks/useGET"
import { useEffect } from "react";
import { useParams } from "next/navigation";
import ImageComponent from "@/components/edit/ImageComponent"


export default function NestPage() {

  const { isError, isLoading, data, fetchGET } = useGET();
  const params = useParams();

  useEffect(() => {
    fetchGET(`nest/${params.nestID}`)
  }, [])

  return (
    <>
      {data &&
        <>
          <h1>Nesting edit page</h1>
          <ImageComponent imagelink={data?.response} />
        </>
      }
      {isError &&
        <h1>{isError.message}</h1>
      }
      {isLoading &&
        <h1>Loading...</h1>
      }
    </>
  )
}
