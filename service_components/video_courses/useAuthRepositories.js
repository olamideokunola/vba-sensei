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

function useAuthRepositories(fire) {

    const store = useStore()
    const router = useRouter()
    
    const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])
    
    const authUser = computed(() => store.getters['auth/authUser'])

    const auth = computed(() => store.getters['auth/auth'])

    const logout = async () => {
        try {
            // alert('About to sign out!')
            await fire.auth.signOut()
            router.push('/signin')

            localStorage.removeItem('isLoggedIn')
            // alert('Sign out completed!')
        } catch (e) {
            alert(e)
        }
    }

    return {
        logout,
        isLoggedIn,
        authUser,
        auth
    }
  }

  export { useAuthRepositories }