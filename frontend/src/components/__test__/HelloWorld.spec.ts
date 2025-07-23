import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Testando HelloWorld'
    const wrapper = mount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toContain(msg)
  })
})