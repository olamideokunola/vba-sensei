<template>
    <div class="flex flex-col items-start content-between px-4 sm:px-20 py-4 bg-lightblue">
        <HeaderInPage
            title="Activation Requests"
            :menuItems=menuItems
        >
        </HeaderInPage>
<!-- {{dbuserItems}} -->
        <ListSectionBox 
            class="mt-6" 
            title="Pending Requests" 
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
                    <user-card 
                        :userItem="userItem"
                        :profilePlaceholderUrl="profilePlaceholderUrl"
                    ></user-card>
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
import UserCard from '~/components/UserCard.vue'

import { useUserRepositories } from '~/service_components/video_courses/useUserRepositories.js'

export default {
  auth: false,
  components: {
    HeaderInPage,
    SearchBox,
    ListSectionBox,
    UserCard
  },
  // layout: 'home',
  setup(props, { root: { $store, $fire } }) {

    const itemsPerPage = ref(2)

    const page = ref(1)
    
    const { 
            getUsersRequestingActivation, 
            getRemoteProfilePlaceholderUrl,
        } = useUserRepositories()

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
        dbUserItems.value =  await getUsersRequestingActivation() 
        // alert('in usefetch')

        profilePlaceholderUrl.value = await getRemoteProfilePlaceholderUrl()
        // alert('in usefetch profilePlaceholderUrl is ' + profilePlaceholderUrl.value)
        // $store.dispatch('video_courses/loadCoursesToStore', await getCourses())       
    })

    const menuItems = ref([
        {
            title: "Back",
            link: "/admin/manageusers"
        }
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

    return {
        menuItems,
        userItems,
        itemsPerPage,
        totalItems,
        nextPage,
        prevPage,
        currentPage,
        dbUserItems,
        profilePlaceholderUrl
    }
  }
}
</script>

<style>

</style>