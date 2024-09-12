import Hero from '@/components/Hero'
import { getServerAuthSession } from '@/server/auth'

export default async function Home() {
  const session = await getServerAuthSession()
  console.log('session: ', session)
  return (
    <div className='flex h-screen-no-nav items-center justify-center'>
      <Hero />
    </div>
  )
}
