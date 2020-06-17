<template>
  <div>
      <!-- Courses Title -->
      <div class="video-courses-bkg bg-primary flex flex-col align-middle justify-center">
          <h1 class="container mx-auto px-12 text-6xl text-black font-bold">{{video_course.title}}</h1>
      </div>

      <div class="video-courses-bkg flex bg-black flex-row justify-start">
          <!--Video-->
          <div class="player-container w-full h-auto h-64 bg-black">
              
            <vue-core-video-player 
                :title="lesson_video_title.value"
                :autoplay="false"
                :src="require('~/assets/videos/video_courses/' + current_video)" 
                type="video/mp4">
            </vue-core-video-player>
           </div>
          
          <!--Lessons-->
          <div class="border w-5/12 h-64  bg-white">
            <h1 class="container mx-auto px-8 text-4xl text-black font-bold">Lessons</h1>
            <div
                :class="lesson.active ? selected_lesson : un_selected_lesson"
                v-for="(lesson, id) in video_course.lessons"
                :key="id"
                @click="setCurrentVideo(id, lesson)"
                >
                    {{id+1}}. {{lesson.title}}
            </div>
          </div>
      </div>

  </div>
</template>

<script>
import {
  defineComponent,
  useFetch,
  useContext,
  ref,
  computed
} from 'nuxt-composition-api'

export default {
    setup(props, { root: { $store, $router, $route}}) {

        const video_courses = computed(() =>  $store.getters['video_courses/get_video_courses'])

        const temp_course = ref({})

        const video_course = computed(() => {
            return video_courses.value.find((video_course) => video_course.title === $route.params.title)
        })
        
        const current_video = ref('Programming_Fundamentals_1.mp4')

        const lesson_video_title = ref('')

        const un_selected_lesson = ref('border border-gray bg-white hover:bg-gray active:bg-gray hover:text-white px-8 py-4 text-1l')

        const selected_lesson = ref('border border-gray bg-lightblue hover:bg-gray active:bg-gray hover:text-white px-8 py-4 text-1l')

        const bkgIsActive = ref(false)

        const setCurrentVideo = (id, lesson) => {
            
            const regex = /\s/g

            const ls = video_course.value.title.replace(regex, '_')

            current_video.value = ls + '_' + (id+1).toString() + '.mp4'

            lesson_video_title.value = lesson

            toggleLessonBkg(id, lesson.title)
        }


        const toggleLessonBkg = (id, title) => {
            bkgIsActive.value = !bkgIsActive.value
            // alert(id)
            // alert('bkgIsActive is: ' + bkgIsActive.value)
            // alert('title is: ' + $route.params.title)
            // alert('title is: ' + video_course.value.title)
        
            video_course.value.lessons.forEach((lesson) => {
                if (lesson.title === title) {
                    $store.commit('video_courses/UPDATE_LESSON_ACTIVE_STATUS', {lesson, status:true})
                } else {
                    $store.commit('video_courses/UPDATE_LESSON_ACTIVE_STATUS', {lesson, status:false})
                }
            })
        }

        return {
            video_course,
            current_video,
            setCurrentVideo,
            lesson_video_title,
            toggleLessonBkg,
            selected_lesson,
            un_selected_lesson,
            bkgIsActive
        }
    }
}
</script>

<style>

</style>