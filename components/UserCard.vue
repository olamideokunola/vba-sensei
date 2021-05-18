<template>
    <div 
        class="flex flex-col sm:flex-row bg-white mt-4 rounded-md px-6 py-6"
        >
        <!-- Contents -->
        <div class="flex flex-col sm:flex-row sm:w-3/4 container items-center justify-center sm:justify-start">
            <img class="w-24 rounded-full" :src="profilePlaceholderUrl"/>
            <div data-test="username" class="flex flex-col sm:pl-4">
                <h1 class="sm:w-7/8 text-2xl text-gray text-center sm:text-left font-semibold sm:pr-12"
                >
                    {{ userItem.name }}
                </h1> 
                <p class="sm:w-1/8 text-md text-gray text-center sm:text-left font-light sm:pr-12"
                >
                    {{ userItem.email }}
                </p> 
            </div>
        </div>  

        <!-- Footer -->
        <div class="flex flex-col sm:w-1/4 mt-8 sm:mt-2 justify-between items-center sm:items-end">
            <p class="w-7/8 text-sm font-semibold text-gray">{{ userItem.courses }} courses </p>
            
            <p class="font-semibold text-gray"> 
                Since {{userItem.registrationDate.month}} {{userItem.registrationDate.day}}, {{userItem.registrationDate.year}}  
                </p>
            <div class="flex flex-col py-4 sm:py-2 sm:py-0 sm:w-1/8"
            >
                <button 
                    v-if="!userItem.active"
                    class="flex bg-gray text-white rounded px-2 text-sm self-center justify-self-end"
                    @click="activate(userItem)"
                >
                    Activate
                </button>

                <button 
                    v-else
                    class="flex bg-danger text-white rounded px-2 text-sm self-center justify-self-end"
                    @click="deactivate(userItem)"
                >
                    Deactivate
                </button>

            </div>
        </div>
    </div>
</template>

<script>

import { useUserRepositories } from '~/service_components/video_courses/useUserRepositories.js'

import {
  defineComponent,
  useFetch,
  useContext,
  ref,
  computed
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

export default {
    props: {
        userItem: {
            type: Object,
            default: function() {
                return {}
            }
        },
        profilePlaceholderUrl: {
            type: String,
        }
    },
    setup(props) {

        const { 
            setUserActiveStatus, 
        } = useUserRepositories()

        const activate = (item) => {
            item.active = true
            setUserActiveStatus(item)
        }

        const deactivate = (item) => {
            item.active = false
            setUserActiveStatus(item)
        }

        return {
            activate,
            deactivate,
        }

    },
}
</script>