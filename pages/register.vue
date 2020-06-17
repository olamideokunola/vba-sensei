<template>
  <div>
      <!-- Register Title -->
      <div class="bg-primary flex flex-col align-middle justify-center">
          <h1 class="container mx-auto px-12 text-6xl text-white text-center font-bold">Register</h1>
      </div>
      <div class="container mx-auto max-w-xl flex flex-col align-middle justify-center">
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
import UserAuthForm from '~/components/UserAuthForm.vue'

export default {
  auth: false,
  components: {
    UserAuthForm
  },
  methods: {
    registerUser(registrationInfo) {
      // debugger
      // alert('You pressed signin button')
    }
  }

}
</script>

<style>

</style>