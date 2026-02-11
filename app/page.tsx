import Image from "next/image";
import PublicClient from "./(public)/PublicClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProtectedClient from "./(protected)/ProtectedClient";
export default async function Home() {
  const session = await auth.api.getSession({
      headers: await headers()
  });

   if(!session){
    return <PublicClient/>
  }
  return (
    <ProtectedClient/>
  );
}
