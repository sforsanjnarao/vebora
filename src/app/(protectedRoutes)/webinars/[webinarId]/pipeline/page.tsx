import { getWebinarAttendance } from '@/actions/attendance'
import PageHeader from '@/components/ResuableComponent/PageHeader'
import { AttendedTypeEnum } from '@/generated/prisma'
import { AlignRightIcon, HomeIcon, PanelLeftDashedIcon, Webcam } from 'lucide-react'
import React from 'react'
import PipelineLayout from './_components/PipelineLayout'
import { formatColumnTitle } from './_components/utils'

type Props = {
    params: Promise<{
        webinarId: string
    }>
}

const page = async ({params}: Props) => {
    const { webinarId } = await params;
    const pipelineData= await getWebinarAttendance(webinarId)


    if(!pipelineData.data){
        return(
            <div className='text-3xl h-[400px] flex justify-center items-center'>
                No pipelines Found
            </div>
        )
        
    }
  return (
    <div className='w-full flex flex-col gap-8'>

        <PageHeader
            leftIcon={<HomeIcon className='w-3 h-3'/>}
            mainIcon={<AlignRightIcon className='w-12 h-12'/>}
            rightIcon={<PanelLeftDashedIcon className='w-4 h-4'/>}
            heading="Keep track of all of your customers"
            placeholder="Search Name, Tag or Email"
        />
        <div className='flex overflow-x-auto pb-4 gap-4 md:gap-6'>
            {/* <p>lallala</p> */}
            
            {Object.entries(pipelineData.data).map(([columnType, columnData]) => (
                
                <PipelineLayout
                    key={columnType}
                    title={formatColumnTitle(columnType as AttendedTypeEnum)}
                    count={columnData.count}
                    users={columnData.users}
                    tags={pipelineData.webinarTag}
                />
            ))}
        </div>
    </div>
  )
}

export default page