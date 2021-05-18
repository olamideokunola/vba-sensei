 <template>
    <div class="flex w-6 h-6 z-50 rounded-full bg-danger items-center justify-center">
       <p class="text-center text-sm"> {{itemCount}} </p>
    </div>
</template>

<script>

import { 
    ref,
    useContext,
    computed,
    toRef
} from '@nuxtjs/composition-api'

export default {
    props: {
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