<template>
    <SectionBox :title="sectionTitle">
        <!-- Grid -->
        <div class="grid grid-cols-3 gap-24 px-24 pt-12 pb-12">
          <!-- Grid Items -->
          <QuantityLabel 
            v-for="(value, name) in items" 
            :key="name"
            :quantity="value" 
            :description="name" 
          ></QuantityLabel>
        </div>
        
        <!-- CTA -->
        <LinkButton 
          class="self-end py-4" 
          :displayText="buttonText" 
          :link="buttonUrl"
          fontSize="lg"
          fontWeight="bold"
          px="12"
          bgColor="black"
          ></LinkButton>
    </SectionBox>
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
import QuantityLabel from '~/components/QuantityLabel_Dashboard.vue'
import SectionBox from '~/components/SectionBox.vue'

export default {
  auth: false,
  components: {
    QuantityLabel,
    LinkButton,
    SectionBox
  },
  // layout: 'home',
  props: {
      title: String,
      items: [],
      ctaText: String,
      ctaUrl: String
  },
  setup(props) {
    const sectionTitle = computed(() => props.title)
    const labelItems = computed(() => props.items)
    const buttonText = computed(() => props.ctaText)
    const buttonUrl = computed(() => props.ctaUrl)
    return {
        sectionTitle,
        labelItems,
        buttonText,
        buttonUrl
    }
  }
}
</script>