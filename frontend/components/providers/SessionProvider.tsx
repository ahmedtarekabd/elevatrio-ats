'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'

type SessionProviderWrapperProps = {
    children: React.ReactNode
    session: any
}

const SessionProviderWrapper = ({
    children,
    session,
}: SessionProviderWrapperProps) => {
    return <SessionProvider session={session}>{children}</SessionProvider>
}

export default SessionProviderWrapper
