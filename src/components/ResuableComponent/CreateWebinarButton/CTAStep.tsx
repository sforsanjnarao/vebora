import React, { useState } from 'react'
import { useWebinarStore } from '@/store/useWebinarStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CtaTypeEnum } from '@/generated/prisma'

type Props = {}

function CTAStep({}: Props) {
    const { formData, updateCTAField, getStepValidationErrors, addTag, removeTag } = useWebinarStore()
    const { ctaLabel, tags, aiAgent, priceId, ctaType } = formData.cta

    const [tagInput, setTagInput] = useState<string>('')

    const errors= getStepValidationErrors('cta')
     
    const handleAddTag= (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault()
             addTag(tagInput.trim())
            setTagInput('')
        }
    }
    const handleSelectCTAType=(value: string) => {
        updateCTAField('ctaType', value as CtaTypeEnum)  
    //     value as CtaTypeEnum: this is a type assertion — telling TypeScript:
	// “I know value is one of the valid members of the CtaTypeEnum enum.” 
    }
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target
        updateCTAField(name as keyof typeof formData.cta, value)
    }
    



    return (
    <div className='space-y-6'>
        <div className='space-y-2'>
        <Label
          htmlFor='ctaLabel'
          className={errors.ctaLabel ? 'text-red-400' : ''}
        >
          CTA Label <span className='text-red-400'>*</span>
        </Label>

        <Input
          id='ctaLabel'
          name='ctaLabel'
          value={ctaLabel || ''}
          onChange={handleChange}
          placeholder='Enter webinar name'
          className={clsx(
            '!bg-background/50 border border-input', //agar error.ctaLabel trythy hoga so, it can mix with the classname, if it's falsy it's not
            errors.ctaLabel && 'border-red-400 focus-visible:ring-red-400'
          )}

        />
        {errors.ctaLabel && (
          <p className='text-red-400 text-sm mt-1'>{errors.ctaLabel}</p>
        )}

      </div>
        <div className='space-y-2'>
                <Label
                htmlFor='tags'
                className={errors.tags ? 'text-red-400' : ''}
                >
                Tags <span className='text-red-400'>*</span>
                </Label>
        
                <Input
                id='tags'
                name='tags'
                value={tagInput}
                onChange={(e)=> setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder='Add tags and press Enter'
                className={clsx(
                    '!bg-background/50 border border-input',
                    errors.tags && 'border-red-400 focus-visible:ring-red-400'
                )}
                />
                {tags && tags.length > 0 && (
                    <div>
                        {tags.map((tag: string, index: number) => (
                             <div key={index}
                             className='flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded-md'
                             >
                                {tag}
                                <button
                                onClick={()=> removeTag(tag)}
                                className='text-gray-400 hover:text-white transition-colors'
                                >
                                    <X className='h-3 w-3'/>
                                </button>
                            </div>
                        ))}
                        
                       
                    </div>
                )}
                {errors.tags && (
                <p className='text-red-400 text-sm mt-1'>{errors.tags}</p>
                )}
            </div>

            <div className='space-y-2 w-full'>
                <Label>CTA Types</Label>
                <Tabs
                    defaultValue={CtaTypeEnum.BOOK_A_CALL}
                    className='w-full'
                >
                    <TabsList className='w-full bg-transparent'>
                        <TabsTrigger
                            value={CtaTypeEnum.BOOK_A_CALL}
                            className='w-1/2 data-[state=active]:bg-backgroung/50'
                            onClick={()=>handleSelectCTAType(CtaTypeEnum.BOOK_A_CALL)}
                        >
                            Book a Call
                        </TabsTrigger>
                        <TabsTrigger
                            value={CtaTypeEnum.BUY_NOW}
                            className='w-1/2'
                            onClick={()=>handleSelectCTAType(CtaTypeEnum.BUY_NOW)}
                        >
                            Buy Now
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
    </div>
  )
}

export default CTAStep