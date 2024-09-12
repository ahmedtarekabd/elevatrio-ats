import Link from 'next/link'
import { Button } from './ui/button'

const Hero = () => {
  const fadeIn =
    ' animate-fade-up animate-once animate-duration-1000 animate-delay-100'
  return (
    <div
      className={
        'mx-auto my-8 flex max-w-[600px] flex-col items-center justify-center gap-8 text-center' +
        fadeIn
      }
    >
      <h1 className='text-5xl font-bold'>
        Simplify Your Hiring Process with AI-Powered ATS
      </h1>
      <div className='flex flex-col items-center justify-center gap-8'>
        <p className='text-lg'>
          Effortlessly manage candidates, automate tasks, and make smarter
          hiring decisions with our cutting-edge Applicant Tracking System.
        </p>
        <Link href='/dashboard'>
          <Button
            className='p-28 py-8 text-lg font-semibold'
            variant={'gradient'}
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero
