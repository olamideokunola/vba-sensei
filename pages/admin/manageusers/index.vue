<template>
    <div class="flex flex-col items-start content-between px-4 sm:px-20 py-4 bg-lightblue">
        <HeaderInPage
            title="Manage Users"
            :menuItems=menuItems
        >
        </HeaderInPage>

        <SearchBox></SearchBox>
<!-- {{dbuserItems}} -->
        <ListSectionBox 
            class="mt-6" 
            title="Users" 
            :currentPage="currentPage.value"
            :itemsCount="totalItems"
            :itemsPerPage="itemsPerPage"
            @next="nextPage"
            @prev="prevPage"
            data-test='userslist'
        >

            <template  v-slot:items>
                <div
                    data-test='useritem'
                    :to="'manageusers/edituser/'+userItem.id"
                    v-for="userItem in userItems"
                    :key="userItem.id"
                >
                    <div 
                        class="flex flex-col sm:flex-row bg-white mt-4 rounded-md px-6 py-6"
                    >
                        <!-- Contents -->
                        <div class="flex flex-col sm:flex-row sm:w-3/4 container items-center justify-center sm:justify-start">
                            <img class="w-24 rounded-full" :src="profilePlaceholderUrl"/>
                            <div data-test="username" class="flex flex-col sm:pl-4">
                                <h1 class="sm:w-7/8 text-2xl text-gray text-center sm:text-left font-semibold sm:pr-12"
                                >
                                    {{ userItem.name }}
                                </h1> 
                                <p class="sm:w-1/8 text-md text-gray text-center sm:text-left font-light sm:pr-12"
                                >
                                    {{ userItem.email }}
                                </p> 
                            </div>
                        </div>  

                        <!-- Footer -->
                        <div class="flex flex-col sm:w-1/4 mt-8 sm:mt-2 justify-between items-center sm:items-end">
                            <p class="w-7/8 text-sm font-semibold text-gray">{{ userItem.courses }} courses </p>
                            
                            <p class="font-semibold text-gray"> 
                                Since {{userItem.registrationDate.month}} {{userItem.registrationDate.day}}, {{userItem.registrationDate.year}}  
                                </p>
                            <div class="flex flex-col py-4 sm:py-2 sm:py-0 sm:w-1/8"
                            >
                                <button 
                                    v-if="!userItem.active"
                                    class="flex bg-gray text-white rounded px-2 text-sm self-center justify-self-end"
                                    @click="activate(userItem)"
                                >
                                    Activate
                                </button>

                                <button 
                                    v-else
                                    class="flex bg-danger text-white rounded px-2 text-sm self-center justify-self-end"
                                    @click="deactivate(userItem)"
                                >
                                    Deactivate
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </ListSectionBox>
    </div>
</template>

<script>
import {
  defineComponent,
  useFetch,
  useContext,
  ref,
  computed
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

import HeaderInPage from '~/components/HeaderInPage.vue'
import SearchBox from '~/components/Search_Dashboard.vue'
import ListSectionBox from '~/components/SectionBox_List.vue'

import { useUserRepositories } from '~/service_components/video_courses/useUserRepositories.js'

export default {
  auth: false,
  components: {
    HeaderInPage,
    SearchBox,
    ListSectionBox
  },
  // layout: 'home',
  setup(props, { root: { $store, $fire } }) {

    const itemsPerPage = ref(2)

    const page = ref(1)
    
    const { 
            getUsers, 
            setUserActiveStatus, 
            getRemoteProfilePlaceholderUrl,
        } = useUserRepositories($fire)

    const dbUserItems = ref([
        // {
        //     id: '001',
        //     name: 'testUser 1',
        //     email: 'testuser1@mail.com',
        //     courses: 2,
        //     active: true,
        //     registrationDate: {
        //         day: "1",
        //         month: "January",
        //         year: "2020"
        //     }
        // },
        // {
        //     id: '002',
        //     name: 'testUser 2',
        //     email: 'testuser2@mail.com',
        //     courses: 3,
        //     active: false,
        //     registrationDate: {
        //         day: "1",
        //         month: "March",
        //         year: "2020"
        //     }
        // },
        // {
        //     id: '003',
        //     name: 'testUser 3',
        //     email: 'testuser3@mail.com',
        //     courses: 4,
        //     active: false,
        //     registrationDate: {
        //         day: "1",
        //         month: "April",
        //         year: "2020"
        //     }
        // }
    ])

    const userItems = computed(() => {
        var start = (page.value === 1) ? 0 : ((itemsPerPage.value * (page.value - 1)))
        var end = start + itemsPerPage.value
        // alert(end)
        return dbUserItems.value.slice(start, end) //$store.getters['video_courses/get_video_courses'].slice(start, end)
    })

    const totalItems = computed(() => dbUserItems.value.length)

    const profilePlaceholderUrl = ref('')

    useFetch(async() => { 
        //
        
        dbUserItems.value = await getUsers() 
        // alert('in usefetch')

        profilePlaceholderUrl.value = await getRemoteProfilePlaceholderUrl()
        // alert('in usefetch profilePlaceholderUrl is ' + profilePlaceholderUrl.value)
        // $store.dispatch('video_courses/loadCoursesToStore', await getCourses())       
    })

    const menuItems = ref([
        {
            title: "Back",
            link: "/admin"
        },
    ])

    const maxPage = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

    const nextPage = () => {
      // alert('Next page clicked! '+ page.value)
      if(page.value + 1 <= maxPage.value)
      {
        page.value++
      }
    }

    const prevPage = () => {
      // alert('Previous page clicked!')
      if(page.value - 1 > 0)
      {
        page.value--
      }
    }

    const currentPage = computed(() => page)

    const activate = (item) => {
        item.active = true
        setUserActiveStatus(item)
    }

    const deactivate = (item) => {
        item.active = false
        setUserActiveStatus(item)
    }

    

    return {
        menuItems,
        userItems,
        itemsPerPage,
        totalItems,
        nextPage,
        prevPage,
        currentPage,
        activate,
        deactivate,
        dbUserItems,
        profilePlaceholderUrl
    }
  }
}
</script>

<style>

</style>