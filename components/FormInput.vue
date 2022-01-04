<template>
  <div>
      <label class="text-3xl mt-4 font-light" :for="_fieldName" >{{_text}}</label>
  </div>
</template>

<script>
import {
    computed,
  } from '@nuxtjs/composition-api' 

export default {
    props: {
      text: String,
      for: String
    },
    setup(props, {root:{ $fire }}) {
      const _text = computed(() => props.text)
      const _fieldName = computed(() => props.fieldName)
      return {
        _text,
        _fieldName
      }
    },
}
</script>
