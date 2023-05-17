<template>
  <div class="flex flex-col">
    <label :for="id" class="font-semibold text-gray-800 mb-2 mt-4"
      >{{ label }}*</label
    >
    <div v-for="option in options" :key="option.value">
      <input
        :type="type"
        :id="`${id}-${option.value}`"
        :value="option.value"
        :checked="modelValue === option.value"
        @change="$emit('update:modelValue', option.value)"
      />
      <label :for="`${id}-${option.value}`">{{ option.label }}</label>
    </div>
    <div class="text-red-600" v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(["label", "id", "type", "options", "modelValue", "error"]);
defineEmits(["update:modelValue"]);
</script>
