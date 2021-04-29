<template>
    <div class="container flex flex-col px-12 pb-8 rounded-xl bg-white bg-opacity-50">
        <div class="container flex flex-row items-center justify-between pt-6 ">
          <h1 class="text-4xl text-gray font-extrabold">{{ sectionTitle }}</h1>
          <slot name="actionbar"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import {
  defineComponent,
  useFetch,
  useContext,
  ref,
  computed,
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

export default {
  components: {
    
  },
  // layout: 'home',
  props: {
    title: String
  },
  setup(props, { root: { $fire } }) {
    const sectionTitle = computed(() => props.title)
    return {
      sectionTitle
    }
  }
}
</script>
{}