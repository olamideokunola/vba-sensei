<template>
    <div class="flex flex-col items-center sm:items-start content-between px-4 sm:px-20 py-4 bg-lightblue">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center py-4 sm:pt-4 sm:pb-8">
          <h1 class="text-2xl  flex flex-row text-center sm:text-left font-bold pb-4 sm:mt-0 sm:pb-0 sm:pr-3">
              Account Inactive
            </h1>
          <div class="flex flex-row justify-center pb-4 sm:pb-0">
            <LinkButton 
              class="p-2 sm:pr-3" 
              displayText="Back to video courses" 
              link="/video_courses"
              px="2"
              bgColor="gray"
              ></LinkButton>
          </div>
        </div>

         <!-- Message -->
        <StatusSection 
            id="accountstatus" 
            title="Account Status"
            ctaText="Notify Admin"
            ctaUrl=""
            :ctaAction="_sendActivationRequestToAdmin"
        >
        
        <p class="text-center sm:text-left text-2xl" >
            Your Account is currently not active.
        </p>
        
        </StatusSection>

        <!-- Feedback -->
        <p 
            v-if="showFeedback"
            class="container bg-primary rounded-md text-center mt-4 p-2"
            >
            You activation request has been sent to admin!
        </p>

    </div>
</template>

<script>

import LinkButton from '~/components/LinkButton.vue'
import StatusSection from '~/components/Section_Dashboard.vue'

import {
  defineComponent,
  useFetch,
  useContext,
  ref,
  computed,
  useAsync,
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

import { useAuthRepositories } from '~/service_components/video_courses/useAuthRepositories.js'


export default {
    components: {
        LinkButton,
        StatusSection
    },
    setup(props) {

    const { 
            sendActivationRequestToAdmin
        } = useAuthRepositories()

        const feedback = ref('')
        const showFeedback = ref(false)

        const _sendActivationRequestToAdmin = () => {
            sendActivationRequestToAdmin(showFeedback)
        }
        
        return {
            _sendActivationRequestToAdmin,
            showFeedback,
            feedback
        }
    },
}
</script>
