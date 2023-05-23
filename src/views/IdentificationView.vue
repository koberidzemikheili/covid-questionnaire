<template>
  <div class="overlay">
    <div class="yellow-overlay"></div>
    <div class="w-full">
      <div class="mx-24 mt-24 border border-transparent">
        <div class="mb-10">
          <IconRedberryLetters alt="Left image" class="float-left" />
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
            id="IdentificationForm"
            class="w-1/3 block"
            @submit="submitForm"
            :initialValues="initialFormValues"
          >
            <InputField
              name="name"
              label="სახელი*"
              type="text"
              rules="required|min:3"
              placeholder="იოსებ"
            />
            <InputField
              name="lastname"
              label="გვარი"
              type="text"
              rules="required|min:3"
              placeholder="ჯუღაშვილი"
            />
            <InputField
              name="email"
              label="იმეილი*"
              type="text"
              rules="required|redberryEmail"
              placeholder="fbi@redberry.ge"
            />
          </Form>
          <div class="w-full md:w-2/3 flex justify-center">
            <img
              src="@/assets/images/scan2.png"
              alt="main image"
              class="relative bottom-28"
            />
          </div>
          <div class="w-full flex justify-center mb-24">
            <button @click="Previous" class="content mr-20">
              <IconLeftArrow />
            </button>
            <button type="submit" form="IdentificationForm" class="content">
              <IconRightArrow />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { useStore } from "vuex";
import router from "@/router";
import IconRedberryLetters from "@/components/icons/IconRedberryLetters.vue";
import IconRightArrow from "@/components/icons/IconRightArrow.vue";
import IconLeftArrow from "@/components/icons/IconLeftArrow.vue";
import InputField from "@/components/InputField.vue";

const store = useStore();
const submitForm = (values) => {
  store.commit("setIdentificationData", values);
  router.push({ name: "CovidQuestions" });
};
const Previous = () => {
  router.push({ name: "Start" });
};
const initialFormValues = {
  name: store.getters.getIdentificationData.first_name,
  lastname: store.getters.getIdentificationData.last_name,
  email: store.getters.getIdentificationData.email,
};
</script>

<style scoped>
.overlay {
  position: relative;
  display: flex;
}

.yellow-overlay {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: yellow;
  opacity: 0.5;
}

@keyframes move-overlay {
  0% {
    transform: translate(855px, 270px);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #fe3b1f;
  }
  100% {
    transform: translate(1050px, 295px);
    width: 400px;
    height: 50px;
    border-radius: 0%;
  }
}

.yellow-overlay {
  animation: move-overlay 0.6s ease-in-out forwards;
  width: 400px;
  height: 50px;
}
</style>
