import { app, db } from '../fbSetup.js'

import { getDatabase, ref, onValue } from "firebase/database";

function useCourseDataRepository(courseData) {

    let getCourseWithId = async (courseId) => {
        alert(courseId)
        const dbase = getDatabase()

        // alert(`${Object.keys(app)}`)

        // alert(`${Object.keys(dbase)}`)
       
        const courseRef = ref(dbase, 'courses/' + courseId)

        // alert(courseRef)

        onValue(courseRef, (snapshot) => {
            courseData = snapshot.val()
            return snapshot.val()
        })
    }
    
    let getLessonsWithCourseId = async (lessonId) => {

    } 

    return {
        getCourseWithId,
        getLessonsWithCourseId, 
    }
}

export { useCourseDataRepository }