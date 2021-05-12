import { checkIfAdmin, checkIfActiveAndSet } from '~/service_components/video_courses/useAuthRepositories.js'

const initialState = {
    authUser: null,
    auth: "No Auth",
}

export const state = () => ({
    authUser: null,
    auth: "No Auth",
    checkTest: 'Testing!'
})

export const getters = {
    authUser (state) {
        return state.authUser
    },
    userId (state) {
        return state.authUser.uid
    },
    auth (state) {
        return state.auth
    },
    isLoggedIn (state) {
        try {
            return state.authUser.uid !== null
        } catch {
            return false
        }
    },
    checkTest (state) {
        return 'Testing!'
    }
}

export const mutations = {
    RESET_STORE: (state) => {
        Object.assign(state, initialState)
    },    
    SET_AUTH_USER (state, { authUser }) {
        state.authUser = {
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            isAdmin: false,
            isActive: false
        }
    },
    SET_AUTH (state, auth) {
        state.auth = auth
    },
    SET_AS_ADMIN(state) {
        state.authUser.isAdmin = true
    },
    SET_USER_STATUS(state) {
        state.authUser.isActive = true
    }
}

export const actions = {
    async onAuthStateChanged({ commit, dispatch },  { authUser, claims } ) {
        // dispatch('checkVuexStore')
        // alert('authUser is ' + authUser)
        // alert('current user is ' + this.$fire.auth)
        // commit('SET_AUTH', this.$fire.auth )
        if (!authUser) {
            commit('RESET_STORE')
            return
        }
        if (authUser && authUser.getIdToken) {
            try {
                const idToken = await authUser.getIdToken(true)
                console.info('idToken', idToken)
            } catch (e) {
                console.error(e)
            }
        }
        commit('SET_AUTH_USER', { authUser })
        dispatch('setUserAsAdmin', { authUser })
        dispatch('checkIfActiveAndSet', { authUser })
    },
    checkVuexStore(ctx) {
        if (this.$fire.auth === null) {
            throw 'Vuex Store example not working - this.$fire.auth cannot be accessed.'
        }

        alert(
            'Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___'
        )
    },
    async setUserAsAdmin({ commit }, {authUser}){
        try {
            // alert('In setUserAsAdmin action, uid is ' + authUser.uid)
            if(await checkIfAdmin(this.$fire, authUser)) {
                commit('SET_AS_ADMIN')
            }
        } catch(e) {
            alert('Error in setUserAdmin Action' + e.message)
        }        
    },
    async checkIfActiveAndSet({ commit }, {authUser}){
        try {
            // alert('In checkIfActiveAndSet action, uid is ' + authUser.uid)
            if(await checkIfActiveAndSet(this.$fire, authUser)) {
                commit('SET_USER_STATUS')
            }
        } catch(e) {
            alert('Error in checkIfActiveAndSet Action' + e.message)
        }        
    },
    resetStore({ commit }){
        // alert('In resetStore action')
        commit('RESET_STORE')
    },    
}