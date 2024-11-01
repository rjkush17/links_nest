"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();
  console.log("page Home ---", session);

  return (
    <div>
      <div className="w-8/12 p-24">
        <h1 className="text-6xl font-bold">
          {" "}
          Welcome to LinkNest – Your Personalized Link Hub!
        </h1>
        <p className="mt-8 text-xl w-9/12 font-normal">
          Create and manage your own link tree easily! Share all your important
          links in one place, and make it simple for your followers or friends
          to find everything you offer.
        </p>
        <p className="mt-8 text-xl w-9/12 font-normal">
          Connect your TikTok, Instagram, Twitter, website, store, videos,
          music, podcast, events and more. It all comes together in a link in
          bio landing page designed to convert.
        </p>
        {session ? (
          <div className="m-8 w-6/12 flex flex-col gap-8  items-center	">
            <Button className="w-fit">Create a New Tree</Button>
            <Button className="w-fit">View All Tree</Button>
          </div>
        ) : (
          <div className="m-8 w-6/12 flex flex-col gap-8  items-center	">
            <Button className="w-fit">New user Create account here</Button>
            <Button className="w-fit">Already a user ? Login Here</Button>
          </div>
        )}
      </div>
    </div>
  );
}
