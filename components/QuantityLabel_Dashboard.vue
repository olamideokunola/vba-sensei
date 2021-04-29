<template>
    <div class="flex flex-col items-center py-6  bg-white rounded-xl shadow-md"

    >
        <!-- Quantity  -->
        <p class="text-6xl text-primary">{{ _quantity }}</p>

        <!-- Description -->
        <p class="text-gray">{{ _description }}</p>
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
  auth: false,
  components: {

  },
  // layout: 'home',
  props: {
      quantity: String,
      description: String
  },
  setup(props) {
    const _quantity = computed(() => props.quantity)
    const _description = computed(() => props.description)
    return {
        _quantity,
        _description
    }
  }
}
</script>

<style>

</style>