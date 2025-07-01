import PageHeader from '@/components/ResuableComponent/PageHeader'
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
    </div>
  )
}

export default page