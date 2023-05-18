<template>
  <div>
    <label class="font-semibold text-gray-800 mb-2 mt-4">{{ label }}</label>
    <div v-for="(option, index) in options" :key="index">
      <Field
        :type="type"
        :name="name"
        :value="option.value"
        :rules="rules"
        :modelValue="modelValue"
        @change="$emit('update:modelValue', option.value)"
        class="h-6 w-6 text-black border-gray-300 accent-black"
      />
      {{ option.label }}
    </div>
    <ErrorMessage :name="name" class="text-red-600" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { defineProps } from "vue";
import "@/Rules/rules";
defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  rules: { type: String, required: true },
  modelValue: { type: [String, Boolean], required: false },
});
</script>
