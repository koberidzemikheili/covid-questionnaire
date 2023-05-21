<template>
  <div>
    <div class="flex justify-center items-center h-screen flex-col">
      <transition name="scale">
        <IconRedBerry
          v-if="isImageVisible"
          src="@/assets/images/Vector.png"
          alt="icon"
          class="absolute top-64"
          :style="{ transform: imgTransform }"
        />
      </transition>
      <transition name="slide-fade">
        <button
          v-if="isTextVisible"
          class="text-3xl font-bold text-center text-gray-900"
          @click="navigateToIdentification"
        >
          <p class="text-3xl font-bold text-gray-900 text-3d">
            კითხვარის<br />
            დაწყება
          </p>
        </button>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const isImageVisible = ref(false);
const imgTransform = ref("");
const isTextVisible = ref(false);

import IconRedBerry from "@/components/icons/IconRedBerry.vue";

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    isImageVisible.value = true;
    imgTransform.value = "scale(25)";
  }, 0);

  setTimeout(() => {
    imgTransform.value = "scale(1)";
    setTimeout(() => {
      isTextVisible.value = true;
    }, 500);
  }, 200);
});

function navigateToIdentification() {
  localStorage.removeItem("my-app-state");
  router.push({ name: "Identification" });
}
</script>

<style scoped>
.text-3d:hover {
  text-shadow: 2px 2px 4px black;
  -webkit-text-stroke: 1px white;
}
.scale-enter-active,
.scale-leave-active {
  transition-duration: 0.3s;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-40px);
  opacity: 0;
}
</style>
