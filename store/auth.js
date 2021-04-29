
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
            displayName: authUser.displayName
        }
    },

    SET_AUTH (state, auth) {
        state.auth = auth
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
    },

    checkVuexStore(ctx) {
        if (this.$fire.auth === null) {
            throw 'Vuex Store example not working - this.$fire.auth cannot be accessed.'
        }

        alert(
            'Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___'
        )
    },
    
}
