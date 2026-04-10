'use client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { useState } from "react"
import SessionProvider from "./SessionProvider"
import { Session } from "@/types"
 
const Providers = ({children, session} : {children : React.ReactNode, session: Session | null}) => {

    const [queryClient] = useState(() => new QueryClient());
  return (
            <QueryClientProvider client={queryClient}>
                    <SessionProvider session={session}>
                      {children}
                    </SessionProvider>
            </QueryClientProvider>
  )
}

export default Providers