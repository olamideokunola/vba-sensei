<template>
  <div class="flex flex-col align-center">
      <!-- Sign in Title -->
      <div class="bg-primary flex flex-col align-middle justify-center">
          <h1 class="container mx-auto px-12 text-6xl text-white text-center font-bold">Reset Password</h1>
      </div>
      <div class="container mx-auto max-w-xl flex flex-col align-middle justify-center px-8 sm:px-0">
        <UserAuthForm
          class="m-8"
          :submitForm="resetPassword"
          buttonText="Reset password"
          :hasPassword="false"
          >
        </UserAuthForm>
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
  watchEffect,
  watch
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

import UserAuthForm from '~/components/UserAuthForm.vue'

import { useAuthRepositories } from '~/service_components/video_courses/useAuthRepositories.js'

export default {
  components: {
    UserAuthForm
  },
  setup(props) {

    const { resetPassword } = useAuthRepositories()

    return {
      resetPassword
    }
  }
}
</script>

<style>

</style>