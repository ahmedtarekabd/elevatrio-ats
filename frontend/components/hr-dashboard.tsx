'use client'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Briefcase, FileText, Users, Search } from 'lucide-react'
import JobManagement from './dashboard/job-management'
import ResumeReview from './dashboard/resume-review'
import CandidateTracking from './dashboard/candidate-tracking'
import SearchFilter from './dashboard/search-filter'

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState('job-management')

  return (
    <div className='w-full'>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className='mb-6 grid w-full grid-cols-4'>
          <TabsTrigger value='job-management'>
            <Briefcase className='mr-2 h-4 w-4' />
            Job Management
          </TabsTrigger>
          <TabsTrigger value='resume-review'>
            <FileText className='mr-2 h-4 w-4' />
            Resume Review
          </TabsTrigger>
          <TabsTrigger value='candidate-tracking'>
            <Users className='mr-2 h-4 w-4' />
            Candidate Tracking
          </TabsTrigger>
          <TabsTrigger value='search-filter'>
            <Search className='mr-2 h-4 w-4' />
            Search & Filter
          </TabsTrigger>
        </TabsList>
        <TabsContent value='job-management'>
          <JobManagement />
        </TabsContent>
        <TabsContent value='resume-review'>
          <ResumeReview />
        </TabsContent>
        <TabsContent value='candidate-tracking'>
          <CandidateTracking />
        </TabsContent>
        <TabsContent value='search-filter'>
          <SearchFilter />
        </TabsContent>
      </Tabs>
    </div>
  )
}
