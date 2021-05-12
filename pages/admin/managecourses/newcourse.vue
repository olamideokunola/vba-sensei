<template>
    <div class="flex flex-col items-start content-between px-4 sm:px-20 py-4 bg-lightblue">
        <HeaderInPage
            title="New Course"
            :menuItems=menuItems
        >
        </HeaderInPage>
        <SectionBox title="Create New Course">

            <!-- Action Bar -->
            <template v-slot:actionbar>
                <div class="flex flex-row">

                <!-- new course button -->
                <LinkButton 
                    displayText="New Course" 
                    link="./newcourse"
                    bgColor="primary"
                ></LinkButton>
                </div>
            </template>

            <!-- Course Form -->
            <CourseForm 
                mode="new"
                actionurl=""
                method="post"
                @submitNewCourse="submitNewCourse"
                ></CourseForm>
        </SectionBox>
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
import LinkButton from '~/components/LinkButton.vue'
import SectionBox from '~/components/SectionBox.vue'
import CourseForm from '~/components/CourseForm.vue'


import { useCourseRepositories } from '~/service_components/video_courses/useCourseRepositories.js'

export default {
  auth: false,
  components: {
    HeaderInPage,
    LinkButton,
    SectionBox,
    CourseForm
  },
  // layout: 'home',
  middleware({store, route, redirect}){
    //alert('in middleware')
    // if(route.params.id)
    // {
    //   redirect('./managecourses/editcourse/' + route.params.id)
    // }
  },
  setup(props, { root: { $store, $fire, $route, $router } }) {

    const { saveNewCourse } = useCourseRepositories($fire)


    const menuItems = ref([
        {
            title: "Back to course list",
            link: "/admin/managecourses"
        },
    ])

    const submitNewCourse = ({ title, description, level, lessons }) => {
        
        // set status as false
        var active = false

        // calculate duration and set
        var duration = "1"

        
        var newCourseId = saveNewCourse({ title, description, level, lessons, active, duration })

        $router.push('./editcourse/' + newCourseId)
        // alert($route.params.id)
    }

    return {
        menuItems,
        submitNewCourse
    }
  }
}
</script>

<style>

</style>