import { useAuthRepositories } from '~/service_components/video_courses/useAuthRepositories.js'
import { mount, shallowMount, createLocalVue  } from '@vue/test-utils'

import $fire from '@nuxtjs/firebase'


import {
    defineComponent,
    useFetch,
    useContext,
    ref,
    computed
} from '@nuxtjs/composition-api' //'nuxt-composition-api'unit test

test('getlevels', () => {
    const wrapper = mount(MyComp, {

    })
    expect(wrapper.findAll('[data-test="test"]'));
});