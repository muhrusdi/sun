<script setup lang="ts">
  import { useField } from 'vee-validate';
  import { toRef } from 'vue';

  const props = defineProps({
    name: {
      type: String,
      required: true
    }
  })
  const nameRef = toRef(props, "name")
  const { errorMessage, value } = useField(nameRef)
</script>
<template>
  <input v-model="value" type="text">
  <span>{{ errorMessage }}</span>
</template>