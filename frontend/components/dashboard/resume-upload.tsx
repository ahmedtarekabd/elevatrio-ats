'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, File, Upload, XCircle } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axio from '@/lib/axios'

type UploadedFile = {
  name: string
  size: number
}

const ResumeUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [uploadProgress, setUploadProgress] = useState<number | null>(0)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const filesForm = new FormData()
    setUploadedFiles([])
    acceptedFiles.forEach((file) => {
      console.log(file.name)
      filesForm.append('resumes', file)
    })
    setUploadedFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file: File) => ({
        name: file.name,
        size: file.size,
      })),
    ])
    const res = await axio.post('/candidates/upload-resumes', filesForm, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress(progressEvent) {
        setUploadProgress(
          Math.round((progressEvent.loaded * 100) / progressEvent.total!),
        )
      },
    })
    if (res.status >= 300) {
      setUploadProgress(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    multiple: true,
  })

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Resume Upload</CardTitle>
          <CardDescription>
            Upload candidate resumes for processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-lg border-2 border-dashed p-10 text-center transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
            <h3 className='mb-2 text-lg font-semibold'>
              Drag & Drop Resumes Here
            </h3>
            <p className='mb-4 text-sm text-muted-foreground'>
              or click to select files (PDF, DOC, DOCX)
            </p>
            <Button variant='outline'>Select Files</Button>
          </div>
          {uploadedFiles.length > 0 && (
            <div className='mt-8'>
              <h4 className='mb-4 text-lg font-semibold'>Uploaded Files:</h4>
              <ul className='space-y-2'>
                {uploadedFiles.map((file, index) => (
                  <li key={index} className='flex items-center space-x-2'>
                    <File className='h-5 w-5 text-muted-foreground' />
                    <span>{file.name}</span>
                    <span className='text-sm text-muted-foreground'>
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    {uploadProgress &&
                      (uploadProgress === 100 ? (
                        <CheckCircle2 className='ml-auto h-5 w-5 text-green-500' />
                      ) : (
                        <span className='ml-auto text-sm text-muted-foreground'>
                          {uploadProgress}%
                        </span>
                      ))}
                    {!uploadProgress && (
                      <div className='flex items-center gap-1 text-red-500'>
                        <XCircle className='ml-auto h-5 w-5' />
                        An error occurred
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ResumeUpload
