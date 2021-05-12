<template>
    <div class="flex flex-col items-start content-between px-4 sm:px-20 py-4 bg-lightblue">
        <HeaderInPage
            title="Manage Courses"
            :menuItems=menuItems
        >
        </HeaderInPage>

        <SearchBox></SearchBox>
<!-- {{dbCourseItems}} -->
        <ListSectionBox 
            class="mt-6" 
            title="Courses" 
            :currentPage="currentPage.value"
            :itemsCount="totalItems"
            :itemsPerPage="itemsPerPage"
            @next="nextPage"
            @prev="prevPage"
        >
             <!-- new action buttons -->
            <template v-slot:actionbuttons>
                <LinkButton 
                    class=""
                    displayText="New Course"
                    link="managecourses/newcourse"
                    bgColor="primary"
                ></LinkButton>
            </template>
        
            <template v-slot:items>
                <nuxt-link
                    :to="'managecourses/editcourse/'+courseItem.id"
                    v-for="courseItem in courseItems"
                    :key="courseItem"
                >
                    <div 
                        class="bg-white mt-4 rounded-md px-6 py-3"
                    >
                        <!-- Header -->
                        <div class="flex flex-col sm:flex-row container items-center justify-between">
                            <h2 
                                class="text-2xl text-gray font-semibold"
                            > 
                                {{ courseItem.title }} 
                            </h2>

                            <p
                                class="text-md text-primary font-semibold"
                            >
                                {{ courseItem.level.title }}
                            </p>        
                        </div>

                        <!-- Contents -->
                        <div class="flex flex-col sm:flex-row items-center">
                            <p
                                class="w-7/8 text-md text-gray text-center sm:text-left font-light sm:pr-12"
                            >
                                {{ courseItem.description }}
                            </p> 
                            <div
                                class="flex w-1/8 py-4 sm:py-0"
                            >
                                <button 
                                    v-if="!courseItem.active"
                                    class="flex bg-gray text-white rounded px-2 text-sm self-center justify-self-end"
                                    @click="activate(courseItem)"
                                >
                                    Activate
                                </button>
                                <button 
                                    v-else
                                    class="flex bg-danger text-white rounded px-2 text-sm self-center justify-self-end"
                                    @click="deactivate(courseItem)"
                                >
                                    Deactivate
                                </button>
                            </div>
                        </div>  

                        <!-- Footer -->
                        <div class="flex flex-row mt-2 justify-center sm:justify-start">
                            <p class="text-sm text-center sm:text-left font-semibold text-gray">{{ courseItem.lessons.length }} Lessons in {{ courseItem.duration }} hours</p>
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
import LinkButton from '~/components/LinkButton.vue'

import { useCourseRepositories } from '~/service_components/video_courses/useCourseRepositories.js'

export default {
  auth: false,
  components: {
    HeaderInPage,
    SearchBox,
    ListSectionBox,
    LinkButton
  },
  // layout: 'home',
  setup(props, { root: { $store, $fire } }) {

    const itemsPerPage = ref(2)

    const page = ref(1)
    
    const { getCourses, saveCourse, xvar } = useCourseRepositories($fire)

    const dbCourseItems = ref([])

    const courseItems = computed(() => {
        var start = (page.value === 1) ? 0 : ((itemsPerPage.value * (page.value - 1)))
        var end = start + itemsPerPage.value
        // alert(end)
        return  dbCourseItems.value.slice(start, end) //$store.getters['video_courses/get_video_courses'].slice(start, end)
    })

    const totalItems = computed(() => dbCourseItems.value.length)

    useFetch(async() => { 
        dbCourseItems.value = await getCourses() 
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

    const activate = (courseItem) => {
        courseItem.active = true
        saveCourse(courseItem)
    }

    const deactivate = (courseItem) => {
        courseItem.active = false
        saveCourse(courseItem)
    }

    return {
        menuItems,
        courseItems,
        itemsPerPage,
        totalItems,
        nextPage,
        prevPage,
        currentPage,
        activate,
        deactivate,
        dbCourseItems
    }
  }
}
</script>

<style>

</style>