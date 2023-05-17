<template>
  <div class="overlay">
    <div class="yellow-overlay"></div>
    <div>
      <div class="mx-32 mt-10 py-10 min-w-full">
        <div class="mb-10">
          <img
            src="@/assets/images/redberry.png"
            alt="Left image"
            class="float-left"
          />
          <img
            src="@/assets/images/right1.png"
            alt="Right image"
            class="float-right"
          />
        </div>
        <hr class="h-px mt-8 border-1 border-black" />
        <br />
        <div class="flex flex-wrap">
          <Form
            class="w-full md:w-1/3 max-w-lg flex flex-col"
            @submit="submitForm"
          >
            <InputField
              name="name"
              label="სახელი*"
              type="text"
              rules="required|min:2"
            />
            <InputField
              name="lastname"
              label="გვარი"
              type="text"
              rules="required|min:2"
            />
            <InputField
              name="email"
              label="იმეილი*"
              type="text"
              rules="required|redberryEmail"
            />
            <button>
              <img src="@/assets/images/Vector 2.png" alt="arrow right" />
            </button>
          </Form>

          <div class="w-full md:w-2/3 flex justify-center">
            <img
              src="@/assets/images/scan2.png"
              alt="main image"
              class="relative bottom-28"
            />
          </div>
          <div class="w-full flex justify-center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { useStore } from "vuex";
import router from "@/router";
import InputField from "@/components/InputField.vue";

const store = useStore();
const submitForm = (values) => {
  console.log(values);
  store.commit("setIdentificationData", values);
  router.push({ name: "Covidquestions" });
};
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.yellow-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background-color: yellow;
  opacity: 0.5;
}

@keyframes move-overlay {
  0% {
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
  }
  100% {
    transform: translate(-5%, -425%);
    width: 400px;
    height: 50px;
  }
}

.yellow-overlay {
  animation: move-overlay 0.6s ease-in-out forwards;
  width: 400px;
  height: 50px;
}
</style>
