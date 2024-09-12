import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const ResumeReview = () => {
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
    <Card className='border-0'>
      <CardHeader>
        <CardTitle>Resume Review</CardTitle>
        <CardDescription>
          View parsed resumes and AI-generated reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-3 gap-4'>
          {candidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardHeader>
                <CardTitle>{candidate.name}</CardTitle>
                <CardDescription>{candidate.jobTitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>AI Score: {candidate.score}</p>
                <Button className='mt-4'>View Full Report</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ResumeReview
