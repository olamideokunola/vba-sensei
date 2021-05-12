<template>
    <div class="flex flex-col items-start content-between px-4 sm:px-20 py-4 bg-lightblue">
        <HeaderInPage
            title="Edit Course"
            :menuItems=menuItems
        >
        </HeaderInPage>
        <!-- {{course}}
        {{courselessons}} -->
        <SectionBox title="Edit Course">

            <!-- Action Bar -->
            <template v-slot:actionbar>
                <div class="flex flex-row">

                <!-- new course button -->
                <LinkButton 
                    displayText="New Course" 
                    link="../newcourse"
                    bgColor="primary"
                ></LinkButton>
                </div>
            </template>

            <!-- Course Form -->
            <CourseForm 
                mode="edit"
                method="post"
                actionurl=''
                @updateCourse="updateCourse"
                @addLesson="addLesson"
                v-bind="course"
                :lessons="courselessons"
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
  computed,
  useAsync
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

import HeaderInPage from '~/components/HeaderInPage.vue'
import LinkButton from '~/components/LinkButton.vue'
import SectionBox from '~/components/SectionBox.vue'
import CourseForm from '~/components/CourseForm.vue'


import { useCourseRepositories } from '~/service_components/video_courses/useCourseRepositories.js'

export default {
  components: {
    HeaderInPage,
    LinkButton,
    SectionBox,
    CourseForm
  },
  // layout: 'home',
  middleware({store, route, redirect}){

  },
  setup(props, { root: { $store, $fire, $route } }) {

    const menuItems = ref([
        {
            title: "Back to course list",
            link: "/admin/managecourses"
        },
    ])

    const updateCourse = (courseToUpdate) => {

    }

    const addLesson = async (newLesson, videoFile) => {
        alert('in addLesson ' + videoFile.name)

        var videoFileName = videoFile.name

        var courseId = $route.params.id

        var lessonId = saveNewLesson({ courseId, newLesson } )
        
        await uploadLessonVideo({ lessonId, videoFile})
    }

    const { 
        getCourse, 
        getCourseLessons, 
        saveNewLesson, 
        uploadLessonVideo,
    } = useCourseRepositories($fire)

    const course = ref({})
    
    const courselessons = ref([])

    useFetch( async () =>{
        // alert($route.params.id)

        if($route.params.id){
            // alert('param is' + $route.params.id)
            course.value = await getCourse($route.params.id)
            // alert('first lesson is: ' + course.value.lessons[0].title)
            courselessons.value = await getCourseLessons($route.params.id)
            
        } else {
            course.value =  {
                title: '',
                description: '',
                level: '',
                lessons: []
            }
        }
    })

    return {
        menuItems,
        updateCourse,
        course,
        addLesson,
        courselessons,
    }
  }
}
</script>

<style>

</style>