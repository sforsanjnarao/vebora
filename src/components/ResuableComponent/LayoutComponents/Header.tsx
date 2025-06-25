"use client";
import { User } from '@/generated/prisma';
// import { trace } from 'node:console';
import {  useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap } from 'lucide-react';
import PurpleIcon from '../PurpleIcon/intex';
type Props = {user:User}

const Header = ({user}: Props) => {
    const pathname=usePathname();
    const router=useRouter();
    return(
        <div className='w-full px-4 pt-10 sticky top-0 z-10 flex justify-between items-center flex-wrap gap-4 bg-background'>
            {pathname.includes('pipline')?(
                <Button className='bg-primary/10 border border-border rounded-xl'
                variant={'outline'}
                onClick={()=>router.push('/webinars')}
                >
                    <ArrowLeft/> Back to webinars
                </Button>
            ):(
               <div className='px-4 py-2 flex justify-center text-bold items-center rounded-xl bg-background border border-border text-primary capitalize'>
                {pathname.split('/')[1]}
               </div> 
            ) }
            {/* TODO build stripe subscription and create webinars */}
            <div className='flex gap-6 items-center flex-wrap'>
                <PurpleIcon>
                    <Zap  />
                </PurpleIcon>
            </div>
        </div>
    )
}

export default Header;

// tsrfce