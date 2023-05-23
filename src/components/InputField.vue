<template>
  <div class="flex flex-col">
    <label :for="name" class="font-semibold text-gray-800 mb-2 mt-4">
      {{ label }}
    </label>
    <Field
      :name="name"
      :type="type"
      :as="as"
      :rules="rules"
      :class="['bg-transparent', 'border', 'border-gray-500', 'h-10', addclass]"
    />
    <ErrorMessage :name="name" class="text-red-600" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import "@/Rules/rules";
defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, required: true },
  rules: { type: String, required: false },
  addclass: { type: String, required: false },
  as: { type: String, required: false },
});
</script>
