'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Job } from '@/types/types'
import axio from '@/lib/axios'
import JobForm from './job-form'

const JobManagement = () => {
  // // Mock data
  // const jobs = [
  //   {
  //     id: 1,
  //     title: 'Software Engineer',
  //     requirements: 'React, Node.js, 3+ years experience',
  //     candidates: 15,
  //   },
  //   {
  //     id: 2,
  //     title: 'Product Manager',
  //     requirements: '5+ years experience, MBA preferred',
  //     candidates: 8,
  //   },
  //   {
  //     id: 3,
  //     title: 'UX Designer',
  //     requirements: '3+ years experience, Figma proficiency',
  //     candidates: 12,
  //   },
  // ]

  const { mutate: addJob } = useMutation({
    mutationKey: ['jobs', 'add-job'],
    mutationFn: (newJob: Job) => axio.post('/jobs', newJob),
    onSuccess: () => refetch(),
  })
  const { mutate: editJob } = useMutation({
    mutationKey: ['delete-job'],
    mutationFn: (newJob: Job) => axio.put(`/jobs/${newJob.id}`, newJob),
    onSuccess: () => refetch(),
    onError: (error) => console.error('Error deleting job:', error),
  })
  const { mutate: deleteJob } = useMutation({
    mutationKey: ['delete-job'],
    mutationFn: (id: string) => axio.delete(`/jobs/${id}`),
    onSuccess: () => refetch(),
    onError: (error) => console.error('Error deleting job:', error),
  })

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => axio.get('/jobs/'),
  })
  const jobs: Job[] = data?.data
  console.log('jobs:', jobs)

  return (
    <Card className='border-0'>
      <CardHeader>
        <CardTitle>Job Management</CardTitle>
        <CardDescription>
          Create, edit, and delete job opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='mb-4 flex justify-end'>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className='mr-2 h-4 w-4' /> Add New Job
              </Button>
            </DialogTrigger>
            <DialogContent className='max-h-screen-no-nav overflow-auto bg-background sm:max-w-[50%]'>
              <DialogHeader>
                <DialogTitle>Add New Job</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new job opportunity. Click save
                  when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div>
                <JobForm mutate={addJob} />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isError ? (
          <>
            <div className='text-center'>Error loading jobs</div>
            <div className='text-center'>
              <Button onClick={() => refetch()}>Retry</Button>
            </div>
          </>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Candidates</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs &&
                  jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{job.description}</TableCell>
                      <TableCell>{job.candidates?.length}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant='ghost' size='sm'>
                              <Pencil className='h-4 w-4' />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className='max-h-screen-no-nav overflow-auto bg-background sm:max-w-[50%]'>
                            <DialogHeader>
                              <DialogTitle>Edit Job</DialogTitle>
                              <DialogDescription>
                                Fill in the details for the new job opportunity.
                                Click save when you&apos;re done.
                              </DialogDescription>
                            </DialogHeader>
                            <div>
                              <JobForm initialForm={job} mutate={editJob} />
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => deleteJob(job.id!)}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                {isLoading || isFetching ? (
                  <TableRow>
                    <TableCell className='text-center font-bold' colSpan={4}>
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (
                  (!jobs || jobs.length === 0) && (
                    <TableRow>
                      <TableCell className='text-center font-bold' colSpan={4}>
                        No jobs found
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default JobManagement
