<template>

    <form 
        enctype="multipart/form-data"
        class="flex flex-col items-stretch text-gray"
        :action="actionurl"
        :method="method"
        >

        <!-- Course Fields -->
        <label class="text-3xl mt-4 font-light" for="title" >Title</label>
        <input 
            name="coursetitle"
            class="border-4 border-lightblue px-8 py-4 rounded-full text-xl"
            v-model="title"
            :disabled="disabled"
        />
<!-- {{title}} -->
        <label class="text-3xl mt-4 font-light" for="coursedescription" >Description</label>
        <textarea 
            name="coursedescription"
            class="border-4 border-lightblue px-8 py-4 rounded-3xl sm:rounded-full text-xl"
            v-model="description"
            :disabled="disabled"
        />
<!-- {{description}} -->
        <label class="text-3xl mt-4 font-light" for="courselevel" >Level</label>
<!-- {{level}} -->
        <select 
            name="courselevel"
            class="sm:w-1/4 border-4 border-lightblue px-8 py-4 rounded-full text-xl text-gray"
            v-model="level"
            :disabled="disabled"
        >
            <option 
                class="border-4 border-lightblue px-8 py-4 mt-4 rounded-full text-xl"
                value=""
            >Select</option>

            <option 
                v-for="level in levels"
                :key="level.id"
                class="border-4 border-lightblue px-8 py-4 mt-4 rounded-full text-xl"
                :value="level"
            >{{level.title}}</option>
        </select>

        <input 
            type="submit"
            v-if="mode=='new'"
            value="Create new course"
            @click.prevent="$emit('submitNewCourse', { title, description, level, lessons })"
            class="sm:w-1/4 bg-primary text-white font-semibold self-end shadow px-8 py-4 mt-12 rounded-full text-xl"
        />

        <input 
            type="submit"
            v-if="mode=='edit'"
            value="Edit course"
            @click="$emit('updateCourse', course)"
            class="sm:w-1/4 bg-primary text-white font-semibold self-end shadow px-8 py-4 mt-12 rounded-full text-xl"
        />


        <!-- Lessons Fields -->
        <SectionBox 
            v-if="mode=='edit'"
            class="mt-8"
            title="Create New Lesson"
            >

            <label class="text-3xl mt-4 font-light" for="lessontitle" >Title</label>
            <input 
                name="lessontitle"
                class="border-4 border-lightblue px-8 py-4 rounded-full text-xl"
                v-model="newLesson.title"
            />

            <label class="text-3xl mt-4 font-light" for="video" >Add Video</label>
            <input 
                name="video"
                type="file"
                @change="setVideoFile($event.target.files[0])"
                class="border-4 border-lightblue px-8 py-4 rounded-full text-xl"
            />

            <input 
                type="submit"
                value="Upload video"
                @click.prevent="$emit('addLesson', newLesson, videoFile)"
                class="sm:w-1/4 bg-primary text-white font-semibold self-end shadow px-8 py-4 mt-12 rounded-full text-xl"
            />

            <!-- Videos -->
            <VideosList
                class="mt-8 rounded-xl"
                :lessons="lessons"
            >  
            </VideosList>
            <!-- {{lessons}} -->
        </SectionBox>
        
    </form>
</template>

<script>
import {
  defineComponent,
  useFetch,
  useContext,
  ref,
  computed,
  watch,
  reactive,
  onMounted,
  toRef
  } from '@nuxtjs/composition-api' //'nuxt-composition-api'

import SectionBox from '~/components/SectionBox.vue'
import VideosList from '~/components/VideosList_Form.vue'

import { useCourseRepositories } from '~/service_components/video_courses/useCourseRepositories.js'

export default {
  components: {
      SectionBox,
      VideosList
  },
  // layout: 'home',
  props: {
      // new/edit
    mode: String,
    actionurl: String,
    method: String,
    title: String,
    description: String,
    level: {
        type: Object,
        default: {
            id: '',
            title: ''
        }        
    },
    lessons: []
  },
  emits: [
      'submitNewCourse',
      'updateCourse',
      'addLesson'
  ],
  setup(props, {root:{ $store, $fire }}) {
        
    const disabled = computed(() => {
        if(props.mode == "new"){
            return false
        } else if(props.mode == "edit") {
            return true
        }
    })

    const lessontitle = ref('')

    const title = toRef(props, 'title')

    const description = toRef(props, 'description')

    const level = toRef(props, 'level')

    const lessons = toRef(props, 'lessons')

    const newLesson = ref({
        id: '',
        title: ''
    })

    const videoFile = ref('')

    const setVideoFile = (file) => {
        alert(file.name)
        videoFile.value = file
    }

    const { getLevelsAsList } = useCourseRepositories($fire)

    const levels = ref([])

    useFetch(async() => {
        
        var loclevels = $store.getters['video_courses/get_levels']

        // alert('about to fetch levels, ' + loclevels.length)

        if(loclevels && loclevels.length > 0)
        {
            levels.value = loclevels
        } else {

            levels.value = await getLevelsAsList()
        
            // save levels to store
            $store.dispatch('video_courses/loadLevelsToStore', levels.value)
        }

    })

    return {
        //...toRefs(course),
        // course,
        title,
        description,
        lessons,
        disabled,
        newLesson,
        setVideoFile,
        videoFile,
        levels,
        level
    }
  }
}
</script>