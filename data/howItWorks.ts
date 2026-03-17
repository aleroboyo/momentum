import { IconType } from "react-icons"
import { PiNumberCircleOne, PiNumberCircleTwo, PiNumberCircleThree } from "react-icons/pi"

export type Steps = {
    id: number
    stepNoIcon: IconType
    name: string
    description: string
    icon: string
}

export const howItWorks: Steps[] = [
    {
        id: 1,
        stepNoIcon: PiNumberCircleOne,
        name: "Create Your Habits",
        description: 'Choose the routines you want to build',
        icon: '/Lightbulb Transparent.png'

    },

    { 
        id: 2, 
        stepNoIcon: PiNumberCircleTwo,
        name: "Log Your Progress",
        description: "Mark habits complete and grow your streak",
        icon: '/Pencil Transparent.png'
    },

    { 
        id: 3, 
        stepNoIcon: PiNumberCircleThree,
        name: 'Build Momentum',
        description: "Watch your consistency turn into real progress." ,
        icon: '/Growth Chart Transparent.png'
    }

]