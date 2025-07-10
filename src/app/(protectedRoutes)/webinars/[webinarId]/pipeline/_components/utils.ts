import { AttendedTypeEnum } from "@/generated/prisma";

export const formatColumnTitle= (columnType: AttendedTypeEnum):
string => {
    return columnType
    .split('_')
    .map((word)=> word.charAt(0)+ word.slice(1).toLowerCase())
    .join(' ')
}