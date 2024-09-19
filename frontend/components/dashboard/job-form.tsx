'use client'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '../ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Job } from '@/types/types'
import { UseMutateFunction } from '@tanstack/react-query'
import { DialogFooter } from '../ui/dialog'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { AxiosResponse } from 'axios'

const FormSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters.' })
    .max(30, { message: 'Title must not be longer than 30 characters.' }),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 10 characters.',
    })
    .max(300, {
      message: 'Description must not be longer than 300 characters.',
    }),
  location: z
    .string()
    .min(2, { message: 'Location must be at least 2 characters.' }),
  job_type: z
    .string()
    .min(2, { message: 'Job type must be at least 2 characters.' }),
  skills: z
    .string()
    .min(1, { message: 'Skills must have at least one skill.' }),
  salary: z.string(),
  experience: z.string(),
  tags: z.string(),
})

type FormSchemaType = z.infer<typeof FormSchema>

const JobForm = ({
  initialForm = {
    title: '',
    description: '',
    location: '',
    job_type: '',
    skills: [],
    salary: [],
    experience: [],
    tags: [],
  },
  mutate,
}: {
  initialForm?: Job
  mutate: UseMutateFunction<
    AxiosResponse<unknown, unknown>,
    Error,
    Job,
    unknown
  >
}) => {
  const { data: session } = useSession()
  const jobTypes = ['full-time', 'part-time', 'contract']

  const form = useForm<FormSchemaType>({
    defaultValues: {
      ...initialForm,
      skills: initialForm.skills.join(','),
      salary: initialForm.salary.join(','),
      experience: initialForm.experience.join(','),
      tags: initialForm.tags.join(','),
    },
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = (values: FormSchemaType) => {
    console.log('Submitting new job:', values)
    const job = {
      ...values,
      skills: values.skills.split(/\s*[\s,]\s*/),
      salary: values.salary.split(/\s*[\s,]\s*/),
      experience: values.experience.split(/\s*[\s,]\s*/),
      tags: values.tags.split(/\s*[\s,]\s*/),
      user_id: session?.user.id, // Add the id of the user who created the job
      id: initialForm.id, // Add the id of the job if it exists
    }
    // Here you would typically send this data to your backend API
    mutate(job, {
      onSuccess: () => {
        // Reset the form on success
        form.reset()
        console.log('Job submitted successfully!')
      },
      onError: (error) => {
        console.error('Error submitting job:', error)
      },
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-4 py-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 gap-4'>
                  <FormLabel className='mt-5 text-right'>Title</FormLabel>
                  <div className='col-span-3 space-y-2'>
                    <FormControl>
                      <Input id='title' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 gap-4'>
                  <FormLabel className='mt-5 text-right'>Description</FormLabel>
                  <div className='col-span-3 space-y-2'>
                    <FormControl>
                      <Textarea
                        placeholder='Write a strong description'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 gap-4'>
                  <FormLabel className='mt-5 text-right'>Location</FormLabel>
                  <div className='col-span-3 space-y-2'>
                    <FormControl>
                      <Input id='location' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='job_type'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 gap-4'>
                  <FormLabel className='mt-5 text-right'>Job Type</FormLabel>
                  <div className='col-span-3 space-y-2'>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger id='job_type' className='col-span-3'>
                          <SelectValue placeholder='Select job type' />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='skills'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 gap-4'>
                  <FormLabel className='mt-5 text-right'>Skills</FormLabel>
                  <div className='col-span-3 space-y-2'>
                    <FormControl>
                      <div>
                        <Input
                          id='skills'
                          className='col-span-3'
                          placeholder='e.g. JavaScript, React, Node.js'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='salary'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 gap-4'>
                  <FormLabel className='mt-5 text-right'>Salary</FormLabel>
                  <div className='col-span-3 space-y-2'>
                    <FormControl>
                      <Input
                        id='salary'
                        className='col-span-3'
                        placeholder='e.g. $50,000 - $70,000'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='experience'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 gap-4'>
                  <FormLabel className='mt-5 text-right'>Experience</FormLabel>
                  <div className='col-span-3 space-y-2'>
                    <FormControl>
                      <Input
                        id='experience'
                        className='col-span-3'
                        placeholder='e.g. 2-3 years'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 gap-4'>
                  <FormLabel className='mt-5 text-right'>Tags</FormLabel>
                  <div className='col-span-3 space-y-2'>
                    <FormControl>
                      <Input
                        id='tags'
                        className='col-span-3'
                        placeholder='e.g. remote, full-stack'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='submit'>Save Job</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </div>
  )
}

export default JobForm
