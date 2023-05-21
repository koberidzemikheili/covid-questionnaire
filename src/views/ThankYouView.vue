<template>
  <div
    class="w-screen h-screen bg-zinc-900 text-white flex flex-col justify-center items-center"
  >
    <div class="text-7xl font-bold relative">
      <transition name="slide-up">
        <img
          v-if="isImageVisible"
          src="@/assets/images/star1.png"
          alt="starimage1"
          class="relative left-6 bottom-14"
        />
      </transition>
      მ ა დ ლ ო ბ ა
      <transition name="slide-down">
        <img
          v-if="isImageVisible"
          src="@/assets/images/star2.png"
          class="relative left-2/3 top-14"
          alt="starimage1"
        />
      </transition>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const isImageVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isImageVisible.value = true;
  }, 500);
});
</script>
<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(40px);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-40px);
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
