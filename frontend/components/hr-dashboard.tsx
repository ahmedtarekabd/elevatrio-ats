"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Briefcase, FileText, Users, Search, Plus, Pencil, Trash2 } from "lucide-react"

// Mock data
const jobs = [
  { id: 1, title: "Software Engineer", requirements: "React, Node.js, 3+ years experience", candidates: 15 },
  { id: 2, title: "Product Manager", requirements: "5+ years experience, MBA preferred", candidates: 8 },
  { id: 3, title: "UX Designer", requirements: "3+ years experience, Figma proficiency", candidates: 12 },
]

const candidates = [
  { id: 1, name: "John Doe", jobTitle: "Software Engineer", score: 85, status: "New" },
  { id: 2, name: "Jane Smith", jobTitle: "Product Manager", score: 92, status: "Interviewed" },
  { id: 3, name: "Mike Johnson", jobTitle: "UX Designer", score: 78, status: "New" },
]

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState("job-management")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAttribute, setFilterAttribute] = useState("jobTitle")

  const filteredCandidates = candidates.filter((candidate) =>
    candidate[filterAttribute].toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">HR Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="job-management">
            <Briefcase className="mr-2 h-4 w-4" />
            Job Management
          </TabsTrigger>
          <TabsTrigger value="resume-review">
            <FileText className="mr-2 h-4 w-4" />
            Resume Review
          </TabsTrigger>
          <TabsTrigger value="candidate-tracking">
            <Users className="mr-2 h-4 w-4" />
            Candidate Tracking
          </TabsTrigger>
          <TabsTrigger value="search-filter">
            <Search className="mr-2 h-4 w-4" />
            Search & Filter
          </TabsTrigger>
        </TabsList>
        <TabsContent value="job-management">
          <Card>
            <CardHeader>
              <CardTitle>Job Management</CardTitle>
              <CardDescription>Create, edit, and delete job opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add New Job
                </Button>
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
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resume-review">
          <Card>
            <CardHeader>
              <CardTitle>Resume Review</CardTitle>
              <CardDescription>View parsed resumes and AI-generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {candidates.map((candidate) => (
                  <Card key={candidate.id}>
                    <CardHeader>
                      <CardTitle>{candidate.name}</CardTitle>
                      <CardDescription>{candidate.jobTitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>AI Score: {candidate.score}</p>
                      <Button className="mt-4">View Full Report</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="candidate-tracking">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>New Candidates</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {candidates.filter((c) => c.status === "New").map((candidate) => (
                    <li key={candidate.id} className="mb-2">
                      {candidate.name} - {candidate.jobTitle}
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
                <ul>
                  {candidates.slice(0, 3).map((candidate) => (
                    <li key={candidate.id} className="mb-2">
                      {candidate.name} - {candidate.jobTitle}
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
                <ul>
                  {candidates.sort((a, b) => b.score - a.score).slice(0, 3).map((candidate) => (
                    <li key={candidate.id} className="mb-2">
                      {candidate.name} - Score: {candidate.score}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="search-filter">
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter Candidates</CardTitle>
              <CardDescription>Find candidates based on various attributes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-4">
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Select value={filterAttribute} onValueChange={setFilterAttribute}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jobTitle">Job Title</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="score">Score</SelectItem>
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
                    <TableRow key={candidate.id}>
                      <TableCell>{candidate.name}</TableCell>
                      <TableCell>{candidate.jobTitle}</TableCell>
                      <TableCell>{candidate.score}</TableCell>
                      <TableCell>
                        <Badge variant={candidate.status === "New" ? "default" : "secondary"}>
                          {candidate.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}