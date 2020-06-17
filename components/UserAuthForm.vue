<template>
  <div class="container mx-auto flex flex-col">
      <form class="container mx-auto flex flex-col">
            <input 
                class="border-4 border-lightblue px-8 py-4 mt-4 rounded-full text-xl"
                v-model="userInfo.name"
                placeholder="Name"
                v-if="hasName"/>

            <input 
                class="border-4 border-lightblue px-8 py-4 mt-4 rounded-full text-xl"
                v-model="userInfo.email"
                placeholder="Username"
                type="email"/>
            
            <input 
                class="border-4 border-lightblue px-8 py-4 mt-4 rounded-full text-xl"
                v-model="userInfo.password"
                placeholder="Password"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                counter=true/>

            <button
                class="bg-black hover:bg-gray text-white px-8 py-6 mt-8 rounded-full text-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                @click="submitForm(userInfo)"
                >
                {{ buttonText }}
            </button>

            <button
                class="bg-white text-black px-8 py-4 pb-8 mt-2 rounded-full text-xl"
                @click="submitForm(userInfo)"
                >
                Forgot your password?
            </button>

      </form>

  </div>
</template>

<script>
export default {
    props: ["submitForm", "buttonText", "hasName"],
    data() {
        return {
            valid: false,   
            showPassword: false,
            userInfo: {
                email: '',
                password: ''
            }
        }
    }
 
}
</script>

<style>

</style>