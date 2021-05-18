import { mount } from '@vue/test-utils'
import Badge from '~/components/Badge.vue'
import LinkButton from '~/components/LinkButton.vue'

describe('Badge.vue', () => {
    it('renders default itemCount', () => {
        const wrapper = mount(Badge, {
            propsData: {
                itemCount: 5
            }
        })

        console.log(wrapper.html())
        
        expect(wrapper.text()).toMatch('5')
    })
})

describe('LinkButton', () => {
    it('renders a button with a badge when badge.active is true', () => {
        const wrapper = mount(LinkButton, {
            propsData: {
                badge: {
                    active: true,
                    itemCount: 5
                }
            }
        })

        const badge = wrapper.find("[data-item='badge']")
        
        expect(badge.text()).toMatch('5')
    })

    it('does not render a button with a badge when badge.active is false', () => {
        const wrapper = mount(LinkButton, {
            propsData: {
                badge: {
                    active: false,
                    itemCount: 5
                }
            }
        })

        // const badge = wrapper.get("[data-item='badge']")
        // console.log(badge.html())
        expect(() => {
            wrapper.get("[data-item='badge']")
        }).toThrow()
    })
})