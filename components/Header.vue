
<template>
    <div class="container mx-auto px-8 menu flex flex-row items-center justify-between">
        <div data-test="logo" class="sm:p-4 py-6 flex flex-row items-center justify-between">

            <nuxt-link 
                class="w-4/6 sm:w-2/6"  
                to="/"                
                > 
                <img class="" src="~/assets/imgs/vba sensei 3.png">
            </nuxt-link>

            <img
                @click="showMenu(event)" 
                class="sm:hidden" 
                src="~/assets/imgs/hamburger.svg"
                >

        </div>

        <!-- Large Screen Menu -->
        <div data-test="menu" class="menu sm:flex sm:flex-row hidden ">
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

        <!-- Small Screen Menu -->
        <div 
            v-if="displayMenu"
            class="modal sm:hidden w-3/6 p-4 flex-col sm:flex-row justify-start">
            <ul
                v-for="(menuitem, id) in menuitems"
                :key="id"
                >
                <li 
                    data-test="menuitem"
                    @click="displayMenu=false" 
                    class="p-2">
                    <nuxt-link :to="menuitem.link" class="text-gray-900 text-xl hover:font-bold" href="/">{{ menuitem.name }}</nuxt-link>
                </li>
            </ul>

            <div class="sidemenu sm:p-4 flex sm:flex-row flex-col">
                <!-- v-if="$auth.loggedIn"> -->
                <!-- v-if="!$fireModule.auth.user.isAnonymous"> -->
                <!-- {{ isLoggedIn }}
                {{ authUser }}
                {{ actions }} -->
                <div class="flex flex-col sm:flex-row align-start" 
                    v-if="isLoggedIn">
                    <!-- logout button -->
                    <button
                        class="bg-black shadow-md hover:bg-gray text-white px-4 py-2 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        @click="logout"
                        >
                        Sign out
                    </button>
                    <!-- username -->
                    <div class="avatar bg-white text-center border-2 border-gray sm:mx-2 mt-4 sm:mt-0 py-2 px-4 text-black rounded-full ">
                        {{authUser.displayName}}
                    </div>
                </div>
                
                
                <div 
                    v-else
                    class="flex flex-col sm:flex-row justify-start items-start"
                    >
                    <!-- login -->
                    <nuxt-link class="py-2" to="/signin">
                        <button
                            @click="displayMenu=false"
                            class="bg-black shadow-md hover:bg-gray text-white px-4 py-2 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            >
                            Sign in
                        </button>
                    </nuxt-link>
                    <!-- register -->
                    <nuxt-link class="py-2" to="/register">
                        <button 
                            @click="displayMenu=false"
                            class="bg-black shadow-md hover:bg-gray text-white px-4 py-2 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                            Register
                        </button>
                    </nuxt-link>
                </div>            
            </div>
        </div>

        <div class="sidemenu p-4 hidden sm:flex sm:flex-row items-center justify-between">
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
    useStore
  } from '@nuxtjs/composition-api' //'nuxt-composition-api'

import { useAuthRepositories } from '~/service_components/video_courses/useAuthRepositories.js'
import { useUtils } from '~/service_components/video_courses/useUtils.js'

export default {
    setup(props, {root:{ $fire }}) {

        const { 
            logout,
            isLoggedIn,
            authUser,
            auth
        } = useAuthRepositories($fire)

        const {
            getImageUrl,
        } = useUtils($fire)

        const hamburger = ref('')

        useFetch(async () => {
            try {
                // hamburger.value = await getImageUrl('icons/nav/hamburger.svg')
            } catch(e) {
                alert('Error in fetch, message: ' + e)
            }
        })

        const allMenuItems = ref([
            { name: 'Dashboard',
                link: '/',
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
                link: '/admin',
                admin: true
            }
        ])

        const menuitems = computed(() => {
            return allMenuItems.value.filter((menuitem) => {
                // alert('In menuitems, isAdmin is ' + authUser.isAdmin)
                if(!menuitem.admin || (authUser.value && menuitem.admin && authUser.value.isAdmin)){
                    return true
                }
                return false
            })
        })

        const displayMenu = ref(false)

        const showMenu = (menu) => {
            // alert('menu clicked!')
            displayMenu.value = !displayMenu.value
        }

        return {
            menuitems,
            logout,
            isLoggedIn,
            authUser,
            hamburger,
            auth,
            displayMenu,
            showMenu
        }

    }, 

}
</script>

<style scoped>

.logo {
    width: 250px
}

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    background-color: white;
}

/* 
.avatar {

} */



</style>