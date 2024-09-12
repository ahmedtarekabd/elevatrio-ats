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
import { Pencil, Plus, Trash2 } from 'lucide-react'
import NewJobForm from './new-job-form'

const JobManagement = () => {
  // Mock data
  const jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      requirements: 'React, Node.js, 3+ years experience',
      candidates: 15,
    },
    {
      id: 2,
      title: 'Product Manager',
      requirements: '5+ years experience, MBA preferred',
      candidates: 8,
    },
    {
      id: 3,
      title: 'UX Designer',
      requirements: '3+ years experience, Figma proficiency',
      candidates: 12,
    },
  ]
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
          <NewJobForm />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Requirements</TableHead>
              <TableHead>Candidates</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.requirements}</TableCell>
                <TableCell>{job.candidates}</TableCell>
                <TableCell>
                  <Button variant='ghost' size='sm'>
                    <Pencil className='h-4 w-4' />
                  </Button>
                  <Button variant='ghost' size='sm'>
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default JobManagement
