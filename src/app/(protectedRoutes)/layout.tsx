

import { onAuthenticateUser } from '@/actions/auth';
import Header from '@/components/ResuableComponent/LayoutComponents/Header';
import Sidebar  from '@/components/ResuableComponent/LayoutComponents/Sidebar';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
    children: React.ReactNode;
}
const Layout=async ({ children }:Props) => {
    const userExist=await onAuthenticateUser();
    if(!userExist.user){
        redirect('/sign-in');
    }

    return (
        <div className='flex w-full min-h-screen'>
            {/* SIDEBAR */}
            <Sidebar/>
            <div className='flex flex-col w-full h-screen overflow-auto px-4 scrollbar-hide container mx-auto'>
                {/* HEADER */}
                <Header user={userExist.user} />
                <div className='flex-1 py-10'>{children}</div>
            </div>
        </div>
    );
}

export default Layout;