import { mount } from '@vue/test-utils'
import Sum from '../Sum.vue'
import { describe, it, expect } from 'vitest'

describe('Sum.vue', () => {
  it('calculates the sum correctly', async () => {
    const wrapper = mount(Sum)
    await wrapper.find('input[type="number"]').setValue(5)
    await wrapper.findAll('input[type="number"')[1].setValue(7)
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('Resultado: 12')
  })
})