<template>
    <div class="flex flex-row items-center pb-4">
        <h1 class="text-2xl font-bold pr-3">{{ headerTitle }}</h1>
        <LinkButton 
            v-for="headerMenuItem in headerMenuItems"
            :key="headerMenuItem.title"
            class="pr-3" 
            :displayText="headerMenuItem.title" 
            :link="headerMenuItem.link"
            px="2"
            bgColor="gray"
        ></LinkButton>
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

import LinkButton from '~/components/LinkButton.vue'

export default {
  components: {
    LinkButton,
  },
  // layout: 'home',
  props: {
      title: String,
      menuItems: {}
  },
  setup(props, { root: { $fire } }) {
    const headerTitle = computed(() => props.title)
    const headerMenuItems = computed(() => props.menuItems)
    return {
        headerTitle,
        headerMenuItems
    }
  }
}
</script>
