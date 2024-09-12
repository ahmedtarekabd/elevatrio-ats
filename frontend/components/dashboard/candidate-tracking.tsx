import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '../ui/button'

const CandidateTracking = () => {
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
  return (
    <div className='grid grid-cols-3 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>New Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {candidates
              .filter((c) => c.status === 'New')
              .map((candidate) => (
                <li key={candidate.id} className=''>
                  <Link href={`/candidate/${candidate.id}`}>
                    <Button variant={'outline'} className='w-full'>
                      {candidate.name} - {candidate.jobTitle}
                    </Button>
                  </Link>
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recently Viewed</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {candidates.slice(0, 3).map((candidate) => (
              <li key={candidate.id} className=''>
                <Link href={`/candidate/${candidate.id}`}>
                  <Button variant={'outline'} className='w-full'>
                    {candidate.name} - {candidate.jobTitle}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {candidates
              .sort((a, b) => b.score - a.score)
              .slice(0, 3)
              .map((candidate) => (
                <li key={candidate.id} className=''>
                  <Link href={`/candidate/${candidate.id}`}>
                    <Button variant={'outline'} className='w-full'>
                      {candidate.name} - Score: {candidate.score}
                    </Button>
                  </Link>
                </li>

              ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default CandidateTracking
