import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Briefcase, FileText, FileUp, Search, Users } from 'lucide-react'
import Link from 'next/link'
import { Separator } from '../ui/separator'

const SideBar = () => {
  const Links = [
    {
      title: 'Job Management',
      href: '/dashboard/jobs',
      icon: <Briefcase className='mr-2 h-4 w-4' />,
    },
    {
      title: 'Resume Review',
      href: '/dashboard/resume-review',
      icon: <FileText className='mr-2 h-4 w-4' />,
    },
    {
      title: 'Candidate Tracking',
      href: '/dashboard/candidates',
      icon: <Users className='mr-2 h-4 w-4' />,
    },
    {
      title: 'Search & Filter',
      href: '/dashboard/search',
      icon: <Search className='mr-2 h-4 w-4' />,
    },
    {
      title: 'Resume Upload',
      href: '/dashboard/resume-upload',
      icon: <FileUp className='mr-2 h-4 w-4' />,
    },
  ]

  return (
    <div className='flex h-full'>
      <div className='sticky top-6 h-min'>
        <Link href={'/dashboard'}>
          <h1 className='mb-6 text-2xl font-bold'>HR Dashboard</h1>
        </Link>
        <NavigationMenu
          orientation='vertical'
          className='items-start justify-start'
        >
          <NavigationMenuList className='flex-col items-start justify-start space-x-0 space-y-2'>
            {Links.map((link, index) => (
              <NavigationMenuItem key={index}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.icon}
                    {link.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Separator orientation='vertical' />
    </div>
  )
}

export default SideBar
