<template>
  <nuxt-link class="flex flex-row relative justify-center" :to="linkText">
      <badge 
        class="absolute right-0 top-0"
        v-if="badge.active"
        data-item="badge" 
        :itemCount="badge.itemCount"
        ></badge>
      <button 
        class="shadow-md hover:bg-gray text-white px-4 py-2 
          rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        :class="[ fontSizeClass, xPaddingClass, fontWeightClass, bgColorClass ]"
        @click="ctaAction"
      >

        {{ buttonText }}
        <slot></slot>
      </button>
  </nuxt-link>
</template>

<script>
import {
  defineComponent,
  useFetch,
  useContext,
  ref,
  computed
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

import Badge from '~/components/Badge.vue'

export default {
  auth: false,
  components: {
    Badge
  },
  // layout: 'home',
  props: {
    displayText: String,
    link: String,
    // fontSize: nm - normal, md - medium, lg - large
    fontSize: String,
    px: String,
    fontWeight: String,
    bgColor: {
      type: String,
      default: "black"
    },
    ctaAction: {
      type: Function,
      default: function() {
        return ''
      }
    },
    badge: {
      type: Object,
      default: function () {
        return {
          active: false,
          itemCount: 0
        }
      } 
    }
  },
  setup(props) {
    
    const buttonText = computed(() => props.displayText)
    const linkText = computed(() => props.link)

    const fontSizes = {
      nm: "text-base",
      md: "text-lg",
      lg: "text-xl",
    }

    const fontWeights = {
      normal: "font-normal",
      bold: "font-bold",
      extrabold: "font-extrabold",
    }
    
    const fontSizeClass = computed(() => fontSizes[props.fontSize])
    const xPaddingClass = computed(() => "px-" + props.px)
    const fontWeightClass = computed(() => fontWeights[props.fontWeight])
    const bgColorClass = computed(() => "bg-"+props.bgColor)

    return {
        buttonText,
        linkText,
        fontSizeClass,
        xPaddingClass,
        fontWeightClass,
        bgColorClass
    }
  }
}
</script>

<style>

</style>