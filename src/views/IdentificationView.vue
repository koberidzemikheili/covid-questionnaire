<template>
  <div class="overlay">
    <div class="yellow-overlay"></div>
    <div>
      <div class="mx-32 mt-10 py-10">
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
          <form
            class="w-full md:w-1/3 max-w-lg flex flex-col"
            @submit.prevent="submitForm"
            :initial-values="setFieldValue"
          >
            <InputField
              label="სახელი*"
              id="name"
              type="text"
              v-model="name"
              :error="errors.name"
            />
            <InputField
              label="გვარი*"
              id="lastname"
              type="text"
              v-model="lastname"
              :error="errors.lastname"
            />
            <InputField
              label="მეილი*"
              id="email"
              type="text"
              v-model="email"
              :error="errors.email"
            />
            <button>
              <img src="@/assets/images/Vector 2.png" alt="arrow right" />
            </button>
          </form>

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
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import router from "@/router";
import InputField from "@/components/InputField.vue";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .required("შევსება სავალდებულოა"),
  lastname: yup
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .required("შევსება სავალდებულოა"),
  email: yup
    .string()
    .email("მონაცემი იმეილი უნდა იყოს")
    .matches(/@redberry\.ge$/, "მეილი უნდა იყოს @redberry.ge-ით დასრულებული")
    .required("შევსება სავალდებულოა"),
});

const store = useStore();

const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    name: store.getters.getIdentificationData.firstName,
    lastname: store.getters.getIdentificationData.lastName,
    email: store.getters.getIdentificationData.email,
  },
});
const { value: name } = useField("name");
const { value: lastname } = useField("lastname");
const { value: email } = useField("email");

const submitForm = handleSubmit((data) => {
  store.commit("setIdentificationData", data);
  router.push({ name: "Covidquestions" });
});
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
