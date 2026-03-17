export type Feature = {
    id: number
    name: string
    description: string
    icon: string
}

export const appFeatures: Feature[] = [
    {
        id: 1,
        name: "Track Your Habits",
        description: 'Create habits and mark them complete each day to stay consistent.',
        icon: '/Track Habits Icon _Transparent.png'
    },

    { 
        id: 2, 
        name: "Build Streaks",
        description: "Keep your streak alive by completing habits daily and building long-term consistency.",
        icon: '/Motivational Streaks.png'
    },

    { 
        id: 3, 
        name: 'Habit Analytics',
        description: "See your progress with simple insights that show how consistent you really are." ,
        icon: '/Progress Insights.png'
    },

    { 
        id: 4, 
        name: 'Multiple Habits',
        description: "Track several habits at once and improve different areas of your life.",
        icon: '/Multiple Habits Icon _Transparent.png'
    }

]