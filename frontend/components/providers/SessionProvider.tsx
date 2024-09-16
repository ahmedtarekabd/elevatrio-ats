'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

type SessionProviderWrapperProps = {
    children: React.ReactNode
    session: Session
}

const SessionProviderWrapper = ({
    children,
    session,
}: SessionProviderWrapperProps) => {
    return <SessionProvider session={session}>{children}</SessionProvider>
}

export default SessionProviderWrapper
