<template>
  <div>
      <!-- Register Title -->
      <div class="bg-primary flex flex-col align-middle justify-center">
          <h1 class="container mx-auto px-12 text-6xl text-white text-center font-bold">Register</h1>
      </div>
      <div class="container mx-auto max-w-xl flex flex-col align-middle justify-center px-8 sm:px-0">
        <UserAuthForm
          class="m-8"
          :submitForm="registerUser"
          buttonText="Register"
          hasName="true"
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
  computed
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

import UserAuthForm from '~/components/UserAuthForm.vue'

import { useAuthRepositories } from '~/service_components/video_courses/useAuthRepositories.js'

export default {
  components: {
    UserAuthForm
  },
  setup(props) {

    const { registerUser } = useAuthRepositories()

    return {
      registerUser
    }
  }
}
</script>

<style>

</style>