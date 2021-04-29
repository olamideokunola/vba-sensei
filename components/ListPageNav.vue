<template>
    <div class="flex flex-row items-center">
        <button
            class="rounded-md ml-2 px-2 self-stretch bg-gray text-white"
            @click="$emit('prev')"
        >Prev</button>
        <p
            class="flex rounded ml-2 text-gray text-xl bg-white w-16 self-stretch items-center justify-center text-center"
        >{{_currentPage}}</p>
        <button
            class="rounded-md ml-2 px-2 self-stretch bg-gray text-white"
            @click="$emit('next')"
        >Next</button>
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

import LinkButton from '~/components/LinkButton.vue'

export default {
  components: {
    LinkButton
  },
  // layout: 'home',
  props: {
      currentPage: Number,
      numberOfPages: Number
  },
  emits: [
      'next',
      'prev'
  ],
  setup(props) {
    const _currentPage = computed(() => props.currentPage + "/" + props.numberOfPages)

    return {
        _currentPage,
    }
  }
}
</script>