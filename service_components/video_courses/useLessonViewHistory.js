import {
    defineComponent,
    useFetch,
    useContext,
    ref,
    computed,
    useAsync,
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

function useLessonViewHistory(fire, store) {

    // Saves flag that lesson has started to local store and remote database
    const saveLessonStarted = async ({ userId, lessonId }) => {
        // alert ('in setLessonStarted, user id is: ' + userId + ' lessonId is: ' + lessonId)
        const { dbRef, snapShot } = await getViewHistorySnapshot({ userId, lessonId })

        try {
            if(!snapShot.exists()) {
                // alert('No existing view history!')
            }

            // var payload = {
            //     "ended" : false,
            //     "playhead" : 0,
            //     "started" : true
            // }
            dbRef.child('started').set(true)
            // alert('About to set ref!')
            // dbRef.set(payload)

            // alert('Lesson started set successfully')
        } catch (e) {
            alert('In saveLessonStarted ' + e)
        }

        // Save in local store
        store.dispatch('video_courses/saveLessonStartedStatus',  { userId, lessonId})
    }

    // Saves flag that lesson has been completed to local store and remote database
    const saveLessonCompleted = async ({ userId, lessonId }) => {
        // alert ('in saveLessonCompleted, user id is: ' + userId + ' lessonId is: ' + lessonId)
        const { dbRef, snapShot } = await getViewHistorySnapshot({ userId, lessonId })

        try {
            if(!snapShot.exists()) {

            }

            var payload = {
                "ended" : true,
                "playhead" : 0,
                "started" : false
            }
        
            // alert('About to set ref!')
            dbRef.set(payload)

            // alert('Lesson started set successfully')
        } catch (e) {
            alert('In saveLessonCompleted ' + e)
        }

        // Save in local store
        store.dispatch('video_courses/saveLessonCompletionStatus',  { userId, lessonId, payload })
    }

    // Gets the ref and snapshit for view history using userid and lessonid
    const getViewHistorySnapshot = async ({ userId, lessonId }) => {
        const dbRef = fire.database.ref('views/' + userId + '/' + lessonId)
        const snapShot = await dbRef.once('value')
        return { dbRef, snapShot }
    }

    const viewHistory = ref({})

    const getLessonsViewHistories = async({userId}) => {
        try {
            // alert('in getLessonsViewHistories, userId is ' + userId)

            const dbRef = fire.database.ref('views/' + userId)
            const snapShotViewHistories = await dbRef.once('value')

            // alert('in getLessonsViewHistories, history count is ' + Object.keys(snapShotViewHistories.val()).length)

            snapShotViewHistories.forEach((childSnapshot) => {
                // alert('in getLessonsViewHistories, childSnapshot is ' + childSnapshot.key)
                viewHistory.value[childSnapshot.key] = {
                    ended: childSnapshot.child('ended').val(),
                    playhead: childSnapshot.child('playhead').val(),
                    started: childSnapshot.child('started').val()
                }
            })

            // alert('in getLessonsViewHistories, number of history lines: ' + Object.keys(viewHistory.value).length)

            return viewHistory.value

        } catch(e) {
            alert('Error in getLessonsViewHistories, error is ' + e)
        }
    }

    // Saves last playhead to local store and remote database
    const saveLastPlayHeadTime = async ({ userId, lessonId, currentTime }) => {
        // alert ('in saveLastPlayHeadTime, user id is: ' + userId + ' lessonId is: ' + lessonId + ' time is ' + currentTime)
        const { dbRef, snapShot } = await getViewHistorySnapshot({ userId, lessonId })

        try {
            // alert('About to set ref!')

            // var payload = {
            //     "ended" : snapShot.val().ended,
            //     "playhead" : currentTime,
            //     "started" : snapShot.val().started
            // }

            dbRef.child('playhead').set(currentTime)

            // alert('LastPlayHeadTime set successfully')
        } catch (e) {
            alert('saveLastPlayHeadTime, error: ' + e)
        }

        // Save in local store
        store.dispatch('video_courses/saveLastPlayHeadTime',  { userId, lessonId, currentTime })
    }

    const getLastLessonStopTime = async ({userId, lessonId}) => {
        // alert('in getLastLessonStopTime, userId is ' + userId + ' lesson is ' + lessonId)
        const { snapShot } = await getViewHistorySnapshot({ userId, lessonId })

        if(snapShot.val()) {
            // alert('about to return snapShot value: ' + snapShot.val())
            return snapShot.val().playhead
        } else {
            return 0
        }
    }

    const getLessonViewHistory = async ({userId, lessonId}) => {
        // alert('in getLastLessonStopTime, userId is ' + userId + ' lesson is ' + lessonId)
        const { snapShot } = await getViewHistorySnapshot({ userId, lessonId })

        if(snapShot.val()) {
            // alert('about to return snapShot value: ' + snapShot.val())
            return { 
                ended: snapShot.val().ended,
                playhead: snapShot.val().playhead,
                started: snapShot.val().started
            }
        } else {
            return {}
        }
    }

    const getDownloadUrl = async (lessonId) => {
        // alert('In getDownloadUrl 1')

        var ref = fire.storage.ref('lessonvideos/' + lessonId + '.mp4')
        
        //alert('In getDownloadUrl 2: '  + ref)
        try {
            const url = await ref.getDownloadURL()

            //alert('Here is the url: ' + url)

            return url
        } catch (e) {
            alert('In getDownloadUrl, error is: ' + e.message)
        }
    }

    // const viewPendingUrl = async() => {
    //     try {
    //         var ref = fire.storage.ref('icons/views/pending-state.svg')
    //         const url = await ref.getDownloadURL()

    //         //alert('Here is the url: ' + url)

    //         return url
    //     } catch (e) {
    //         alert('In getDownloadUrl, error is: ' + e.message)
    //     }
    // }

    const getViewStatusIcons = async() => {
        try {
            var ref = fire.storage.ref('icons/views/pending-state.svg')
            const pending = await ref.getDownloadURL()

            ref = fire.storage.ref('icons/views/in-progress-state.svg')
            const inprogress = await ref.getDownloadURL()

            ref = fire.storage.ref('icons/views/completed-state.svg')
            const completed = await ref.getDownloadURL()

            //alert('Here is the url: ' + url)

            return {
                pending,
                inprogress,
                completed
            }
        } catch (e) {
            alert('In getViewStatusIcons, error is: ' + e.message)
        }
    }

    return {
        saveLessonStarted,
        saveLastPlayHeadTime,
        getLastLessonStopTime,
        saveLessonCompleted,
        getLessonViewHistory,
        getDownloadUrl,
        getLessonsViewHistories,
        getViewStatusIcons
        
    }
  }

  export { useLessonViewHistory }