'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Download,
  Eye,
  FileText,
  Briefcase,
  GraduationCap,
  Phone,
  Mail,
  Globe,
  Calendar,
} from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Candidate } from '@/types/types'
import axio from '@/lib/axios'

// Mock candidate data
const candidate: Candidate = {
  id: 1,
  full_name: 'John Doe',
  email: 'john.doe@example.com',
  status: 'new',
  job_id: 1,
  phone: '+1 (555) 123-4567',
  skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
  experience: 5,
  education: "Master's in Computer Science, XYZ University",
  resume: 'john_doe_resume.pdf',
  portfolio: 'https://johndoe.portfolio.com',
  social_links: [
    'https://linkedin.com/in/johndoe',
    'https://github.com/johndoe',
  ],
  created_at: new Date('2023-01-15'),
  last_edited: new Date('2023-06-20'),
}

const Page = ({ params }: { params: { candidateId: string } }) => {
  // const candidateId = params.candidateId
  const [activeTab, setActiveTab] = useState('overview')

  // const {
  //   data: candidate,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ['candidate', candidateId],
  //   queryFn: async () => {
  //     const candidate = await axio.get(`/candidates/${candidateId}`)
  //     return candidate.data
  //   },
  // })

  // if (isLoading)
  //   return (
  //     <div className='flex h-full w-full animate-spin'>
  //       <svg
  //         className='-ml-1 mr-3 h-5 w-5 animate-spin text-white'
  //         xmlns='http://www.w3.org/2000/svg'
  //         fill='none'
  //         viewBox='0 0 24 24'
  //       >
  //         <circle
  //           className='opacity-25'
  //           cx='12'
  //           cy='12'
  //           r='10'
  //           stroke='currentColor'
  //           stroke-width='4'
  //         ></circle>
  //         <path
  //           className='opacity-75'
  //           fill='currentColor'
  //           d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
  //         ></path>
  //       </svg>
  //     </div>
  //   )

  return (
    <div>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Candidate Report</h1>
        <Badge variant={candidate.status === 'new' ? 'default' : 'secondary'}>
          {candidate.status}
        </Badge>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <Card className='md:col-span-3'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Candidate details and information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='mb-6 flex items-center space-x-4'>
              <Avatar className='h-20 w-20'>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${candidate.full_name}`}
                />
                <AvatarFallback>
                  {candidate.full_name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className='text-2xl font-bold'>{candidate.full_name}</h2>
                <p className='text-muted-foreground'>{candidate.email}</p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='experience'>Experience</TabsTrigger>
                <TabsTrigger value='education'>Education</TabsTrigger>
              </TabsList>
              <TabsContent value='overview'>
                <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='flex items-center space-x-2'>
                    <Phone className='h-4 w-4 text-muted-foreground' />
                    <dt className='font-medium'>Phone:</dt>
                    <dd>{candidate.phone}</dd>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Mail className='h-4 w-4 text-muted-foreground' />
                    <dt className='font-medium'>Email:</dt>
                    <dd>{candidate.email}</dd>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Globe className='h-4 w-4 text-muted-foreground' />
                    <dt className='font-medium'>Portfolio:</dt>
                    <dd>
                      <a
                        href={candidate.portfolio}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-primary hover:underline'
                      >
                        {candidate.portfolio}
                      </a>
                    </dd>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Calendar className='h-4 w-4 text-muted-foreground' />
                    <dt className='font-medium'>Applied:</dt>
                    <dd>{formatDate(candidate.created_at!)}</dd>
                  </div>
                </dl>
              </TabsContent>
              <TabsContent value='experience'>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-2'>
                    <Briefcase className='h-4 w-4 text-muted-foreground' />
                    <span className='font-medium'>Years of Experience:</span>
                    <span>{candidate.experience}</span>
                  </div>
                  <div>
                    <h3 className='mb-2 font-medium'>Skills:</h3>
                    <div className='flex flex-wrap gap-2'>
                      {candidate.skills?.map((skill, index) => (
                        <Badge key={index} variant='secondary'>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='education'>
                <div className='flex items-center space-x-2'>
                  <GraduationCap className='h-4 w-4 text-muted-foreground' />
                  <span className='font-medium'>Education:</span>
                  <span>{candidate.education}</span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resume</CardTitle>
            <CardDescription>
              View or download the candidate&apos;s resume
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <FileText className='h-4 w-4 text-muted-foreground' />
              <span>{candidate.resume}</span>
            </div>
            <div className='flex space-x-2'>
              <Button>
                <Download className='mr-2 h-4 w-4' />
                Download
              </Button>
              <Button variant='outline'>
                <Eye className='mr-2 h-4 w-4' />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>
              Candidate&apos;s professional profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className='space-y-2'>
              {candidate.social_links?.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline'
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page
