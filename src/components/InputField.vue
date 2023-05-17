<template>
  <div class="flex flex-col">
    <label :for="id" class="font-semibold text-gray-800 mb-2 mt-4">{{
      label
    }}</label>
    <input
      :type="type"
      :id="id"
      class="border border-gray-700 border-solid bg-transparent h-8"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="text-red-600" v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(["label", "id", "type", "modelValue", "error"]);
defineEmits(["update:modelValue"]);
</script>
