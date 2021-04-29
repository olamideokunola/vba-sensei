
<template>
    <div class="container mx-auto px-8 menu flex flex-row items-center justify-between">
        <div data-test="logo" class="logo p-4">
            <nuxt-link to="/"> 
                <img src="~/assets/imgs/vba sensei 3.png">
            </nuxt-link>
        </div>
        <div data-test="menu" class="menu flex flex-row">
            <ul
                v-for="(menuitem, id) in menuitems"
                :key="id"
                >
                <li 
                    
                    data-test="menuitem"
                    class="p-2">
                    <nuxt-link :to="menuitem.link" class="text-gray-900 text-xl hover:font-bold" href="/">{{ menuitem.name }}</nuxt-link>
                </li>
            </ul>
        </div>
        <div class="sidemenu p-4 flex flex-row items-center justify-between">
            <!-- v-if="$auth.loggedIn"> -->
            <!-- v-if="!$fireModule.auth.user.isAnonymous"> -->
            <!-- {{ isLoggedIn }}
            {{ authUser }}
            {{ actions }} -->
            <div class="flex flex-row" 
                v-if="isLoggedIn">
                <!-- logout button -->
                <button
                    class="bg-black shadow-md hover:bg-gray text-white px-4 py-2 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    @click="logout"
                    >
                    Sign out
                </button>
                <!-- username -->
                <div class="avatar bg-white border-2 border-gray mx-2 py-2 px-4 text-black rounded-full ">
                   {{authUser.displayName}}
                </div>
            </div>
            
            
            <div 
                v-else
                >
                <!-- login -->
                <nuxt-link to="/signin">
                    <button
                        class="bg-black shadow-md hover:bg-gray text-white px-4 py-2 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        >
                        Sign in
                    </button>
                </nuxt-link>
                <!-- register -->
                <nuxt-link to="/register">
                    <button class="bg-black shadow-md hover:bg-gray text-white px-4 py-2 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        Register
                    </button>
                </nuxt-link>
            </div>            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import {
    defineComponent,
    useFetch,
    useContext,
    ref,
    computed,
    useAsync,
  } from '@nuxtjs/composition-api' //'nuxt-composition-api'

import { useAuthRepositories } from '~/service_components/video_courses/useAuthRepositories.js'

export default {
    setup(props, {root:{ $store, $fire }}) {

        const { 
            logout,
            isLoggedIn,
            authUser,
            auth
        } = useAuthRepositories($fire)

        const menuitems = ref([
            { name: 'Dashboard',
                link: '/'
            },
            { name: 'Courses',
                link: '/video_courses'
            },
            { name: 'Classes',
                link: '/'
            },
            { name: 'Blog',
                link: '/'
            },
            { name: 'Search',
                link: '/'
            },
            { name: 'Q&A',
                link: '/'
            },
            { name: 'Admin',
                link: '/admin'
            }
        ])

        return {
            menuitems,
            logout,
            isLoggedIn,
            authUser,
            auth
        }

    }, 
    // data: () => {
    //     return {

    //         menuitems: [
    //             { name: 'Dashboard',
    //               link: '/'
    //             },
    //             { name: 'Courses',
    //               link: '/video_courses'
    //             },
    //             { name: 'Classes',
    //               link: '/'
    //             },
    //             { name: 'Blog',
    //               link: '/'
    //             },
    //             { name: 'Search',
    //               link: '/'
    //             },
    //             { name: 'Q&A',
    //               link: '/'
    //             },
    //             { name: 'Admin',
    //               link: '/admin'
    //             }
    //     ]
    // }},
    // methods: {
    //     async logout() {
    //         try {
    //             // alert('About to sign out!')
    //             await this.$fire.auth.signOut()
    //             this.$router.push('/signin')

    //             localStorage.removeItem('isLoggedIn')
    //             // alert('Sign out completed!')
    //         } catch (e) {
    //             alert(e)
    //         }
    //     }
    // },
    // computed: {
    //     // app() {
    //     //     return this.$fire.auth.app
    //     // },
    //     // auth() {
    //     //     return this.$fire.auth.app.auth()
    //     // },
    //     // actions () {
    //     //     return this.$store.mutations
    //     // },
    //     // user() {
    //     //     return this.$fire.user()
    //     // },
    //     ...mapGetters({
    //         isLoggedIn: 'auth/isLoggedIn',
    //         authUser: 'auth/authUser',
    //         auth: 'auth/auth'
    //     }),
    //     // isLoggedIn () {
    //     //     var isLoggedInFromStore  = this.$store.getters['auth/isLoggedIn']
    //     //     if(!isLoggedInFromStore){ // && localStorage.getItem('isLoggedIn')) {
    //     //         return false
    //     //     } else if(this.isLoggedInFromStore) {
    //     //         return true
    //     //     } 
    //     //     return false
    //     // }
    // }
}
</script>

<style scoped>

.logo {
    width: 250px
}
/* 
.avatar {

} */

</style>