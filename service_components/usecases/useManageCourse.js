import { useCourseDataRepository } from '../datarepository/useCourseDataRepository.js'
import { Course, Lesson } from  '~/entities/course.js'

function useManageCourse(courseAndLessons) {

    const courseData = {}

    const { 
        getCourseWithId,
        getLessonsWithCourseId, 
    } = useCourseDataRepository(courseData)

    const createCourse = ({title, description}) => {

    }    

    const createLesson = ({course, title, description}) => {

    }

    const createSection = ({course, title, description}) => {

    }

    const getCourseAndLessons = async (courseId) => {
        alert(courseId)
        await getCourseWithId(courseId)
        alert(`courseId: ` + 2)
        let lessonsData = await getLessonsWithCourseId(courseId)

        alert(`coursedata is ${Object.keys(courseData)}`)

        // let course = new Course({...courseData})
        
        // lessonsData.forEach((lessonData) => {
        //     let newLesson = new Lesson({...lessonsData})
        //     lessonsData.sections.forEach((section) => {
        //         newLesson.addSection(new section({...section}))    
        //     })
        //     course.addLesson(newLesson)
        // })

        // courseAndLessons = course
    }

    return {
        getCourseAndLessons
    }

}

export { useManageCourse }