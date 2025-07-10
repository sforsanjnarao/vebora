import { Attendee } from '@/generated/prisma'
import React from 'react'

type Props = {
    title: string
    count: number
    users: Attendee[]
    tags: string[]
}

const PipelineLayout = ({title, count,users, tags}: Props) => {
  return (
    <div>PipelineLayout</div>
  )
}

export default PipelineLayout