import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

export default async function HRDashboardPage() {
  const session = await getServerAuthSession()
  if (!session) {
    const callbackURL = encodeURIComponent('/dashboard') // Replace with the current URL if needed
    redirect(`/signin?callbackURL=${callbackURL}`)
  }
  return <div className='container flex py-6'>Welcome, HR!</div>
}
