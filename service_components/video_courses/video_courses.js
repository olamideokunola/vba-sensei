const course = {
    title: '',
    description: '',
    duration: '',
    level: '',
    lessons: []
}

const levels = [
    'Beginner',
    'Intermediate'
]

const video_courses = [
    // {
    //     title: 'Programming Fundamentals',
    //     description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd.',
    //     duration: '60 mins',
    //     level: 'Beginner',
    //     lessons: [
    //         {title: 'Introduction', active:false},
    //         {title: 'Expressions Operators & Types', active:false},
    //     ]
    // },
    {
        title: 'Setting up the Environment',
        description: 'Learn how to activate the Developer tab in Microsoft Excel, start up the Visual Basic Editor, identify the various sections and windows available in the Editor, and know the tasks that can be accomplished in each of the sections.',
        duration: '1 hour',
        level: 'Beginner',
        lessons: [
            {title: 'Activating Developer Tab in MS Excel', active:false},
            {title: 'Visual Basic Editor, Interface and tools in MS Excel', active:false},
        ]
    },
    // {
    //     title: 'Functions & Subroutines',
    //     description: '',
    //     duration: '1 hour',
    //     level: 'Intermediate',
    //     lessons: [
    //         {title: 'Functions', active:false},
    //         {title: 'Subroutines', active:false},
    //     ]
    // }
]

export { course, levels, video_courses }