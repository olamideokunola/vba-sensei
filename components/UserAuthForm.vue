<template>
  <div class="container mx-auto flex flex-col">
      <form class="container mx-auto flex flex-col">
            <input 
                data-item="username"
                class="border-4 border-lightblue px-8 py-4 mt-4 rounded-full text-xl"
                v-model="userInfo.name"
                placeholder="Name"
                v-if="hasName"/>

            <input 
                data-item="email"
                class="border-4 border-lightblue px-8 py-4 mt-4 rounded-full text-xl"
                v-model="userInfo.email"
                placeholder="Email"
                type="email"/>
            
            <input 
                data-item="password"
                class="border-4 border-lightblue px-8 py-4 mt-4 rounded-full text-xl"
                v-model="userInfo.password"
                placeholder="Password"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                counter=true
                v-if="hasPassword"
                />

            <button
                data-item="submit"
                class="bg-black hover:bg-gray text-white px-8 py-6 mt-8 rounded-full text-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                @click.prevent="submitForm(userInfo)"
                >
                {{ buttonText }}
            </button>

            <nuxt-link class="flex flex-row justify-center" to="/resetpassword">
                <button
                    data-item="forgotpassword"
                    class="bg-white text-center text-black px-8 py-4 pb-8 mt-2 rounded-full text-xl"
                    >
                    Forgot your password?
                </button>
            </nuxt-link>

      </form>

  </div>
</template>

<script>

import {
    ref
} from '@nuxtjs/composition-api'

export default {
    props: {
        submitForm: {
            type: Function,
            default: function() {
                return ""
            }
        }, 
        buttonText: {
            type: String,
            default: "Button"
        }, 
        hasName: {
            type: Boolean,
            default: false
        }, 
        hasPassword: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const valid = ref(false)
        const showPassword = ref(false)
        const userInfo = ref({
            email: '',
            password: ''
        })

        return {
            valid,
            showPassword,
            userInfo
        }
    }    
 
}
</script>

<style>

</style>