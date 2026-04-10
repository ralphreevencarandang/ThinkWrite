    'use client'; // This must be a client component

    import { useLayoutEffect } from 'react';
    import { useAuthStore } from '@/store/auth.store' // Adjust path as needed
    import { Session } from '@/types';

    export default function SessionProvider({ 
    session, 
    children 
    }: { 
    session: Session | null, 
    children: React.ReactNode 
    }) {
    const setSession = useAuthStore((state) => state.setSession);

    // Use useLayoutEffect to set session synchronously before child components render
    // This prevents timing issues where components check session before it's set
    useLayoutEffect(() => {
        console.log('SessionProvider: Setting session immediately', session);
        setSession(session);
    }, [session, setSession]);

    return <>{children}</>;
    }