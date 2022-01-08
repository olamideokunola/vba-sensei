<template>
    <div class="w-full">
        <HeaderInPage
            title="Viewing Course"
            :menuItems=menuItems
        >
        </HeaderInPage>

        <!-- Title & Description -->
        <div class="bg-white bg-opacity-25 rounded-lg p-6">
            <div class="bg-white rounded-lg p-6">
                <div>
                    <p class="text-sm font-bold text-gray">Title</p>
                    <h1 class="text-3xl font-bold">{{courseAndLessons.title}}</h1>

                    <p class="text-sm font-bold text-gray mt-6">Description</p>
                    <h1 class="text-xl w-5/6">{{courseAndLessons.description}}</h1>
                </div>
                <div class="flex flex-row justify-between items-center mt-6">
                    <div class="">
                        <h1 class="bg-lightblue px-3 rounded-lg text-md font-light">{{courseAndLessons.level}}</h1>
                    </div>

                    <link-button
                        class="pr-3" 
                        link=""
                        px="6"
                        bgColor="gray"
                        >Edit</link-button>
                </div>
            </div>
        </div>

        <!-- Lessons -->
        <div class="bg-white bg-opacity-25 rounded-lg p-6 mt-6">
            
            <h1 class="text-xl font-bold mb-4">Lessons</h1>
                        
            <div v-for="(lesson, index) in courseAndLessons.lessons" :key="index" 
                class="bg-white rounded-lg p-6 pb-3 mb-4 ">
                
                <div class="flex flex-row justify-between">
                    <div class="flex flex-col w-2/3 pr-4">
                        <h1 class="text-xl font-bold">{{lesson.title}}</h1>
                        <h1 class="text-md mt-4">{{lesson.description}}</h1>
                    </div>

                    <div class="flex w-1/3">
                        <!-- Video Preview -->
                        <video 
                            :src="lesson.videoUrl"
                            :autoplay="false"
                            class="w-full sm:w-96 bg-gray rounded" 
                            controls
                            >
                        </video>
                    </div>
                </div>

                <div class="flex flex-row justify-between mt-6 h-12 border-t-2 border-gray border-opacity-25 pt-2">
                    <div class="flex flex-col items-center justify-center">
                        <h1 class="bg-lightblue px-3 rounded-lg text-md font-light items-center">{{lesson.title}}</h1>
                    </div>

                    <div class="flex flex-row">
                        <link-button
                            class="pr-3" 
                            link=""
                            px="6"
                            bgColor="gray"
                            >Delete</link-button>

                        <link-button
                            class="pr-3" 
                            link=""
                            px="6"
                            bgColor="primary"
                            >Edit</link-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    import {
        defineComponent,
        useStore,
        useRoute,
        useFetch,
        useContext,
        ref,
        computed,
        useAsync,
    } from '@nuxtjs/composition-api' 

    import HeaderInPage from '~/components/HeaderInPage.vue'

    import { useManageCourse } from '~/service_components/usecases/useManageCourse.js'
import LinkButton from '../../../../components/LinkButton.vue'

    export default defineComponent({
        layout: 'page-container',
        components: {
            HeaderInPage,
                LinkButton,
        },
        setup(props) {

            const context = useContext()
            const courseId = context.params.value.id
            let courseAndLessons = ref({})

            const { 
                getCourseAndLessons, 
            } = useManageCourse()
        
            const menuItems = ref([
                {
                    title: "Back to course list",
                    link: "/admin/managecourses"
                },
                {
                    title: "New course",
                    link: "/admin/managecourses"
                },
            ])

            useFetch(async () =>{
                if(courseId){
                    
                    let course = await getCourseAndLessons(context.params.value.id)
                    courseAndLessons.value = course
                    
                    // await getCourseAndLessons(context.params.value.id, (course) => {
                    //     courseAndLessons.value = course  
                    // })
                } else {
                    courseAndLessons.value =  {
                        title: '',
                        description: '',
                        level: '',
                        lessons: []
                    }
                }
            })

            return {
                courseId,
                menuItems,
                courseAndLessons
            }
        },
    })

</script>
