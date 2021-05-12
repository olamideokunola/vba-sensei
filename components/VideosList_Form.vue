<template>
  <div>
      <h1 class="text-2xl font-bold">Lesson Videos</h1>
      <div 
        v-for="lesson in _lessons"
        :key="lesson.id"
        class="container flex flex-col sm:flex-row justify-between text-gray bg-white px-4 py-4 mt-4">
          <!-- Video Description -->
          <div 
            class="w-7/8">
              <h1 class="font-light text-2xl">{{ lesson.title }}</h1>
              <p>{{ lesson.videoFileName }}</p>

              <!-- Action Buttons -->
              <div class="my-2 sm:mt-8">
                  <button class="bg-gray text-sm text-white rounded-full px-6 py-1"
                  >Edit</button>
                  <button 
                    class="bg-danger text-sm text-white rounded-full px-4 py-1"
                    @click.prevent="deleteLesson(lesson.id)"
                  >Delete</button>
                  <button class="bg-gray text-sm text-white rounded-full px-4 py-1 ml-6"
                  >&#8593</button>
                  <button  class="bg-gray text-sm text-white rounded-full px-4 py-1"
                  >&#8595</button>
              </div>
          </div>

          <!-- Video Preview -->
          <video 
            :src="lesson.videoUrl"
            :autoplay="false"
            class="w-full sm:w-64 bg-gray rounded" 
            width="64" 
            height="48"
            controls
            >
      
          </video>
      </div>
      <!-- lessonLength is {{lessonLength}}
      videoUrls are {{videoUrls}} -->
  </div>
</template>

<script>
import {
  defineComponent,
  useFetch,
  useContext,
  ref,
  computed,
  toRef,
  watch,
  watchEffect
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

import { useCourseRepositories } from '~/service_components/video_courses/useCourseRepositories.js'
import { useLessonViewHistory } from '~/service_components/video_courses/useLessonViewHistory.js'

export default {
  components: {
   
  },
  // layout: 'home',
  props: {
    lessons: []
  },
  emits: [

  ],
  setup(props, {root:{ $store, $fire }}) {

    const lessontitle = ref('Starting up')
    const videofilename = ref('vd_001_startingup')
    const _lessons = toRef(props, 'lessons')

    const { deleteLesson } = useCourseRepositories($fire)

    const {
      getDownloadUrl,      
    } = useLessonViewHistory($fire, $store)

    // const videoUrl = async (lessonId) => {
    //   //alert(await getDownloadUrl(lessonId))
    //   return await getDownloadUrl(lessonId)
    // }

    const videoList = ref('')

    const videoUrls = ref({})

    // watchEffect(async () => {
    //     videoUrls.value = {}
    //     var urls = {}
    //     // alert('no of lessons: ' + lessons.value.length)
    //     // _lessons.value.forEach(async (lesson) => {
    //     //   alert('about to get lesson ' + lesson.id)
    //     //   urls[lesson.id] = await getDownloadUrl(lesson.id)
    //     //   alert('got lesson ' + lesson.id)
    //     // })
    //     videoUrls.value = urls
    // })

    const lessonLength = computed(() => _lessons.value.length)

    useFetch(async() => {
        // alert('no of lessons: ' + _lessons.value.length)
    })

    // watch(
    //   () => lessonLength.value,
    //   async (lessonLength, prevLessonLength) => {
    //     // alert('Length changed!')
    //     if(lessonLength > prevLessonLength) {
    //       videoUrls.value = {}
    //       // var urls = {}
    //       // alert('no of lessons: ' + _lessons.value.length)

    //       _lessons.value.forEach(async (lesson) => {
    //         var url
    //         // alert('about to get lesson ' + lesson.id)
    //         // urls[lesson.id] = await getDownloadUrl(lesson.id)
    //         var url = await getDownloadUrl(lesson.id)
    //         videoUrls.value[lesson.id] = url
    //         alert('lesson url is ' + videoUrls.value[lesson.id])
    //       })
    //     }
    //   }
    // )

    return {
        lessontitle,
        videofilename,
        _lessons,
        deleteLesson,
        videoUrls,
        lessonLength
    }
  }
}
</script>