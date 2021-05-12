import { mount, shallowMount, createLocalVue  } from '@vue/test-utils'
// import { setupTest } from '@nuxt/test-utils'

import ManageUsers from '@/pages/admin/manageusers/index.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ManageUsers', () => {
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

  test('page has users', () => {
    const wrapper = mount(ManageUsers, {
      store,
      localVue,
      stub: ['nuxt-link']
    })

    const userslist = wrapper.get('[data-test="userslist"]')

    expect(userslist.findAll('[data-test="useritem"]')).toHaveLength(2)
  })

  test('first user has name', () => {
    const wrapper = mount(ManageUsers, {
      store,
      localVue,
      stub: ['nuxt-link']
    })

    const userslist = wrapper.get('[data-test="userslist"]')

    const firstUser = userslist.findAll('[data-test="useritem"]').at(0)

    const firstUserName = firstUser.find('[data-test="username"')

    expect(firstUserName.text()).toBeDefined()
  })
})


