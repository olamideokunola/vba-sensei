<template>
    <div class="flex flex-col items-center sm:items-start content-between px-4 sm:px-20 py-4 bg-lightblue">
        <TopButton/>
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center py-4 sm:pt-4 sm:pb-8">
          <h1 class="text-2xl  flex flex-row text-center sm:text-left font-bold pb-4 sm:mt-0 sm:pb-0 sm:pr-3">Admin Dashboard</h1>
          <div class="flex flex-row justify-center pb-4 sm:pb-0">
            <LinkButton 
              class="p-2 sm:pr-3" 
              displayText="Courses" 
              link="#courses"
              px="2"
              bgColor="gray"
              ></LinkButton>
            <LinkButton 
              class="p-2 sm:pr-3"
              displayText="Users" 
              link="#users"
              px="6"
              bgColor="gray"
              :badge="activationRequestsBadge"
              ></LinkButton>
          </div>
        </div>

        <!-- Courses -->
        <StatusSection 
          id="courses" 
          title="Courses"
          :items="statusOfCourses"
          ctaText="Manage Courses"
          ctaUrl="admin/managecourses"
        ></StatusSection>

        <!-- Users -->
        <StatusSection 
          id="users" 
          class="my-12"
          title="Users"
          :items="statusOfUsers"
          ctaText="Manage Users"
          ctaUrl="admin/manageusers"
          :ctaBadge="activationRequestsBadge"
        ></StatusSection>
        
    </div>
</template>

<script>
import {
  defineComponent,
  useFetch,
  useContext,
  ref,
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

import LinkButton from '~/components/LinkButton.vue'
import StatusSection from '~/components/Section_Dashboard.vue'
import TopButton from '~/components/TopButton.vue'

import { useUserRepositories } from '~/service_components/video_courses/useUserRepositories.js'

export default {
  // auth: false,
  components: {
    LinkButton,
    StatusSection,
    TopButton
  },
  middleware: ['authenticated',],
  // layout: 'home',
  setup(props, { root: { $fire } }) {

    const { 
      getActivationRequestsBadge
    } = useUserRepositories()
    
    const _statusOfCourses = ref([])
    const statusOfCourses = ref([])

    const summaryOfCoursesRef = $fire.database.ref('activecourses')

    const _statusOfUsers = ref([])
    const statusOfUsers = ref([])

    const summaryOfUsersRef = $fire.database.ref('activeusers')

    useFetch (async () => {
      // Load summary of courses
      const summaryOfCoursesSnapshot = await summaryOfCoursesRef.once('value')
      
      _statusOfCourses.value = []
      
      summaryOfCoursesSnapshot.forEach((snapshot) => {
        _statusOfCourses.value.push(snapshot.val())
      })
        
      const activeCourses = _statusOfCourses.value.reduce((count, course) => {
        return count + (course ? 1 : 0)
      })
      
      // set summary values for courses
      statusOfCourses.value = 
      {
        "Number of courses": _statusOfCourses.value.length,
        "Active courses": activeCourses ? 1 : activeCourses,
        "Inactive courses": _statusOfCourses.value.length - activeCourses,
      }

      // Load summary of users
      const summaryOfUsersSnapshot = await summaryOfUsersRef.once('value')
      _statusOfUsers.value = []

      summaryOfUsersSnapshot.forEach((snapshot) => {
        _statusOfUsers.value.push(snapshot.val())
      })

      const activeUsers = _statusOfUsers.value.reduce((count, user) => {
        return count + (user ? 1 : 0)
      })

      // set summary values for users
      statusOfUsers.value = 
      {
        "Number of users": _statusOfUsers.value.length,
        "Active users": activeUsers,
        "Inactive users": _statusOfUsers.value.length - activeUsers,
      }

      // Load Activation Request Badges
      activationRequestsBadge.value = await getActivationRequestsBadge()
    })

    const updateStatusFields = (eventType, statusDisplayObj, itemStatus, itemName) => {
      if(eventType == "added") {

        statusDisplayObj.value["Number of " + itemName] = statusDisplayObj.value["Number of " + itemName] + 1

        if(itemStatus){
          statusDisplayObj.value["Active " + itemName] = statusDisplayObj.value["Active " + itemName] + 1
        } else {
          statusDisplayObj.value["Inactive " + itemName] = statusDisplayObj.value["Inactive " + itemName] + 1
        }

      } else if(eventType == "removed") {

        statusDisplayObj.value["Number of " + itemName] = statusDisplayObj.value["Number of " + itemName] - 1
        
        if(itemStatus){
          statusDisplayObj.value["Active " + itemName] = statusDisplayObj.value["Active " + itemName] - 1
        } else {
          statusDisplayObj.value["Inactive " + itemName] = statusDisplayObj.value["Inactive " + itemName] - 1
        }

      }
    }

    // Listen for addition of courses
    summaryOfCoursesRef.on('child_added', (data) => {
      // alert("Added!")
      var courseStatus = data.val()

      updateStatusFields("added", statusOfCourses, courseStatus, "courses")
    })

    // Listen for removal of courses
    summaryOfCoursesRef.on('child_removed', (data) => {
      // alert("Added!")
      var courseStatus = data.val()

      updateStatusFields("removed", statusOfCourses, courseStatus, "courses")
    })

    // Listen for addition of users
    summaryOfUsersRef.on('child_added', (data) => {
      // alert("Added!")
      var userStatus = data.val()

      updateStatusFields("added", statusOfUsers, userStatus, "users")
    })

    // Listen for removal of users
    summaryOfUsersRef.on('child_removed', (data) => {
      // alert("Removed!, user status " + data.val())
      var userStatus = data.val()

      updateStatusFields("removed", statusOfUsers, userStatus, "users")
    })

    const activationRequestsBadge = ref({})

    return {
      statusOfCourses,
      statusOfUsers,
      activationRequestsBadge
    }
  }
}
</script>

<style>

</style>