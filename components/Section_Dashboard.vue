<template>
    <SectionBox 
      class=""
      :title="sectionTitle"
      >
        <!-- Grid -->
        <div v-if="items" class="grid sm:grid-cols-3 gap-y-4 py-6 sm:gap-24 sm:px-24 sm:py-12">
          <!-- Grid Items -->
          <QuantityLabel 
            v-for="(value, name) in items" 
            :key="name"
            :quantity="value" 
            :description="name" 
          ></QuantityLabel>
        </div>

        <!-- Message -->
        <slot></slot>
        
        <!-- CTA -->
        <LinkButton 
          class="self-center sm:self-end py-4" 
          :displayText="buttonText" 
          :link="buttonUrl"
          fontSize="lg"
          fontWeight="bold"
          px="12"
          bgColor="black"
          :ctaAction="ctaAction"
          :badge="ctaBadge"
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
      ctaUrl: String,
      ctaAction: {
        type: Function,
        default: function() {
          return ''
        }
      },
      ctaBadge: {
        type: Object,
        default: function() {
          return {
            active: false,
            itemCount: 0
          }
        }
      }
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