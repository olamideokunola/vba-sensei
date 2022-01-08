import { useCourseDataRepository } from '../datarepository/useCourseDataRepository.js'
import { Course, Lesson } from  '~/entities/course.js'

function useManageCourse(courseAndLessons) {

    const courseData = {}

    const { 
        getCourseWithId,
        getLessonsWithCourseId, 
    } = useCourseDataRepository()

    const createCourse = ({title, description}) => {

    }    

    const createLesson = ({course, title, description}) => {

    }

    const createSection = ({course, title, description}) => {

    }

    const getCourseAndLessons = async (courseId) => {

        try {
            alert(courseId)

            return await getCourseWithId(courseId)

            // getCourseWithId(courseId, (courseData, lessonsData) => {

            //     course = new Course(courseData)

            //     course.addLessons(lessonsData)

            //     setCourse(course)
            // })

            // alert(`coursedata is ${Object.keys(courseData)}`)

            // let course = new Course({...courseData})
            
            // lessonsData.forEach((lessonData) => {
            //     let newLesson = new Lesson({...lessonsData})
            //     lessonsData.sections.forEach((section) => {
            //         newLesson.addSection(new section({...section}))    
            //     })
            //     course.addLesson(newLesson)
            // })

            // courseAndLessons = course
    
        } catch (e) {
            alert(e)
        }
        
    }

    return {
        getCourseAndLessons
    }

}

export { useManageCourse }