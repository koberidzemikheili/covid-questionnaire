<template>
  <div class="overlay">
    <div class="yellow-overlay"></div>
    <div>
      <div class="mx-32 mt-10 py-10">
        <div class="mb-10">
          <img
            src="../assets/images/redberry.png"
            alt="Left image"
            class="float-left"
          />
          <img
            src="../assets/images/right1.png"
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
          >
            <label for="name" class="font-semibold text-gray-800 mb-2 mt-4"
              >სახელი*</label
            >
            <input
              type="text"
              id="name"
              class="border border-gray-700 border-solid bg-transparent h-8"
              v-model="name"
            />
            <div class="text-red-600" v-if="errors.name">{{ errors.name }}</div>
            <label for="lastname" class="font-semibold text-gray-800 mb-2 mt-4"
              >გვარი*</label
            >
            <input
              type="text"
              id="lastname"
              class="border border-gray-700 border-solid bg-transparent h-8"
              v-model="lastname"
            />
            <div class="text-red-600" v-if="errors.lastname">
              {{ errors.lastname }}
            </div>
            <label for="email" class="font-semibold text-gray-800 mb-2 mt-4"
              >მეილი*</label
            >
            <input
              type="text"
              id="email"
              class="border border-gray-700 border-solid bg-transparent h-8"
              v-model="email"
            />
            <div class="text-red-600" v-if="errors.email">
              {{ errors.email }}
            </div>
            <button>
              <img src="../assets/images/Vector 2.png" alt="arrow right" />
            </button>
          </form>

          <div class="w-full md:w-2/3 flex justify-center">
            <img
              src="../assets/images/scan2.png"
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

<script>
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

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
    .required("შევსება სავალდებულოა"),
});

export default {
  setup() {
    const store = useStore();
    const { handleSubmit, errors } = useForm({ validationSchema: schema });
    const { value: name } = useField("name");
    const { value: lastname } = useField("lastname");
    const { value: email } = useField("email");

    const submitForm = handleSubmit((data) => {
      store.commit("setIdentificationData", data);
    });

    return {
      email,
      name,
      lastname,
      errors,
      submitForm,
    };
  },
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
    transform: translate(-5%, -450%);
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
