import CountDown from '@/components/CountDown.vue'
import { mount } from '@vue/test-utils'

describe('Countdown.vue', () => {
  it('renders props.seconds when passed', () => {
    const seconds = 10
    const wrapper = mount(CountDown, {
      propsData: { seconds }
    })
    expect(wrapper.text()).toMatch(seconds.toString())
  })

  it('emits "times-up" event when countdown finishes', (done) => {
    const wrapper = mount(CountDown, {
      propsData: { seconds: 1 }
    })
    setTimeout(() => {
      expect(wrapper.emitted('times-up')).toBeTruthy()
      done()
    }, 1000)
  })
})