'use client'
import { onBoardingSteps } from '@/lib/data'
import { CircleCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'




const OnBoarding = () => {
    return (
        <div>
            {onBoardingSteps.map((steps, index)=>(
                <Link
                    key={index}
                    href={steps.link}
                    className='flex items-center gap-2'
                    >
                        <CircleCheck/>
                        <p className='text-base text-foreground'>{steps.title}</p>
                    </Link>
            ))}
        </div>
    )
}
export default OnBoarding