<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>Componente HelloWorld Vue 3 + TypeScript!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  }
})
</script>