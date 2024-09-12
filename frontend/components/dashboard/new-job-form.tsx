'use client'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Label } from '../ui/label'
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '../ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const NewJobForm = () => {
  const jobTypes = ['full-time', 'part-time', 'contract']

  const [isAddJobDialogOpen, setIsAddJobDialogOpen] = useState(false)
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    job_type: '',
    skills: [],
    salary: [],
    experience: [],
    tags: [],
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setNewJob((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewJob((prev) => ({
      ...prev,
      [name]: value.split(',').map((item) => item.trim()),
    }))
  }

  const handleSubmitNewJob = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting new job:', newJob)
    // Here you would typically send this data to your backend API
    setIsAddJobDialogOpen(false)
    // Reset the form
    setNewJob({
      title: '',
      description: '',
      location: '',
      job_type: '',
      skills: [],
      salary: [],
      experience: [],
      tags: [],
    })
  }

  const FormSchema = z.object({
    description: z
      .string()
      .min(10, {
        message: 'description must be at least 10 characters.',
      })
      .max(160, {
        message: 'description must not be longer than 30 characters.',
      }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  return (
    <div className='mb-4 flex justify-end'>
      <Dialog open={isAddJobDialogOpen} onOpenChange={setIsAddJobDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className='mr-2 h-4 w-4' /> Add New Job
          </Button>
        </DialogTrigger>
        <DialogContent className='bg-background sm:max-w-[50%]'>
          <DialogHeader>
            <DialogTitle>Add New Job</DialogTitle>
            <DialogDescription>
              Fill in the details for the new job opportunity. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmitNewJob}>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='title' className='text-right'>
                    Title
                  </Label>
                  <Input
                    id='title'
                    name='title'
                    value={newJob.title}
                    onChange={handleInputChange}
                    className='col-span-3'
                  />
                </div>
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-4 items-center gap-4'>
                      <FormLabel className='text-right'>Description</FormLabel>
                      <FormControl className='col-span-3'>
                        <Textarea
                          placeholder='Write a strong description'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>
                        You can <span>@mention</span> other users and
                        organizations.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='location' className='text-right'>
                    Location
                  </Label>
                  <Input
                    id='location'
                    name='location'
                    value={newJob.location}
                    onChange={handleInputChange}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='job_type' className='text-right'>
                    Job Type
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setNewJob((prev) => ({ ...prev, job_type: value }))
                    }
                  >
                    <SelectTrigger className='col-span-3'>
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
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='skills' className='text-right'>
                    Skills
                  </Label>
                  <Input
                    id='skills'
                    name='skills'
                    value={newJob.skills.join(', ')}
                    onChange={handleArrayInputChange}
                    placeholder='Comma-separated list'
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='salary' className='text-right'>
                    Salary Range
                  </Label>
                  <Input
                    id='salary'
                    name='salary'
                    value={newJob.salary.join(', ')}
                    onChange={handleArrayInputChange}
                    placeholder='Min, Max'
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='experience' className='text-right'>
                    Experience
                  </Label>
                  <Input
                    id='experience'
                    name='experience'
                    value={newJob.experience.join(', ')}
                    onChange={handleArrayInputChange}
                    placeholder='Min, Max years'
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='tags' className='text-right'>
                    Tags
                  </Label>
                  <Input
                    id='tags'
                    name='tags'
                    value={newJob.tags.join(', ')}
                    onChange={handleArrayInputChange}
                    placeholder='Comma-separated list'
                    className='col-span-3'
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type='submit'>Save Job</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NewJobForm
