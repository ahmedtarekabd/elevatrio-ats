import { Button } from "@/components/ui/button";
import axio from "@/lib/axios";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession()
  console.log("session: ", session)
  return (
    <div className="">
      <Link href="/user">
        User
      </Link>
    </div>
  );
}
