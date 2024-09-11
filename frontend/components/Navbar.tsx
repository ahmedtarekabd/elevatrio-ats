'use client'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { UserSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const {status} = useSession()
  return (
    <NavigationMenu className='container flex h-nav justify-between'>
      <NavigationMenuList>
        <a href={'/'} className='text-xl font-bold'>
          <NavigationMenuItem className='flex items-center justify-center gap-2'>
            <UserSearch size={24} />
            Elevatrio
          </NavigationMenuItem>
        </a>
      </NavigationMenuList>
      {status === 'authenticated' ? (
        <NavigationMenuList>
          <Button
            variant={'outline'}
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </NavigationMenuList>
      ) : (
        <NavigationMenuList>
          <a href={'/signin'}>
            <Button variant={'outline'}>Sign In</Button>
          </a>
          <a href={'/signup'}>
            <Button>Sign Up</Button>
          </a>
        </NavigationMenuList>
      )}
    </NavigationMenu>
  )
}

export default Navbar
