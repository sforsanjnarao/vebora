"use client"
import React from 'react'
import { useWebinarStore } from '@/store/useWebinarStore'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import clsx from 'clsx'
import { Info } from 'lucide-react'

type Props = {}

function AdditionalInfoStep({}: Props) {
    const { formData, updateAdditionalInfoField, getStepValidationErrors } = useWebinarStore()
    const {lockChat, couponCode, couponEnabled}= formData.additionalInfo

   const handleToggleLockChat=(checked: boolean)=>{
    updateAdditionalInfoField('lockChat', checked)
    }

    const handleToggleCoupon=(checked: boolean)=>{
        updateAdditionalInfoField('couponEnabled', checked)
    }

    const handleCouponCodeChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        updateAdditionalInfoField('couponCode', e.target.value)
    }

    const errors= getStepValidationErrors('additionalInfo')
   

  return (
    <div className='space-y-8'>
        <div className='flex items-center justify-between'>
            <div>
                <Label 
                    htmlFor='lock-chat'
                    className='text-base font-medium'
                >
                    Lock Chat 
                </Label>
                <p className='text-sm text-gray-400'>
                    Turn it on to make chat visible to your users at all time
                </p>
            </div>
            <Switch
            id='lock-chat'
            checked={lockChat || false}
            onCheckedChange={handleToggleLockChat}
            />

        </div>
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <Label 
                        htmlFor='coupon-enabled'
                        className='text-base font-medium'
                    >
                        Coupon Code
                    </Label>
                    <p className='text-sm text-gray-400'>
                        Turn it on to offer discounts to your viewers
                    </p>
                </div>
                <Switch
                id='coupon-enabled'
                checked={lockChat || false}
                onCheckedChange={handleToggleCoupon}
                />

            </div>
            {couponEnabled && (
                <div className='space-y-2'>
                    <Input
                        id='coupon-code'
                        name='couponCode'
                        value={couponCode || ''}
                        onChange={handleCouponCodeChange}
                        placeholder='Enter coupon code'
                        className={clsx('!bg-background/50 border border-input',
                            errors.couponCode && 'border-red-400 focus-visible:ring-red-400'
                        )}
                    />
                    {errors.couponCode && (
                        <p className='text-red-400 text-sm'>{errors.couponCode}</p>
                    )}
                    <div>
                        <Info className='h-4 w-4 mt-0.5'/>
                        <p>
                            This coupon code can be used to promote a sale. Users can use it for the buy now CTA
                        </p>
                    </div>
                </div>

            )
                    }
        </div>
    </div>
  )
}

export default AdditionalInfoStep