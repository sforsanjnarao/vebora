import React from 'react'

type Step={
    id: string
    title: string
    description: string
    component: React.ReactNode
}

type Props = {
    steps: Step[]
    onComplete: (id:string) => void
}

function MultiStepForm({steps, onComplete}: Props) {
  return (
    <div>MultiStepForm</div>
  )
}

export default MultiStepForm