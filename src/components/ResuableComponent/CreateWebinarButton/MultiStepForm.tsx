import React, {useState} from 'react'
import { useWebinarStore } from '@/store/useWebinarStore'
import {AnimatePresence, motion} from 'framer-motion'
import { Check } from 'lucide-react'

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
    const {formData, validateSteps, isSubmitting, setSubmitting, setModalOpen}=useWebinarStore()

    const [currentStepIndex, setCurrentStepIndex]=useState(0)
    const [completedSteps, setCompletedSteps]=useState<string[]>([])
    const [validationErrors, setValidationErrors]=useState<string | null>(null)
    // const [completedSteps, setCompletedSteps]=useState<string[]>([])

    const currentSteps=steps[currentStepIndex]
    const idFirstStep = currentStepIndex === 0
    const isLastStep = currentStepIndex=== steps.length - 1
  return (
    <div className='flex flex-col justify-center items-center bg-[#27272A]/20 border border-border rounded-3xl overflow-hidden max-w-6xl mx-auto backdrop-blur-[106px]'>
        <div className='flex items-center justify-start'>
            <div className='w-full md:w-1/3 p-6'>
                <div className='space-y-6'>
                    {steps.map((step, index) => {
                        const isCompleted= completedSteps.includes(step.id)
                        const isCurrent = index === currentStepIndex
                        const isPast = index < currentStepIndex
                        return(
                            
                            <div key={step.id}  className='relative'>
                                <div className='flex items-start gap-4'>
                                    <div className='relative'> 
                                        <motion.div 
                                            initial={false}
                                            animate={{
                                                backgroundColor: isCurrent || isCompleted
                                                ? "rgb(147,51,234)"
                                                : "rgb(31,41,55)",
                                                scale: [isCurrent && !isCompleted ? 0.8 : 1, 1],
                                                transition:{ duration: 0.3 },
                                            }}

                                            className='flex items-center justify-center w-8 h-8 rounded-full z-10'
                                        >
                                            <AnimatePresence mode='wait'>
                                                {isCompleted ? (
                                                    <motion.div
                                                        key='check'
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <Check className='w-5 h-5 text-white'/> 
                                                    </motion.div>
                                                ):(
                                                    <motion.div
                                                        key='number'
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                        transition={{ duration: 0.2 }}
                                                        className='text-white'
                                                    >
                                                        <Check className='w-5 h-5 text-white/50'/>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default MultiStepForm