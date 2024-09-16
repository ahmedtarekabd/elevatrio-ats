import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

type SetListType<T> = Dispatch<SetStateAction<T>>

const BadgeList = <T,>({
  name,
  setNewJob,
}: {
  name: string
  setNewJob: SetListType<T>
}) => {
  return (
    <>
      <Badge className='space-x-1 pr-1'>
        <span>{name}</span>
        <Button
          onClick={() => {
            setNewJob((prev) => ({
              ...prev,
              texts: prev.texts.filter((text) => text !== name),
            }))
          }}
          size={'icon'}
          className='h-6 w-6'
        >
          <X className='h-3 w-3' />
        </Button>
      </Badge>
    </>
  )
}

const InputBadge = () => {
  const [text, setText] = useState('')
  return (
    <div>
      <Input
        // id='text'
        className='col-span-3'
        placeholder='e.g. JavaScript, React, Node.js'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e: KeyboardEvent) => {
          if ((e.key === 'Tab' || e.key === 'Enter') && text.length > 0) {
            e.preventDefault()
            setNewJob((prev) => ({
              ...prev,
              texts: [...prev.texts, text],
            }))
            settext('')
          }
        }}
      />
      <div className='mt-2 space-x-2'>
        {newJob.texts.map((text, index) => (
          <BadgeList key={index} name={text} setNewJob={setNewJob} />
        ))}
      </div>
    </div>
  )
}

export default InputBadge
