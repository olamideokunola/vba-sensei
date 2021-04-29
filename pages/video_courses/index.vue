<template>
  <div>
      <!-- Courses Top -->
      <div class="video-courses-bkg bg-primary flex flex-col align-middle justify-center">
          <h1 class="text-6xl text-white font-bold text-center">Video Courses</h1>
          <img class="object-contain mx-auto max-w-md mt-0 pb-2" src="~/assets/imgs/video_courses.svg"/>
          <div class="text-center pt-4 pb-16">
              <a href="#Beginner">
                <button
                    class="bg-white shadow hover:bg-black text-black hover:text-white rounded-full px-24 py-4 mr-16 font-bold text-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    Beginner
                </button>
              </a>
              <a href="#Intermediate">
                <button class="bg-white shadow hover:bg-black text-black hover:text-white rounded-full px-20 py-4 font-bold text-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    Intermediate
                </button>
              </a>
          </div>
      </div>
      
      <p v-if="$fetchState.pending">Fetching</p>
      <p v-else-if="$fetchState.error">An error occurred</p>
      
      <!--Courses List-->
      <!-- <p v-if="$fetchState.pending">Fetching courses...</p>
      <p v-else-if="$fetchState.error">An error occurred :(</p> -->
      <div
        v-else
        class="py-16"
        v-for="(levelAndCourse, id) in levelAndCourses"
        v-bind:key="id"
        >
        <h1 class="text-center text-primary text-4xl font-bold" :id="levelAndCourse.level">{{levelAndCourse.level}}</h1>
        <div
            v-for="(video_course, id) in levelAndCourse.video_courses"
            v-bind:key="id"
            >
            <nuxt-link :to="'/video_courses/' + video_course.title">
                <div 
                    class="container mx-auto max-w-6xl shadow hover:shadow-lg border-solid border-gray border-opacity-25 rounded p-8 mt-8 flex flex-row justify-start"
                    :to="'/video_courses/' + video_course.title"
                    >
                    
                    <div class="w-64 h-64 bg-black rounded-full border-8 border-primary flex flex-col align-center justify-center">
                        <div class="flex flex-col align-middle justify-center">
                            <div class="flex justify-center px-8 py-2">
                                <svg class="w-8 fill-current text-primary mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 9h2v2H9V7h2v2zm-5.82 6.08a6.98 6.98 0 0 1 0-10.16L6 0h8l.82 4.92a6.98 6.98 0 0 1 0 10.16L14 20H6l-.82-4.92zM10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/></svg>
                                <p class="text-2xl text-center text-white font-bold">{{video_course.duration}}</p>
                            </div>
                            <div class="flex justify-center px-8 py-2">
                                <svg class="w-8 fill-current text-primary mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 4H5a1 1 0 1 1 0-2h11V1a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-7v8l-2-2-2 2V4z"/></svg>
                                <p class="text-2xl text-center text-white font-bold">{{video_course.lessons.length}} lessons</p>
                            </div>
                            <div class="flex justify-center px-8 py-2">
                                <svg v-if="video_course.level === 'Beginner'" class="w-8 fill-current text-primary mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm2 0v8h16V6H2zm1 1h4v6H3V7z"/></svg>
                                <svg v-else-if="video_course.level === 'Intermediate'" class="w-8 fill-current text-primary mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm2 0v8h16V6H2zm1 1h4v6H3V7zm5 0h4v6H8V7z"/></svg>
                                <svg v-else-if="video_course.level === 'Advanced'" class="w-8 fill-current text-primary mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm2 0v8h16V6H2zm1 1h4v6H3V7zm5 0h4v6H8V7zm5 0h4v6h-4V7z"/></svg>
                                <p class="text-2xl text-center text-white font-bold">{{video_course.level.title}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="p-8">
                        <h1 class="text-black text-5xl font-bold">{{video_course.title}}</h1>
                        <p class="max-w-3xl">{{video_course.description}} </p>
                    </div>
                </div>
            </nuxt-link>
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
  useAsync,
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

import { useCourseRepositories } from '~/service_components/video_courses/useCourseRepositories.js'

export default {
    middleware: 'authenticated',
    setup(props, { root: { $store, $router, $route, $fire}}) {

        const courses = ref([])
        const levelsFromDB = ref([])
        const lessonsFromDB = ref([])

        const lessons = ref([])

        const { getCourses, getLevelsAsList, getLessonsAsList } = useCourseRepositories($fire)

        useFetch(async() => {
            // // alert('in async 1!')
            // // Load courses and add to store
            // const coursesRef = $fire.database.ref('courses')
            // const coursesSnapshot = await coursesRef.once('value')

            // // alert('in async, courses loaded!')

            // // Load levels
            // const levelsRef = $fire.database.ref('levels')
            // const levelsSnapshot = await levelsRef.once('value')

            // levelsSnapshot.forEach((levelSnapshot) => {
            //     var levelkey = levelSnapshot.key
            //     var levelvalue = levelSnapshot.val()

            //     // alert('in async, level id is: ' + levelkey + ', title is: ' + levelvalue.title)

            //     levelsFromDB.value.push({
            //         id: levelkey,
            //         title: levelvalue.title
            //     })

            //     // alert('level added, with key: ' + levelkey + ', is ' +  levelsFromDB.value[levelkey].title)
            // })

            // levelsFromDB.value.forEach((level) => {

            //     // alert('in async, showing levels content, id is: ' + level.id + ', title is: ' + level.title)

            // })

            
            // // alert('in async, levels loaded!')

            // // Load lessons
            // const lessonsRef = $fire.database.ref('lessons')
            // const lessonsSnapshot = await lessonsRef.once('value')
        
            // lessonsSnapshot.forEach((childSnapshot) => {
            //     var childKey = childSnapshot.key
            //     var childValue = childSnapshot.val()

            //     lessonsFromDB.value.push({
            //         id: childSnapshot.key,
            //         title: childSnapshot.val().title
            //     })
            // })

            // // alert('in async, lessons loaded!')

            // // Get courses from database
            // coursesSnapshot.forEach((childSnapshot) => {
            //     var childKey = childSnapshot.key
            //     var childValue = childSnapshot.val()                

            //     // Get keys of lessons of courses, using the lesson indexes 
            //     var courselessonKeys = []
            //     var lessonsSnapshot = childSnapshot.child('2')
            //     lessonsSnapshot.forEach((childlessonSnapshot) => {
            //         var lessonChildKey = childlessonSnapshot.key
            //         var lessonChildValue = childlessonSnapshot.val()
            //         if(lessonChildValue)
            //         {
            //             courselessonKeys.push(lessonChildKey)
            //         }
            //     })

            //     var courseObj = childValue
            //     courseObj.lessons = []
                
            //     // Add lessons to course using keys
            //     lessonsFromDB.value.forEach((lesson) => {
            //         courselessonKeys.forEach((lessonKey) => {
            //             if(lesson.id == lessonKey)
            //             {
            //                 courseObj.lessons.push()
            //             }
            //         })
            //     })

            //     // alert('in async, course: ' + courseObj.title)
            //     // alert('in async, course level: ' + courseObj.level)

            //     // Get level title
            //     var levelTitle = levelsFromDB.value.find((level) => level.id === courseObj.level).title
            //     courseObj.level = levelTitle
                
            //     courses.value.push(courseObj)
            //     // alert('xxxxxxxxxCourse is ' + courseObj.title)
            // }) 

            // // Set Level

            // // alert('about to save to store!')

            // courses.value.forEach((course) => {
            //    // alert('Course description ' + course.description)
            // })

            levelsFromDB.value = await getLevelsAsList()

            //alert('number of levels is ' + levelsFromDB.value.length)

            lessonsFromDB.value = await getLessonsAsList()

            // alert('number of lessons is ' + lessonsFromDB.value.length)

            courses.value = await getCourses()

            // alert('number of courses is ' + courses.value.length)

            // Save courses to store
            $store.dispatch('video_courses/loadCoursesToStore', { 
                'courses': courses.value 
            })

            // Save levels to store
            $store.dispatch('video_courses/loadLevelsToStore', { 
                'levels': levelsFromDB.value 
            })

            // alert('number of courses is ' + courses.value.length)
        })

        // alert('about to get video courses')

        const video_courses = computed(() => $store.state.video_courses.video_courses)
        // const video_courses = computed(() => $store.state.video_courses.video_courses)
        const levels = computed(() => $store.state.video_courses.levels)

        const levelAndCourses = computed(() => {
            // alert('in levelAndCourses, levels are ' + levels.value.length)
            const levelAndCourses = []
            levels.value.forEach((level) => {
                const courses = video_courses.value.filter((course) => course.level.id === level.id)
                // alert('items in local courses: ' + courses.length)
                if (courses.length > 0) {
                    levelAndCourses.push(
                        {
                            level: level.title,
                            video_courses: courses
                        }
                    )
                }
            })
            return levelAndCourses
        })

        return {
                levelAndCourses,
            }
        }
    }
</script>

<style>

</style>