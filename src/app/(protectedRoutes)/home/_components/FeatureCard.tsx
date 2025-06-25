import Link from 'next/link'
import React from 'react'

type Props = {
    Icon: React.ReactNode
    heading: string
    link: string
}

function FeatureCard({Icon, heading, link}: Props) {
  return (
    <div>
        <Link 
            href={link} 
            className="px-8 py-6 flex flex-col items-start justify-center gap-14 rounded-xl border border-border bg-secondary backdrop-blur-xl"
        >
        {Icon}
        <p className='font-semibold text-xl text-primary'>{heading}</p>
        </Link>
    </div>
  )
}

export default FeatureCard