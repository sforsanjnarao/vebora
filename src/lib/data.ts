import { Bolt, HouseIcon, Sparkle, UserRound, Webcam } from "lucide-react";
import { CallStatusEnum } from "@/generated/prisma";


export const sidebarData = [
    {
        id:1,
        title:"Home",
        icon:HouseIcon,
        link:"/home"
    },
    {
        id:2,
        title:"Webinar",
        icon:Webcam,
        link:"/ebinar"
    },
    {
        id:3,
        title:"Leads",
        icon:UserRound,
        link:"/lead"
    },
    {
        id:4,
        title:"Ai Agent",
        icon:Sparkle,
        link:"/ai-agents"
    },
    {
        id:5,
        title:"Settings",
        icon:Bolt,
        link:"/settings"
    }
]

export const onBoardingSteps = [
    {
        id: 1,
        title: "Create a webinar",
        completed: false,
        link: ""
    },
    {
        id: 2,
        title: "Get leads",
        completed: false,
        link: ""
    },
    {
        id: 3,
        title: "Conversion status",
        completed: false,
        link: ""
    }
];

export const potentialCustomer = [
    {
      id: '1',
      name: 'John Doe',
      email: 'Johndoe@gmail.com',
      clerkId: '1',
      profileImage: '/vercel.svg',
      isActive: true,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      tags: ['New', 'Hot Lead'],
      callStatus: CallStatusEnum.COMPLETED,
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'Johndoe@gmail.com',
      clerkId: '2',
      profileImage: '/vercel.svg',
      isActive: true,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      tags: ['New', 'Hot Lead'],
      callStatus: CallStatusEnum.COMPLETED,
    },
    {
      id: '3',
      name: 'John Doe',
      email: 'Johndoe@gmail.com',
      clerkId: '3',
      profileImage: '/vercel.svg',
      isActive: true,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      tags: ['New', 'Hot Lead'],
      callStatus: CallStatusEnum.COMPLETED,
    },
  ]