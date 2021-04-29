import { mount, shallowMount, createLocalVue  } from '@vue/test-utils'
// import { setupTest } from '@nuxt/test-utils'

import Logo from '@/components/Logo.vue'
import Header from '@/components/Header.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

// import { createStore } from '~/.nuxt/store.js'

// import { createLocalVue } from '@vue/test-utils'
// import CompAPI from '@vue/composition-api'

// const localVue = createLocalVue()
// localVue.use(CompAPI)

// mount(Foo, { 
//   localVue
// })

// const store = createStore({
//   state() {
//     return {
//       count: 0
//     }
//   },
//   getters: {

//   },
//   mutations: {
//     increment(state) {
//       state.count += 1
//     }
//   }
// })

// describe('Logo', () => {

//   test('is a Vue instance', () => {
//     const wrapper = mount(Logo)
//     expect(wrapper.isVueInstance()).toBeTruthy()
//   })
// })

describe('Header', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      isLoggedIn: () => true,
      authUser: () => {
        uid='userid'
      },
      auth: () => {}
    }
  })

  store = new Vuex.Store({
    getters
  })


  test('logo has nuxt-link', () => {
    const wrapper = shallowMount(Header, {
      store,
      localVue
    })

    const logo = wrapper.get('[data-test="logo"]')

    expect(logo.findAll('nuxt-link')).toHaveLength(1)
  })

  test('header has menu items', () => {
    const wrapper = mount(Header, {
      store,
      localVue,
      stub: ['nuxt-link']
    })

    const menu = wrapper.get('[data-test="menu"]')

    expect(menu.classes()).toHaveLength(3)

    expect(menu.findAll('ul')).toHaveLength(7)

    // const ul = wrapper.get('ul')
    // // expect(ul.isEmpty()).toBe(false)
    // expect(ul.findAll('[data-test="menuitem"]')).toHaveLength(7)

    // expect(menu.isEmpty()).toBe(false)

    // expect(menu.findAll('[data-test="menuitem"]')).toHaveLength(7)
  })
})


