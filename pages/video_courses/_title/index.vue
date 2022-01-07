<template>
  <div>
      <!-- Courses Title -->
      <div class="video-courses-bkg bg-primary flex flex-col align-middle justify-center">
          <!--{{video_course.title}}-->
          <h1 class="container mx-auto p-2 sm:p-0 sm:px-12 text-4xl text-center sm:text-6xl sm:text-left text-black font-bold">{{video_course.title}}</h1>
      </div>
        <!-- Url: {{url}} -->
      <p v-if="$fetchState.pending">Fetching</p>
      <div class="video-courses-bkg flex flex-col sm:flex-row bg-black justify-start">
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
          <div class="border sm:w-5/12 sm:h-64  bg-white">
            <h1 class="container mx-auto px-8 text-4xl text-black font-bold">Lessons</h1>
            <div
                class="flex flex-row justify-between"
                :class="lesson.id==currentLesson.id ? selected_lesson : un_selected_lesson"
                v-for="(lesson, id) in video_course.lessons"
                :key="id"
                @click="setCurrentVideo(id, lesson)"
                >
                    <p class="w-48 ">{{id+1}}. {{lesson.title}}</p>
                    <ViewStatusIcons
                        class="w-24 "
                        :viewStatusIcons="viewStatusIcons"
                        :viewHistory="lesson.viewHistory"
                    ></ViewStatusIcons>
            </div>
            
          </div>
      </div>
      <!-- Lesson Text -->
      <!-- <div>
          <h1>{{video_course.title}}</h1>
          <p>{{video_course.lesson_text}}</p>
      </div> -->
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

import ViewStatusIcons from '~/components/ViewStatusIcons.vue'

import { useCourseRepositories } from '~/service_components/video_courses/useCourseRepositories.js'
import { useLessonViewHistory } from '~/service_components/video_courses/useLessonViewHistory.js'

export default {
    components: {
        ViewStatusIcons,
    },
    middleware: 'isActive',
    setup(props, { root: { $store, $router, $route, $fire}}) {

        const { getCourses } = useCourseRepositories($fire)
        const {
            saveLessonStarted, 
            saveLastPlayHeadTime, 
            getLastLessonStopTime,
            saveLessonCompleted,
            getLessonViewHistory,
            getDownloadUrl,
            getViewStatusIcons
        } = useLessonViewHistory($fire, $store)

        const video_courses = ref([])//computed(() =>  $store.getters['video_courses/get_video_courses'])

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
            try {
                // alert('In on loaded')
                // Keep reference to video object in DOM
                videoDOMobj.value = video

                // Set video start time
                // video.currentTime = lesson_video.startTime
                // videoDOMobj.value.currentTime = 10
                var { ended, playhead, started } = await getLessonViewHistory({ userId: authUser.value.uid, lessonId: currentLesson.value.id })
                
                if(playhead) {
                    videoDOMobj.value.currentTime = playhead // await getLastLessonStopTime({ userId: authUser.value.uid, lessonId: currentLesson.value.id })
                } else {
                    videoDOMobj.value.currentTime = 0
                }
                
                // alert('time ' + videoDOMobj.value.currentTime)
            } catch (e) {
                console.log('Error in onLoaded, error is ', e.message)
            }
        }

        const onPaused = async() => {
            //alert('Video play paused at ' + videoDOMobj.value.currentTime + ' secs')
            // Save last play head time
            await saveLastPlayHeadTime({ userId: authUser.value.uid, lessonId: currentLesson.value.id, currentTime: videoDOMobj.value.currentTime })
        }

        const url = ref([])

        // const viewStatusUrl = ref('')

        const viewStatusIcons = ref({})


        useFetch (async () => {
            
            try {
                video_courses.value = await getCourses()
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

                // view staus icons
                viewStatusIcons.value = await getViewStatusIcons()
                // viewStatusUrl.value =  await viewPendingUrl()

                // Listen to changes to view history
                const currentLessonViewingHistoryRef = $fire.database.ref('views/' + authUser.value.uid)
                currentLessonViewingHistoryRef.on('value', (snapshot) => {
                    try {
                        if(snapshot.exists()) {
                            const history = snapshot.val()[currentLesson.value.id]
                            // alert('in currentLessonViewingHistoryRef, lesson started is ' + history.started)
                            currentLesson.value.viewHistory = history
                        }
                    } catch(e) {

                        console.log('Error in currentLessonViewingHistoryRef, message is ' + e)
                    } 
                })

            } catch (e) {
                console.log('Error in useFetch, message is ' + e)
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

            // currentLesson.value.viewHistory.started = true
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
                console.log('In saveUser, error: ' + e)
                return
            }
            // alert('Success.')
        }

        const onError = (e) => {
            console.log('Error! ${e}')
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
            currentLesson,
            viewStatusIcons,
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