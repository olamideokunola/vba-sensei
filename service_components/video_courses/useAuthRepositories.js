import {
    defineComponent,
    useFetch,
    useContext,
    ref,
    computed,
    useAsync,
    useStore,
    useRouter
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

// import { mapGetters } from 'vuex'

import { useUserRepositories } from '~/service_components/video_courses/useUserRepositories.js'

function useAuthRepositories() {

    const context = useContext()

    const store = useStore()
    
    const router = useRouter()
    
    const fire = context.$fire

    const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])
    
    const authUser = computed(() => store.getters['auth/authUser'])

    const auth = computed(() => store.getters['auth/auth'])

    const signInUser = async (loginInfo) => {
        try {
            
            await fire.auth.signInWithEmailAndPassword(
                loginInfo.email,
                loginInfo.password
            )

            // alert('Signin completed!')
            localStorage.setItem('isLoggedIn', true)
            router.push('/')

            // store.dispatch('auth/setUserAsAdmin')

        } catch (e) {
            localStorage.removeItem('isLoggedIn')
            alert('In signInUser' + e)
        }
    }

    const logout = async () => {
        try {
            // alert('About to sign out!')
            await fire.auth.signOut()
            router.push('/signin')

            localStorage.removeItem('isLoggedIn')
            // alert('Sign out completed!')
            store.dispatch('auth/resetStore')
        } catch (e) {
            alert(e)
        }
    }

    const { createUser } = useUserRepositories()

    const registerUser = async (registrationInfo) => {
        try {
          await fire.auth.createUserWithEmailAndPassword(
            registrationInfo.email,
            registrationInfo.password
          )
          console.log('Signin successful!')
  
          // Save UserName
          var user = fire.auth.currentUser
          await user.updateProfile({
            displayName: registrationInfo.name
          })

          // Save user profile in database
          createUser({
              name: registrationInfo.name,
              email: registrationInfo.email,
              uid: user.uid
          })
  
          console.log('Display Name update successful!')
  
          router.push('/video_courses')
          
        } catch (e) {
          alert('In registerUser ' + e.message)
        }
        // debugger
        // alert('You pressed signin button')
    }

    const sendActivationRequestToAdmin = (showFeedback) => {
        // alert('sendActivationRequestToAdmin, key 1 is ' + Object.keys(authUser)[0])

        // Object.keys(authUser).forEach((key) => {
        //     alert(key)
        // })

        const dbRef = fire.database.ref("activationrequests/" + authUser.value.uid)
        dbRef.set(true)

        showFeedback.value = true
        setTimeout(
            function(){
                showFeedback.value = false 
            }, 
            5000
        );
    }

    const resetPassword = async (loginInfo) => {
        try {
            
            // alert('In resetPassword')
            await fire.auth.sendPasswordResetEmail(
                loginInfo.email,
            )

            

        } catch (e) {
            alert('In resetPassword' + e)
        }
    }

    return {
        logout,
        isLoggedIn,
        authUser,
        registerUser,
        signInUser,
        auth,
        sendActivationRequestToAdmin,
        resetPassword
    }
  }

  async function checkIfAdmin(fire, authUser) {
    try {

        // alert('In checkIfAdmin' + authUser.uid)

        var dbRef = fire.database.ref('admins/' + authUser.uid)
        var snapshot = await dbRef.once('value')

        // alert('In checkIfAdmin isAdmin is ' + snapshot.val())

        return snapshot.val()
        
        } catch (e) {
            alert('Error in checkIfAdmin ' + e.message)
        }
    }

    async function checkIfActiveAndSet(fire, authUser) {
        try {

            // alert('In checkIfActiveAndSet ' + authUser.uid)

            var dbRef = fire.database.ref('activeusers/' + authUser.uid)
            var snapshot = await dbRef.once('value')

            // alert('In checkIfActiveAndSet isActive is ' + snapshot.val())

            return snapshot.val()

        } catch(e) {
            alert('Error in checkIfActiveAndSet ' + e.message)
        }
    }

  export { useAuthRepositories, checkIfAdmin, checkIfActiveAndSet }