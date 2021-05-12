
<template>
    <div>
        <div data-test="img-container" class="container mx-auto px-8 menu flex flex-row items-center justify-between">
            <img data-test="img" class="w-6" :src="viewStatusIcon"/>
        </div>
    </div>
</template>

<script>

import {
    defineComponent,
    useFetch,
    useContext,
    ref,
    computed,
    useAsync,
    useStore,
    toRef
  } from '@nuxtjs/composition-api' //'nuxt-composition-api'

export default {
    props: {
        viewStatusIcons: {
            type: Object,
            default: function () {
                return { 
                    pending: '' 
                }
            }
        },
        viewHistory: {
            type: Object,
            default: function () {
                return { 
                    started: false,
                    ended: false,
                    playhead: 0
                }
            }
        },
    },
    setup(props, {root:{ $fire }}) {

        const _viewStatusIcons = toRef(props, 'viewStatusIcons')

        const viewStatusIcon = computed(() => {
            if(props.viewHistory.ended){
                return _viewStatusIcons.value.completed
            } else if (!props.viewHistory.started){
                return _viewStatusIcons.value.pending
            } else if (props.viewHistory.started && !props.viewHistory.ended){
                return _viewStatusIcons.value.inprogress
            }
        })

        return {
            viewStatusIcon,
            _viewStatusIcons
        }
    }, 
}
</script>

<style scoped>
/* 
.avatar {

} */

</style>