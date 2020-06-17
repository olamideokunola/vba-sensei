import { course, levels, video_courses } from '~/service_components/video_courses/video_courses.js'

export const state = () => ({
    video_courses,
    blank_video_course: course,
    levels: levels
})

export const getters = {
    get_video_courses: (state) => {
        return state.video_courses
    },
    get_video_course: (state, title) => {
        return state.video_courses.find((video_course) => video_course.title === title)
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
        
    }
}

export const actions = {

}