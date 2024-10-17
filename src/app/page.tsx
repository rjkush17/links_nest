"use client"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  console.log("page Home ---", session)

  return (
    <div>
      <h1>Home page</h1>
      {session ? <p>auth</p> : <p>non auth</p>}
    </div>
  );
}
