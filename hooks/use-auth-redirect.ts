import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'

/**
 * Hook to handle auth redirects safely
 * Prevents redirects during initial hydration
 */
export const useAuthRedirect = () => {
  const router = useRouter()
  const { session } = useAuthStore()
  const hasCheckedRef = useRef(false)

  useEffect(() => {
    // Give SessionProvider time to set the session from server
    // This prevents redirect on initial mount
    const timer = setTimeout(() => {
      if (!session && !hasCheckedRef.current) {
        hasCheckedRef.current = true
        console.log('useAuthRedirect: No session found, redirecting to home')
        router.push('/')
      } else if (session) {
        hasCheckedRef.current = true
      }
    }, 0) // Use 0 to run after paint, giving SessionProvider useLayoutEffect priority

    return () => clearTimeout(timer)
  }, [session, router])
}
