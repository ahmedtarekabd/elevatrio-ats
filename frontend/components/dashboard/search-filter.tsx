'use client'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '../ui/input'
import { Badge } from '@/components/ui/badge'

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAttribute, setFilterAttribute] = useState('jobTitle')

  const candidates = [
    {
      id: 1,
      name: 'John Doe',
      jobTitle: 'Software Engineer',
      score: 85,
      status: 'New',
    },
    {
      id: 2,
      name: 'Jane Smith',
      jobTitle: 'Product Manager',
      score: 92,
      status: 'Interviewed',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      jobTitle: 'UX Designer',
      score: 78,
      status: 'New',
    },
  ]
  const filteredCandidates = candidates.filter((candidate) =>
    candidate[filterAttribute].toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className='border-0'>
      <CardHeader>
        <CardTitle>Search & Filter Candidates</CardTitle>
        <CardDescription>
          Find candidates based on various attributes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='mb-4 flex space-x-4'>
          <Input
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='max-w-sm'
          />
          <Select value={filterAttribute} onValueChange={setFilterAttribute}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='jobTitle'>Job Title</SelectItem>
              <SelectItem value='name'>Name</SelectItem>
              <SelectItem value='score'>Score</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow
                key={candidate.id}
                onClick={() => {
                  window.location.href = `/dashboard/candidates/${candidate.id}`
                }}
              >
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.jobTitle}</TableCell>
                <TableCell>{candidate.score}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      candidate.status === 'New' ? 'default' : 'secondary'
                    }
                  >
                    {candidate.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default SearchFilter
