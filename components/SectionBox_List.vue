<template>
    <SectionBox :title="sectionTitle">
      <!-- action bar to child component -->
      <template v-slot:actionbar>
        <div class="flex flex-col-reverse sm:flex-row justify-center align-center">

          <!-- results page nav -->
          <ListPageNav
            class="sm:pr-8 pt-4 sm:pt-0"
            :currentPage="_currentPage"
            :numberOfPages="numberOfPages"
            @next="$emit('next')"
            @prev="$emit('prev')"
          ></ListPageNav>

          <!-- new action buttons -->
          <slot name="actionbuttons"></slot>

        </div>
      </template>

      <!-- items slot from parent component-->
      <slot name="items"></slot>
     
    </SectionBox>
    
    
</template>

<script>
import {
  defineComponent,
  useFetch,
  useContext,
  ref,
  computed,
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

import SectionBox from '~/components/SectionBox.vue'
import ListPageNav from '~/components/ListPageNav.vue'

export default {
  components: {
    SectionBox,
    ListPageNav,
  },
  // layout: 'home',
  props: {
    title: String,
    itemsCount: Number,
    itemsPerPage: Number,
    currentPage: Number
  },
  emits: [
    'prev',
    'next'
  ],
  setup(props, { root: { $fire } }) {
    const sectionTitle = computed(() => props.title)
    // const nextPage = () => {
    //   alert('Next page clicked!')
    // }
    // const prevPage = () => {
    //   alert('Previous page clicked!')
    // }

    const _currentPage = computed(() => props.currentPage)
    const _itemsPerPage = computed(() => props.itemsPerPage)
    const numberOfPages = computed(() => Math.ceil(props.itemsCount / props.itemsPerPage))

    return {
      sectionTitle,
        // nextPage,
        // prevPage,
      _itemsPerPage,
      numberOfPages,
      _currentPage
    }
  }
}
</script>
