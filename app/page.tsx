
import PublicClient from "./(public)/PublicClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProtectedClient from "./(protected)/ProtectedClient";
import SessionProvider from "@/providers/SessionProvider";
import ProtectedLayout from "./(protected)/layout";

export default async function Home() {

  const session = await auth.api.getSession({
      headers: await headers()
  });

   if(!session){
    return <PublicClient/>
  }

  return (
    <SessionProvider session={session}>
      <ProtectedLayout>
         <ProtectedClient/>

      </ProtectedLayout>
    </SessionProvider>

  );
}
