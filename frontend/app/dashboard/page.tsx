import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getServerAuthSession } from '@/server/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function HRDashboardPage() {
  const session = await getServerAuthSession()
  if (!session) {
    const callbackURL = encodeURIComponent('/dashboard') // Replace with the current URL if needed
    redirect(`/signin?callbackURL=${callbackURL}`)
  }

  const quickLinks = [
    {
      title: 'Job Management',
      description: 'Create, edit, and delete job opportunities.',
      href: '/dashboard/jobs',
    },
    {
      title: 'Resume Review',
      description: 'Review and rate resumes.',
      href: '/dashboard/resume-review',
    },
    {
      title: 'Candidate Tracking',
      description: 'Track and manage candidates.',
      href: '/dashboard/candidates',
    },
    {
      title: 'Search & Filter',
      description: 'Search and filter candidates.',
      href: '/dashboard/search',
    },
    {
      title: 'Resume Upload',
      description: 'Upload resumes for review.',
      href: '/dashboard/resume-upload',
    },
  ]

  return (
    <div className='container space-y-4 py-6'>
      <div>
        <h2 className='text-3xl font-bold'>Hi, {session.user.name}</h2>
        <h3 className='text-xl'>Welcome to the HR Dashboard!</h3>
      </div>
      <div>
        <h4 className='text-lg font-semibold'>Quick Links</h4>
        <div className='grid grid-cols-2 gap-4'>
          {quickLinks.map((link, index) => (
            <Link href={`${link.href}`} key={index} className=''>
              <Card className='flex h-full items-center justify-center'>
                <CardHeader className='space-y-2 text-center'>
                  <CardTitle>{link.title}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
