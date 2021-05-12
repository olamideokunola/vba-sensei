import {
    defineComponent,
    useFetch,
    useContext,
    ref,
    computed,
    useAsync,
    useRouter
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

function useUserRepositories(fire) {

    const router = useRouter()

    var userItems = ref([])

    const setUserFromSnapshot = (snapshot) => {
        try {
            var registrationDateSnapshot = snapshot.child('startdate')
            var coursesSnapshot = snapshot.child('courses')

            var coursesCount = Object.keys(coursesSnapshot).reduce((count, currentKey) => {
                return coursesSnapshot[currentKey] ? count++ : count
            })
            
            var startdate = registrationDateSnapshot.val() ? {
                day: registrationDateSnapshot.val().day,
                month: registrationDateSnapshot.val().month,
                year: registrationDateSnapshot.val().year
            } : {
                day: 0,
                month: '',
                year: 0
            }

            // alert('In setUserFromSnapshot, user registrationDateSnapshot is ' + startdate.month)

            return {
                id: snapshot.key,
                name: snapshot.val().name ? snapshot.val().name : '', 
                email: snapshot.val().email ? snapshot.val().email : '',
                courses: coursesCount ? coursesCount : 0,
                // active: userStatus ? true : false,
                registrationDate: startdate
            }

        } catch (e) {
            alert('Error in setUserFromSnapshot, message: ' + e.message)
        }
    }

    // const activeUserStatuses = ref({})

    const getActiveUserStatuses = async () => {
        try {
            const userActiveStatusesRef = fire.database.ref('activeusers')
            const userActiveStatusesSnapshot = await userActiveStatusesRef.once('value')

            var activeUserStatuses = {}

            Object.keys(userActiveStatusesSnapshot.val()).forEach((key) => {
                // alert('In getActiveUserStatuses, snapshot key is ' + key)
                activeUserStatuses[key] = userActiveStatusesSnapshot.child(key).val()
            })

            // alert('In getActiveUserStatuses, snapshot is ' + Object.keys(userActiveStatusesSnapshot).length)
            
            return activeUserStatuses

        } catch (e) {
            alert('Error in getActiveUserStatuses ' + e.message)
        }
        
    }

    const getUsers = async () => {
        // activeusers
        var activeusers = await getActiveUserStatuses()

        // alert('number of statuses ' + Object.keys(activeusers).length)

        const userItemsRef = fire.database.ref('users')
        const userItemsSnapshot = await userItemsRef.once('value')
        
        userItems.value = []
    
        userItemsSnapshot.forEach((snapshot) => {
            var userItem = setUserFromSnapshot(snapshot)
            userItem.active = activeusers[snapshot.key]
            // alert('In getUsers snapshot is ' + activeusers[snapshot.key])
            userItems.value.push(userItem)
        })

        // alert('userItems: ' + userItems.value[0].name)
        return userItems.value
    }

    const setUserActiveStatus = async (userItem) => {
        try {
            // Get course Ref and set
            const dbRef = fire.database.ref('activeusers/' + userItem.id)

            dbRef.set(userItem.active)
        
        } catch (e) {
            alert('Error in setUserActiveStatus, message: ' + e.message)
        }  
    }

    const getRemoteProfilePlaceholderUrl = async () => {
        try {
            // alert('In getRemoteProfilePlaceholderUrl')
            var ref = fire.storage.ref('images/placeholder-profile-1.png')
            
            // alert('In getRemoteProfilePlaceholderUrl about to return')

            return await ref.getDownloadURL()

        } catch (e) {
            alert('Error in getRemoteProfilePlaceholderUrl, message:' + e.message)
        }
    }

    const createUser = (userInfo) => {
        alert('In createUser')

        var dbRef = fire.database.ref('users/' + userInfo.uid)
        var date = new Date()
        var day = date.getDate()
        var year = date.getFullYear()
        var months = [
            'Janaury',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
        var month = months[date.getMonth()]
        
        dbRef.set({
            name: userInfo.name,
            email: userInfo.email,
            courses: {},
            token: '',
            startdate: {
                day,
                month,
                year
            }
        })

        // Set as inactive
        fire.database.ref('activeusers/' + userInfo.uid).set(false)
    }
 
    return {
        getUsers,
        setUserActiveStatus,
        getRemoteProfilePlaceholderUrl,
    }
}

export { useUserRepositories }