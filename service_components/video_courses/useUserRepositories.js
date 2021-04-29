import {
    defineComponent,
    useFetch,
    useContext,
    ref,
    computed,
    useAsync,
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

function useUserRepositories(fire) {

    var userItems = ref([])

    const getUsers = async () => {
        
        // get levels
        levels.value = await getLevels()

        // get statuses
        statuses.value = await getCourseStatuses()
        
        // get lessons
        lessons.value = await getLessons()

        // get courses
        const userItemsRef = fire.database.ref('courses')
        const userItemsSnapshot = await userItemsRef.once('value')
        
        userItems.value = []
    
        userItemsSnapshot.forEach((snapshot) => {
            userItems.value.push(
                setCourseFromSnapshot(snapshot, levels, statuses)
            )
        })

        // alert('userItems: ' + userItems.length)
        return userItems.value
    }

    const saveUser = (userItem) => {
        
        // prepare lessons
        var lessonObj = {}

        if(userItem.lessons)
        {
            userItem.lessons.forEach((lesson) =>
                lessonObj[lesson.id] = true
            )
        }

        // Get course Ref and set
        fire.database.ref('courses/' + userItem.id).set(
            {
                title: userItem.title,
                description: userItem.description,
                duration: userItem.duration,
                level: userItem.level.id,
                lessons: lessonObj
            }
        ) 

        // Get course StatusRef and set
        fire.database.ref('activecourses/' + userItem.id).set(userItem.active) 
    }




    return {
        getUsers,
        saveUser,
    }
  }

  export { useUserRepositories }