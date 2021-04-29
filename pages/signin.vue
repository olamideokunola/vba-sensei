<template>
  <div class="flex flex-col align-center">
      <!-- Sign in Title -->
      <div class="bg-primary flex flex-col align-middle justify-center">
          <h1 class="container mx-auto px-12 text-6xl text-white text-center font-bold">Sign in</h1>
      </div>
      <div class="container mx-auto max-w-xl flex flex-col align-middle justify-center">
        <UserAuthForm
          class="m-8"
          :submitForm="signInUser"
          buttonText="Sign in"
          >
        </UserAuthForm>
      </div>

      
  </div>
</template>

<script>
import UserAuthForm from '~/components/UserAuthForm.vue'

export default {
  components: {
    UserAuthForm
  },
  methods: {
    async signInUser(loginInfo) {
      // alert(loginInfo.email)
      // this.$auth.loginWith('customStrategy', {
      //   data: {
      //     username: loginInfo.email,
      //     password: loginInfo.password
      //   }
      // }) //.then(() => alert('Logged In!'))
      // debugger
      // alert('About to signin!')
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          loginInfo.email,
          loginInfo.password
        )
        alert('Signin completed!')
        localStorage.setItem('isLoggedIn', true)
        this.$router.push('/')
        
      } catch (e) {
        localStorage.removeItem('isLoggedIn')
        alert(e)
      }
    }
  }

}
</script>

<style>

</style>