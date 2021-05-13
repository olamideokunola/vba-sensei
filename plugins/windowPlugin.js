import { provide, inject } from '@vue/composition-api'
import Vue from 'vue'

export default {
    install: (app, options) => { 
    
        const win = {
            name: 'window'
        }

        app.config.globalProperties.$win = win

        app.provide('win', win)
    }
}

export function useWin() {
    const w = inject('win')
    return w
}
// Vue.use(windowPlugin, {})

// export default({ app }, inject) => {

//     const win = {
//         name: 'window'
//     }

//     app.config.globalProperties.$win = win
//     app.provide('win', { win })

//     // inject('win', { win })
//     // app.context.$win = win
//     // app.use(this)
// }

// Vue.use(windowPlugin, {})