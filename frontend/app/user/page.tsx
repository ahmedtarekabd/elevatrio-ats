'use client'
import { Button } from '@/components/ui/button'
import axio from '@/lib/axios'
import React from 'react'

const page = () => {
  return (
    <div>
    <Button onClick={async () => {
        const res = await axio.get('/users/me')
        console.log(res)
    }}>
        Click me
    </Button>
    </div>
  )
}

export default page