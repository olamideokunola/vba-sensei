import { app, db } from '../fbSetup.js'

import { getDatabase, ref, onValue } from "firebase/database";
import { Course, LessonSection } from '../../entities/course.js';
import { async } from '@firebase/util';

function useCourseDataRepository() {

    // const dbase = getDatabase()
    let getCourseRef = (courseId) => {
        return ref(db, 'courses/'+courseId)
    }

    let getLessonRef = (id) => {
        return ref(db, 'lessons/'+id)
    }

    let getSectionsRef = (lessonId) => {
        return ref(db, 'sections/'+id)
    }

    let getCourseWithId = async (courseId) => {
        // alert(courseId)
        let courseData = await getCourse(courseId)
        
        let course = new Course(courseData)

        Object.keys(courseData.lessons).forEach(async(lesId) => {
            course.addLesson(await getLessonWithId(lesId))
        })

        course.add

        return course //.addLessons(lessons)
    }

    let getCourse = (id) => {
        return new Promise((resolve, reject) => {
            try {
                onValue(getCourseRef(id), (snapshot) => {
                    const data = snapshot.val();
                    resolve(data)
                })
            } catch (e) {
                reject(e)
            }
        })
    } 

    let getLessonWithId = (id) => {
        return new Promise((resolve, reject) => {
            try {
                onValue(getLessonRef(id), (snapshot) => {
                    const data = snapshot.val();
                    resolve(data)                    
                })
            } catch (e) {
                reject(e)
            }
        })
    } 

    let getSectionsWithLessonId = (lessonId) => {
        return new Promise((resolve, reject) => {
            try{
                onValue(getSectionsRef(lessonId), (snapshot) => {

                    let sections = []

                    snapshot.forEach((childSnapshot) => {
                        const childKey = childSnapshot.key;
                        const childData = childSnapshot.val();
                        
                        let section = new LessonSection({
                            id: childKey,
                            orderId: childData.order,
                            title: childData.title,
                            text: childData.text
                        })
                        
                        sections.push(section)
                        
                    });

                    resolve(sections)
                  }, {
                    onlyOnce: true
                  });
            } catch (e) {
                console.log(e)
                reject(e)
            }
        })
    }

    // let getLessonWithId = (id, addToLessons) => {
    //     // onValue(getLessonRef(id), (snapshot) => {
    //     //     const lesson = snapshot.val()
    //     //     addToLessons(lesson)
    //     // })

    //     return new Promise((resolve, reject) => {
    //         onValue(getLessonRef(id), (snapshot) => {
    //             try {
    //                 resolve(snapshot.val())
    //             } catch (e) {
    //                 reject(e)
    //             }
                
    //         })
    //     })
    // } 

    return {
        getCourseWithId,
    }
}

export { useCourseDataRepository }