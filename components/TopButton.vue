<template>
    <a :href="topElement">
        <div 
        v-if="showTopButton"
        class="flex flex-col floating-button rounded-full w-16 h-16 bg-black justify-center border-black border-2">
        
            <p class="text-primary text-center">Top</p>
        
        </div>
     </a>
</template>

<script>

import {
  ref,
  onMounted,
  onBeforeUnmount,
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

export default {
    setup() {
        
        const topElement = ref('#header')

        const showTopButton = ref(false)

        const onScroll = () => {
            // alert('scroll event just occured!')
        }

        onMounted(() => {
            window.addEventListener('scroll', () => {
                if(window.pageYOffset > 300) {
                // alert('scrollTop > 300')  
                showTopButton.value = true          
                } else if(window.screenTop == 0) {
                showTopButton.value = false          
                }
            })
        })

        onBeforeUnmount(() => {
            window.removeEventListener('scroll', onScroll)
        })

        return {
            showTopButton,
            topElement
        }
    },
}
</script>

<style>

.floating-button {
  position: fixed;
  z-index: 999;
  bottom: 10px;
  right: 10px;
  opacity: 0.7;
}

.floating-button:hover {
  opacity: 1.0;
}

</style>