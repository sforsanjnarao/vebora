import PageHeader from '@/components/ResuableComponent/PageHeader'
import { AttendedTypeEnum } from '@/generated/prisma'
import { HomeIcon, PanelLeftDashedIcon, Webcam } from 'lucide-react'
import React from 'react'

type Props = {
    params: Promise<{
        webinarId: string
    }>
}

const page = async ({params}: Props) => {
    const { webinarId } = await params;
  return (
    <div>
        <PageHeader
            leftIcon={<HomeIcon className='w-3 h-3'/>}
            mainIcon={<Webcam className='w-12 h-12'/>}
            rightIcon={<PanelLeftDashedIcon className='w-4 h-4'/>}
            heading="Keep track of all of your customers"
            placeholder="Search Name, Tag or Email"
        />
        <div>
            {Object.entries(pipelineData.data).map(([columnType, columnData]) => (
                <PipelineLayout
                    key={columnType}
                    title={formatColumnTitle(columnType as AttendedTypeEnum)}
                    count={columnData.count}
                    users={columnData.users}
                    tags={pipelineData.webinarTags}
                />
            ))}
        </div>
    </div>
  )
}

export default page