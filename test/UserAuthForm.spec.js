import { mount } from '@vue/test-utils'
import UserAuthForm from '~/components/UserAuthForm.vue'


// Resp1: Provide access to login function
// Resp2: Provide access to register function
// Resp3: Provide access to reset password function

// Resp1: Provide access to login function
// Preconditions: 
// 	1. form has username field
// 	2. form has email field
// 	3. form has password field
// 	4. form has submit field
// Input:
// 	1. operation as login

// Errors & exceptions
// 	1. 
// 	2. 

// Side effects
// 	1. 
// 	2. 

// Postconditions
// 	1. form has username field is not visible
// 	2. form has email field is visible
// 	3. form has password field is visible
// 	4. form has submit field is visible
// 	5. form submit field reads login
// Output
// 	1. 
// 	2. 

describe('Login function of UserAuthForm', () => {
    it('Does not render fields for user login when hasName is false', () => {
        const wrapper = mount(UserAuthForm, {
            propsData: {
                hasName: false
            }
        })

        console.log(wrapper.html())

        expect(() => { 
            wrapper.get("[data-item='username']") 
        }).toThrow()    
    })

    it('Renders fields for user login when hasName is true', () => {
        const wrapper = mount(UserAuthForm, {
            propsData: {
                hasName: true
            }
        })

        console.log(wrapper.html())

        const username = wrapper.get('[data-item="username"]')
        // const email = wrapper.get('[data-item="email"]')
        // const password = wrapper.get('[data-item="password"]')
        // const submit = wrapper.get('[data-item="submit"]')
        // const forgotpassword = wrapper.get('[data-item="forgotpassword"]')

        expect(username.attributes('data-item')).toBe('username')    
    })
})