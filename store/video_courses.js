//import { course, levels, video_courses } from '~/service_components/video_courses/video_courses.js'
import { course } from '~/service_components/video_courses/video_courses.js'

export const state = () => ({
    video_courses: [],
    blank_video_course: course,
    levels: [],//levels,
    views : {
        // "user1" : {
        //   "lesson2" : {
        //     "ended" : true,
        //     "playhead" : 0,
        //     "started" : true
        //   },
        //   "lesson3" : {
        //     "ended" : false,
        //     "playhead" : 10,
        //     "started" : true
        //   }
        // },
        // "xdUXIHkRfYO40hyW1wJdSAUZeUX2" : {
        //   "-MYz3JJ15hcL0gg0mki1" : {
        //     "ended" : false,
        //     "playhead" : 0,
        //     "started" : true
        //   }
        // }
      }
})

export const getters = {
    get_video_courses: (state) => {
        //alert('In getters ' + state.video_courses.length)
        return state.video_courses
    },
    get_video_course: (state, title) => {
        return state.video_courses.find((video_course) => video_course.title === title)
    },
    get_courses_by_page: (state, page, numberPerPage) => {
        var start = (page === 1) ? 1 : ((numberPerPage * (page - 1)) + 1)
        var end = start + numberPerPage - 1
        return state.video_courses.slice(start, end)
    },
    get_levels: (state) => {
        // alert('about to get levels, contains ' + state.levels.length) 
        return state.levels
    }
}

export const mutations = {
    UPDATE_LESSON_ACTIVE_STATUS (state, {lesson, status}) {
        //alert('In UPDATE_LESSON_ACTIVE_STATUS: ' + status)
        lesson.active = status
        // var video_course = state.video_courses.find((video_course) => video_course.title === title)


        // video_course.lessons.forEach((lesson) => {
        //     lesson = {...lesson, title: lesson, active: false}
        //     // alert(lesson.title + ' ' + lesson.active)
        // })
        
    },
    LOAD_COURSES_TO_STORE (state, { courses }) {
        state.video_courses = []
        state.video_courses = courses 
    },
    LOAD_LEVELS_TO_STORE (state, { levels }) {
        state.levels = []
        state.levels = levels 
        // alert('levels loaded to store')
    },
    SAVE_LESSONS_STARTED_STATUS (state, { userId, lessonId }) {
        // alert('In SAVE_LESSONS_COMPLETION_STATUS')

        var userHistory = state.views[userId]

        // alert('In mutations to save lesson' + userHistory)
        
        if(userHistory) {
            // 'If user is in store'
            userHistory[lessonId].stared = true
            //alert('History saved in store for existing user')
        } else {
            // 'If user not in store'
            state.views[userId] = {}
            state.views[userId][lessonId] = {
                started: true,
                ended: false,
                playhead: 0
            }

            //alert('History saved in store for new user')
        }
        
    },
    SAVE_LESSONS_COMPLETION_STATUS (state, { userId, lessonId, payload }) {
        // alert('In SAVE_LESSONS_COMPLETION_STATUS')

        var userHistory = state.views[userId]

        // alert('In mutations to save lesson' + userHistory)
        
        if(userHistory) {
            // 'If user is in store'
            userHistory[lessonId] = payload
            //alert('History saved in store for existing user')
        } else {
            // 'If user not in store'
            state.views[userId] = {}
            state.views[userId][lessonId] = payload

            //alert('History saved in store for new user')
        }
        
    },
    SAVE_LAST_PLAYHEAD_TIME (state, { userId, lessonId, currentTime }) {
        // alert('In SAVE_LAST_PLAYHEAD_TIME')

        var userHistory = state.views[userId]

        // alert('In mutations to save lesson' + userHistory)
        
        if(userHistory) {
            // 'If user is in store'
            if(userHistory[lessonId]) {
                userHistory[lessonId].playhead = currentTime
            } else {
                userHistory[lessonId] = {
                    end: false,
                    payhead: currentTime,
                    start: true
                }
            }
            // alert('Playhead time saved in store for existing user')
        }
        // } else {
        //     // 'If user not in store'
        //     state.views[userId] = {}
        //     state.views[userId][lessonId] = payload

        //     // alert('Playhead time saved in store for new user')
        // }
        
    },
}

export const actions = {
    loadCoursesToStore(context, { courses }){
        //alert('about to load courses to store ' + courses.length)
        context.commit('LOAD_COURSES_TO_STORE', { courses })
    },
    loadLevelsToStore(context, {levels}){
        // alert('about to load levels to store')
        context.commit('LOAD_LEVELS_TO_STORE', { levels })
        // alert('levels loaded')
    },
    saveLessonStartedStatus(context, { userId, lessonId }){
        // alert('in save lesson completion status')
        context.commit('SAVE_LESSONS_STARTED_STATUS', { userId, lessonId })
    },
    saveLessonCompletionStatus(context, { userId, lessonId, payload }){
        // alert('in save lesson completion status')
        context.commit('SAVE_LESSONS_COMPLETION_STATUS', { userId, lessonId, payload })
    },
    saveLastPlayHeadTime(context, { userId, lessonId, payload }){
        // alert('in saveLastPlayHeadTime')
        context.commit('SAVE_LAST_PLAYHEAD_TIME', { userId, lessonId, payload })
    },
}