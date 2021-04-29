<template>
  <div>
      <!-- Courses Title -->
      <div class="video-courses-bkg bg-primary flex flex-col align-middle justify-center">
          <!--{{video_course.title}}-->
          <h1 class="container mx-auto px-12 text-6xl text-black font-bold">{{video_course.title}}</h1>
      </div>
        <!-- Url: {{url}} -->
      <p v-if="$fetchState.pending">Fetching</p>
      <div class="video-courses-bkg flex bg-black flex-row justify-start">
          <!--Video-->
          <!-- :src="require('~/assets/videos/video_courses/' + current_video)" -->
          <div class="player-container w-full h-auto h-64 bg-black">          
            <!-- <vue-core-video-player 
                :title="lesson_video_title.value"
                :autoplay="false"
                :src="url"
                preload="auto"
                @loadeddata="onLoaded($event.target)"
                @pause="onPaused"
                @ended="onEnded"
                @play="onPlay"
                @error="onError"
                ref="videoplayer"
                type="video/mp4">
            </vue-core-video-player> -->
            <video 
                :title="video_course.title"
                controls
                :autoplay="false"
                :src="url"
                @loadeddata="onLoaded($event.target)"
                @pause="onPaused"
                @ended="onEnded"
                @play="onPlay"
                @abort="onAbort($event.target)"
                ref="videoplayer"
                type="video/mp4">
            </video>
           </div>

          <!--Lessons-->
          <div class="border w-5/12 h-64  bg-white">
            <h1 class="container mx-auto px-8 text-4xl text-black font-bold">Lessons</h1>
            <div
                :class="lesson.id==currentLesson.id ? selected_lesson : un_selected_lesson"
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
  computed,
  onMounted,
  useAsync
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

// import { useCourseRepositories } from '~/service_components/video_courses/useCourseRepositories.js'
import { useLessonViewHistory } from '~/service_components/video_courses/useLessonViewHistory.js'



export default {
    setup(props, { root: { $store, $router, $route, $fire}}) {

        // const {  } = useCourseRepositories($fire)
        const {
            saveLessonStarted, 
            saveLastPlayHeadTime, 
            getLastLessonStopTime,
            saveLessonCompleted,
            getLessonViewHistory,
            getDownloadUrl
        } = useLessonViewHistory($fire, $store)

        const video_courses = computed(() =>  $store.getters['video_courses/get_video_courses'])

        const temp_course = ref({})

        const video_course = ref({})

        const lesson_video_title = ref('')

        const current_video = ref('Setting_up_the_Environment_1.mp4')

        const un_selected_lesson = ref('border border-gray bg-white hover:bg-gray active:bg-gray hover:text-white px-8 py-4 text-1l')

        const selected_lesson = ref('border border-gray bg-lightblue hover:bg-gray active:bg-gray hover:text-white px-8 py-4 text-1l')

        const bkgIsActive = ref(false)

        const currentLesson = ref({})

        const setCurrentVideo = async (id, lesson) => {
            
            // const regex = /\s/g

            // const ls = video_course.value.title.replace(regex, '_')

            // current_video.value = ls + '_' + (id+1).toString() + '.mp4'

            // lesson_video_title.value = lesson

            toggleLessonBkg(id, lesson.title)

            // Save last play head time before swithing to a new video
            // alert('In setCurrentVideo ' + videoDOMobj.value.currentTime)
            await saveLastPlayHeadTime({ userId: authUser.value.uid, lessonId: currentLesson.value.id, currentTime: videoDOMobj.value.currentTime })

            // setVideoStartTime(lesson.title)
            // alert('In ser CurrentVideo" ' + lesson.id)
            currentLesson.value = lesson
            url.value = await getDownloadUrl(lesson.id)
        }

        const toggleLessonBkg = (id, title) => {
            bkgIsActive.value = !bkgIsActive.value

            video_course.value.lessons.forEach((lesson) => {
                if (lesson.title === title) {
                    $store.commit('video_courses/UPDATE_LESSON_ACTIVE_STATUS', {lesson, status: true})
                } else {
                    $store.commit('video_courses/UPDATE_LESSON_ACTIVE_STATUS', {lesson, status: false})
                }
            })
        }

        const videoDOMobj = ref({})

        const onLoaded = async (video) => {
            // alert('In on loaded')
            // Keep reference to video object in DOM
            videoDOMobj.value = video

            // Set video start time
            // video.currentTime = lesson_video.startTime
            // videoDOMobj.value.currentTime = 10
            var { ended, playhead, started } = await getLessonViewHistory({ userId: authUser.value.uid, lessonId: currentLesson.value.id })
            videoDOMobj.value.currentTime = playhead // await getLastLessonStopTime({ userId: authUser.value.uid, lessonId: currentLesson.value.id })
            // alert('time ' + videoDOMobj.value.currentTime)
        }

        const onPaused = async() => {
            //alert('Video play paused at ' + videoDOMobj.value.currentTime + ' secs')
            // Save last play head time
            await saveLastPlayHeadTime({ userId: authUser.value.uid, lessonId: currentLesson.value.id, currentTime: videoDOMobj.value.currentTime })
        }

        const url = ref([])

        useFetch (async () => {
            
            video_course.value = video_courses.value.find((video_course) => video_course.title === $route.params.title)
            
            // set first lesson video
            if(video_course.value.lessons.length > 0) {
                currentLesson.value = video_course.value.lessons[0]
            }

            // alert('In fetch')
            if(video_course.value.lessons.length > 0) {
                // alert('In fetch, 1st lesson id is ' + video_course.value.lessons[0].id )
                url.value = await getDownloadUrl(video_course.value.lessons[0].id)
                // alert('In fetch, url is ' + url.value)
            }
        })

        const onAbort = async (video) => {
            //alert('Aborted, time is ' + video.currentTime)
            //await saveLastPlayHeadTime({ userId: authUser.value.uid, lessonId: currentLesson.value.id, currentTime: video.currentTime })
        }

        const onEnded = () => {
            //alert('Video has ended!')

            // Set Lesson Ended in view history
            saveLessonCompleted({ userId: authUser.value.uid, lessonId: currentLesson.value.id })
        }

        const authUser = computed(() => $store.getters['auth/authUser'])

        const onPlay = () => {
            // alert('Video has started!')
            
            // If user is not associated with this course associate
            saveUser(authUser.value)

            // Set Lesson Started in view history
            saveLessonStarted({ userId: authUser.value.uid, lessonId: currentLesson.value.id })
            // alert('Current with id ' + authUser.uid + ' saved!')
        }

        const saveUser = async function(authUser) {

            const usersRef = $fire.database.ref('users/' + authUser.uid)

            try {
                await usersRef.set({
                    name: authUser.displayName,
                    token: '',
                    courses: {}
                })
            } catch (e) {
                alert('In saveUser, error: ' + e)
                return
            }
            // alert('Success.')
        }

        const onError = (e) => {
            alert('Error! ${e}')
        }

        return {
            video_course,
            current_video,
            setCurrentVideo,
            lesson_video_title,
            toggleLessonBkg,
            selected_lesson,
            un_selected_lesson,
            bkgIsActive,
            onLoaded,
            onPaused,
            onPlay,
            onError,
            saveUser,
            onEnded,
            onAbort,
            url,
            currentLesson
        }
    }
}
</script>

<style>
video {
  width: 100%;
  height: auto;
}
</style>