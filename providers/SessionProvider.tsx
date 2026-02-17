    'use client'; // This must be a client component

    import { useEffect } from 'react';
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

    // When this component loads, or if session changes, update the store
    useEffect(() => {
        setSession(session);
    }, [session, setSession]);

    return <>{children}</>;
    }