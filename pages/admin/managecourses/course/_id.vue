<template>
    <div class="w-full">
        <HeaderInPage
            title="Viewing Course"
            :menuItems=menuItems
        >
        </HeaderInPage>

        <div class="bg-white opacity-50 rounded-lg p-8">
            <p>Course Title</p>
            <h1></h1>
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
        useAsync
    } from '@nuxtjs/composition-api' 

    import HeaderInPage from '~/components/HeaderInPage.vue'

    import { useManageCourse } from '~/service_components/usecases/useManageCourse.js'

    export default defineComponent({
        layout: 'page-container',
        components: {
            HeaderInPage,
        },
        setup(props) {

            const context = useContext()
            const courseId = context.params.value.id
            const courseAndLessons = ref({})

            const { 
                getCourseAndLessons, 
            } = useManageCourse(courseAndLessons.value)
        
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

            useFetch( async () =>{
                if(courseId){
                    await getCourseAndLessons(context.params.value.id)
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
