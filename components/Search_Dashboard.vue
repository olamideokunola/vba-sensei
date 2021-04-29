<template>
    <div class="container flex flex-row items-center">
        
        <input class="rounded px-4 py-2 w-1/2" v-model="searchText" placeholder="Find courses"/>
        
        <button class="w-24 text-white bg-primary px-4 py-2 rounded-xl ml-4" type=button>
            Search
        </button>

    </div>
</template>

<script>
import {
  defineComponent,
  useFetch,
  useContext,
  ref,
} from '@nuxtjs/composition-api' //'nuxt-composition-api'

export default {
  auth: false,
  components: {
    
  },
  // layout: 'home',
  setup(props, { root: { $fire } }) {
    
    const searchText = ref('')

    return {
        searchText
    }
  }
}
</script>
