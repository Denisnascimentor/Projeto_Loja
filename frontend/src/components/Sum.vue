<template>
  <div>
    <input v-model.number="a" type="number" placeholder="A" />
    <input v-model.number="b" type="number" placeholder="B" />
    <button @click="calculateSum">Somar</button>
    <div>Resultado: {{ result }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Sum',
  setup() {
    const a = ref(0)
    const b = ref(0)
    const result = ref(0)

    function calculateSum() {
      result.value = a.value + b.value
    }

    return { a, b, result, calculateSum }
  }
})
</script>