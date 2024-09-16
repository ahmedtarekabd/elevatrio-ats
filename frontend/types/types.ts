export type CandidateStatusEnum =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'hired'
  | 'archived'

export type Candidates = {
  id?: number
  full_name: string
  email: string
  status?: CandidateStatusEnum
  job_id: number
  phone?: string
  skills?: string[]
  experience?: number
  education?: string
  resume?: string
  portfolio?: string
  social_links?: string[]
  created_at?: Date
  last_edited?: Date
}

export type Job = {
  id?: string
  title: string
  description: string
  candidates?: string
  location: string
  job_type: string
  skills: string[]
  salary: string[]
  experience: string[]
  tags: string[]
}
