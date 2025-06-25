import { Bolt, HouseIcon, Sparkle, Triangle, UserRound, Webcam } from "lucide-react";

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