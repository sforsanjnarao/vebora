'use client'
import React from 'react'
import { useWebinarStore } from '@/store/useWebinarStore'
import { Label } from '@/components/ui/label'
import { error } from 'console'
import { Input } from '@/components/ui/input'
import clsx from 'clsx'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon, Clock, Upload } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Props = {}

function BasicInfoStep(props: Props) {
  const {formData, updateBasicInfoField, getStepValidationErrors}=useWebinarStore()
  const { webinarName,description, date, time, timeFormat } = formData.basicInfo

  const handleChange=(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  )=>{
    const { name, value } = e.target
    updateBasicInfoField(name as keyof typeof formData.basicInfo, value)
  }

  const errors= getStepValidationErrors('basicInfo')

  const handleDateChange=(newDate:Date | undefined)=>{
    if(newDate){
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight for comparison
      if(newDate < today){
        toast.error('Selected date cannot be in the past.')
        console.log('Error: Selected date cannot be in the past.')
    }
    updateBasicInfoField('date', newDate)
  }
}
    const handleTimeFormatChange=(value:string)=>{
      updateBasicInfoField('timeFormat', value as 'AM' | 'PM')
    }

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Label
          htmlFor='webinarName'
          className={errors.webinarName ? 'text-red-400' : ''}
        >
          webinar name <span className='text-red-400'>*</span>
        </Label>

        <Input
          id='webinarName'
          name='webinarName'
          value={webinarName || ''}
          onChange={handleChange}
          placeholder='Enter webinar name'
          className={clsx(
            '!bg-background/50 border border-input', //agar error.webinarName trythy hoga so, it can mix with the classname, if it's falsy it's not
            errors.webinarName && 'border-red-400 focus-visible:ring-red-400'
          )}

        />
        {errors.webinarName && (
          <p className='text-red-400 text-sm mt-1'>{errors.webinarName}</p>
        )}

      </div>

      <div className='space-y-2'>
        <Label
            htmlFor='description'
            className={errors.description ? 'text-red-400' : ''}
          >
            Discription <span className='text-red-400'>*</span>
          </Label>

          <Textarea
            id='description'
            name='description'
            value={description || ''}
            onChange={handleChange}
            placeholder='Enter the description'
            className={clsx(
              '!bg-background/50 border border-input', //agar error.webinarName trythy hoga so, it can mix with the classname, if it's falsy it's not
              errors.description && 'border-red-400 focus-visible:ring-red-400'
            )}

          />
          {errors.description && (
            <p className='text-red-400 text-sm mt-1'>{errors.description}</p>
          )}
       </div>

       <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label className={errors.date ? 'text-red-400' : ' ' }>
            Webinar Date <span className='text-red-400'>*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant='outline'
                className={clsx(
                  "w-full justify-start text-left font-normal !bg-background/50 border border-input",
                  !date && 'text-gray-500',
                  errors.date && 'border-red-400 focus-visible:ring-red-400'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4'/>
                {date ? format(date, 'PPP'):"Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0 !bg-background/50 border border-input'
              onOpenAutoFocus={(e) => {
                e.preventDefault(); 
              }}
            >
              <Calendar
                mode='single'
                selected={date}
                onSelect={handleDateChange}
                initialFocus
                className='bg-background'
                disabled={(date)=>{
                  const today = new Date();
                  return date < today;
                }}
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className='text-red-400 text-sm mt-1'>{errors.date}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label className={errors.time ? 'text-red-400' : ''}>
            Webinar Time <span className='text-red-400'>*</span>
          </Label>
          <div className='flex gap-2'>
            <div className='relative flex-1'>
              <Clock className='absolute left-3 top-2.5 h-4 w-4 text-foreground'/>
              <Input
                name='time'
                value={time || ''}
                onChange={handleChange}
                placeholder='12:00'
                className={clsx(
                  'pl-9 !bg-background/50 border border-input',
                  errors.time && 'border-red-400 focus-visible:ring-red-400'
                )}
              />
            </div>
            <Select
              value={timeFormat || 'AM'}
              onValueChange={handleTimeFormatChange}
            >
              <SelectTrigger className='w-20 !bg-background/50 border border-input'>
                <SelectValue placeholder="AM" />
              </SelectTrigger>
              <SelectContent className='!bg-background border border-input'>
                <SelectItem value='AM'>AM</SelectItem>
                <SelectItem value='PM'>PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {errors.time && (
            <p className='text-red-400 text-sm mt-1'>{errors.time}</p>
          )}
        </div>
       </div>

          <div className='flex items-center gap-2 text-sm text-gray-400 mt-4'>
            <div className='flex items-center'>
              <Upload className='h-4 w-4 mr-2'/>
              Uploading a video makes this webinar pre-recorded
            </div>
            <Button
              variant={'outline'}
              className='ml-auto relative hover:bg-background border border-input'
            >
              Upload File
              <Input
                className='absolute inset-0 opacity-0 cursor-pointer'
                type='file'
              />
            </Button>
          </div>

    </div>
  )
}

export default BasicInfoStep