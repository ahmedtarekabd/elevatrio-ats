import HRDashboard from '@/components/hr-dashboard'
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

export default async function HRDashboardPage() {
  const session = await getServerAuthSession()
  if (!session) {
    const callbackURL = encodeURIComponent('/dashboard') // Replace with the current URL if needed
    redirect(`/signin?callbackURL=${callbackURL}`)
  }
  return <HRDashboard />
}
