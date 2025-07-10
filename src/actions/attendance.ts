'use server'

import { AttendedTypeEnum, CtaTypeEnum } from "@/generated/prisma";
import { prismaClient } from "@/lib/prismaClient";
import { AttendanceData } from "@/lib/type";
// import { revalidatePath } from "next/cache";

export const getWebinarAttendance = async (
    webinarId: string,
    options:{
        includeUsers?: boolean;
        userLimit?: number;
    }={ includeUsers: true, userLimit: 100 }
) => {
    try{
        const webinar= await prismaClient.webinar.findUnique({
            where: { id: webinarId },
            select: {
                id: true,
                ctaType:true,
                tags:true,
                _count: {
                    select: { attendances: true }
                }
            }
        })
        if (!webinar) {
            return { status: 404, success:false, message: 'Webinar not found' };
        }
        const attendanceCounts= await prismaClient.attendance.groupBy({
            by: ['attendedType'],
            where: { webinarId },
            _count: {
                attendedType: true
            }
        })
        const result: Record<AttendedTypeEnum, AttendanceData>={} as
        Record<AttendedTypeEnum, AttendanceData>;

        for(const type of Object.values(AttendedTypeEnum)){
            if(type===AttendedTypeEnum.ADDED_TO_CART && webinar.ctaType === CtaTypeEnum.BOOK_A_CALL)
                continue; // Skip ADDED_TO_CART for BOOK_A_CALL webinars

            if(type===AttendedTypeEnum.BREAKOUT_ROOM && webinar.ctaType !== CtaTypeEnum.BOOK_A_CALL)
                continue; 

            const countItem= attendanceCounts.find((item)=>{
                if(webinar.ctaType === CtaTypeEnum.BOOK_A_CALL && 
                    type === AttendedTypeEnum.BREAKOUT_ROOM &&
                    item.attendedType === AttendedTypeEnum.ADDED_TO_CART
                ){
                  
                  return true
                }
                return item.attendedType === type;
            })
            result[type] = {
                count: countItem ? countItem._count.attendedType : 0,
                users: [],
            }
        }
        if(options.includeUsers){
            for(const type of Object.values(AttendedTypeEnum)) {
                if(
            (type===AttendedTypeEnum.ADDED_TO_CART && webinar.ctaType === CtaTypeEnum.BOOK_A_CALL)
             ||
            (type===AttendedTypeEnum.BREAKOUT_ROOM && webinar.ctaType !== CtaTypeEnum.BOOK_A_CALL)

                ){
                    continue; 
                }
                const queryType=
                webinar.ctaType === CtaTypeEnum.BOOK_A_CALL && 
                type === AttendedTypeEnum.BREAKOUT_ROOM
                 ? AttendedTypeEnum.ADDED_TO_CART 
                 : type

                if(result[type].count > 0){
                    const attendances= await prismaClient.attendance.findMany({
                        where:{
                            webinarId,
                            attendedType:queryType,
                        },
                        include:{
                            user: true,
                        },
                        take: options.userLimit, //limit the no. of user

                        orderBy:{
                            joinedAt:"desc" //most recent first
                        },
                    })
                    result[type].users=attendances.map((attendance)=>({
                        id: attendance.user.id,
                        name: attendance.user.name,
                        email: attendance.user.email,
                        attendedAt: attendance.joinedAt,
                        stripeConnectId: null,
                        callStatus: attendance.user.callStatus
                    }))
                }
            }
        }

        // revalidatePath(`/webinars/${webinarId}/pipelines`)
        return{
            success:true,
            data: result,
            ctaType:webinar,
            webinarTag: webinar.tags || []
        }
            
    }catch (error) {
        console.error('Error fetching webinar:', error);
        return { status: 500, success:false, message: 'Failed to fetch webinar' };
    }
}