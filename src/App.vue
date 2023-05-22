<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="in-out">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
body {
  background-color: rgb(235, 235, 235);
  font-family: "bpg_arial";
}
</style>
