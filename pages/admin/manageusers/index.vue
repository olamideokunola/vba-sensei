<template>
    <div class="flex flex-col items-start content-between px-20 py-4 bg-lightblue">
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
        >
        
            <template v-slot:items>
                <nuxt-link
                    :to="'manageusers/edituser/'+userItem.id"
                    v-for="userItem in userItems"
                    :key="userItem"
                >
                    <div 
                        class="bg-white mt-4 rounded-md px-6 py-3"
                    >
                        <!-- Header -->
                        <div class="flex flex-row container items-center justify-between">
                            <h2 
                                class="text-2xl text-gray font-semibold"
                            > 
                                {{ userItem.name }} 
                            </h2>

                            <p
                                class="text-md text-primary font-semibold"
                            >
                                {{ userItem.email }}
                            </p>        
                        </div>

                        <!-- Contents -->
                        <div class="flex flex-row">
                            <p
                                class="w-7/8 text-md text-gray font-light pr-12"
                            >
                                {{ userItem.email }}
                            </p> 
                            <div
                                class="flex w-1/8"
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

                        <!-- Footer -->
                        <div class="flex flex-row mt-2">
                            <p class="text-sm font-semibold text-gray">{{ userItem.lessons.length }} Lessons </p>
                        </div>
                    </div>
                </nuxt-link>
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
    
    const { getUsers, saveUser } = useUserRepositories($fire)

    const dbUserItems = ref([
        {
            id: '001',
            name: 'testUser 1',
            email: 'testuser1@mail.com',
            courses: 2,
            active: true,
            lessons: []
        },
        {
            id: '002',
            name: 'testUser 2',
            email: 'testuser2@mail.com',
            courses: 3,
            active: true,
            lessons: []
        }
    ])

    const userItems = computed(() => {
        var start = (page.value === 1) ? 0 : ((itemsPerPage.value * (page.value - 1)))
        var end = start + itemsPerPage.value
        // alert(end)
        return  dbUserItems.value.slice(start, end) //$store.getters['video_courses/get_video_courses'].slice(start, end)
    })

    const totalItems = computed(() => dbUserItems.value.length)

    useFetch(async() => { 
        dbUserItems.value = await getCourses() 
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
        saveUser(item)
    }

    const deactivate = (item) => {
        item.active = false
        saveUser(item)
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
        dbUserItems
    }
  }
}
</script>

<style>

</style>