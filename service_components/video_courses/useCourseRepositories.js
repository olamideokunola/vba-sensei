import {
    defineComponent,
    useFetch,
    useContext,
    ref,
    computed,
    useAsync,
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

import { useLessonViewHistory } from '~/service_components/video_courses/useLessonViewHistory.js'
import { useAuthRepositories } from '~/service_components/video_courses/useAuthRepositories.js'

function useCourseRepositories(fire) {
    const levels = ref({})
    const statuses = ref({})
    const lessons = ref({})
    const course = ref({})
    //const { fire } = useContext()

    const {
        getDownloadUrl,
        getLessonsViewHistories
    } = useLessonViewHistory(fire)

    const {
        authUser
    } = useAuthRepositories()
    
    const getLevels = async () => {
        // get levels
        // alert("In get levels!" + $fire.app.name)
        const levelsRef = fire.database.ref('levels')
        const levelsSnapshot = await levelsRef.once('value')
        // alert("level count: " + $fire.database.ref.key)
        
        var levels = {}
        // alert("level count: " + levels)

        levelsSnapshot.forEach((snapshot) => {
            levels[snapshot.key] = snapshot.val().title
            //alert( snapshot.val().title)
        })
       
        return levels
    }

    const levelsList = ref([])

    const getLevelsAsList = async() => {
        var levels = await getLevels()

        levelsList.value = []

        Object.keys(levels).forEach((key) => {
            levelsList.value.push(
                {
                    id: key,
                    title: levels[key]
                }
            )
        })
        // alert('In service number of levels is ' + levelsList.length)
        return levelsList.value
    }

    const getLessons = async () => {
        // get lessons
        // alert('in getLessons!')
        const ref = fire.database.ref('lessons')
        const snapshot = await ref.once('value')

        lessons.value = {}

        // alert('In getLessons, userId is ' + authUser.value.uid)

        const lessonsViewHistories = await getLessonsViewHistories({ userId: authUser.value.uid})
        
        // alert('In getLessons, number lessons with history is ' + Object.keys(lessonsViewHistories).length)
        snapshot.forEach((childsnapshot) => {
            lessons.value[childsnapshot.key] = 
            {
                id: childsnapshot.key,
                title: childsnapshot.val().title,
                description: childsnapshot.val().description,
                videoFileName: childsnapshot.val().videoFileName,
                viewHistory: lessonsViewHistories[childsnapshot.key]
            }
        })

        // alert('lessons: ' + lessons.value.length)
        return lessons.value
    }

    const lessonsAsList = ref([])

    const getLessonsAsList = async () => {
        // get lessons
        // alert('In getLessonsAsList!')
        const lessons = await getLessons()

        lessonsAsList.value = []

        Object.keys(lessons).forEach((key) => {
            levelsList.value.push(lessons[key])
        })

        return lessonsAsList.value
    }

    const getCourseStatuses = async () => {
        // get courseStatuses
        const courseStatusesRef = fire.database.ref('activecourses')
        const courseStatusesSnapshot = await courseStatusesRef.once('value')
        
        var courseStatuses = {}

        courseStatusesSnapshot.forEach((snapshot) => {
            courseStatuses[snapshot.key] = snapshot.val()
        })
       
        return courseStatuses
    }

    const getCourse = async (id) => {
        //alert('In getCourse ' + id)
        // get levels
        levels.value = await getLevels()

        // get statuses
        statuses.value = await getCourseStatuses()
        
        const ref = fire.database.ref('courses/'+id)
        const snapshot = await ref.once('value')

        //alert('In getCourse ' + 'courses/'+id)

        course.value = setCourseFromSnapshot(snapshot, levels, statuses)
       // alert('In getCourse ' + id)
        //alert('title is ' + course.title)
        return course.value
    }

    const courseLessons = ref([])

    const getLessonSections = async(id) => {
        try {
            // alert('In get lesson`')
            const lessonSections = []

            const ref = fire.database.ref('lessonSections/'+id+'/sections')
            const snapshot = await ref.once('value')
            
            snapshot.forEach((childsnapshot) => {
                // alert('In foreach')
                if(childsnapshot.val()){
                    // var videoUrl =   await getDownloadUrl(childsnapshot.key)
                    lessonSections.push({
                        id: childsnapshot.key,
                        title: lessons[childsnapshot.key].title,
                        videoFileName: lessons[childsnapshot.key].videoFileName, 
                        videoUrl: ''
                    })
                }
            })

        } catch(e) {
            alert('in error is ' + e.message)
        }
    }

    const getCourseLessons = async(id) => {
        try {
            const lessons = await getLessons()

            const ref = fire.database.ref('courses/'+id+'/lessons')
            const snapshot = await ref.once('value')

            // reset
            courseLessons.value = []

            const _courselessons = []

            snapshot.forEach((childsnapshot) => {
                // alert('In foreach')
                if(childsnapshot.val()){
                    // var videoUrl =   await getDownloadUrl(childsnapshot.key)
                    _courselessons.push({
                        id: childsnapshot.key,
                        title: lessons[childsnapshot.key].title,
                        description: lessons[childsnapshot.key].description,
                        videoFileName: lessons[childsnapshot.key].videoFileName, 
                        videoUrl: ''
                    })
                }
            })

            const promises = _courselessons.map(async (lesson) => {
                // alert('in promises loop')
                alert(lesson.title)
                return {
                    id: lesson.id,
                    title: lesson.title,
                    description: lesson.description,
                    videoFileName: lesson.videoFileName,
                    videoUrl: await getDownloadUrl(lesson.id),
                    lessonSections: await getLessonSections(lesson.id)
                }
            })

            courseLessons.value = await Promise.all(promises)
            // alert('In getCourseLessons, items are ' + promises.length)

            return courseLessons.value
        
        } catch (e) {
            console.log('in error is ' + e.message)
        }
    }
    
    var courseItems = ref([])

    const getCourses = async () => {
        
        // get levels
        levels.value = await getLevels()

        // get statuses
        statuses.value = await getCourseStatuses()
        
        // get lessons
        lessons.value = await getLessons()

        // get courses
        const courseItemsRef = fire.database.ref('courses')
        const courseItemsSnapshot = await courseItemsRef.once('value')
        
        courseItems.value = []
    
        courseItemsSnapshot.forEach((snapshot) => {
            courseItems.value.push(
                setCourseFromSnapshot(snapshot, levels, statuses)
            )
        })

        // alert('courseItems: ' + courseItems.length)
        return courseItems.value
    }

    const getCourseLessonsForSnapshot = (snapshot) => {
        
        var courseLessons = []
        var lessonssnapshot = snapshot.child("lessons").val()

        // alert(lessonssnapshot)

        if(lessonssnapshot && Object.keys(lessonssnapshot).length > 0){
            Object.keys(lessonssnapshot).forEach((lessonkey) => {
                if(lessonssnapshot[lessonkey]){
                    // get lesson video url
                    courseLessons.push(lessons.value[lessonkey])
                }
            })
            // alert('In getCourseLessonsForSnapshot ')
            return courseLessons
        } else {
            
            return []
        }
        
    }

    const setCourseFromSnapshot = (snapshot, levels, statuses) => {
       
        var courseLessons = getCourseLessonsForSnapshot(snapshot)
        // alert('In setCourseFromSnapshot, snapshot description is ' + snapshot.val().description)
        return {
            id: snapshot.key,
            title: snapshot.val().title,
            description: snapshot.val().description,
            level: { id: snapshot.val().level, title: levels.value[snapshot.val().level]},
            duration: snapshot.val().duration,
            // numberOfLessons: Object.keys(snapshot.child("lessons").val()).length,
            active: statuses.value[snapshot.key],
            lessons: courseLessons// lessons.value.filter((lesson) => snapshot.child("lessons").val())
        }
    }

    const saveNewCourse = ({ title, description, level, lessons, active, duration }) => {
        alert('In save course!')

        alert('About to save course!' +  title)

        // prepare lessons
        var lessonObj = {}

        if(lessons)
        {
            lessons.forEach((lesson) =>
                lessonObj[lesson.id] = true
            )
        }

        // Get course Ref and set
        var newCourseRef = fire.database.ref('courses').push()
        newCourseRef.set(
            {
                title: title,
                description: description,
                duration: duration,
                level: level.id,
                lessons: lessonObj
            }
        ) 

        // Get course StatusRef and set
        fire.database.ref('activecourses/' + newCourseRef.key).set(active) 
    
        return newCourseRef.key
    }

    const saveCourse = (courseItem) => {
        
        // prepare lessons
        var lessonObj = {}

        if(courseItem.lessons)
        {
            courseItem.lessons.forEach((lesson) =>
                lessonObj[lesson.id] = true
            )
        }

        // Get course Ref and set
        fire.database.ref('courses/' + courseItem.id).set(
            {
                title: courseItem.title,
                description: courseItem.description,
                duration: courseItem.duration,
                level: courseItem.level.id,
                lessons: lessonObj
            }
        ) 

        // Get course StatusRef and set
        fire.database.ref('activecourses/' + courseItem.id).set(courseItem.active) 
    }

    const videoFolder = ref('lessonvideos')

    const saveNewLesson = ({courseId, newLesson}) => {
        // Get Lesson reference
        var lessonsRef = fire.database.ref('lessons')
        var newLessonRef = lessonsRef.push()
        var lessonId = newLessonRef.key

        // Save lesson
        newLessonRef.set({
            title: newLesson.title,
            videoFileName: newLesson.title
        })

        // Add to course 
        var lessonInCourseRef = fire.database.ref('courses/' + courseId + '/lessons/' + lessonId)
        lessonInCourseRef.set(true)

        return lessonId
    }

    const uploadLessonVideo = async ({lessonId, videoFile}) => {
        alert('In uploadLessonVideo')
        const storageRef = fire.storage.ref().child('lessonvideos/' + lessonId + '.mp4')
        // const message = 'Nuxt-Fire with Firebase Storage rocks!'
        try {
            const snapshot = await storageRef.put(videoFile)
            alert('File uploaded.')
        } catch (e) {
            alert('Error in uploadLessonVideo: ' + e.message)
        }
    }

    const lessonVideoRef = (lessonId) => {
        return fire.storage.ref().child('lessonvideos/' + lessonId + '.mp4')
    }

    const lessonDbRef = (lessonId) => {
        return fire.database.ref('lessons/' + lessonId)
    }

    const deleteLessonVideo = async (lessonId) => {
        // alert('In delete lesson video')
        try{
            await lessonVideoRef(lessonId).delete()
        } catch (e) {
            alert('error in deleteLessonVideo: ' + e)
        }
    }

    const deleteLessonFromCourses = async (lessonId) => {
        const ref = fire.database.ref('courses')
        const snapshot = await ref.once('value')

        // alert('In deleteLessonFromCourses')

        snapshot.forEach((childsnapshot) => {
            try {

                // alert('childsnapshot key is ' + childsnapshot.key)
                var lessonssnapshot = childsnapshot.child('lessons').val()

                if(lessonssnapshot && Object.keys(lessonssnapshot).length > 0){
                    Object.keys(lessonssnapshot).forEach((lessonkey) => {
                        if(lessonssnapshot[lessonkey]){
                            // get lesson video url
                            //   alert('childsnapshot key is ' + lessonkey)
                
                            if(lessonkey == lessonId) {
                                var snapshotForDelete = childsnapshot.child('lessons/' + lessonId)
                                // alert('childsnapshot for delete key is ' + snapshotForDelete.key)
                                snapshotForDelete.ref.remove()
                            }
                        }
                    })

                } else {
                    
                    return []
                }

            } catch (e) {
                alert('error in deleteLessonFromCourses: ' + e)
            }
        })
    }

    const deleteLesson = async (lessonId) => {
        // alert('In delete lesson')

        // delete lesson from db
        try {
            lessonDbRef(lessonId).remove()
        } catch (e) {
            alert('In deleteLesson '+ e.message)
        }

        // remove from courses
        deleteLessonFromCourses(lessonId)

        // delete lesson video
        await deleteLessonVideo(lessonId)
    }

    // const getDownloadUrl = async (lessonId) => {
    //     alert('In getDownloadUrl 1')

    //     var ref = fire.storage.ref('lessonvideos/' + lessonId + '.mp4')
        
    //     //alert('In getDownloadUrl 2: '  + ref)
    //     try {
    //         const url = await ref.getDownloadURL()

    //         //alert('Here is the url: ' + url)

    //         return url
    //     } catch (e) {
    //         alert(e.message)
    //     }
    
    // }

    const xvar = ref('xxxxxxvaaaaaaaaaarrrrrrrrrr')

    return {
        getCourses,
        saveCourse,
        saveNewCourse,
        getCourse,
        saveNewLesson,
        uploadLessonVideo,
        getLevels,
        getLevelsAsList,
        getCourseLessons,
        getLessonsAsList,
        deleteLesson,
        xvar
    }
  }

  export { useCourseRepositories }