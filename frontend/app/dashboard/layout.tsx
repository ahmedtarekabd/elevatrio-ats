import SideBar from '@/components/dashboard/side-bar'
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

export default async function HRDashboardPage({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerAuthSession()
  if (!session) {
    const callbackURL = encodeURIComponent('/dashboard') // Replace with the current URL if needed
    redirect(`/signin?callbackURL=${callbackURL}`)
  }
  return (
    <div className='min-h-screen-no-nav container flex py-6'>
      <div className='hidden w-[30%] xl:block'>
        <SideBar />
      </div>
      <div className='w-full'>{children}</div>
    </div>
  )
}
