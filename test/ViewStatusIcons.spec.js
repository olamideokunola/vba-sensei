import { mount, shallowMount, createLocalVue  } from '@vue/test-utils'
import ViewStatusIcons from '@/components/ViewStatusIcons.vue'

describe('ViewStatusIcons', () => {

  test('ViewStatusIcons exists', () => {
    const wrapper = mount(ViewStatusIcons)
  })

  const pending = 'https://firebasestorage.googleapis.com/v0/b/vba-sensei.appspot.com/o/icons%2Fviews%2Fpending-state.svg?alt=media&token=6d5746fa-e440-4b6f-99c6-bdaea0512af2'
  const inprogress = 'https://firebasestorage.googleapis.com/v0/b/vba-sensei.appspot.com/o/icons%2Fviews%2Fin-progress-state.svg?alt=media&token=6d5746fa-e440-4b6f-99c6-bdaea0512af2'
  const completed = 'https://firebasestorage.googleapis.com/v0/b/vba-sensei.appspot.com/o/icons%2Fviews%2Fcompleted-state.svg?alt=media&token=6d5746fa-e440-4b6f-99c6-bdaea0512af2'

  test('ViewStatusIcons can show completed icon', () => {
    const wrapper = mount(ViewStatusIcons, {
        propsData: {
            viewStatusIcons: {
                pending,
                inprogress,
                completed
            },
            viewHistory: {
                started: true,
                ended: true,
                playhead: 20
            }
        }
    })

    const imgContainer = wrapper.find('[data-test="img-container"]')
    const image = imgContainer.find('[data-test="img"]')
    expect(image.attributes('src')).toBe(completed)
  })

  test('ViewStatusIcons can show pending icon', () => { 
    const wrapper = mount(ViewStatusIcons, {
        propsData: {
            viewStatusIcons: {
                pending,
                inprogress,
                completed
            },
            viewHistory: {
                started: false,
                ended: false,
                playhead: 20
            }
        }
    })

    const imgContainer = wrapper.find('[data-test="img-container"]')
    const image = imgContainer.find('[data-test="img"]')
    expect(image.attributes('src')).toBe(pending)
  })

  test('ViewStatusIcons can show inprogress icon', () => { 
    const wrapper = mount(ViewStatusIcons, {
        propsData: {
            viewStatusIcons: {
                pending,
                inprogress,
                completed
            },
            viewHistory: {
                started: true,
                ended: false,
                playhead: 20
            }
        }
    })

    const imgContainer = wrapper.find('[data-test="img-container"]')
    const image = imgContainer.find('[data-test="img"]')
    expect(image.attributes('src')).toBe(inprogress)
  })

})
