<template>
    <LinkButton 
        :displayText="displayText"
        :link="link"
        :fontSize="fontSize"
        :px="px"
        :fontWeight="fontWeight"
        :bgColor="bgColor"
        :ctaAction="ctaAction"
        >
        <Badge data-item="badge" :itemCount="itemCount"></Badge>
    </LinkButton>
</template>

<script>

import { 
    ref,
    useContext,
    computed,
    toRef
} from '@nuxtjs/composition-api'

import LinkButton from '~/components/LinkButton.vue'
import Badge from '~/components/Badge.vue'

export default {
    components:{
        Badge,
        LinkButton
    },
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
        itemCount:  {
            type: Number,
            default: 0
        }
    },
    setup(props, {root:{  }}) {
        // const count = toRef(props, 'itemCount')

        return {

        }
    },
}
</script>

<style>

</style>